"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header
      className="fixed top-0 w-full z-50 flex justify-between items-center px-5 md:px-16 h-16"
      style={{
        backgroundColor: "rgba(19,19,19,0.8)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="flex items-center gap-8">
        <Link href="/" className="text-xl font-bold tracking-tight" style={{ color: "var(--primary)" }}>
          Drapify
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {[
            { label: "Try it Free", href: "/try-on" },
            { label: "How it Works", href: "#how" },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="transition-colors"
              style={{
                color: pathname === href ? "var(--primary)" : "var(--on-surface-variant)",
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--primary)")}
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color =
                  pathname === href ? "var(--primary)" : "var(--on-surface-variant)")
              }
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      <Link href="/waitlist" className="btn-primary text-sm font-bold">
        For Shops
      </Link>
    </header>
  );
}
