import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Frontmatter, Post } from "./types";

const postsDirectory = path.join(process.cwd(), "blogs");

function normalizeFrontmatter(data: Record<string, unknown>): Frontmatter {
  return {
    title: String(data.title ?? "Untitled post"),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    author: String(data.author ?? "Editorial Team"),
    category: String(data.category ?? "Journal"),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    coverImage: String(data.coverImage ?? "/images/default-cover.svg"),
    coverImageAlt: String(data.coverImageAlt ?? "Editorial illustration"),
    ...(data.slug ? { slug: String(data.slug) } : {}),
  };
}

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(postsDirectory).filter((file) => file.endsWith(".md"));

  return files
    .map((fileName) => {
      const slugFromFile = fileName.replace(/\.md$/, "");
      const source = fs.readFileSync(path.join(postsDirectory, fileName), "utf8");
      const { data, content } = matter(source);
      const frontmatter = normalizeFrontmatter(data);

      return {
        ...frontmatter,
        slug: frontmatter.slug || slugFromFile,
        content,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getCategories(): string[] {
  return [...new Set(getAllPosts().map((post) => post.category))].sort();
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
  }).format(new Date(date));
}
