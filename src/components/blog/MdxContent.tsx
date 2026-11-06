// Compiles an MDX post body at build time and renders it with the site's custom blocks
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { getDictionary, type Locale } from "@/i18n";
import { Icon } from "@/components/Icon";
import type { CoverColor } from "@/components/PianoKeys";
import { coverBg } from "@/components/PianoKeys";

export async function MdxContent({ source, locale }: { source: string; locale: Locale }) {
  const t = getDictionary(locale).blog;
  const { default: Content } = await evaluate(source, { ...runtime });

  // Blocks available inside .mdx files: <Routine>, <Step>, <Tip>
  const components = {
    Routine: ({ children }: { children: React.ReactNode }) => (
      <div className="mb-[22px] flex flex-col overflow-hidden rounded-[22px] border border-line-strong bg-white [&>*:last-child]:border-b-0">
        {children}
      </div>
    ),
    Step: ({
      min,
      title,
      color = "butter",
      children,
    }: {
      min: number | string;
      title: string;
      color?: CoverColor;
      children: React.ReactNode;
    }) => (
      <div className="flex items-center gap-[18px] border-b border-line px-[22px] py-[18px] leading-normal">
        <span
          className={`flex h-14 w-14 flex-none flex-col items-center justify-center rounded-2xl leading-none ${coverBg[color]}`}
        >
          <span className="text-[22px] font-extrabold text-ink">{min}</span>
          <span className="text-[11px] font-bold text-body">{t.min}</span>
        </span>
        <span>
          <span className="block font-extrabold text-ink">{title}</span>
          <span className="block text-[15px] text-muted">{children}</span>
        </span>
      </div>
    ),
    Tip: ({ title, children }: { title?: string; children: React.ReactNode }) => (
      <div className="my-8 flex items-start gap-4 rounded-[22px] bg-accent-soft px-[26px] py-6 leading-[1.55]">
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-accent text-white">
          <Icon name="bulb" size={20} strokeWidth={2.2} />
        </span>
        <span>
          <span className="block font-extrabold text-ink">{title ?? t.tip}</span>
          <span className="block text-[17px] text-[#2a2a2a] [&>p]:m-0">{children}</span>
        </span>
      </div>
    ),
  };

  return <Content components={components} />;
}
