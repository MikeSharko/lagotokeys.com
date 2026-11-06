// Business details shown across the site, in one place.
// Values in [brackets] are placeholders: replace them before going live.

export const site = {
  url: "https://legatokeys.com",
  name: "LegatoKeys",

  email: "hello@legatokeys.com", // TODO: confirm this mailbox exists
  phone: {
    display: "[Phone]", // TODO: e.g. "(858) 555-0123"
    tel: "+10000000000", // TODO: digits only, with +1
  },

  // Prices in USD, shown as "$<value>"
  price: {
    trial: "[XX]", // TODO: 30-minute trial lesson
    lesson30: "[XX]", // TODO: 30-minute weekly lesson
    lesson60: "[XX]", // TODO: 60-minute weekly lesson
  },

  hours: {
    en: "[Days & hours]", // TODO: e.g. "Mon–Fri 2–7 pm, Sat 10 am–2 pm"
    ru: "[Дни и часы]", // TODO: e.g. "Пн–Пт 14:00–19:00, Сб 10:00–14:00"
  },

  piano: {
    en: "[acoustic / grand]", // TODO: fills "at a real ___ piano", e.g. "Yamaha grand"
    ru: "[пианино / рояле]", // TODO: fills "на настоящем ___", e.g. "рояле Yamaha"
  },
} as const;
