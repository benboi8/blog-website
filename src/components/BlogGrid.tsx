import type { Post } from "@/lib/types";
import { BlogCard } from "./BlogCard";

export function BlogGrid({ posts }: { posts: Post[] }) {
  return <div className="post-grid">{posts.map((post) => <BlogCard key={post.slug} post={post} />)}</div>;
}
