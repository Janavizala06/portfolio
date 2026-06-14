"use client";

/* ── Static contrib pattern ── */
const CONTRIB = [
  [1,0,1,1,0],[0,1,1,0,1],[1,1,0,1,1],[0,0,1,0,1],[1,0,1,0,0],
  [1,1,0,0,1],[0,1,0,1,0],[1,0,1,1,1],[0,1,1,0,0],[1,1,0,1,0],
  [0,0,1,1,0],[1,1,0,0,1],[0,1,1,0,1],[1,0,0,1,1],[0,1,0,0,1],
  [1,0,1,0,0],[0,1,0,1,1],[1,1,1,0,0],[0,0,0,1,1],[1,1,0,1,0],
];

/* ── Page Content Components ── */
function LibTrackContent() {
  return (
    <div className="bg-[#080c14] h-full text-white p-3">
      <div className="flex items-center gap-2 mb-2.5 pb-2 border-b border-white/[0.06]">
        <div className="w-5 h-5 rounded-md bg-violet-600/40 flex items-center justify-center text-[9px]">📚</div>
        <span className="text-[10px] font-semibold text-white/70">Library Dashboard</span>
        <span className="ml-auto text-[8px] bg-violet-500/20 text-violet-300 px-1.5 py-0.5 rounded-full">Live</span>
      </div>
      <div className="grid grid-cols-3 gap-1.5 mb-2">
        {[["142","Books"],["38","Users"],["96%","Uptime"]].map(([v,l])=>(
          <div key={l} className="bg-white/[0.04] rounded-lg p-1.5 text-center">
            <div className="text-[13px] font-bold text-violet-300">{v}</div>
            <div className="text-[7px] text-white/30">{l}</div>
          </div>
        ))}
      </div>
      <div className="space-y-1">
        {[["Clean Code","Robert Martin"],["Deep Work","Cal Newport"]].map(([t,a])=>(
          <div key={t} className="flex items-center gap-1.5 bg-white/[0.03] rounded p-1">
            <div className="w-4 h-5 bg-violet-500/20 rounded-sm flex-shrink-0"/>
            <div><div className="text-[8px] text-white/60">{t}</div><div className="text-[7px] text-white/30">{a}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GitHubContent() {
  return (
    <div className="bg-[#0d1117] h-full p-3">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-[9px] font-bold text-white">JZ</div>
        <div><div className="text-[9px] text-white/80 font-semibold">Janavizala06</div><div className="text-[7px] text-white/30">Full Stack Developer</div></div>
      </div>
      <div className="grid gap-[2px]" style={{gridTemplateColumns:"repeat(20,1fr)"}}>
        {CONTRIB.flat().map((v,i)=>(
          <div key={i} className={`aspect-square rounded-[1px] ${v?"bg-emerald-500/70":"bg-white/[0.06]"}`}/>
        ))}
      </div>
      <div className="flex gap-2 mt-2">
        {[["Repos","12"],["Stars","48"],["PRs","23"]].map(([l,v])=>(
          <div key={l} className="text-center"><div className="text-[10px] text-white/70 font-semibold">{v}</div><div className="text-[7px] text-white/30">{l}</div></div>
        ))}
      </div>
    </div>
  );
}

function LinkedInContent() {
  return (
    <div className="bg-[#0a0e1a] h-full">
      <div className="h-12 bg-gradient-to-r from-blue-900/60 to-indigo-900/40"/>
      <div className="px-3 pb-3 -mt-4">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-[9px] font-bold text-white border-2 border-[#0a0e1a] mb-1">JZ</div>
        <div className="text-[9px] font-semibold text-white/80">Janavi Zala</div>
        <div className="text-[7px] text-white/40 mb-2">Full Stack Developer & AI Engineer · 500+ connections</div>
        <div className="flex gap-1 mb-2">
          <span className="text-[7px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded-full">Connect</span>
          <span className="text-[7px] bg-white/[0.06] text-white/40 px-1.5 py-0.5 rounded-full">Message</span>
        </div>
        <div className="space-y-1">
          {[["AI Technology Intern","EY · 2024"],["Full Stack Trainee","Webstack Academy"]].map(([r,c])=>(
            <div key={r} className="flex gap-1 items-start">
              <div className="w-3 h-3 rounded bg-blue-500/20 flex-shrink-0 mt-0.5"/>
              <div><div className="text-[7.5px] text-white/60">{r}</div><div className="text-[6.5px] text-white/30">{c}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CodeTalkContent() {
  return (
    <div className="bg-[#0a0f1a] h-full p-3">
      <div className="flex items-center gap-2 mb-2.5 pb-2 border-b border-white/[0.05]">
        <div className="w-5 h-5 rounded-md bg-emerald-600/30 flex items-center justify-center text-[9px]">⌘</div>
        <span className="text-[10px] font-semibold text-white/70">CodeTalk</span>
        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>
      </div>
      <div className="space-y-1.5">
        {[
          {u:"Arjun","m":"How do you handle auth in Next.js?",t:"2m",c:true},
          {u:"Priya","m":"JWT + middleware works great!",t:"1m",c:false},
          {u:"You","m":"I use NextAuth with Prisma adapter",t:"now",c:true},
        ].map((msg)=>(
          <div key={msg.m} className={`flex gap-1.5 ${msg.u==="You"?"flex-row-reverse":""}`}>
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex-shrink-0 flex items-center justify-center text-[6px] font-bold text-white">{msg.u[0]}</div>
            <div className={`max-w-[70%] px-2 py-1 rounded-lg text-[7.5px] ${msg.c?"bg-emerald-600/20 text-emerald-100":"bg-white/[0.05] text-white/60"}`}>{msg.m}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResumeContent() {
  return (
    <div className="bg-[#f8f9fa] h-full p-3">
      <div className="border-b border-gray-200 pb-2 mb-2">
        <div className="text-[11px] font-bold text-gray-800">JANAVI ZALA</div>
        <div className="text-[7.5px] text-gray-500">Full Stack Developer & AI Engineer</div>
      </div>
      <div className="space-y-1.5">
        <div><div className="text-[7px] font-semibold text-gray-700 uppercase tracking-wide mb-0.5">EXPERIENCE</div>
          {[["AI Technology Intern","EY · 2024"],["Full Stack Trainee","Webstack · 2023"]].map(([r,c])=>(
            <div key={r} className="flex justify-between"><span className="text-[7px] text-gray-600">{r}</span><span className="text-[6.5px] text-gray-400">{c}</span></div>
          ))}
        </div>
        <div><div className="text-[7px] font-semibold text-gray-700 uppercase tracking-wide mb-0.5">SKILLS</div>
          <div className="flex flex-wrap gap-0.5">
            {["React","Node","Python","MongoDB","Firebase"].map(s=>(
              <span key={s} className="text-[6.5px] bg-gray-200 text-gray-600 px-1 py-0.5 rounded">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function GmailContent() {
  return (
    <div className="bg-[#0c0c18] h-full p-3">
      <div className="flex items-center gap-2 mb-2.5 pb-2 border-b border-white/[0.06]">
        <div className="text-[10px] font-bold"><span className="text-blue-400">G</span><span className="text-red-400">m</span><span className="text-yellow-400">a</span><span className="text-blue-400">i</span><span className="text-green-400">l</span></div>
        <span className="ml-auto text-[7px] bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded-full">3 new</span>
      </div>
      <div className="space-y-1">
        {[
          {f:"GitHub","s":"Your PR was merged!",t:"10m",r:false},
          {f:"LinkedIn","s":"You have a new connection",t:"1h",r:false},
          {f:"Vercel","s":"Deployment successful ✓",t:"2h",r:true},
        ].map((m)=>(
          <div key={m.s} className={`flex items-start gap-1.5 p-1 rounded ${!m.r?"bg-white/[0.04]":""}`}>
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-red-500/40 to-orange-500/40 flex-shrink-0 mt-0.5"/>
            <div className="min-w-0 flex-1">
              <div className="flex justify-between"><span className={`text-[8px] ${!m.r?"text-white/80 font-semibold":"text-white/40"}`}>{m.f}</span><span className="text-[6.5px] text-white/25">{m.t}</span></div>
              <div className={`text-[7px] truncate ${!m.r?"text-white/50":"text-white/25"}`}>{m.s}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Browser Card Shell ── */
function Card({ url, href, onClick, children }: {
  url: string; href: string; onClick?: () => void; children: React.ReactNode;
}) {
  const isResume   = href === "resume";
  const isExternal = href.startsWith("http") || href.startsWith("mailto");
  const shell = (
    <>
      <div className="bg-[#181824] px-3 py-[7px] flex items-center gap-2 border-b border-white/[0.07]">
        <div className="flex gap-1.5 flex-shrink-0">
          <span className="w-[9px] h-[9px] rounded-full bg-[#ff5f57] block"/>
          <span className="w-[9px] h-[9px] rounded-full bg-[#febc2e] block"/>
          <span className="w-[9px] h-[9px] rounded-full bg-[#28c840] block"/>
        </div>
        <div className="flex-1 bg-[#0c0c18] rounded-[5px] px-2 py-[3px] text-[7.5px] text-white/20 font-mono truncate">🔒 {url}</div>
      </div>
      <div className="h-[180px] overflow-hidden">{children}</div>
    </>
  );

  const cls = "w-[360px] flex-shrink-0 rounded-[11px] overflow-hidden opacity-40 hover:opacity-90 hover:scale-[1.03] transition-all duration-200 shadow-[0_24px_60px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.05)] cursor-pointer pointer-events-auto";

  if (isResume) return <div className={cls} onClick={onClick}>{shell}</div>;
  return (
    <a href={href} target={isExternal?"_blank":undefined} rel={isExternal?"noopener noreferrer":undefined} className={cls} style={{textDecoration:"none"}}>
      {shell}
    </a>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   HERO BROWSER MOSAIC — 6 rows, continuous alternating marquee
   Row -1, 1, 3 → move RIGHT   |   Row 0, 2, 4 ← move LEFT
   Cards duplicated for seamless infinite loop (no gaps, no jumps).
   ROW_PX = 5 cards × 360px + 4 gaps × 28px = 1912px per set
───────────────────────────────────────────────────────────────────────── */
const ROW_PX = 1912;

function MarqueeRow({ right, duration, offset, children }: {
  right?: boolean; duration: number; offset?: number; children: React.ReactNode;
}) {
  const GAP = 16;
  return (
    <div style={{ marginLeft: offset ?? 0, overflow: "visible", flexShrink: 0 }}>
      <div
        style={{
          display: "flex",
          flexWrap: "nowrap",
          width: "max-content",
          animation: `${right ? "marquee-right-3" : "marquee-left-3"} ${duration}s linear infinite`,
          willChange: "transform",
        }}
      >
        {/* 3 identical sets — guarantees no blank space even with 3D perspective */}
        {[0, 1, 2].map((n) => (
          <div key={n} style={{ display: "flex", flexWrap: "nowrap", gap: `${GAP}px`, paddingRight: `${GAP}px` }}>
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HeroBrowserMockups({ onResume }: { onResume: () => void }) {
  return (
    <div
      className="absolute z-[2] pointer-events-none hidden md:block"
      style={{ left:0, right:0, top:"-400px", height:"calc(100% + 800px)", overflow:"hidden", perspective:"1200px" }}
    >
      {/* Static 3D tilt wrapper */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ gap:"28px", transform:"rotateX(8deg) rotateZ(-6deg)", transformStyle:"preserve-3d" }}
      >
        {/* ROW -1 → RIGHT  — Gmail · GitHub · CodeTalk · Resume · LinkedIn */}
        <MarqueeRow right duration={38} offset={40}>
          <Card url="mail.google.com"             href="mailto:janavi0612@gmail.com"             ><GmailContent /></Card>
          <Card url="github.com/Janavizala06"     href="https://github.com/Janavizala06"        ><GitHubContent /></Card>
          <Card url="codetalk-2.vercel.app"       href="https://codetalk-2.vercel.app/"         ><CodeTalkContent /></Card>
          <Card url="janavi-zala · Resume.pdf"   href="resume" onClick={onResume}              ><ResumeContent /></Card>
          <Card url="linkedin.com/in/janavi-zala" href="https://www.linkedin.com/in/janavi-zala/"><LinkedInContent /></Card>
        </MarqueeRow>

        {/* ROW 0 ← LEFT   — CodeTalk · LinkedIn · Resume · Gmail · LibTrack */}
        <MarqueeRow duration={32}>
          <Card url="codetalk-2.vercel.app"       href="https://codetalk-2.vercel.app/"         ><CodeTalkContent /></Card>
          <Card url="linkedin.com/in/janavi-zala" href="https://www.linkedin.com/in/janavi-zala/"><LinkedInContent /></Card>
          <Card url="janavi-zala · Resume.pdf"   href="resume" onClick={onResume}              ><ResumeContent /></Card>
          <Card url="mail.google.com"             href="mailto:janavi0612@gmail.com"             ><GmailContent /></Card>
          <Card url="digitallib.vercel.app"       href="https://digitallib.vercel.app/"         ><LibTrackContent /></Card>
        </MarqueeRow>

        {/* ROW 1 → RIGHT  — GitHub · Gmail · LibTrack · LinkedIn · CodeTalk */}
        <MarqueeRow right duration={45}>
          <Card url="github.com/Janavizala06"     href="https://github.com/Janavizala06"        ><GitHubContent /></Card>
          <Card url="mail.google.com"             href="mailto:janavi0612@gmail.com"             ><GmailContent /></Card>
          <Card url="digitallib.vercel.app"       href="https://digitallib.vercel.app/"         ><LibTrackContent /></Card>
          <Card url="linkedin.com/in/janavi-zala" href="https://www.linkedin.com/in/janavi-zala/"><LinkedInContent /></Card>
          <Card url="codetalk-2.vercel.app"       href="https://codetalk-2.vercel.app/"         ><CodeTalkContent /></Card>
        </MarqueeRow>

        {/* ROW 2 ← LEFT   — Resume · GitHub · CodeTalk · LibTrack · Gmail */}
        <MarqueeRow duration={36} offset={80}>
          <Card url="janavi-zala · Resume.pdf"   href="resume" onClick={onResume}              ><ResumeContent /></Card>
          <Card url="github.com/Janavizala06"     href="https://github.com/Janavizala06"        ><GitHubContent /></Card>
          <Card url="codetalk-2.vercel.app"       href="https://codetalk-2.vercel.app/"         ><CodeTalkContent /></Card>
          <Card url="digitallib.vercel.app"       href="https://digitallib.vercel.app/"         ><LibTrackContent /></Card>
          <Card url="mail.google.com"             href="mailto:janavi0612@gmail.com"             ><GmailContent /></Card>
        </MarqueeRow>

        {/* ROW 3 → RIGHT  — LinkedIn · LibTrack · GitHub · Resume · CodeTalk */}
        <MarqueeRow right duration={42}>
          <Card url="linkedin.com/in/janavi-zala" href="https://www.linkedin.com/in/janavi-zala/"><LinkedInContent /></Card>
          <Card url="digitallib.vercel.app"       href="https://digitallib.vercel.app/"         ><LibTrackContent /></Card>
          <Card url="github.com/Janavizala06"     href="https://github.com/Janavizala06"        ><GitHubContent /></Card>
          <Card url="janavi-zala · Resume.pdf"   href="resume" onClick={onResume}              ><ResumeContent /></Card>
          <Card url="codetalk-2.vercel.app"       href="https://codetalk-2.vercel.app/"         ><CodeTalkContent /></Card>
        </MarqueeRow>

        {/* ROW 4 ← LEFT   — LibTrack · Resume · Gmail · GitHub · LinkedIn */}
        <MarqueeRow duration={40} offset={120}>
          <Card url="digitallib.vercel.app"       href="https://digitallib.vercel.app/"         ><LibTrackContent /></Card>
          <Card url="janavi-zala · Resume.pdf"   href="resume" onClick={onResume}              ><ResumeContent /></Card>
          <Card url="mail.google.com"             href="mailto:janavi0612@gmail.com"             ><GmailContent /></Card>
          <Card url="github.com/Janavizala06"     href="https://github.com/Janavizala06"        ><GitHubContent /></Card>
          <Card url="linkedin.com/in/janavi-zala" href="https://www.linkedin.com/in/janavi-zala/"><LinkedInContent /></Card>
        </MarqueeRow>
      </div>
    </div>
  );
}
