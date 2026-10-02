# Northstar Journal

A production-minded editorial blog built with Next.js, React, TypeScript, and Markdown. Blog posts are the source of truth and live exclusively in `blogs/`.

## Requirements

- Node.js 20+
- npm 10+

## Install

```bash
npm install
```

## Development

```bash
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
npm run start
```

## Add a new article

Create a new `.md` file in `blogs/`. The filename becomes the URL slug unless you provide a `slug` field in frontmatter.

Example:

```md
---
title: "My First Blog Post"
description: "A short description of the article."
date: "2026-10-01"
author: "Author Name"
category: "Technology"
tags:
  - AI
  - Web Development
coverImage: "/images/my-first-post.svg"
coverImageAlt: "Useful description of the cover image"
---

# My First Blog Post

Blog content goes here...
```

No React or routing code needs to change. The server reads every Markdown file in `blogs/`, parses frontmatter, generates static route parameters, and renders the content.

## Images

Put article images in `public/images/` and reference them from Markdown/frontmatter using paths beginning with `/images/`. SVG sample covers are included so the project works without an external image service.

For production raster photography, prefer AVIF/WebP where practical and provide meaningful `coverImageAlt` text.

## Project structure

```text
.
├── blogs/                    # Markdown source of truth
├── public/images/            # Local article/cover assets
├── src/
│   ├── app/                  # App Router pages and dynamic article route
│   ├── components/           # Reusable UI
│   ├── lib/                  # Markdown discovery/parsing and types
│   └── styles/               # Global responsive design system
├── next.config.ts
├── package.json
└── README.md
```

## Frontmatter fields

| Field | Required | Purpose |
| --- | --- | --- |
| `title` | Yes | Article title and page title |
| `description` | Yes | Excerpt and SEO description |
| `date` | Yes | Publication date |
| `author` | Yes | Byline and metadata |
| `category` | Yes | Category/filter |
| `tags` | Yes | Tag list |
| `coverImage` | Yes | Cover asset path |
| `coverImageAlt` | Yes | Accessible image description |
| `slug` | No | Overrides the Markdown filename as the route |

## Notes

- Dark mode is persisted in `localStorage` and respects the system preference on first visit.
- Article metadata is generated from frontmatter through Next.js `generateMetadata`.
- The blog index includes client-side search and category filtering.
- `react-markdown` + `remark-gfm` support headings, links, images, lists, blockquotes, tables, and other common Markdown; `rehype-highlight` adds syntax highlighting.
- The app uses Next.js `Image` for cover images and responsive sizing.
