import { db } from "@/db";
import { users } from "@/db/schema";
import { sendEmail } from "@/lib/workflow-client";
import { serve } from "@upstash/workflow/nextjs";
import { eq } from "drizzle-orm";

type InitialData = {
  email: string;
  fullName: string;
};

export const { POST } = serve<InitialData>(
  async (context) => {
    console.log("workflow triggered");
    const { email, fullName } = context.requestPayload;

    console.log("Sending welcome email to ", email);
    await context.run("new-signup", async () => {
      await sendEmail({
        email,
        subject: "Welcome to the platform",
        message: `Welcome ${fullName}!`,
      });
    });

    await context.sleep("wait-for-3-days", TimeInMs.THREE_DAYS);

    while (true) {
      const state = await context.run("check-user-state", async () => {
        return await getUserState(email);
      });

      if (state === "non-active") {
        await context.run("send-email-non-active", async () => {
          await sendEmail({
            email,
            subject: "Are you still there?",
            message: `Hey ${fullName}, we miss you!`,
          });
        });
      } else if (state === "active") {
        await context.run("send-email-active", async () => {
          await sendEmail({
            email,
            subject: "Welcome back!",
            message: `Welcome back ${fullName}!`,
          });
        });
      }

      await context.sleep("wait-for-1-month", TimeInMs.THIRTY_DAYS);
    }
  },
  {
    failureFunction: async ({
      context,
      failStatus,
      failResponse,
      failHeaders,
    }) => {
      console.error(`
      ====== FAILURE FUNCTION TRIGGERED ======
      ❌ Status: ${failStatus}
      📩 Response: ${JSON.stringify(failResponse, null, 2)}
      📰 Headers: ${JSON.stringify(failHeaders, null, 2)}
      📍 Context: ${JSON.stringify(context, null, 2)}
      =======================================
          `);
    },
  }
);

type UserState = "non-active" | "active";

enum TimeInMs {
  ONE_DAY = 24 * 60 * 60 * 1000,
  THREE_DAYS = 3 * TimeInMs.ONE_DAY,
  THIRTY_DAYS = 30 * TimeInMs.ONE_DAY,
}

export const getUserState = async (email: string): Promise<UserState> => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!user) {
    console.log('no user found...returning "non-active"');
    return "non-active";
  }

  console.log(user[0]);

  const lastActivityDate = new Date(user[0].lastActivityStatus!);

  const now = new Date();

  const timeDifference = now.getTime() - lastActivityDate.getTime();

  if (
    timeDifference > TimeInMs.THREE_DAYS &&
    timeDifference <= TimeInMs.THIRTY_DAYS
  ) {
    return "non-active";
  }

  return "active";
};
