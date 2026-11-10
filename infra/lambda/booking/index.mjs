// POST /booking: validates a trial-lesson request and emails it to Katerina through SES.

import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import { buildEmail, isSpam, parseBody, validate } from "./lib.mjs";

const ses = new SESv2Client({});

const { FROM_ADDRESS, FROM_NAME, TO_ADDRESS } = process.env;

const json = (statusCode, body) => ({
  statusCode,
  headers: { "content-type": "application/json" },
  body: JSON.stringify(body),
});

export async function handler(event) {
  const input = parseBody(event);
  if (!input) return json(400, { ok: false, errors: ["body"] });

  // Pretend success so bots get no signal to retry differently.
  if (isSpam(input)) {
    console.log(JSON.stringify({ event: "spam_dropped" }));
    return json(200, { ok: true });
  }

  const result = validate(input);
  if (!result.ok) return json(400, { ok: false, errors: result.errors });

  const { subject, text } = buildEmail(result.data);

  try {
    await ses.send(
      new SendEmailCommand({
        FromEmailAddress: `${FROM_NAME} <${FROM_ADDRESS}>`,
        Destination: { ToAddresses: [TO_ADDRESS] },
        ReplyToAddresses: result.data.email ? [result.data.email] : undefined,
        Content: {
          Simple: {
            Subject: { Data: subject, Charset: "UTF-8" },
            Body: { Text: { Data: text, Charset: "UTF-8" } },
          },
        },
      }),
    );
  } catch (err) {
    // Log the failure without any of the family's details.
    console.error(JSON.stringify({ event: "send_failed", name: err?.name, message: err?.message }));
    return json(502, { ok: false, errors: ["send"] });
  }

  console.log(JSON.stringify({ event: "sent", locale: result.data.locale }));
  return json(200, { ok: true });
}
