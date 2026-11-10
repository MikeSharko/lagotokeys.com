import { CfnOutput, Duration, RemovalPolicy, Stack, type StackProps } from "aws-cdk-lib";
import { CorsHttpMethod, HttpApi, HttpMethod, HttpStage } from "aws-cdk-lib/aws-apigatewayv2";
import { HttpLambdaIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations";
import { Architecture, Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { LogGroup, RetentionDays } from "aws-cdk-lib/aws-logs";
import { HostedZone } from "aws-cdk-lib/aws-route53";
import { EmailIdentity, Identity } from "aws-cdk-lib/aws-ses";
import type { Construct } from "constructs";
import { fileURLToPath } from "node:url";
import type { config as Config } from "../config.ts";

type Props = StackProps & { config: typeof Config };

export class BookingStack extends Stack {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props);
    const { config } = props;

    // --- SES: the domain we send from, and the inbox we send to ---

    const domainIdentity = new EmailIdentity(this, "DomainIdentity", {
      identity: config.dnsInRoute53
        ? Identity.publicHostedZone(HostedZone.fromLookup(this, "Zone", { domainName: config.domain }))
        : Identity.domain(config.domain),
    });

    // While the account is in the SES sandbox, every recipient must be verified.
    // Creating this identity makes AWS email a one-time confirmation link to the address.
    const recipientIdentity = new EmailIdentity(this, "RecipientIdentity", {
      identity: Identity.email(config.recipientEmail),
    });

    // --- Lambda ---

    const logGroup = new LogGroup(this, "BookingLogs", {
      retention: RetentionDays.ONE_MONTH,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const fn = new Function(this, "BookingFn", {
      runtime: Runtime.NODEJS_22_X,
      architecture: Architecture.ARM_64,
      handler: "index.handler",
      // Plain ESM JavaScript using the AWS SDK built into the runtime: no bundling step.
      code: Code.fromAsset(fileURLToPath(new URL("../lambda/booking", import.meta.url)), {
        exclude: ["*.test.mjs"],
      }),
      memorySize: 256,
      timeout: Duration.seconds(10),
      logGroup,
      environment: {
        FROM_ADDRESS: config.fromAddress,
        FROM_NAME: config.fromName,
        TO_ADDRESS: config.recipientEmail,
      },
    });

    domainIdentity.grantSendEmail(fn);
    recipientIdentity.grantSendEmail(fn);

    // --- HTTP API ---

    const api = new HttpApi(this, "BookingApi", {
      apiName: "legatokeys-booking",
      createDefaultStage: false,
      corsPreflight: {
        allowOrigins: [...config.allowedOrigins],
        allowMethods: [CorsHttpMethod.POST],
        allowHeaders: ["content-type"],
        maxAge: Duration.days(1),
      },
    });

    api.addRoutes({
      path: "/booking",
      methods: [HttpMethod.POST],
      integration: new HttpLambdaIntegration("BookingIntegration", fn),
    });

    const stage = new HttpStage(this, "DefaultStage", {
      httpApi: api,
      stageName: "$default",
      autoDeploy: true,
      throttle: config.throttle,
    });

    // --- Outputs ---

    new CfnOutput(this, "BookingUrl", {
      value: `${stage.url}booking`,
      description: "Paste into bookingEndpoint in src/config/site.ts",
    });

    if (!config.dnsInRoute53) {
      // Records to add at the DNS provider so SES can verify the domain and sign mail with DKIM.
      domainIdentity.dkimRecords.forEach((r, i) => {
        new CfnOutput(this, `DkimRecord${i + 1}`, {
          value: `CNAME  ${r.name}  ->  ${r.value}`,
        });
      });
    }
  }
}
