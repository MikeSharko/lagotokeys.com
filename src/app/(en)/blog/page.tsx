import { BlogPage } from "@/components/blog/BlogPage";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/seo";

const t = getDictionary("en").meta;

export const metadata = pageMetadata({
  locale: "en",
  path: "/blog/",
  title: t.blogTitle,
  description: t.blogDescription,
});

export default function Page() {
  return <BlogPage locale="en" />;
}
