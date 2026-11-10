// Booking card next to a blog post: price, the compact booking form and contact details
import { site } from "@/config/site";
import { getDictionary, type Locale } from "@/i18n";
import { Icon } from "@/components/Icon";
import { BookingForm } from "@/components/BookingForm";

export function TrialCard({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).trial;

  return (
    <aside
      id="trial"
      aria-label={t.label}
      className="w-full min-w-0 scroll-mt-6 leading-normal lg:sticky lg:top-6 lg:max-w-[400px] lg:flex-[1_1_340px]"
    >
      <div className="rounded-3xl border border-line-strong bg-white p-[26px] shadow-[0_10px_40px_rgba(26,26,26,0.10)]">
        <p className="mb-5 text-[22px]">
          <span className="font-extrabold">${site.price.trial}</span>{" "}
          <span className="text-base text-muted">{t.perTrial}</span>
        </p>

        <BookingForm locale={locale} variant="compact" />

        <div className="mt-5 flex flex-col gap-2.5 border-t border-line pt-[18px] text-[15px]">
          <span className="flex items-center gap-2.5">
            <Icon name="home" size={18} className="flex-none" />
            {t.where}
          </span>
          <a href={`tel:${site.phone.tel}`} className="flex items-center gap-2.5 no-underline hover:underline">
            <Icon name="phone" size={18} className="flex-none" />
            {t.callText(site.phone.display)}
          </a>
        </div>
      </div>
    </aside>
  );
}
