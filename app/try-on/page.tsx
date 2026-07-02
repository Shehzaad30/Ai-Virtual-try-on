"use client";

import { useState, useCallback } from "react";

type Slot = { preview: string | null; base64: string | null };
const empty: Slot = { preview: null, base64: null };

function readFile(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result as string);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}

function UploadZone({
  label,
  hint,
  icon,
  slot,
  onSelect,
}: {
  label: string;
  hint: string;
  icon: string;
  slot: Slot;
  onSelect: (f: File) => void;
}) {
  const [dragging, setDragging] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const f = e.dataTransfer.files[0];
      if (f && f.type.startsWith("image/")) onSelect(f);
    },
    [onSelect]
  );

  return (
    <div>
      <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "var(--on-surface-variant)" }}>
        {label}
      </p>
      <label
        className="relative flex flex-col items-center justify-center w-full aspect-[4/3] rounded-2xl cursor-pointer overflow-hidden transition-all duration-200"
        style={{
          border: `2px dashed ${dragging || slot.preview ? "var(--primary-container)" : "var(--outline-variant)"}`,
          backgroundColor: dragging ? "rgba(124,58,237,0.06)" : "var(--surface-container)",
        }}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        {slot.preview ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={slot.preview} alt={label} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-sm font-semibold text-white">Change photo</span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 px-4 text-center">
            <span className="material-symbols-outlined text-4xl" style={{ color: "var(--outline)" }}>
              {icon}
            </span>
            <span className="text-sm font-medium" style={{ color: "var(--on-surface)" }}>
              Drag & drop or click
            </span>
            <span className="text-xs" style={{ color: "var(--on-surface-variant)" }}>
              {hint}
            </span>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) onSelect(f); }}
        />
      </label>
    </div>
  );
}

type View = "after" | "before";

export default function TryOnPage() {
  const [person, setPerson] = useState<Slot>(empty);
  const [garment, setGarment] = useState<Slot>(empty);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<View>("after");

  const handleSelect = useCallback(async (setter: (s: Slot) => void, file: File) => {
    const b64 = await readFile(file);
    setter({ preview: b64, base64: b64 });
    setResult(null);
    setError(null);
  }, []);

  const generate = useCallback(async () => {
    if (!person.base64 || !garment.base64) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/try-on", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ personImage: person.base64, garmentImage: garment.base64 }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed.");
      setResult(data.resultUrl);
      setView("after");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [person, garment]);

  const canGenerate = !!person.base64 && !!garment.base64 && !loading;
  const canvasImg = view === "before" ? person.preview : result;

  return (
    <div
      className="flex overflow-hidden"
      style={{ height: "calc(100vh - 64px)", backgroundColor: "var(--background)" }}
    >
      {/* ── Left panel ── */}
      <aside
        className="w-[320px] shrink-0 flex flex-col overflow-y-auto"
        style={{ borderRight: "1px solid rgba(255,255,255,0.07)", backgroundColor: "var(--surface-container-lowest)" }}
      >
        <div className="p-6 space-y-5">
          <div>
            <h2 className="text-base font-semibold mb-1" style={{ color: "var(--on-surface)" }}>
              AI Try-On Workspace
            </h2>
            <p className="text-xs" style={{ color: "var(--on-surface-variant)" }}>
              Upload both photos, then generate.
            </p>
          </div>

          <UploadZone
            label="Your Photo"
            hint="Full-body, front-facing works best"
            icon="person"
            slot={person}
            onSelect={(f) => handleSelect(setPerson, f)}
          />

          <UploadZone
            label="The Outfit"
            hint="Any product photo or screenshot"
            icon="checkroom"
            slot={garment}
            onSelect={(f) => handleSelect(setGarment, f)}
          />
        </div>

        <div className="p-6 mt-auto space-y-3">
          <button
            onClick={generate}
            disabled={!canGenerate}
            className="w-full py-4 rounded-full font-bold text-sm transition-all duration-200 disabled:opacity-35 disabled:cursor-not-allowed active:scale-95"
            style={{
              backgroundColor: "var(--primary-container)",
              color: "var(--on-primary-container)",
            }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span
                  className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin"
                  style={{ borderColor: "var(--on-primary-container)", borderTopColor: "transparent" }}
                />
                Generating…
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-base">auto_awesome</span>
                Generate Try-On
              </span>
            )}
          </button>

          {error && (
            <p className="text-xs text-center leading-relaxed" style={{ color: "#ffb4ab" }}>
              {error}
            </p>
          )}

          {!person.base64 && !garment.base64 && (
            <p className="text-xs text-center" style={{ color: "var(--on-surface-variant)", opacity: 0.5 }}>
              Upload both photos to get started
            </p>
          )}
        </div>
      </aside>

      {/* ── Canvas ── */}
      <section
        className="flex-1 flex flex-col items-center justify-center p-8"
        style={{ backgroundColor: "var(--surface-container-low)" }}
      >
        <div className="relative w-full max-w-[440px]">
          {/* Canvas frame */}
          <div
            className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden"
            style={{
              backgroundColor: "var(--surface-container)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {/* Content */}
            {!loading && !result && !person.preview && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-8 text-center">
                <span className="material-symbols-outlined text-5xl" style={{ color: "var(--outline-variant)" }}>
                  auto_awesome
                </span>
                <p className="text-sm" style={{ color: "var(--on-surface-variant)" }}>
                  Your try-on result will appear here
                </p>
              </div>
            )}

            {!loading && !result && person.preview && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={person.preview} alt="Your photo" className="absolute inset-0 w-full h-full object-cover opacity-40" />
            )}

            {loading && (
              <>
                {person.preview && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={person.preview} alt="Your photo" className="absolute inset-0 w-full h-full object-cover opacity-30" />
                )}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin"
                    style={{ borderColor: "var(--primary)", borderTopColor: "transparent" }}
                  />
                  <p className="text-sm px-6 text-center" style={{ color: "var(--primary)" }}>
                    Dressing you up… this may take a minute.
                  </p>
                </div>
              </>
            )}

            {!loading && result && canvasImg && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={canvasImg} alt={view === "before" ? "Your photo" : "Try-on result"} className="absolute inset-0 w-full h-full object-cover" />
            )}

            {/* AI badge */}
            {(loading || result) && (
              <div className="absolute top-5 left-5">
                <span
                  className="text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: "rgba(124,58,237,0.25)",
                    border: "1px solid rgba(210,187,255,0.3)",
                    color: "var(--primary)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {loading ? "AI Processing" : "AI Result"}
                </span>
              </div>
            )}
          </div>

          {/* Before / After toggle */}
          {result && person.preview && (
            <div
              className="absolute bottom-7 left-1/2 -translate-x-1/2 flex p-1 rounded-full"
              style={{ backgroundColor: "rgba(19,19,19,0.6)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              {(["before", "after"] as View[]).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all"
                  style={
                    view === v
                      ? { backgroundColor: "var(--primary-container)", color: "var(--on-primary-container)" }
                      : { color: "var(--on-surface-variant)" }
                  }
                >
                  {v}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Open full size link */}
        {result && (
          <a
            href={result}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex items-center gap-1 text-sm font-medium hover:underline"
            style={{ color: "var(--primary)" }}
          >
            Open full size
            <span className="material-symbols-outlined text-base">open_in_new</span>
          </a>
        )}
      </section>
    </div>
  );
}
