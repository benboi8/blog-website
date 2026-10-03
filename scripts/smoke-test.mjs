import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const blogDir = path.join(root, "blogs");
const files = fs.readdirSync(blogDir).filter((file) => file.endsWith(".md"));
const required = ["title", "description", "date", "author", "category", "tags", "coverImage", "coverImageAlt"];
const errors = [];
const slugs = new Set();

for (const file of files) {
  const source = fs.readFileSync(path.join(blogDir, file), "utf8");
  const match = source.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) { errors.push(`${file}: missing frontmatter`); continue; }
  const fm = match[1];
  for (const key of required) if (!new RegExp(`^${key}:`, "m").test(fm)) errors.push(`${file}: missing ${key}`);
  const slug = (fm.match(/^slug:\s*["']?([^"'\n]+)["']?$/m)?.[1] ?? file.replace(/\.md$/, "")).trim();
  if (slugs.has(slug)) errors.push(`duplicate slug: ${slug}`);
  slugs.add(slug);
  const cover = fm.match(/^coverImage:\s*["']?([^"'\n]+)["']?$/m)?.[1]?.trim();
  if (cover?.startsWith("/")) {
    const asset = path.join(root, "public", cover);
    if (!fs.existsSync(asset)) errors.push(`${file}: missing cover asset ${cover}`);
  }
}

for (const requiredPath of ["src/app/page.tsx", "src/app/blog/page.tsx", "src/app/blog/[slug]/page.tsx", "src/components/ThemeToggle.tsx", "src/components/BlogFilters.tsx"]) {
  if (!fs.existsSync(path.join(root, requiredPath))) errors.push(`missing required source: ${requiredPath}`);
}

if (files.length < 3) errors.push(`expected at least 3 sample posts, found ${files.length}`);
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log(`Smoke test passed: ${files.length} Markdown posts, ${slugs.size} unique routes, all referenced cover assets present.`);
