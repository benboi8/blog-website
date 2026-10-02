import Link from "next/link";
import type { Post } from "@/lib/types";

export function ArticleNav({ previous, next }: { previous?: Post; next?: Post }) {
  return (
    <nav className="article-nav shell-narrow" aria-label="Article navigation">
      {previous ? <Link href={`/blog/${previous.slug}`} className="article-nav-item"><span>← Previous</span><strong>{previous.title}</strong></Link> : <span />}
      {next ? <Link href={`/blog/${next.slug}`} className="article-nav-item article-nav-next"><span>Next →</span><strong>{next.title}</strong></Link> : <span />}
    </nav>
  );
}
