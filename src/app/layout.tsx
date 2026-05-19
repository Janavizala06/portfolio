import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

import SmoothScroll from "@/providers/SmoothScroll";
import CursorManager from "@/components/CursorManager";
import CinematicBackground from "@/components/CinematicBackground";

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Janavi Zala — Full Stack Developer & AI Engineer",
  description: "I craft full-stack applications powered by AI, turning complex problems into elegant, user-centric solutions. MERN · Python · LLMs.",
  icons: {
    icon: "/logo2.png",
    apple: "/logo2.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body className="font-sans text-[#f0f0f5] leading-relaxed" suppressHydrationWarning>
        <SmoothScroll>
          <CinematicBackground />
          <CursorManager />
          {/* overflow-x-hidden MUST be on a child wrapper, NOT on html/body
              Chromium breaks position:sticky when overflow is set on the scroll root */}
          <div style={{ overflowX: "hidden" }}>
            {children}
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
