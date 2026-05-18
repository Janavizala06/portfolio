"use client";

export default function CinematicBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Base ambient gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(8,8,20,1) 0%, transparent 70%)",
            "radial-gradient(ellipse 50% 40% at 20% 80%, rgba(10,5,25,0.6) 0%, transparent 60%)",
            "radial-gradient(ellipse 50% 40% at 80% 20%, rgba(5,10,30,0.5) 0%, transparent 60%)",
          ].join(","),
        }}
      />

      {/* Glow orb 1 — Electric Blue */}
      <div className="absolute w-[600px] h-[600px] rounded-full blur-[80px] animate-glow-1"
        style={{
          background: "radial-gradient(circle, rgba(59,108,245,0.22) 0%, rgba(59,108,245,0.06) 40%, transparent 70%)",
          top: "20%", left: "25%",
        }}
      />

      {/* Glow orb 2 — Deep Violet */}
      <div className="absolute w-[500px] h-[500px] rounded-full blur-[90px] animate-glow-2"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.20) 0%, rgba(124,58,237,0.05) 40%, transparent 70%)",
          bottom: "15%", right: "20%",
        }}
      />

      {/* Glow orb 3 — White Bloom */}
      <div className="absolute w-[400px] h-[400px] rounded-full blur-[60px] animate-glow-3"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(200,210,255,0.02) 40%, transparent 65%)",
          top: "40%", left: "45%",
        }}
      />

      {/* Glow orb 4 — secondary blue edge fill */}
      <div className="absolute w-[700px] h-[500px] rounded-full blur-[100px] animate-glow-4"
        style={{
          background: "radial-gradient(ellipse, rgba(40,80,200,0.10) 0%, transparent 60%)",
          top: "-10%", right: "-5%",
        }}
      />

      {/* Glow orb 5 — violet edge bottom-left */}
      <div className="absolute w-[550px] h-[450px] rounded-full blur-[110px] animate-glow-5"
        style={{
          background: "radial-gradient(ellipse, rgba(100,40,220,0.08) 0%, transparent 55%)",
          bottom: "-5%", left: "-8%",
        }}
      />

      {/* Mesh gradient overlay */}
      <div className="absolute -inset-[40%] blur-[40px] animate-mesh pointer-events-none z-[1]"
        style={{
          background: [
            "radial-gradient(ellipse 60% 50% at 30% 20%, rgba(59,108,245,0.08) 0%, transparent 60%)",
            "radial-gradient(ellipse 50% 40% at 70% 70%, rgba(124,58,237,0.06) 0%, transparent 60%)",
            "radial-gradient(ellipse 40% 35% at 50% 50%, rgba(255,255,255,0.02) 0%, transparent 60%)",
          ].join(","),
        }}
      />

      {/* Noise texture */}
      <div className="noise-overlay" />
    </div>
  );
}
