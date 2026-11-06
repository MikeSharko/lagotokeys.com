import { HomePage } from "@/components/home/HomePage";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/seo";

const t = getDictionary("ru").meta;

export const metadata = pageMetadata({
  locale: "ru",
  path: "/",
  title: t.homeTitle,
  description: t.homeDescription,
  absoluteTitle: true,
});

export default function Page() {
  return <HomePage locale="ru" />;
}
