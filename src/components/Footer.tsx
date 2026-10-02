import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <Link href="/" className="brand footer-brand"><span className="brand-mark">N</span><span>Northstar Journal</span></Link>
          <p className="footer-copy">Thoughtful notes on technology, craft, and the systems shaping modern work.</p>
        </div>
        <div className="footer-links">
          <Link href="/blog">All articles</Link>
          <a href="/#about">About</a>
          <a href="mailto:hello@northstar.example">Contact</a>
        </div>
      </div>
      <div className="shell footer-bottom"><span>© 2026 Northstar Journal</span><span>Built for the open web.</span></div>
    </footer>
  );
}
