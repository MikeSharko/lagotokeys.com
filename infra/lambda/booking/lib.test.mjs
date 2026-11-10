import assert from "node:assert/strict";
import { test } from "node:test";
import { buildEmail, isSpam, parseBody, validate } from "./lib.mjs";

const good = {
  name: "  Anna   Petrova ",
  phone: "(858) 555-0123",
  email: "Anna@Example.com",
  who: "Child (under 12)",
  level: "Complete beginner",
  times: "Weekdays after 4pm",
  message: "Hi!\r\n\r\n\r\n\r\nMy daughter is 7.",
  locale: "en",
  page: "/blog/what-age-to-start-piano/",
  website: "",
  elapsed: 12000,
};

test("parseBody handles JSON, base64 and junk", () => {
  assert.deepEqual(parseBody({ body: '{"a":1}' }), { a: 1 });
  assert.deepEqual(parseBody({ body: Buffer.from('{"a":1}').toString("base64"), isBase64Encoded: true }), { a: 1 });
  assert.equal(parseBody({ body: "not json" }), null);
  assert.equal(parseBody({ body: "[1,2]" }), null);
  assert.equal(parseBody({}), null);
  assert.equal(parseBody({ body: JSON.stringify({ x: "a".repeat(20_000) }) }), null);
});

test("validate normalizes a good submission", () => {
  const r = validate(good);
  assert.equal(r.ok, true);
  assert.equal(r.data.name, "Anna Petrova");
  assert.equal(r.data.email, "anna@example.com");
  assert.equal(r.data.message, "Hi!\n\nMy daughter is 7.");
  assert.equal(r.data.locale, "en");
});

test("validate requires a name and a way to reply", () => {
  assert.deepEqual(validate({ ...good, name: " " }).errors, ["name"]);
  assert.deepEqual(validate({ ...good, phone: "", email: "" }).errors, ["contact"]);
  assert.equal(validate({ ...good, phone: "" }).ok, true);
  assert.equal(validate({ ...good, email: "" }).ok, true);
});

test("validate rejects bad phone, bad email and over-long fields", () => {
  assert.deepEqual(validate({ ...good, phone: "12" }).errors, ["phone"]);
  assert.deepEqual(validate({ ...good, phone: "call me maybe" }).errors, ["phone"]);
  assert.deepEqual(validate({ ...good, email: "nope" }).errors, ["email"]);
  assert.deepEqual(validate({ ...good, email: "a@b.com\nBcc: x@y.com" }).errors, ["email"]);
  assert.deepEqual(validate({ ...good, message: "x".repeat(2001) }).errors, ["message"]);
  assert.equal(validate({ ...good, phone: "+1 619.647.5217" }).ok, true);
});

test("validate strips header-breaking characters from single-line fields", () => {
  const r = validate({ ...good, name: "Eve\r\nBcc: spam@x.com" });
  assert.equal(r.ok, true);
  assert.equal(r.data.name.includes("\n"), false);
});

test("validate ignores non-string values", () => {
  const r = validate({ ...good, who: { $gt: 1 }, level: 42 });
  assert.equal(r.ok, true);
  assert.equal(r.data.who, "");
  assert.equal(r.data.level, "");
});

test("isSpam catches the honeypot and instant submits", () => {
  assert.equal(isSpam(good), false);
  assert.equal(isSpam({ ...good, website: "http://spam" }), true);
  assert.equal(isSpam({ ...good, elapsed: 800 }), true);
  assert.equal(isSpam({ ...good, elapsed: undefined }), true);
});

test("buildEmail lists only filled fields", () => {
  const { subject, text } = buildEmail(validate({ ...good, email: "", level: "" }).data);
  assert.equal(subject, "Заявка на пробный урок: Anna Petrova");
  assert.match(text, /Телефон: \(858\) 555-0123/);
  assert.doesNotMatch(text, /Email:/);
  assert.doesNotMatch(text, /Опыт:/);
  assert.match(text, /свяжитесь по телефону/);
  assert.doesNotMatch(text, /\n\n\n/);
});
