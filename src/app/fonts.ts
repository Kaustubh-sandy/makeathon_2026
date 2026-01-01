import localFont from "next/font/local";
import { Orbitron, Montserrat, Aldrich } from "next/font/google";

// local font files placed under public/fonts
export const ethnocentric = localFont({
  // Use a URL object (not .pathname) so Next can resolve the file at build time.
  // Note: localFont expects files available to the build; placing them under src or importing via URL is preferred.
  src: [
    { path: "../../public/fonts/Ethnocentric-Rg.otf", style: "normal" },
    // { path: "../../public/fonts/Ethnocentric-Rg-It.otf", weight: "400", style: "italic" },
  ],
  variable: "--font-ethnocentric",
});

export const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-orbitron",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export const aldrich = Aldrich({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-aldrich",
});
