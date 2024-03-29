import * as crypto from "crypto";
import { EventPayloads } from "@octokit/webhooks";
import * as Sentry from "@sentry/node";
import { NowRequest, NowResponse } from "@vercel/node";
import axios from "axios";

if (process.env.NODE_ENV === "production") {
  Sentry.init({ dsn: process.env.NEXT_PUBLIC_SENTRY_DSN });
}

const checkSecretToken = (request: NowRequest): boolean => {
  if (!process.env.WEBHOOK_SECRET) {
    throw new Error("WEBHOOK_SECRET is not defined");
  }

  if (request.body === undefined) {
    return false;
  }

  const checksum = request.headers["x-hub-signature"];
  const digest = `sha1=${crypto
    .createHmac("sha1", process.env.WEBHOOK_SECRET)
    .update(JSON.stringify(request.body))
    .digest("hex")}`;

  return checksum === digest;
};

export default async (
  request: NowRequest,
  response: NowResponse
): Promise<void> => {
  response.statusCode = 200;

  if (!request.body.deployment_status || !checkSecretToken(request)) {
    response.statusCode = 400;
    return response.end();
  }

  const {
    deployment,
    deployment_status: deploymentStatus,
    repository,
  }: EventPayloads.WebhookPayloadDeploymentStatus = request.body;

  if (
    deploymentStatus.state === "pending" ||
    (deploymentStatus.environment !== "Preview" &&
      deploymentStatus.environment !== "Production" &&
      deploymentStatus.environment !== "creamsoda-in-a-dream")
  ) {
    return response.end();
  }

  await axios.post(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    process.env.GITHUB_DEPLOYMENT_STATUS_TO_DISCORD_WEBHOOK_URL!,
    {
      embeds: [
        {
          author: {
            icon_url: deploymentStatus.creator.avatar_url,
            name: deploymentStatus.creator.login,
            url: deploymentStatus.creator.html_url,
          },
          color: deploymentStatus.state === "success" ? 65280 : 16711680,
          description: deploymentStatus.description,
          fields: [
            {
              name: "Commit SHA",
              value: deployment.sha,
            },
            {
              name: "Repository",
              value: repository.full_name,
            },
          ],
          footer: {
            icon_url: repository.owner.avatar_url,
            text: repository.owner.login,
          },
          timestamp: new Date(deploymentStatus.created_at).toISOString(),
          title: deploymentStatus.environment,
          url: deploymentStatus.target_url,
        },
      ],
    }
  );

  response.statusCode = 200;
  response.end();
};
