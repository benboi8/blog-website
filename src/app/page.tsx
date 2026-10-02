import Link from "next/link";
import { BlogCard } from "@/components/BlogCard";
import { getAllPosts, getCategories } from "@/lib/posts";

export default function HomePage() {
  const posts = getAllPosts();
  const [featured, ...latest] = posts;
  const categories = getCategories();

  return <main>
    <section className="hero"><div className="shell hero-grid"><div><div className="kicker">Independent digital journal · 2026</div><h1>Ideas worth <em>keeping.</em></h1><p className="hero-copy">Northstar is a small, independent journal about technology, design, and the practical craft of building things for the web.</p></div><div className="hero-aside"><strong>Signal over noise.</strong><span>Long-form essays, field notes, and useful patterns for people who make, ship, and think.</span></div></div></section>
    <section className="section"><div className="shell"><div className="section-head"><div><div className="kicker">The latest</div><h2>Fresh from the journal</h2></div><Link className="text-link" href="/blog">View all articles →</Link></div>{featured && <div className="feature-grid"><BlogCard post={featured} featured />{latest[0] && <BlogCard post={latest[0]} />}</div>}</div></section>
    <section className="section"><div className="shell"><div className="section-head"><div><div className="kicker">Browse by subject</div><h2>Find your thread</h2></div></div><div className="categories">{categories.map((category) => <Link href={`/blog?category=${encodeURIComponent(category)}`} className="category-chip" key={category}>{category}</Link>)}</div></div></section>
    <section className="section about" id="about"><div className="shell about-grid"><div><div className="kicker">About the journal</div><h2>Make room for better questions.</h2></div><div className="about-copy"><p>Northstar is a publication for curious builders. We write about the choices behind interfaces, products, teams, and technologies—not just the tools themselves.</p><p>Every article is written to stand on its own: practical enough to use, considered enough to return to.</p></div></div></section>
  </main>;
}
