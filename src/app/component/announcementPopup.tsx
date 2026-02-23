"use client";

import { useState, useEffect } from "react";
import { X, Bell } from "lucide-react";

export default function AnnouncementPopup() {
    const [visible, setVisible] = useState(false);
    const [animateIn, setAnimateIn] = useState(false);

    useEffect(() => {
        // Small delay before showing for a natural feel
        const showTimer = setTimeout(() => {
            setVisible(true);
            // Trigger slide-in animation after mount
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setAnimateIn(true);
                });
            });
        }, 800);

        return () => clearTimeout(showTimer);
    }, []);

    const handleClose = () => {
        setAnimateIn(false);
        // Wait for slide-out animation to complete before unmounting
        setTimeout(() => setVisible(false), 400);
    };

    if (!visible) return null;

    return (
        <div
            className={`fixed bottom-4 right-4 z-[9999] w-[calc(100vw-2rem)] max-w-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${animateIn
                ? "translate-x-0 opacity-100"
                : "translate-x-[120%] opacity-0"
                }`}
        >
            {/* Popup Card */}
            <div className="relative overflow-hidden rounded-xl border border-white/[0.12] bg-[#001018] shadow-[0_8px_40px_rgba(24,184,218,0.12),0_0_0_1px_rgba(24,184,218,0.06)]">
                {/* Accent top bar */}
                <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#18B8DA] to-transparent" />

                {/* Close button */}
                <button
                    onClick={handleClose}
                    className="absolute top-3 right-3 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-all duration-200 hover:border-white/25 hover:bg-white/10 hover:text-white"
                    aria-label="Close announcement"
                >
                    <X className="h-3.5 w-3.5" />
                </button>

                {/* Content */}
                <div className="p-5 pr-12">
                    {/* Header */}
                    <div className="mb-3 flex items-center gap-2.5">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#18B8DA]/20 bg-[#18B8DA]/10">
                            <Bell className="h-4 w-4 text-[#18B8DA]" />
                        </div>
                        <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-white font-orbitron">
                            Shortlisting Update
                        </h3>
                    </div>

                    {/* Divider */}
                    <div className="mb-3 h-px w-full bg-gradient-to-r from-[#18B8DA]/30 via-white/10 to-transparent" />

                    {/* Body */}
                    <div className="space-y-2.5 text-[13px] leading-relaxed text-white">
                        <p className="font-semibold text-[#18B8DA]/90">
                            Shortlisting Round scheduled on{" "}
                            <span className="text-green-500 font-bold">7th March 2026</span>.
                        </p>

                        <ul className="space-y-1.5 pl-0">
                            <li className="flex items-start gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#18B8DA]/50" />
                                <span>All registered teams will undergo evaluation.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#18B8DA]/50" />
                                <span>
                                    Only shortlisted external teams will be required to pay the
                                    hackathon registration fee.    <br />"ONLY EXTERNAL TEAMS"
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#18B8DA]/50" />
                                <span>Selected teams will be notified via email.</span>
                            </li>
                        </ul>

                        <p className="mt-1 border-l-2 border-[#18B8DA]/30 pl-3 text-xs italic text-white/70">
                            We encourage all participants to prepare their ideas and
                            submissions carefully.
                        </p>
                    </div>

                    {/* CTA Button */}
                    <button
                        onClick={handleClose}
                        className="mt-4 w-full rounded-lg border border-[#18B8DA]/30 bg-[#18B8DA]/10 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-[#18B8DA] transition-all duration-300 hover:border-[#18B8DA]/50 hover:bg-[#18B8DA]/20 hover:shadow-[0_0_20px_rgba(24,184,218,0.15)]"
                    >
                        Got it
                    </button>
                </div>
            </div>
        </div>
    );
}
