'use client';

import { useState } from 'react';
import { FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { orbitron, montserrat, aldrich } from '../fonts';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <footer className="relative text-white pt-2 pb-8 px-6 overflow-hidden">
      
      {/* Decorative Top Accent */}
      {/* <div className="absolute top-0 left-0 w-32 h-[1px] bg-[#18BBDA]"></div> */}
      {/* Gradient Line */}
        <div className="relative w-full h-[2px] overflow-hidden mb-4 mt-10">
          <div className="absolute w-full h-full bg-gradient-to-r from-transparent via-[#18BBDA] to-transparent animate-shine"></div>
        </div>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 mb-16">
          
          {/* Column 1: Brand (Span 4) */}
          <div className="md:col-span-4 flex flex-col items-start">
            <div className={`${orbitron.className} text-2xl font-bold tracking-wider mb-4`}>
              MAKEATHON<span className="text-[#18BBDA]">2026</span>
            </div>
            <p className={`${montserrat.className} text-gray-400 text-sm leading-relaxed max-w-xs mb-8`}>
              The premier electrical and electronics hackathon. Bridging the gap between conceptual innovation and industrial reality.
            </p>
            
            {/* Social Icons - Minimalist */}
            <div className="flex gap-6 text-gray-400">
              <a href="https://www.instagram.com/robovitics/" target="_blank" className="hover:text-[#18BBDA] transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="https://www.facebook.com/robovitics/" target="_blank" className="hover:text-[#18BBDA] transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="https://www.linkedin.com/company/robovitics/" target="_blank" className="hover:text-[#18BBDA] transition-colors">
                <FaLinkedin size={20} />
              </a>
               <a href="https://medium.com/@roboviticsvitvellore" target="_blank" className="hover:text-[#18BBDA] transition-colors">
                  <svg width="20" height="20" viewBox="0 0 40 40" fill="none" aria-hidden="true" className="fill-current">
                    <circle cx="13" cy="20" r="7" />
                    <ellipse cx="27" cy="20" rx="4" ry="7" />
                    <ellipse cx="35" cy="20" rx="1.5" ry="7" />
                  </svg>
               </a>
            </div>
          </div>

          {/* Column 2: Quick Links (Span 3) - Added for Professional Structure */}
          <div className="md:col-span-3">
            {/* <h4 className={`${montserrat.className} text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-6`}>
              Quick Links
            </h4>
            <ul className="space-y-4">
              {['About', 'Tracks', 'Sponsors', 'FAQ'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-300 hover:text-[#18BBDA] transition-colors hover:pl-2 duration-300 block">
                    {item}
                  </a>
                </li>
              ))}
            </ul> */}
          </div>

          {/* Column 3: Contact & Newsletter (Span 5) */}
          <div className="md:col-span-5">
            <h4 className={`${montserrat.className} text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-6`}>
              Partnership & Inquiries
            </h4>
            
            {/* Contact Email */}
            <div className="mb-8">
              <a href="mailto:robovitics@vit.ac.in" className="text-xl md:text-2xl text-white hover:text-[#18BBDA] transition-colors font-light">
                robovitics@vit.ac.in
              </a>
            </div>

            {/* Form - Sleek & Rectangular */}
            <form onSubmit={handleSubmit} className="relative group">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email for collaboration"
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#18BBDA]/50 transition-all"
                  disabled={isSubmitting}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${aldrich.className} bg-[#18BBDA] hover:bg-[#15a3be] text-[#00121F] px-8 py-3 rounded-lg font-bold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isSubmitting ? "SENDING..." : "SUBMIT"}
                </button>
              </div>
              
              {/* Status Messages */}
              <div className="absolute -bottom-8 left-0">
                {status === "success" && (
                  <p className="text-[#18BBDA] text-xs flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#18BBDA]"></span> Received. We will be in touch.
                  </p>
                )}
                {status === "error" && (
                  <p className="text-red-400 text-xs">Submission failed. Please try again.</p>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar - Copyright & Legal */}
        {/* <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © 2026 RoboVITics. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-500">
             <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
             <a href="#" className="hover:text-white transition-colors">Code of Conduct</a>
          </div>
        </div> */}
      </div>
      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shine {
          animation: shine 3.5s infinite;
        }
      `}</style>
    </footer>
  );
}