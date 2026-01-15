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
  {/* Added 'flex-wrap' and 'gap-y-2' so items stack if screen is too narrow */}
  <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex flex-wrap justify-between items-center gap-y-3 gap-x-2">
    
    {/* Left - Makeathon Logo & Text */}
    <div className="flex items-center gap-3">
      {/* Logo Icon */}
      <div className="relative w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-lg overflow-hidden border border-[#0378AE]/30">
        <Image
          src="/assets/logo.jpg"
          alt="Makeathon Logo"
          width={48}
          height={48}
          className="object-cover"
        />
      </div>

      {/* Text Group */}
      <div className={`${orbitron.className} flex flex-col justify-center`}>
        {/* On mobile: text-xs. On desktop: text-lg */}
        <span className="text-xs sm:text-sm md:text-lg font-bold text-white leading-tight">
          SELECT MAKEATHON
        </span>
        <span className="text-xs sm:text-sm md:text-lg font-bold text-[#18BBDA] leading-tight">
           &apos;26
        </span>
      </div>
    </div>

    {/* Right - VIT Logo Space */}
    {/* shrink-0 prevents it from getting crushed, but w-20 makes it small enough for mobile */}
    <div className="flex items-center shrink-0">
      <div className="relative w-20 sm:w-28 md:w-[250px]">
        <Image
          src="/assets/vit logo.png"
          alt="VIT Logo"
          width={250}
          height={60}
          className="object-contain w-full h-auto"
        />
      </div>
    </div>
    
  </div>
</header>

      {/* Main Content */}
      <main className="relative pt-2 pb-10 px-6 flex flex-col min-h-screen z-20">
        
        {/* Title */}
<div className={`${ethnocentric.className} mb-8 sm:mb-12 md:mb-16 animate-[slideUp_0.8s_ease-out_0.2s_both]`}>
  <div className="relative max-w-6xl mx-auto px-4">
    <div className="flex items-center justify-center gap-4 whitespace-nowrap">
      {/* SELECT on the left */}
      <div className={`text-lg xs:text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#0378AE] leading-tight`}>
        SELECT
      </div>
      
      {/* MAKEATHON centered */}
      <h2 className={`text-lg xs:text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-linear-to-r from-[#087aaf] via-[#29bbd8] to-white bg-clip-text text-transparent leading-tight`}>
        MAKEATHON
      </h2>
      {/* 2026 on the right */}
      <div className={`text-lg xs:text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight`}>
        2026
      </div>
    </div>
  </div>
</div>


{/* Professional Unified Registration Bar with Running Border Light */}
<div className="mb-12 md:mb-16 flex justify-center animate-[slideUp_0.8s_ease-out_0.4s_both] px-4 md:px-0">
  {/* Container: Changed to md:w-auto to hug content (removes the big gap) */}
  <div className="group relative w-full md:w-auto overflow-hidden rounded-2xl md:rounded-full p-[1.5px]">
    
    {/* --- THE RUNNING BORDER LIGHT --- */}
    <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0000_0%,#0000_50%,#18BBDA_100%)]" />
    
    {/* --- INNER CONTENT --- */}
    <div className="relative flex flex-col md:flex-row items-center justify-center gap-5 md:gap-8 px-5 py-5 md:px-8 md:py-3 rounded-2xl md:rounded-full bg-[#00121F] backdrop-blur-xl">
      
      {/* Left Section: Status & Info */}
      <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 w-full md:w-auto text-center md:text-left">
        {/* Status with Dot */}
        <div className="flex items-center justify-center gap-3">
          <div className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </div>
          <span className={`${montserrat.className} text-gray-200 text-sm font-semibold tracking-widest uppercase whitespace-nowrap`}>
            Registrations Opening Soon
          </span>
        </div>
        
        {/* Divider (Hidden on Mobile) */}
        <div className="hidden md:block h-4 w-[1px] bg-white/10"></div>
        
        {/* Pricing Info */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 text-sm">
          <span className="text-gray-400">
            External: <span className="text-white">₹500/- per Member</span>
          </span>
          <span className="hidden sm:inline text-gray-600">•</span>
          <span className="text-gray-400">
            VIT Students: <span className="text-[#18BBDA] font-semibold">Free</span>
          </span>
        </div>
      </div>

      {/* Right Section: Action Button */}
      {/* Adjusted padding (py-2) and text size (text-xs) for mobile to reduce size */}
      {/* <a
        href=""
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-2 rounded-full bg-[#18BBDA] px-6 py-2 md:py-2.5 transition-all duration-300 hover:bg-[#15a1bc] hover:shadow-[0_0_15px_-3px_#18BBDA] group/btn w-full md:w-auto"
      >
        <span className={`${montserrat.className} text-[#00121F] text-xs md:text-sm font-bold tracking-wide uppercase`}>
          Registrations Opening Soon
        </span>
        <svg 
          className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#00121F] transition-transform duration-300 group-hover/btn:translate-x-1" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </a> */}

    </div>
  </div>
</div>

{/* Description (Editorial Style) */}
<div className="relative max-w-3xl mx-auto mb-8 px-6 animate-[fadeIn_1s_ease-out_0.6s_both]">
  <p className={`${montserrat.className} text-center text-gray-300 text-lg md:text-xl leading-8 font-light tracking-wide`}>
    <span className="text-white font-medium">SELECT Makeathon is a 36-hour innovation challenge where students, designers, and hackers build real-world solutions. 
      Teams brainstorm, ideate, and develop prototypes across hardware and software domains.</span>
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
          26-28 March 2026
        </h3>
        <p className="text-sm text-gray-500 font-light">
          36-Hour Innovation Sprint
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
          @keyframes shine-professional {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-shine-professional {
          animation: shine-professional 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}