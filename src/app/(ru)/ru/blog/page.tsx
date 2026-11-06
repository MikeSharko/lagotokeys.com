import { BlogPage } from "@/components/blog/BlogPage";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/seo";

const t = getDictionary("ru").meta;

export const metadata = pageMetadata({
  locale: "ru",
  path: "/blog/",
  title: t.blogTitle,
  description: t.blogDescription,
});

export default function Page() {
  return <BlogPage locale="ru" />;
}
