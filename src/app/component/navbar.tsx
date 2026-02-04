"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

type NavItem = {
  label: string;
  href: string;
};

// INCREASED FONT SIZE HERE
function NavA({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="cursor-target text-[13px] font-black uppercase tracking-[0.35em] text-white transition-colors hover:text-[#18B8DA]"
    >
      {children}
    </a>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const items = useMemo<NavItem[]>(
    () => [
      { label: "Home", href: "#" },
      { label: "About US", href: "#about" },
      { label: "Tracks", href: "#tracks" },
      { label: "Timeline", href: "#timeline" },
      { label: "FAQs", href: "#faqs" },
    ],
    []
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full backdrop-blur-sm border-b border-white/10">
      {/* Marquee Section */}
      <div className="relative h-4 overflow-hidden flex items-center border-b border-white/10 bg-[#00121F]/95">
        <div className="absolute left-0 top-0 h-full marquee-track flex items-center whitespace-nowrap">
          <div className="flex items-center gap-10 pr-10">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={`m1-${i}`} className="flex items-center gap-10">
                <span className="text-white/80 font-black text-[7px] tracking-[0.35em] uppercase">
                  INVENT ~ BUILD ~ IMPACT
                </span>
                <div className="w-1 h-1 bg-[#18B8DA]" />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-10 pr-10" aria-hidden="true">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={`m2-${i}`} className="flex items-center gap-10">
                <span className="text-white/80 font-black text-[7px] tracking-[0.35em] uppercase">
                  INVENT ~ BUILD ~ IMPACT
                </span>
                <div className="w-1 h-1 bg-[#18B8DA]" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="relative">
        <div className="mx-auto w-full max-w-full h-12 px-2 flex items-center justify-between">

          {/* Left Logo Container */}
          <div className="flex items-center justify-center w-32 sm:w-48 h-full pl-2 pr-6">
            <Image
              src="/assets/make.png"
              alt="Makeathon 2026"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>

          {/* LEFT VERTICAL SEPARATOR */}
          <div className="hidden md:block h-12 w-0.75 bg-white/10" />

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center justify-center gap-10 flex-1 px-6">
            {items.map((item) => (
              <NavA key={item.href} href={item.href}>
                {item.label}
              </NavA>
            ))}
          </nav>

          {/* RIGHT VERTICAL SEPARATOR */}
          <div className="hidden md:block h-12 w-0.75 bg-white/10" />

          {/* Right Logo Container */}
          <div className="flex items-center justify-center w-32 sm:w-48 h-full pl-6 pr-2">
            <Image
              src="/assets/vit logo.png"
              alt="VIT Logo"
              width={160}
              height={50}
              className="object-contain"
            />
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="cursor-target md:hidden ml-4 rounded-sm  p-2 text-white/80 border border-white/15 hover:border-[#18B8DA]/45 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <div className="h-4 w-5 flex flex-col justify-between">
              <span className={`block h-0.5 w-full bg-current transition-all ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-0.5 w-full bg-current transition-all ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-full bg-current transition-all ${mobileOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
            </div>
          </button>
        </div>

        {/* Bottom Accent Line */}
        <div className="absolute bottom-0 left-0 right-0 h-0.75 bg-linear-to-r from-transparent via-[#18B8DA]/40 to-transparent" />
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-b border-[#18B8DA]/20 bg-[#00121F]">
          <div className="flex flex-col">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-6 py-4 text-[13px] font-black text-white uppercase tracking-[0.35em] border-b border-white/5 hover:text-[#18B8DA]"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          will-change: transform;
          animation: marquee 42s linear infinite;
        }
      `}</style>
    </header>
  );
}