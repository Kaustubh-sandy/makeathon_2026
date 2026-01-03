'use client';

import { useState } from 'react';
import { FaInstagram, FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import { orbitron, montserrat, aldrich } from '../fonts'; // Adjust path if needed

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');
    setStatusMessage('');

    if (!email) {
      setStatus('error');
      setStatusMessage('Please enter your email.');
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok || data?.result === 'error') {
        throw new Error(data?.message || 'Subscription failed. Please try again.');
      }

      setStatus('success');
      setStatusMessage(data?.message || 'Received. We will be in touch.');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setStatusMessage(error instanceof Error ? error.message : 'Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <footer className="relative border-t border-white/10 text-white pt-8 px-6 overflow-hidden">
      
      {/* --- TOP ACCENT (Visible & Elegant) --- */}
      <div className="absolute top-0 left-0 w-full h-[1px] overflow-hidden z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#18BBDA]/20 to-transparent"></div>
        <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-[#18BBDA] to-transparent opacity-75 animate-shine-professional"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-20">
        {/* Main Grid Content */}
        <div className="grid md:grid-cols-12 gap-12 mb-8 items-start">
          
          {/* Column 1: Brand */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className={`${orbitron.className} text-2xl font-bold tracking-wider mb-4`}>
              SELECT MAKEATHON<span className="text-[#18BBDA]"> &apos;26</span>
            </div>
            <p className={`${montserrat.className} text-gray-400 text-sm leading-relaxed max-w-sm mb-8`}>
              The premier electrical and electronics hackathon. Bridging the gap between conceptual innovation and industrial reality.
            </p>
            
            <div className="flex gap-6 text-gray-500">
              <a href="https://www.instagram.com/makeathon_vellore/" target="_blank" className="hover:text-[#18BBDA] hover:-translate-y-1 transition-all duration-300">
                <FaInstagram size={22} />
              </a>
              <a href="https://x.com/makeathon_vit" target="_blank" className="hover:text-[#18BBDA] hover:-translate-y-1 transition-all duration-300">
                <FaXTwitter size={22} />
              </a>
              <a href="https://www.linkedin.com/company/makeathon-vit" target="_blank" className="hover:text-[#18BBDA] hover:-translate-y-1 transition-all duration-300">
                <FaLinkedin size={22} />
              </a>
            </div>
          </div>

          {/* Column 2: Contact & Form */}
          <div className="md:col-span-7 md:pl-12 border-t md:border-t-0 md:border-l border-white/5 pt-8 md:pt-0">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
               <div>
                  <h4 className={`${montserrat.className} text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-2`}>
                    Inquiries
                  </h4>
                  <a 
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=0lakshyasaini@gmail.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xl md:text-2xl text-white hover:text-[#18BBDA] transition-colors font-light"
                  >
                    0lakshyasaini@gmail.com
                  </a>
                  <div className={`${montserrat.className} text-sm text-gray-400 mt-2`}>
                    +91 6378011012
                  </div>
               </div>
               <div className="text-right hidden md:block">
                  <h4 className={`${montserrat.className} text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-1`}>
                    Location
                  </h4>
                  <p className="text-sm text-gray-400">VIT, Vellore Campus</p>
               </div>
            </div>

            <h4 className={`${montserrat.className} text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-4`}>
              Collaborate With Us
            </h4>

            <form onSubmit={handleSubmit} className="relative group max-w-xl">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email address"
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#18BBDA]/50 focus:bg-white/10 transition-all"
                  disabled={isSubmitting}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${aldrich.className} bg-[#18BBDA] hover:bg-[#15a3be] text-[#00121F] px-8 py-3 rounded-lg font-bold text-sm tracking-wide transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isSubmitting ? "SENDING..." : "SUBMIT"}
                </button>
              </div>
              
              <div className="absolute -bottom-8 left-0">
                {status === "success" && (
                  <p className="text-[#18BBDA] text-xs flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#18BBDA]"></span> {statusMessage || 'Received. We will be in touch.'}
                  </p>
                )}
                {status === "error" && (
                  <p className="text-red-400 text-xs">{statusMessage || 'Submission failed. Please try again.'}</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* --- BOTTOM ACCENT (FIXED) --- */}
      {/* 1. Removed 'delay' so it appears instantly.
         2. Increased height to h-[2px] so it is clearly visible.
         3. Increased base opacity to 40% so you see the blue line even when not shining.
      */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] overflow-hidden z-50">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#18BBDA]/40 to-transparent"></div>
        <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-[#18BBDA] to-transparent opacity-100 animate-shine-professional"></div>
      </div>

      <style jsx>{`
        @keyframes shine-professional {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-shine-professional {
          animation: shine-professional 3s infinite ease-in-out;
        }
      `}</style>
    </footer>
  );
}