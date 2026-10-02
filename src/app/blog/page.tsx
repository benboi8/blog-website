import type { Metadata } from "next";
import { BlogFilters } from "@/components/BlogFilters";
import { getAllPosts, getCategories } from "@/lib/posts";

export const metadata: Metadata = { title: "Journal", description: "Browse every article from Northstar Journal." };

export default function BlogPage() {
  const posts = getAllPosts();
  return <main className="page-main"><div className="shell"><div className="page-heading"><div><div className="kicker">The archive</div><h1>Journal</h1></div><p>Essays, field notes, and practical ideas about technology, design, and modern work.</p></div><BlogFilters posts={posts} categories={getCategories()} /></div></main>;
}
