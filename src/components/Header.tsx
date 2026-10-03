import Link from "next/link";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link href="/" className="brand" aria-label="Northstar Journal home">
          <span className="brand-mark">N</span>
          <span>Northstar Journal</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link href="/">Home</Link>
          <Link href="/blog">Journal</Link>
          <a href="/#about">About</a>
          <ThemeToggle />
        </nav>
        <div className="mobile-nav"><MobileMenu /></div>
      </div>
    </header>
  );
}
