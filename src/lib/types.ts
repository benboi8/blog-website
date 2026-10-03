export type Frontmatter = {
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  coverImage: string;
  coverImageAlt: string;
  slug?: string;
};

export type Post = Frontmatter & {
  slug: string;
  content: string;
};
