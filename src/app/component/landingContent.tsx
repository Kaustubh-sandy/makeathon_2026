"use client";

import Shuffle from '@/components/Shuffle';
import { ArrowRight, Zap } from 'lucide-react';

export default function LandingContent() {

  return (
    <section
      id="hero-pin"
      className="min-h-svh w-full px-4 flex items-center justify-center"
    >
      <div className="mx-auto flex w-full flex-col items-center justify-center text-center">

        {/* Eye Video Container */}
        <div
          className="relative w-screen -mx-4 mb-6 overflow-hidden lg:pt-14"
          style={{ height: "clamp(250px, 28vw, 300px)" }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover [mask-image:linear-gradient(to_bottom,transparent_0%,black_30%,black_70%,transparent_94.5%)] lg:[mask-image:linear-gradient(to_bottom,transparent_0%,black_20%,black_80%,transparent_100%)]"
          >
            <source src="/assets/eye.mp4" type="video/mp4" />
          </video>
        </div>

        <h1 className="text-white tracking-tighter leading-none w-full relative z-30">
          <Shuffle
            text="MAKEATHON'26"
            className="font-ethnocentric text-[8.5vw] sm:text-[6.5vw] md:text-[6vw] lg:text-[5.5vw] uppercase"
            style={{
              textShadow: "4px 4px 0px #0378ae",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
            }}
            shuffleDirection="right"
            duration={1}
            animationMode="evenodd"
            shuffleTimes={0.5}
            ease="power4.out"
            stagger={0.03}
            threshold={0.1}
            triggerOnce={true}
            triggerOnHover={true}
            respectReducedMotion={true}
            loop={false}
          />
        </h1>

        {/* Tagline */}
        <p
          className="mt-6 text-sm sm:text-base md:text-lg tracking-[0.3em] uppercase font-semibold font-orbitron relative z-30"
          style={{
            background: 'linear-gradient(90deg, #18B8DA 0%, #ffffff 50%, #18B8DA 100%)',
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            animation: 'shimmer 10s ease-in-out infinite',
            textShadow: '0 0 30px rgba(24, 184, 218, 0.5)',
          }}
        >
          Evolve the core. Disrupt the system.
        </p>

        <style jsx>{`
          @keyframes shimmer {
            0%, 100% { background-position: 200% center; }
            50% { background-position: 0% center; }
          }
          @keyframes pulse-border {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          @keyframes scan-line {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          @keyframes glow-pulse {
            0%, 100% { box-shadow: 0 0 20px rgba(24, 184, 218, 0.5), 0 0 40px rgba(24, 184, 218, 0.3); }
            50% { box-shadow: 0 0 30px rgba(24, 184, 218, 0.7), 0 0 60px rgba(24, 184, 218, 0.5); }
          }
        `}</style>

        {/* Pricing Info */}
        <div className="mt-8 flex items-center justify-center gap-6 text-xs font-mono uppercase tracking-wider relative z-30">
          <div className="flex items-center gap-2 px-4 py-2 border border-[#18B8DA]/30 bg-[#00121F]/50 backdrop-blur-sm">
            <span className="text-white/60">VIT Students </span>
            <span className="text-white font-bold">(ALL CAMPUS) </span>
            <span className="text-white/60">:</span>
            <span className="text-[#18B8DA] font-bold">Free</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 border border-white/20 bg-[#00121F]/50 backdrop-blur-sm">
            <span className="text-white/60">External:</span>
            <span className="text-white font-bold">₹500/- per Member</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-6 relative z-40">
          {/* Brochure Button */}
          <a
            href="/assets/Makeathon'26 Brochure (Outreach).pdf"
            download="SELECT Makeathon 2026.pdf"
            className="cursor-target inline-flex items-center justify-center border border-white/15 bg-white/5 px-8 py-4 text-xs font-black uppercase tracking-[0.3em] text-white/85 backdrop-blur-md transition hover:bg-white/10"
          >
            Brochure
          </a>

          {/* Registration Button - Enhanced Creative Design */}
          <a
            href="https://forms.gle/Rf1a2PHFnbkcWpvV7"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-target group relative"
          >
            {/* Main button */}
            <div className="relative bg-[#18B8DA] px-10 py-4 overflow-hidden">
              {/* Animated scan line */}
              <div className="absolute inset-0 overflow-hidden">
                <div
                  className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  style={{ animation: 'scan-line 3s ease-in-out infinite' }}
                />
              </div>

              {/* Status indicator */}
              <div className="absolute top-2 right-2 flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-[#00121F] rounded-full animate-pulse" />
                <div className="w-1 h-1 bg-[#00121F]/60 rounded-full animate-pulse delay-75" />
              </div>

              {/* Content */}
              <div className="relative flex items-center gap-3">
                {/* Icon with animation */}
                <div className="relative">
                  <Zap className="w-4 h-4 text-[#00121F] group-hover:scale-110 transition-transform duration-300" fill="#00121F" />
                  <div className="absolute inset-0 bg-[#00121F]/20 blur-sm animate-pulse" />
                </div>

                {/* Text */}
                <div className="flex flex-col items-start">
                  <span className="text-[8px] font-mono font-bold text-[#00121F]/60 uppercase tracking-[0.2em] leading-none">
                    Access Point
                  </span>
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-black leading-tight mt-0.5">
                    Registrations Open
                  </span>
                </div>
              </div>
            </div>


          </a>
        </div>

        {/* Registration Status Badge */}
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 border border-emerald-500/30 bg-emerald-950/30 backdrop-blur-sm relative z-30">
          <div className="relative">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <div className="absolute inset-0 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
          </div>
          <span className="text-emerald-300 text-[10px] font-mono font-bold tracking-[0.25em] uppercase">
            Active Registration Period
          </span>
        </div>
      </div>
    </section>
  );
}