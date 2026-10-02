export function TagList({ tags }: { tags: string[] }) {
  return <div className="tag-list" aria-label="Tags">{tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>;
}
