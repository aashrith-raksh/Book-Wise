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

export const triggerWorkflow = async (email: string, fullName: string) => {
  console.log(
    `[${new Date().toISOString()}]  Triggering workflow from actions...`
  );

  const url = `${config.env.prodApiEndpoint}/api/workflows/onboarding`;
  const requestBody = { email, fullName };

  console.log(`[${new Date().toISOString()}]  Sending request to: ${url}`);
  console.log(
    `[${new Date().toISOString()}]  Request Body:`,
    JSON.stringify(requestBody, null, 2)
  );

  try {
    const runID = await workflowClient.trigger({ url, body: requestBody });

    console.log(
      `[${new Date().toISOString()}]  Workflow triggered successfully!`
    );
    console.log(`[${new Date().toISOString()}]  Run ID:`, runID);
  } catch (error) {
    console.error(
      `[${new Date().toISOString()}]  Error triggering workflow:`,
      error
    );
  }
};
