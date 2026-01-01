'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ethnocentric, orbitron, montserrat, aldrich } from "./fonts";
import Footer from './component/footer';

export default function MakeathonLanding() {
  
  return (
    <div className="min-h-screen text-white overflow-hidden relative bg-[#00121F]">
      
      {/* --- BACKGROUND IMAGE SECTION --- */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/logo.jpg"
          alt="Makeathon Background"
          fill
          // FIXED: 15s duration and subtle opacity change for a "Space Drift" effect
          className="object-cover object-[40%_20%] opacity-100 animate-pulse-slow" 
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#00121F]/50 via-[#00121F]/80 to-[#00121F] z-10"></div>
      </div>

      {/* Header */}
      <header className="relative z-20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Left - Makeathon Logo */}
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-[#0378AE]/30">
              <Image
                src="/assets/logo.jpg"
                alt="Makeathon Logo"
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <div className={`${orbitron.className}`}>
              <span className="text-lg font-bold">MAKEATHON</span>
              <span className="text-[#18BBDA] font-bold">  2026</span>
            </div>
          </div>

          {/* Right - VIT Logo Space */}
          <div className="flex items-center">
            <div className="flex items-center justify-center text-white text-xs text-center">
              <Image
              src="/assets/vit logo.png"
              alt="VIT Logo"
              width={250}
              height={250}
              className="object-contain"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative pt-2 pb-10 px-6 flex flex-col min-h-screen z-20">
        
        {/* Title */}
        <div className={`${ethnocentric.className} text-center mb-8 sm:mb-12 md:mb-16 animate-[slideUp_0.8s_ease-out_0.2s_both]`}>
            <h2 className={`relative flex flex-col items-center text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold bg-linear-to-r from-[#0378AE] via-[#29bbd8] to-white bg-clip-text text-transparent text-center leading-tight`}>
            MAKEATHON
            </h2>
          <div className={`text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold text-white mt-2 sm:mt-3 md:mt-4 leading-tight`}>
            2026
          </div>
        </div>

        {/* Professional Status Bar (Replaces "Coming Soon" Badge) */}
<div className="flex justify-center mb-12 animate-[slideUp_0.8s_ease-out_0.4s_both]">
  <div className="group relative overflow-hidden rounded-full p-[1.5px]">
    {/* Subtle Gradient Border */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    
    <div className="relative flex items-center gap-4 px-8 py-3 rounded-full bg-[#00121F]/80 backdrop-blur-md border border-white/5 transition-all duration-300 group-hover:bg-[#00121F]/60">
      
      {/* Status Dot (Static & Clean) */}
      <div className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-20 animate-ping duration-1000"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
      </div>

      <span className={`${montserrat.className} text-gray-300 text-sm font-semibold tracking-[0.18em] uppercase`}>
        Registration Opening Soon
      </span>
    </div>
  </div>
</div>

{/* Description (Editorial Style) */}
<div className="relative max-w-3xl mx-auto mb-12 px-6 animate-[fadeIn_1s_ease-out_0.6s_both]">
  {/* Decorative Vertical Lines for Structure */}
  {/* <div className="absolute left-0 top-2 bottom-2 w-[1px] bg-gradient-to-b from-transparent via-[#18BBDA]/30 to-transparent hidden md:block"></div>
  <div className="absolute right-0 top-2 bottom-2 w-[1px] bg-gradient-to-b from-transparent via-[#18BBDA]/30 to-transparent hidden md:block"></div> */}

  <p className={`${montserrat.className} text-center text-gray-300 text-lg md:text-xl leading-8 font-light tracking-wide`}>
    <span className="text-white font-medium">Connect ideas to reality.</span> Join the premier electrical 
    and electronics hackathon. We are opening tracks for innovators ready to 
    architect the <span className="text-[#18BBDA] border-b border-[#18BBDA]/30 pb-0.5">future</span>.
  </p>
</div>


        {/* --- INFO BLOCKS SECTION (Professional Data Design) --- */}
<div className="grid md:grid-cols-2 gap-20 max-w-5xl mx-auto mb-2">
  
  {/* Block 1: Calendar */}
  <div className="group relative bg-[#00121F]/40 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all duration-300 rounded-lg overflow-hidden animate-[slideUp_0.8s_ease-out_0.8s_both]">
    {/* Professional Accent Line (Top) */}
    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#18BBDA] to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
    
    <div className="p-8 flex items-start gap-6">
      {/* Icon - Clean & Minimal */}
      <div className="shrink-0 pt-1 text-gray-400 group-hover:text-[#18BBDA] transition-colors duration-300">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>

      {/* Text Content - Left Aligned Hierarchy */}
      <div className="flex flex-col">
        <span className={`${montserrat.className} text-xs font-medium tracking-[0.2em] text-gray-400 uppercase mb-2`}>
          Timeline
        </span>
        <h3 className={`${aldrich.className} text-2xl text-white font-medium mb-1 group-hover:text-[#18BBDA] transition-colors`}>
          March 12-14
        </h3>
        <p className="text-sm text-gray-500 font-light">
          48-Hour Innovation Sprint
        </p>
      </div>
    </div>
  </div>

  {/* Block 2: Venue */}
  <div className="group relative bg-[#00121F]/40 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all duration-300 rounded-lg overflow-hidden animate-[slideUp_0.8s_ease-out_1s_both]">
    {/* Professional Accent Line (Top) */}
    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#18BBDA] to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
    
    <div className="p-8 flex items-start gap-6">
      {/* Icon - Clean & Minimal */}
      <div className="shrink-0 pt-1 text-gray-400 group-hover:text-[#18BBDA] transition-colors duration-300">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>

      {/* Text Content - Left Aligned Hierarchy */}
      <div className="flex flex-col">
        <span className={`${montserrat.className} text-xs font-medium tracking-[0.2em] text-gray-400 uppercase mb-2`}>
          Location
        </span>
        <h3 className={`${aldrich.className} text-2xl text-white font-medium mb-1 group-hover:text-[#18BBDA] transition-colors`}>
          Anna Auditorium
        </h3>
        <p className="text-sm text-gray-500 font-light">
          VIT, Vellore Campus
        </p>
      </div>
    </div>
  </div>

</div>
      </main>
      <Footer />

      <style jsx>{`
        /* Adjusted to be SLOW (15s) and SUBTLE (Scale 1.1)
           This prevents the "dizzy" feeling 
        */
        @keyframes pulse-slow {
          0%, 100% { 
            transform: scale(1); 
            opacity: 0.6; /* Start visible */
          }
          50% { 
            transform: scale(1.1); /* Zoom in just 10% */
            opacity: 0.4; /* Fade out slightly */
          }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s infinite ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}