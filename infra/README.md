# LegatoKeys booking backend

The trial-lesson form on the site posts to this API, and the request lands in Katerina's inbox.

```
form on legatokeys.com ──POST /booking──▶ API Gateway (HTTP API) ──▶ Lambda ──▶ SES ──▶ Katerina's email
```

- Sent from `bookings@legatokeys.com`; **Reply** goes straight to the family (when they left an email).
- Spam protection: a hidden honeypot field, a minimum fill time, and API throttling (2 req/s, burst 5).
- No database; nothing about the family is logged.

## First deploy

Needs the AWS CLI signed in to the account (`aws sts get-caller-identity` should work).

1. In `config.ts`, set `recipientEmail` to Katerina's address.
   If the `legatokeys.com` DNS isn't in Route 53 in this account, also set `dnsInRoute53: false`.
2. Install and deploy (the region comes from your AWS profile; `us-west-2` is closest to San Diego):

   ```sh
   cd infra
   npm install
   npx cdk bootstrap   # once per account/region; skip if already done
   npx cdk deploy
   ```

3. Katerina gets an email from Amazon Web Services: "Email Address Verification Request". She clicks the link once.
4. Copy the `BookingUrl` output into `bookingEndpoint` in `src/config/site.ts`, then rebuild and upload the site.
5. If `dnsInRoute53: false`: add the three `DkimRecord` CNAMEs from the output at the DNS provider.
   SES verifies the domain within about an hour.

## Checks

```sh
npm test     # unit tests for validation, spam checks and the email text
npx cdk diff # what a deploy would change
```

Send a test from the live site, then check the logs: CloudWatch → Log groups → `LegatoKeysBooking-BookingLogs…`.
If the first emails land in spam, mark one "Not spam".

## Notes

- The account can stay in the SES sandbox: mail only goes to Katerina's verified address.
- To send families an automatic confirmation, the account would need SES production access (a support request in the SES console).
- To change the recipient later, edit `recipientEmail` and deploy again; the new address gets its own verification email.
