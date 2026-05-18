"use client";

/**
 * AuroraBackground — ambient light blobs with distinct layout presets.
 *
 * Layouts:
 *  "tl-br"  → Blob 1 top-left, Blob 2 bottom-right (classic)
 *  "tr-bl"  → Blob 1 top-right, Blob 2 bottom-left (mirrored)
 *  "center" → Both blobs near center, slightly offset (dense energy)
 *  "radial" → Single large centered bloom (majestic / calm)
 */

interface AuroraProps {
  colors: [string, string, string?];
  layout?: "tl-br" | "tr-bl" | "center" | "radial";
  className?: string;
}

const LAYOUTS = {
  "tl-br": {
    b1: { top: "-20%", left: "-10%",  bottom: "auto", right: "auto" },
    b2: { bottom: "-20%", right: "-10%", top: "auto",  left: "auto"  },
    b3: { top: "28%",  left: "30%",   bottom: "auto", right: "auto" },
  },
  "tr-bl": {
    b1: { top: "-20%", right: "-10%", bottom: "auto", left: "auto"  },
    b2: { bottom: "-20%", left: "-10%",  top: "auto",  right: "auto" },
    b3: { top: "28%",  right: "28%",  bottom: "auto", left: "auto"  },
  },
  "center": {
    b1: { top: "10%",  left: "5%",   bottom: "auto", right: "auto" },
    b2: { bottom: "10%", right: "5%",  top: "auto",  left: "auto"  },
    b3: { top: "20%",  left: "20%",  bottom: "auto", right: "auto" },
  },
  "radial": {
    b1: { top: "5%",   left: "15%",  bottom: "auto", right: "auto" },
    b2: { bottom: "5%",  right: "15%", top: "auto",  left: "auto"  },
    b3: { top: "18%",  left: "22%",  bottom: "auto", right: "auto" },
  },
} as const;

export default function AuroraBackground({
  colors,
  layout = "tl-br",
  className = "",
}: AuroraProps) {
  const pos = LAYOUTS[layout];

  return (
    <div
      className={`absolute inset-0 overflow-visible pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* Blob 1 */}
      <div
        className="absolute rounded-full animate-aurora-1 will-change-transform"
        style={{
          width:  "clamp(500px, 58vw, 880px)",
          height: "clamp(460px, 52vw, 780px)",
          filter: "blur(160px)",
          background: `radial-gradient(ellipse at center, ${colors[0]} 0%, transparent 68%)`,
          ...pos.b1,
        }}
      />

      {/* Blob 2 */}
      <div
        className="absolute rounded-full animate-aurora-2 will-change-transform"
        style={{
          width:  "clamp(460px, 52vw, 820px)",
          height: "clamp(420px, 48vw, 720px)",
          filter: "blur(180px)",
          background: `radial-gradient(ellipse at center, ${colors[1]} 0%, transparent 68%)`,
          ...pos.b2,
        }}
      />

      {/* Blob 3 — accent */}
      {colors[2] && (
        <div
          className="absolute rounded-full animate-aurora-3 will-change-transform"
          style={{
            width:  "clamp(340px, 38vw, 600px)",
            height: "clamp(300px, 34vw, 520px)",
            filter: "blur(200px)",
            background: `radial-gradient(ellipse at center, ${colors[2]} 0%, transparent 62%)`,
            ...pos.b3,
          }}
        />
      )}
    </div>
  );
}
