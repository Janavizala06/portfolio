import type { Metadata, Viewport } from "next";
import { DM_Sans, Instrument_Serif, Dancing_Script } from "next/font/google";
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

const cursive = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-cursive",
  weight: ["400", "700"],
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${cursive.variable}`}>
      <body className="font-sans text-[#f0f0f5] leading-relaxed" suppressHydrationWarning>
        <SmoothScroll>
          <CinematicBackground />
          <CursorManager />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
