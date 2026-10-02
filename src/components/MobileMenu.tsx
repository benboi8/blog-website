"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mobile-menu-wrap">
      <button className="menu-button" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-navigation">
        <span>{open ? "Close" : "Menu"}</span>
        <span aria-hidden="true">{open ? "×" : "☰"}</span>
      </button>
      {open && (
        <div className="mobile-panel" id="mobile-navigation">
          <nav aria-label="Mobile navigation">
            <Link href="/" onClick={() => setOpen(false)}>Home</Link>
            <Link href="/blog" onClick={() => setOpen(false)}>Journal</Link>
            <a href="#about" onClick={() => setOpen(false)}>About</a>
          </nav>
          <ThemeToggle />
        </div>
      )}
    </div>
  );
}
