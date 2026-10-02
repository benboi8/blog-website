import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/types";
import { formatDate } from "@/lib/format";
import { TagList } from "./TagList";

export function BlogCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  return (
    <article className={`post-card ${featured ? "post-card-featured" : ""}`}>
      <Link href={`/blog/${post.slug}`} className="card-image-wrap" aria-label={`Read ${post.title}`}>
        <Image src={post.coverImage} alt={post.coverImageAlt} fill sizes={featured ? "(max-width: 800px) 100vw, 62vw" : "(max-width: 800px) 100vw, 33vw"} className="card-image" />
      </Link>
      <div className="card-body">
        <div className="eyebrow"><span>{post.category}</span><span>·</span><time dateTime={post.date}>{formatDate(post.date)}</time></div>
        <h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
        <p>{post.description}</p>
        <div className="card-footer"><span>By {post.author}</span><span className="read-more">Read article <span aria-hidden="true">→</span></span></div>
        {!featured && <TagList tags={post.tags.slice(0, 3)} />}
      </div>
    </article>
  );
}
