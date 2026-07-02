import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="w-full px-5 md:px-16 py-12 flex flex-col md:flex-row justify-between items-center gap-6"
      style={{
        backgroundColor: "var(--surface-container-lowest)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div>
        <p className="font-bold text-lg" style={{ color: "var(--primary)" }}>
          Drapify AI
        </p>
        <p className="text-sm mt-1" style={{ color: "var(--on-surface-variant)" }}>
          Wear it before you buy it.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 text-sm" style={{ color: "var(--on-surface-variant)" }}>
        {[
          { label: "Try it Free", href: "/try-on" },
          { label: "For Shops", href: "/waitlist" },
          { label: "Privacy Policy", href: "#" },
          { label: "Contact", href: "#" },
        ].map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className="hover:opacity-100 opacity-70 transition-opacity"
          >
            {label}
          </Link>
        ))}
      </div>

      <p className="text-sm" style={{ color: "var(--on-surface-variant)", opacity: 0.6 }}>
        © 2024 Drapify AI. All rights reserved.
      </p>
    </footer>
  );
}
