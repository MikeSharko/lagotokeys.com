// Pure helpers for the booking handler: parsing, validation, spam checks and the email text.
// Kept free of AWS calls so they can be unit-tested with `node --test`.

export const MAX_BODY_BYTES = 10_000;

/** Submissions faster than this after the form loaded are treated as bots. */
export const MIN_FILL_MS = 3_000;

const LIMITS = {
  name: 100,
  phone: 30,
  email: 200,
  who: 60,
  level: 60,
  times: 200,
  message: 2000,
};

const EMAIL_RE = /^[^\s@<>"',;]+@[^\s@<>"',;]+\.[^\s@<>"',;]{2,}$/;

/** Parse an API Gateway HTTP API (payload v2) event body into an object, or return null. */
export function parseBody(event) {
  let raw = event?.body ?? "";
  if (event?.isBase64Encoded) raw = Buffer.from(raw, "base64").toString("utf8");
  if (!raw || Buffer.byteLength(raw, "utf8") > MAX_BODY_BYTES) return null;
  try {
    const data = JSON.parse(raw);
    return data && typeof data === "object" && !Array.isArray(data) ? data : null;
  } catch {
    return null;
  }
}

/** Collapse whitespace and drop control characters; keep newlines only where allowed. */
function clean(value, { multiline = false } = {}) {
  if (typeof value !== "string") return "";
  let s = value.replace(/\r\n?/g, "\n");
  // Remove control characters other than newline and tab.
  s = s.replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, "");
  if (multiline) {
    s = s
      .split("\n")
      .map((line) => line.replace(/[ \t]+/g, " ").trimEnd())
      .join("\n")
      .replace(/\n{3,}/g, "\n\n");
  } else {
    s = s.replace(/\s+/g, " ");
  }
  return s.trim();
}

/**
 * Validate and normalize a submission.
 * Returns { ok: true, data } or { ok: false, errors: string[] } with the names of bad fields.
 */
export function validate(input) {
  const data = {
    name: clean(input.name),
    phone: clean(input.phone),
    email: clean(input.email).toLowerCase(),
    who: clean(input.who),
    level: clean(input.level),
    times: clean(input.times),
    message: clean(input.message, { multiline: true }),
    locale: input.locale === "ru" ? "ru" : "en",
    page: clean(input.page).slice(0, 200),
  };

  const errors = [];
  for (const [field, max] of Object.entries(LIMITS)) {
    if (data[field].length > max) errors.push(field);
  }

  if (!data.name) errors.push("name");

  const digits = data.phone.replace(/\D/g, "");
  if (data.phone && (digits.length < 7 || digits.length > 15 || /[^\d\s()+.\-]/.test(data.phone))) {
    errors.push("phone");
  }
  if (data.email && !EMAIL_RE.test(data.email)) errors.push("email");

  // At least one way to reach the family.
  if (!data.phone && !data.email) errors.push("contact");

  return errors.length ? { ok: false, errors: [...new Set(errors)] } : { ok: true, data };
}

/** True when the request looks automated: the hidden field is filled, or the form was sent too fast. */
export function isSpam(input) {
  if (typeof input.website === "string" && input.website.trim() !== "") return true;
  const elapsed = Number(input.elapsed);
  if (!Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) return true;
  return false;
}

/** Build the email Katerina receives. Labels are in Russian; the family's answers are as they typed them. */
export function buildEmail(data) {
  const subject = `Заявка на пробный урок: ${data.name}`;
  const rows = [
    ["Имя", data.name],
    ["Телефон", data.phone],
    ["Email", data.email],
    ["Кто учится", data.who],
    ["Опыт", data.level],
    ["Удобное время", data.times],
  ].filter(([, v]) => v);

  const lines = [
    "Новая заявка на пробный урок с сайта legatokeys.com",
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
  ];
  if (data.message) lines.push("", "Сообщение:", data.message);
  lines.push(
    "",
    "—",
    `Язык сайта: ${data.locale === "ru" ? "русский" : "английский"}`,
    data.page ? `Страница: ${data.page}` : "",
    data.email ? "Нажмите «Ответить», чтобы написать напрямую." : "Email не указан — свяжитесь по телефону.",
  );

  return { subject, text: lines.filter((l, i, a) => !(l === "" && a[i - 1] === "")).join("\n").trim() };
}
