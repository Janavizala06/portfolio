"use client";

import { marqueeItems } from "@/data";

export default function Marquee() {
  const doubled = [...marqueeItems, ...marqueeItems];
  const reversed = [...[...marqueeItems].reverse(), ...[...marqueeItems].reverse()];

  return (
    <div className="relative py-8 overflow-hidden border-t border-b border-white/[0.04] bg-transparent">
      {/* Edge fades */}
      <div className="absolute top-0 bottom-0 left-0 w-[120px] z-[2] pointer-events-none marquee-fade-l" />
      <div className="absolute top-0 bottom-0 right-0 w-[120px] z-[2] pointer-events-none marquee-fade-r" />

      {/* Row 1 */}
      <div className="flex overflow-hidden">
        <div className="flex w-max animate-marquee">
          {doubled.map((m, i) => (
            <div key={i} className="flex items-center gap-[9px] px-7 text-[13px] text-white/55 whitespace-nowrap border-r border-white/[0.06]">
              <span className="text-[17px]">{m.emoji}</span>{m.text}
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 (reversed) */}
      <div className="flex overflow-hidden mt-[18px]">
        <div className="flex w-max animate-marquee-rev">
          {reversed.map((m, i) => (
            <div key={i} className="flex items-center gap-[9px] px-7 text-[13px] text-white/55 whitespace-nowrap border-r border-white/[0.06]">
              <span className="text-[17px]">{m.emoji}</span>{m.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
