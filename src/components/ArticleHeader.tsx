import Image from "next/image";
import type { Post } from "@/lib/types";
import { formatDate } from "@/lib/posts";
import { TagList } from "./TagList";

export function ArticleHeader({ post }: { post: Post }) {
  return (
    <header className="article-header shell-narrow">
      <div className="eyebrow"><span>{post.category}</span><span>·</span><time dateTime={post.date}>{formatDate(post.date)}</time></div>
      <h1>{post.title}</h1>
      <p className="article-dek">{post.description}</p>
      <div className="article-byline"><span className="avatar">{post.author.charAt(0)}</span><span>Written by <strong>{post.author}</strong></span></div>
      <div className="article-cover"><Image src={post.coverImage} alt={post.coverImageAlt} fill priority sizes="(max-width: 900px) 100vw, 960px" /></div>
      <TagList tags={post.tags} />
    </header>
  );
}
