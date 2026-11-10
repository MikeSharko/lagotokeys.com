// Settings for the booking backend. Edit these, then run `npx cdk deploy`.

export const config = {
  /** Site domain. Booking emails are sent from an address on it. */
  domain: "legatokeys.com",

  /**
   * true  — the domain's DNS is in Route 53 in this AWS account: DKIM records are created automatically.
   * false — DNS lives elsewhere (GoDaddy, Namecheap, Cloudflare...): the deploy prints three CNAME records to add by hand.
   */
  dnsInRoute53: true,

  /** Sender shown in the inbox. No mailbox is needed for it. */
  fromAddress: "bookings@legatokeys.com",
  fromName: "LegatoKeys",

  /** Where booking requests go. AWS emails this address a confirmation link once, on the first deploy. */
  recipientEmail: "sharko.katerina@gmail.com", //   Katerina's email

  /** Pages allowed to call the API from a browser. */
  allowedOrigins: ["https://legatokeys.com", "https://www.legatokeys.com", "http://localhost:3000"],

  /** API Gateway limits for the whole endpoint: steady requests per second and short bursts. */
  throttle: { rateLimit: 2, burstLimit: 5 },
} as const;
