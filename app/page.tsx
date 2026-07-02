import Link from "next/link";

const steps = [
  {
    icon: "cloud_upload",
    n: "1",
    title: "Upload",
    body: "Upload a clear photo of yourself. Full-body, front-facing works best.",
  },
  {
    icon: "checkroom",
    n: "2",
    title: "Select",
    body: "Drop in any garment photo — a product shot, screenshot, or link.",
  },
  {
    icon: "auto_awesome",
    n: "3",
    title: "Result",
    body: "Our AI drapes the outfit onto you in seconds. Photorealistic. Instant.",
  },
];

const gallery = [
  {
    src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
    label: "NEO-STREET",
    title: "Obsidian Technical Parka",
    span: "lg:col-span-8 h-[580px]",
    featured: true,
  },
  {
    src: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80",
    label: "EVENING WEAR",
    title: "Prism Silk Gown",
    span: "lg:col-span-4 h-[580px]",
  },
  {
    src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
    label: "ESSENTIALS",
    title: "Clean Tailored Knit",
    span: "lg:col-span-4 h-[380px]",
  },
  {
    src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80",
    label: "OUTERWEAR",
    title: "Tailored Tech Blazer",
    span: "lg:col-span-4 h-[380px]",
  },
  {
    src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80",
    label: "RESORT",
    title: "Fluid Silk Drape",
    span: "lg:col-span-4 h-[380px]",
  },
];

export default function Home() {
  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative min-h-[calc(100vh-64px)] flex items-center px-5 md:px-16 overflow-hidden hero-gradient">
        {/* ambient blobs */}
        <div
          className="pointer-events-none absolute -top-32 right-0 w-[520px] h-[520px] rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #7c3aed, transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute bottom-0 left-1/4 w-72 h-72 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #00a2e6, transparent 70%)" }}
        />

        <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-8 pb-16">
          {/* left copy */}
          <div className="lg:col-span-6 rise">
            <span
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase px-3 py-1.5 rounded-full mb-6"
              style={{
                backgroundColor: "rgba(210,187,255,0.1)",
                border: "1px solid rgba(210,187,255,0.2)",
                color: "var(--primary)",
              }}
            >
              Virtual Try-On Evolved
            </span>

            <h1
              className="font-bold leading-[1.05] tracking-tight text-balance text-5xl sm:text-6xl lg:text-[56px]"
              style={{ color: "var(--on-surface)" }}
            >
              Fashion,
              <br />
              Fitted by AI
            </h1>

            <p className="mt-5 text-lg max-w-md text-balance" style={{ color: "var(--on-surface-variant)" }}>
              Upload your photo, drop in any outfit, and see exactly how it looks on your body — in
              seconds. No fitting room. No guessing.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/try-on" className="btn-primary font-bold">
                Start Your Try-On
              </Link>
              <Link href="#gallery" className="btn-ghost">
                View Collection
              </Link>
            </div>

            <p className="mt-5 text-sm" style={{ color: "var(--on-surface-variant)", opacity: 0.6 }}>
              No sign-up · No app · First try-on is free
            </p>
          </div>

          {/* right: hero image with scan + floating stats */}
          <div className="lg:col-span-6 relative rise" style={{ animationDelay: "0.1s" }}>
            <div
              className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden scan-line"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900&q=80&auto=format&fit=crop"
                alt="Fashion model wearing a premium outfit"
                className="w-full h-full object-cover"
              />
            </div>

            {/* floating stat — bottom left */}
            <div
              className="glass-card absolute -bottom-4 -left-4 p-4 rounded-2xl hidden lg:block"
              style={{ minWidth: 160 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-sm" style={{ color: "var(--primary)" }}>
                  shutter_speed
                </span>
                <span className="text-[11px] font-semibold tracking-widest uppercase" style={{ color: "var(--on-surface-variant)" }}>
                  Latency
                </span>
              </div>
              <p className="text-2xl font-bold" style={{ color: "var(--on-surface)" }}>1.2s</p>
            </div>

            {/* floating stat — top right */}
            <div
              className="glass-card absolute -top-4 -right-4 p-4 rounded-2xl hidden lg:block"
              style={{ minWidth: 180 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-sm" style={{ color: "var(--secondary)" }}>
                  check_circle
                </span>
                <span className="text-[11px] font-semibold tracking-widest uppercase" style={{ color: "var(--on-surface-variant)" }}>
                  Fit Accuracy
                </span>
              </div>
              <p className="text-2xl font-bold" style={{ color: "var(--on-surface)" }}>99.8%</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────── */}
      <section
        id="how"
        className="py-20 md:py-28 px-5 md:px-16"
        style={{ backgroundColor: "var(--surface-container-lowest)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "var(--on-surface)" }}>
              The Drapify Process
            </h2>
            <p className="mt-3 max-w-md mx-auto text-base" style={{ color: "var(--on-surface-variant)" }}>
              Three steps to a perfect digital fit. No technical knowledge required.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {steps.map((s) => (
              <div key={s.n} className="group">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-7 transition-colors group-hover:bg-[#7c3aed]"
                  style={{ backgroundColor: "var(--surface-container-high)", border: "1px solid rgba(255,255,255,0.05)" }}
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

      {/* ── Gallery (bento) ──────────────────────────────── */}
      <section id="gallery" className="py-20 md:py-28 px-5 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "var(--on-surface)" }}>
                Featured Collection
              </h2>
              <p className="mt-2 text-sm" style={{ color: "var(--on-surface-variant)" }}>
                Winter ʼ24 — try any piece on yourself instantly.
              </p>
            </div>
            <Link
              href="/try-on"
              className="flex items-center gap-1 text-sm font-semibold hover:underline"
              style={{ color: "var(--primary)" }}
            >
              Try it on yourself
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {gallery.map((item) => (
              <div
                key={item.title}
                className={`group relative rounded-3xl overflow-hidden ${item.span}`}
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 w-full flex justify-between items-end">
                  <div>
                    <span
                      className="block text-[11px] font-bold tracking-widest uppercase mb-1"
                      style={{ color: "var(--secondary)" }}
                    >
                      {item.label}
                    </span>
                    <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                  </div>
                  {item.featured && (
                    <Link
                      href="/try-on"
                      className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-bold transition-all hover:scale-105"
                      style={{ backgroundColor: "var(--primary-container)", color: "var(--on-primary-container)" }}
                    >
                      <span className="material-symbols-outlined text-base">auto_fix_high</span>
                      Try On
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="pb-24 px-5 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div
            className="relative overflow-hidden rounded-[32px] p-10 md:p-20 text-center glass-card"
            style={{ backgroundColor: "var(--surface-container)" }}
          >
            {/* glow blobs */}
            <div
              className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full blur-[90px]"
              style={{ background: "rgba(124,58,237,0.2)" }}
            />
            <div
              className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 rounded-full blur-[90px]"
              style={{ background: "rgba(0,162,230,0.12)" }}
            />
            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-balance" style={{ color: "var(--on-surface)" }}>
                Ready to define your style?
              </h2>
              <p className="mt-5 text-base md:text-lg max-w-xl mx-auto" style={{ color: "var(--on-surface-variant)" }}>
                Join shoppers across India using Drapify to buy clothes with total confidence.
                No more size regrets. No more return hassles.
              </p>
              <Link href="/try-on" className="btn-primary inline-block mt-10 text-base font-bold px-10 py-4 hover-glow">
                Get Started for Free
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
