import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostPage } from "@/components/blog/PostPage";
import { getPost, getSlugs } from "@/lib/posts";
import { pageMetadata } from "@/lib/seo";
import { postImageUrls } from "@/components/blog/PostImage";
import { site } from "@/config/site";
import { getDictionary } from "@/i18n";

const locale = "ru";

// Only the posts in content/blog/ru are built; anything else is a 404
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
    title: post.seoTitle,
    description: post.description,
    image: post.image ? { url: postImageUrls(post.image, site.url)!.og, alt: post.imageAlt } : undefined,
    article: {
      publishedTime: post.date,
      modifiedTime: post.updated,
      author: getDictionary(locale).teacher.name,
    },
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = getPost(locale, slug);
  if (!post) notFound();
  return <PostPage locale={locale} post={post} />;
}
