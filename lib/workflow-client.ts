import { Client as WorkFlowClient } from "@upstash/workflow";
import { Client as QStashClient, resend } from "@upstash/qstash";
import config from "./config";

export const workflowClient = new WorkFlowClient({
  token: config.env.upstash.qstashToken,
});

const qStashClient = new QStashClient({
  token: config.env.upstash.qstashToken,
});

interface SendEmailType {
  email: string;
  subject: string;
  message: string;
}

export const sendEmail = async ({ email, message, subject }: SendEmailType) => {
  try {
    const emailRes = await qStashClient.publishJSON({
      api: {
        name: "email",
        provider: resend({ token: config.env.resend.resendToken }),
      },
      body: {
        from: "Raksh <book-wise@marketing.raksh.tech>",
        to: [email],
        subject: subject,
        html: message,
      },
    });
    return emailRes;
  } catch (error) {
    console.log((error as Error).message);
  }
};
