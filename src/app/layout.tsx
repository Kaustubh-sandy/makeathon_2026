import type { Metadata } from "next";
import "./globals.css";
import { ethnocentric, orbitron, montserrat, aldrich } from "./fonts";
import ClientCursor from "./component/ClientCursor";

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
        {/* Custom cursor - lazy loaded client component */}
        <ClientCursor />
      </body>
    </html>
  );
}
