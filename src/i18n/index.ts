import en, { type Dictionary } from "./en";
import ru from "./ru";
import type { Locale } from "./locales";

const dictionaries: Record<Locale, Dictionary> = { en, ru };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
export * from "./locales";
