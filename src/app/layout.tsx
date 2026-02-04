import type { Metadata } from "next";
import { Orbitron, Montserrat, Aldrich } from "next/font/google";
import "./globals.css";
import { ethnocentric } from "./fonts";
import TargetCursor from "@/components/TargetCursor";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const aldrich = Aldrich({
  variable: "--font-aldrich",
  subsets: ["latin"],
  weight: ["400",],
});

export const metadata: Metadata = {
  title: "Makeathon 2026 - VIT",
  description:
    "VIT Makeathon 2026 - Connect your ideas to reality.Get ready to innovate, collaborate, and create the future!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${orbitron.variable} ${montserrat.variable} ${ethnocentric.variable} ${aldrich.variable} antialiased`}
      >
        {children}
        {/* 1. CUSTOM CURSOR - Must be inside body to track movement */}
        <TargetCursor
          targetSelector={
            'button, input[type="button"], input[type="submit"], [role="button"], .cursor-target'
          }
          spinDuration={2}
          hideDefaultCursor={true}
          parallaxOn={true}
          hoverDuration={0.2}
        />
      </body>
    </html>
  );
}
