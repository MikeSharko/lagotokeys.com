import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostPage } from "@/components/blog/PostPage";
import { getPost, getSlugs } from "@/lib/posts";
import { pageMetadata } from "@/lib/seo";

const locale = "en";

// Only the posts in content/blog/en are built; anything else is a 404
export const dynamicParams = false;

export function generateStaticParams() {
  return getSlugs(locale).map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(locale, slug);
  if (!post) return {};
  return pageMetadata({
    locale,
    path: `/blog/${slug}/`,
    title: post.title,
    description: post.excerpt,
    type: "article",
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = getPost(locale, slug);
  if (!post) notFound();
  return <PostPage locale={locale} post={post} />;
}
