"use client";

// Booking card next to a blog post: the selected options go into a prefilled email
import { useState } from "react";
import { Icon } from "@/components/Icon";

type Props = {
  email: string;
  phone: { display: string; tel: string };
  price: string;
  labels: {
    label: string;
    perTrial: string;
    who: string;
    whoOptions: string[];
    experience: string;
    experienceOptions: string[];
    request: string;
    note: string;
    where: string;
    call: string;
    subject: string;
    body: string; // template with {who} and {level}
  };
};

export function TrialCard({ email, phone, price, labels }: Props) {
  const [who, setWho] = useState(labels.whoOptions[0]);
  const [level, setLevel] = useState(labels.experienceOptions[0]);

  const body = labels.body.replace("{who}", who).replace("{level}", level);
  const mailto = `mailto:${email}?subject=${encodeURIComponent(labels.subject)}&body=${encodeURIComponent(body)}`;

  const select =
    "w-full cursor-pointer bg-transparent py-0.5 text-[15px] text-ink outline-none";
  const fieldLabel = "block text-[11px] font-extrabold uppercase tracking-[0.04em]";

  return (
    <aside
      id="trial"
      aria-label={labels.label}
      className="w-full min-w-0 scroll-mt-6 leading-normal lg:sticky lg:top-6 lg:max-w-[400px] lg:flex-[1_1_340px]"
    >
      <div className="rounded-3xl border border-line-strong bg-white p-[26px] shadow-[0_10px_40px_rgba(26,26,26,0.10)]">
        <p className="text-[22px]">
          <span className="font-extrabold">${price}</span>{" "}
          <span className="text-base text-muted">{labels.perTrial}</span>
        </p>

        <div className="mt-5 overflow-hidden rounded-[14px] border border-input">
          <label className="block border-b border-input px-3.5 py-2.5">
            <span className={fieldLabel}>{labels.who}</span>
            <select value={who} onChange={(e) => setWho(e.target.value)} className={select}>
              {labels.whoOptions.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </label>
          <label className="block px-3.5 py-2.5">
            <span className={fieldLabel}>{labels.experience}</span>
            <select value={level} onChange={(e) => setLevel(e.target.value)} className={select}>
              {labels.experienceOptions.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </label>
        </div>

        <a
          href={mailto}
          className="mt-4 flex min-h-11 items-center justify-center rounded-[14px] bg-accent p-4 font-extrabold text-white no-underline hover:brightness-110"
        >
          {labels.request}
        </a>
        <p className="mt-3 text-center text-sm text-muted">{labels.note}</p>

        <div className="mt-5 flex flex-col gap-2.5 border-t border-line pt-[18px] text-[15px]">
          <span className="flex items-center gap-2.5">
            <Icon name="home" size={18} className="flex-none" />
            {labels.where}
          </span>
          <a href={`tel:${phone.tel}`} className="flex items-center gap-2.5 no-underline hover:underline">
            <Icon name="phone" size={18} className="flex-none" />
            {labels.call}
          </a>
        </div>
      </div>
    </aside>
  );
}
