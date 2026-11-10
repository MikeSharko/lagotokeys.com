"use client";

// Trial-lesson request form. Posts JSON to the booking API (infra/), which emails Katerina.

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { site } from "@/config/site";
import { getDictionary, type Locale } from "@/i18n";
import { Icon } from "@/components/Icon";

type Props = {
  locale: Locale;
  /** "full" adds preferred times and a message; "compact" fits the blog sidebar */
  variant?: "full" | "compact";
};

type Status = "idle" | "sending" | "sent" | "error";
type FieldError = "name" | "contact" | "phone" | "email";

const EMAIL_RE = /^[^\s@<>"',;]+@[^\s@<>"',;]+\.[^\s@<>"',;]{2,}$/;

function checkFields(v: { name: string; phone: string; email: string }): FieldError | null {
  if (!v.name.trim()) return "name";
  if (!v.phone.trim() && !v.email.trim()) return "contact";
  const digits = v.phone.replace(/\D/g, "");
  if (v.phone.trim() && (digits.length < 7 || digits.length > 15 || /[^\d\s()+.\-]/.test(v.phone))) return "phone";
  if (v.email.trim() && !EMAIL_RE.test(v.email.trim())) return "email";
  return null;
}

export function BookingForm({ locale, variant = "full" }: Props) {
  const d = getDictionary(locale);
  const t = d.form;
  const id = useId();
  const startedAt = useRef(0);
  const [status, setStatus] = useState<Status>("idle");
  const [fieldError, setFieldError] = useState<FieldError | null>(null);

  // Set once on load: a retry right after an error must not look like an instant bot submit.
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const get = (k: string) => String(fd.get(k) ?? "");
    const values = {
      who: get("who"),
      level: get("level"),
      name: get("name"),
      phone: get("phone"),
      email: get("email"),
      times: get("times"),
      message: get("message"),
    };

    const problem = checkFields(values);
    setFieldError(problem);
    if (problem) {
      const target = problem === "contact" ? "phone" : problem;
      form.querySelector<HTMLInputElement>(`[name="${target}"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(site.bookingEndpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...values,
          locale,
          page: window.location.pathname,
          website: get("website"),
          elapsed: Date.now() - startedAt.current,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const compact = variant === "compact";
  const label = "block text-[11px] font-extrabold uppercase tracking-[0.04em] text-ink";
  const cell = "block px-3.5 py-2.5";
  const control =
    "mt-0.5 block w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-muted/70";
  const group = "overflow-hidden rounded-[14px] border border-input focus-within:border-ink";
  const errorText = fieldError
    ? { name: t.errorName, contact: t.errorContact, phone: t.errorPhone, email: t.errorEmail }[fieldError]
    : "";
  const invalid = (f: FieldError) => (fieldError === f || (fieldError === "contact" && (f === "phone" || f === "email")) ? true : undefined);

  if (status === "sent") {
    return (
      <div role="status" className="py-4 text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-accent-soft text-accent">
          <Icon name="check" size={28} />
        </span>
        <p className="mt-4 text-xl font-extrabold tracking-[-0.01em] text-ink">{t.successTitle}</p>
        <p className="mt-2 text-[15px] text-body">{t.successText}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 min-h-11 cursor-pointer text-[15px] font-bold text-accent underline underline-offset-4"
        >
          {t.another}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-describedby={errorText ? `${id}-err` : undefined}>
      {/* Who and level */}
      <div className={group}>
        <label className={`${cell} border-b border-input`}>
          <span className={label}>{d.trial.who}</span>
          <select name="who" className={`${control} cursor-pointer`} defaultValue={d.trial.whoOptions[0]}>
            {d.trial.whoOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
        <label className={cell}>
          <span className={label}>{d.trial.experience}</span>
          <select name="level" className={`${control} cursor-pointer`} defaultValue={d.trial.experienceOptions[0]}>
            {d.trial.experienceOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
      </div>

      {/* Contact */}
      <div className={`${group} mt-3`}>
        <label className={`${cell} border-b border-input`}>
          <span className={label}>{t.name}</span>
          <input
            name="name"
            autoComplete="name"
            maxLength={100}
            placeholder={t.namePlaceholder}
            aria-invalid={invalid("name")}
            className={control}
          />
        </label>
        <div className={compact ? "" : "grid sm:grid-cols-2"}>
          <label className={`${cell} border-b border-input ${compact ? "" : "sm:border-r"}`}>
            <span className={label}>{t.phone}</span>
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              maxLength={30}
              placeholder="(858) 555-0123"
              aria-invalid={invalid("phone")}
              className={control}
            />
          </label>
          <label className={`${cell} border-b border-input`}>
            <span className={label}>
              {t.email} <span className="font-semibold normal-case tracking-normal text-muted">· {t.optional}</span>
            </span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              maxLength={200}
              placeholder="you@example.com"
              aria-invalid={invalid("email")}
              className={control}
            />
          </label>
        </div>
        {compact ? null : (
          <>
            <label className={`${cell} border-b border-input`}>
              <span className={label}>
                {t.times} <span className="font-semibold normal-case tracking-normal text-muted">· {t.optional}</span>
              </span>
              <input name="times" maxLength={200} placeholder={t.timesPlaceholder} className={control} />
            </label>
            <label className={cell}>
              <span className={label}>
                {t.message} <span className="font-semibold normal-case tracking-normal text-muted">· {t.optional}</span>
              </span>
              <textarea
                name="message"
                rows={3}
                maxLength={2000}
                placeholder={t.messagePlaceholder}
                className={`${control} resize-y`}
              />
            </label>
          </>
        )}
      </div>

      {/* Bots fill every field; people never see this one */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <p
        id={`${id}-err`}
        aria-live="polite"
        className={`mt-2.5 text-sm ${errorText ? "font-semibold text-accent" : "text-muted"}`}
      >
        {errorText || t.contactHint}
      </p>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-3 flex min-h-11 w-full cursor-pointer items-center justify-center rounded-[14px] bg-accent p-4 font-extrabold text-white hover:brightness-110 disabled:cursor-wait disabled:opacity-70"
      >
        {status === "sending" ? t.sending : d.trial.request}
      </button>

      {status === "error" ? (
        <p role="alert" className="mt-3 text-center text-sm text-ink">
          {t.errorSend}{" "}
          <a href={`tel:${site.phone.tel}`} className="font-bold whitespace-nowrap text-accent">
            {site.phone.display}
          </a>
        </p>
      ) : (
        <p className="mt-3 text-center text-sm text-muted">{d.trial.note}</p>
      )}
    </form>
  );
}

