// Business details shown across the site, in one place.
// Values in [brackets] are placeholders: replace them before going live.

export const site = {
  url: "https://legatokeys.com",
  name: "LegatoKeys",

  phone: {
    display: "(619) 647-5217",
    tel: "+16196475217",
  },


  piano: {
    en: "grand", // fills "at a real ___ piano"
    ru: "рояле", // fills "на настоящем ___"
  },

  // Used in the local-business markup Google reads. Keep it identical to the Google Business Profile.
  address: {
    streetAddress: "", // TODO: fill only if the Google profile shows the street address; leave "" to keep it private
    city: "San Diego",
    region: "CA",
    postalCode: "", // TODO: the studio's ZIP code
    country: "US",
  },
  areaServed: [
    "Rancho Peñasquitos",
    "Poway",
    "Mira Mesa",
    "Carmel Mountain",
    "Sabre Springs",
    "Torrey Highlands",
    "Black Mountain Ranch",
    "Rancho Bernardo",
    "4S Ranch",
    "Scripps Ranch",
  ],

  googleBusinessUrl: "", // TODO: paste the Google Business Profile link once it exists

  // Booking form API: the BookingUrl printed by `npx cdk deploy` in infra/
  bookingEndpoint: "https://9x39phys9c.execute-api.us-east-1.amazonaws.com/booking",
} as const;
