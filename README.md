# Northstar Journal — Caddy + PHP + Markdown

A server-rendered blog where **Markdown files are the source of truth**. No Node.js, npm, React, Vite, Composer, or build step is required.

## Requirements

- Caddy
- PHP 8.1+ with PHP-FPM


## Add a blog post

Create a file in `/blogs`, for example `/blogs/my-new-post.md`:

```md
---
title: "My New Post"
description: "A short description for cards and SEO."
date: "2026-10-03"
author: "Author Name"
category: "Technology"
tags:
  - AI
  - Web Development
coverImage: "/images/my-new-post.jpg"
---

# My New Post

Your article goes here.
```

## Supported Markdown

The included lightweight renderer supports headings, paragraphs, bold, italic, inline code, links, images, ordered/unordered lists, blockquotes, horizontal rules, and fenced code blocks.

## Images

Put local images in `/images` and reference them as `/images/file.jpg`. SVG covers are included for the sample posts.

## Structure

```text
blogs/          Markdown source files
images/         Images
css/            Styles
js/             Theme/mobile/search JS
config.php      Site settings
lib.php         Markdown/content/layout functions
index.php       Homepage
blog.php        Blog archive
post.php        Dynamic article page
Caddyfile       Caddy routing
```

## Security/content note

Markdown files are read server-side and are not exposed as a required public endpoint. The PHP renderer escapes normal text before emitting HTML. If you expand the Markdown syntax later, keep HTML sanitization in mind.
