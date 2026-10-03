"use client";

import { useMemo, useState } from "react";
import type { Post } from "@/lib/types";
import { BlogCard } from "./BlogCard";

export function BlogFilters({ posts, categories }: { posts: Post[]; categories: string[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return posts.filter((post) => {
      const categoryMatch = category === "All" || post.category === category;
      const queryMatch = !normalized || [post.title, post.description, post.author, post.category, ...post.tags].join(" ").toLowerCase().includes(normalized);
      return categoryMatch && queryMatch;
    });
  }, [posts, query, category]);

  return (
    <div>
      <div className="filters" role="search">
        <label className="search-field"><span className="sr-only">Search articles</span><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the journal" /></label>
        <div className="category-filter" aria-label="Filter by category">
          <button className={category === "All" ? "active" : ""} onClick={() => setCategory("All")} type="button">All</button>
          {categories.map((item) => <button className={category === item ? "active" : ""} onClick={() => setCategory(item)} type="button" key={item}>{item}</button>)}
        </div>
      </div>
      {filtered.length ? <div className="post-grid">{filtered.map((post) => <BlogCard key={post.slug} post={post} />)}</div> : <div className="empty-state"><h2>No articles found</h2><p>Try a different search term or category.</p></div>}
    </div>
  );
}
