import { App } from "aws-cdk-lib";
import { config } from "../config.ts";
import { BookingStack } from "../lib/booking-stack.ts";

if (!config.recipientEmail) {
  throw new Error("Set recipientEmail in infra/config.ts before deploying.");
}

// The CDK CLI fills these from the AWS credentials it finds. Missing account = no working credentials.
if (!process.env.CDK_DEFAULT_ACCOUNT) {
  throw new Error(
    "No AWS credentials found. Check `aws sts get-caller-identity`; " +
      "with a named profile run `npx cdk deploy --profile <name>`, with SSO run `aws sso login` first.",
  );
}

const app = new App();

new BookingStack(app, "LegatoKeysBooking", {
  // A Route 53 lookup needs a concrete account and region; both come from the AWS CLI profile.
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  description: "LegatoKeys trial-lesson booking form: HTTP API -> Lambda -> SES",
  config,
});
