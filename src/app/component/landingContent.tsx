"use client";

import Shuffle from '@/components/Shuffle';


export default function LandingContent() {


  return (
    <section
      id="hero-pin"
      className="min-h-svh w-full px-4 flex items-center justify-center" // Ensure section bg matches
    >
      <div className="mx-auto flex w-full flex-col items-center justify-center text-center">

        {/* Eye Video Container - transparent to let FloatingLines show through */}
        <div
          className="relative w-screen -mx-4 mb-8 overflow-hidden lg:pt-8"
          style={{ height: "clamp(250px, 28vw, 300px)" }}
        >

          {/* VIDEO WITH MASK: Fades edges to transparent so FloatingLines blend seamlessly */}
          {/* More fade on small screens (30%), less on large screens (20%) */}
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

        {/* Tagline with creative styling */}
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
        `}</style>

        {/* Pricing Info */}
        <div className="mt-8 flex items-center justify-center gap-6 text-xs font-mono uppercase tracking-wider relative z-30">
          <div className="flex items-center gap-2 px-4 py-2 border border-[#18B8DA]/30 bg-[#00121F]/50 backdrop-blur-sm">
            <span className="text-white/60">VIT Students:</span>
            <span className="text-[#18B8DA] font-bold">Free</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 border border-white/20 bg-[#00121F]/50 backdrop-blur-sm">
            <span className="text-white/60">External:</span>
            <span className="text-white font-bold">₹500/- per Member</span>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-6 relative z-40">
          <a
            href="/assets/SELECT Makeathon 2026.pdf"
            download="SELECT Makeathon 2026.pdf"
            className="cursor-target inline-flex items-center justify-center border border-white/15 bg-white/5 px-8 py-4 text-xs font-black uppercase tracking-[0.3em] text-white/85 backdrop-blur-md transition hover:bg-white/10"
          >
            Brochure
          </a>

          <div
            className="cursor-not-allowed inline-flex items-center justify-center bg-[#18B8DA]/60 px-10 py-4 text-xs font-black uppercase tracking-[0.2em] text-[#00121F] shadow-[0_0_20px_rgba(24,184,218,0.3)]"
          >
            Registration Opening Soon
          </div>
        </div>
      </div>
    </section>
  );
}