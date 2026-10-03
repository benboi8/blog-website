import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleContent } from "@/components/ArticleContent";
import { ArticleHeader } from "@/components/ArticleHeader";
import { ArticleNav } from "@/components/ArticleNav";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

export const dynamicParams = true;

export function generateStaticParams() { return getAllPosts().map((post) => ({ slug: post.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.description, url: `/blog/${post.slug}`, publishedTime: post.date, authors: [post.author], images: [{ url: post.coverImage, alt: post.coverImageAlt }] },
    twitter: { card: "summary_large_image", title: post.title, description: post.description, images: [post.coverImage] },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = getAllPosts();
  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) notFound();
  const post = posts[index];
  return <main className="article-page"><ArticleHeader post={post} /><ArticleContent content={post.content} /><ArticleNav previous={posts[index + 1]} next={posts[index - 1]} /></main>;
}
