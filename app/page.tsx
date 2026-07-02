import Link from "next/link";

const steps = [
  {
    icon: "cloud_upload",
    n: "1",
    title: "Customer uploads a photo",
    body: "A quick selfie — in the fitting room, or from home while browsing online.",
  },
  {
    icon: "checkroom",
    n: "2",
    title: "They pick an item",
    body: "Any product photo from your store or catalog. No special equipment needed.",
  },
  {
    icon: "auto_awesome",
    n: "3",
    title: "AI shows the fit instantly",
    body: "Photorealistic result in seconds — so they can decide with confidence.",
  },
];

const benefits = [
  {
    icon: "keyboard_return",
    title: "Fewer returns",
    body: "Customers see the fit before they buy, so fewer size and style surprises come back.",
  },
  {
    icon: "trending_up",
    title: "Higher conversion",
    body: "Shoppers who can visualize an outfit on themselves are more likely to complete the purchase.",
  },
  {
    icon: "storefront",
    title: "No changing room needed",
    body: "Cut fitting room wait times in-store, or offer try-on straight from your online catalog.",
  },
];

export default function Home() {
  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="px-5 md:px-16 py-20 md:py-28">
        <div className="w-full max-w-3xl mx-auto text-center">
          <span
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase px-3 py-1.5 rounded-full mb-6"
            style={{
              border: "1px solid var(--outline-variant)",
              color: "var(--primary)",
            }}
          >
            AI Try-On for Fashion Retailers
          </span>

          <h1
            className="font-bold leading-[1.1] tracking-tight text-4xl sm:text-5xl"
            style={{ color: "var(--on-surface)" }}
          >
            Let Customers Try It On — Before They Buy
          </h1>

          <p className="mt-5 text-lg max-w-lg mx-auto" style={{ color: "var(--on-surface-variant)" }}>
            Drapify adds AI-powered virtual try-on to your store. Customers upload a photo, see
            themselves in your clothes instantly, and buy with confidence.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/try-on" className="btn-primary font-bold">
              See It In Action
            </Link>
            <Link href="/waitlist" className="btn-ghost font-semibold">
              Get Drapify for Your Store
            </Link>
          </div>

          <p className="mt-5 text-sm" style={{ color: "var(--on-surface-variant)", opacity: 0.7 }}>
            Try it yourself below — this is exactly what your customers would see
          </p>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────── */}
      <section
        id="how"
        className="py-20 px-5 md:px-16"
        style={{ backgroundColor: "var(--surface-container-lowest)", borderTop: "1px solid var(--outline-variant)" }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold tracking-tight" style={{ color: "var(--on-surface)" }}>
              How It Works for Your Customers
            </h2>
            <p className="mt-3 max-w-md mx-auto text-base" style={{ color: "var(--on-surface-variant)" }}>
              Three steps. No app to install, no technical setup on your end.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {steps.map((s) => (
              <div key={s.n}>
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: "var(--surface-container-high)", border: "1px solid var(--outline-variant)" }}
                >
                  <span className="material-symbols-outlined text-3xl" style={{ color: "var(--primary)" }}>
                    {s.icon}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: "var(--on-surface)" }}>
                  {s.n}. {s.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--on-surface-variant)" }}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why store owners choose Drapify ─────────────────── */}
      <section className="py-20 px-5 md:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold tracking-tight" style={{ color: "var(--on-surface)" }}>
              Why Store Owners Use Drapify
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {benefits.map((b) => (
              <div key={b.title}>
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: "var(--surface-container-high)", border: "1px solid var(--outline-variant)" }}
                >
                  <span className="material-symbols-outlined text-3xl" style={{ color: "var(--secondary)" }}>
                    {b.icon}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: "var(--on-surface)" }}>
                  {b.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--on-surface-variant)" }}>
                  {b.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section
        className="py-24 px-5 md:px-16"
        style={{ backgroundColor: "var(--surface-container-lowest)", borderTop: "1px solid var(--outline-variant)" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "var(--on-surface)" }}>
            Bring AI Try-On to Your Store
          </h2>
          <p className="mt-4 text-base md:text-lg max-w-xl mx-auto" style={{ color: "var(--on-surface-variant)" }}>
            We&apos;re onboarding a limited number of shops. Join the waitlist and we&apos;ll set you up.
          </p>
          <Link href="/waitlist" className="btn-primary inline-block mt-8 text-base font-bold px-10 py-4">
            Join the Waitlist
          </Link>
        </div>
      </section>
    </div>
  );
}
