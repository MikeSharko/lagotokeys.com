import { site } from "@/config/site";
import { getDictionary, type Locale } from "@/i18n";

// S3 can't receive forms, so booking opens the visitor's email app with a prefilled message
export function trialMailto(locale: Locale, who?: string, level?: string): string {
  const t = getDictionary(locale).trial;
  const subject = encodeURIComponent(t.emailSubject);
  // Without details (generic "Book" buttons) send just the subject line
  if (!who || !level) return `mailto:${site.email}?subject=${subject}`;
  const body = encodeURIComponent(t.emailBody(who, level));
  return `mailto:${site.email}?subject=${subject}&body=${body}`;
}

export const telHref = `tel:${site.phone.tel}`;
