import { HomePage } from "@/components/home/HomePage";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/seo";

const t = getDictionary("en").meta;

export const metadata = pageMetadata({
  locale: "en",
  path: "/",
  title: t.homeTitle,
  description: t.homeDescription,
  absoluteTitle: true,
});

export default function Page() {
  return <HomePage locale="en" />;
}
