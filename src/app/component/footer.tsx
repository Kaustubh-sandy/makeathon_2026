"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Radio, Mail, Clock, Zap, ChevronRight } from "lucide-react";
import { FaInstagram, FaLinkedin, FaXTwitter } from 'react-icons/fa6';

export default function Footer() {
    const [activeNode, setActiveNode] = useState<number | null>(null);
    const [systemTime, setSystemTime] = useState<string>("");
    const [ping, setPing] = useState<number>(12);
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [statusMessage, setStatusMessage] = useState("");

    useEffect(() => {
        // Update system time
        const updateTime = () => {
            const now = new Date();
            setSystemTime(
                now.toLocaleTimeString("en-US", {
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                })
            );
        };
        updateTime();
        const timer = setInterval(updateTime, 1000);

        // Simulate ping fluctuation
        const pingTimer = setInterval(() => {
            setPing(Math.floor(Math.random() * 8) + 10);
        }, 3000);

        return () => {
            clearInterval(timer);
            clearInterval(pingTimer);
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus("idle");

        try {
            const response = await fetch("/api/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const responseText = await response.text();
            let parsed: unknown = null;
            try {
                parsed = JSON.parse(responseText);
            } catch {
                parsed = null;
            }

            const data =
                parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : null;

            const result = data && typeof data.result === "string" ? data.result : "";
            const message = data && typeof data.message === "string" ? data.message : "";
            const errorMsg = data && typeof data.error === "string" ? data.error : "";

            if (!response.ok || result === "error") {
                setStatus("error");
                setStatusMessage(
                    message ||
                    errorMsg ||
                    "Submission failed. Please try again."
                );
                return;
            }

            setStatus("success");
            setStatusMessage(message || "Received. We will be in touch.");
            setEmail("");

            setTimeout(() => {
                setStatus("idle");
                setStatusMessage("");
            }, 5000);
        } catch {
            setStatus("error");
            setStatusMessage("Submission failed. Please try again.");

            setTimeout(() => {
                setStatus("idle");
                setStatusMessage("");
            }, 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const socialNodes = [
        { icon: FaLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/makeathon-vit/" },
        { icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/makeathon_vellore/" },
        { icon: FaXTwitter, label: "X", href: "https://x.com/makeathon_vit" },

    ];

    const navLinks = [
        { label: "HOME", href: "#", status: "active" },
        { label: "ABOUT_US", href: "#about", status: "active" },
        { label: "TRACKS", href: "#tracks", status: "active" },
        { label: "TIMELINE", href: "#timeline", status: "active" },
    ];

    return (
        <footer className="relative border-t border-[#18B8DA]/20 overflow-hidden">
            {/* Top animated border */}
            <div className="absolute top-0 left-0 w-full h-px overflow-hidden z-10">
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-[#18BBDA]/20 to-transparent"></div>
                <div className="absolute top-0 left-0 h-full w-full bg-linear-to-r from-transparent via-[#18BBDA] to-transparent opacity-75 animate-shine-professional"></div>
            </div>

            <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 pt-5 pb-5">
                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
                    {/* Brand Section - Spans 3 columns */}
                    <div className="lg:col-span-3 flex flex-col gap-6">
                        {/* Logos */}
                        <div className="flex gap-4 items-center">
                            {["/assets/vit%20logo.png", "/assets/logo.jpg"].map((src, idx) => (
                                <div
                                    key={idx}
                                    className="group relative w-16 h-16 border border-[#18B8DA]/30 bg-linear-to-br from-[#051a28]/80 to-[#00121F]/80 backdrop-blur-sm p-2 transition-all duration-300 hover:border-[#18B8DA] hover:shadow-[0_0_30px_rgba(24,184,218,0.3)]"
                                >
                                    <div className="absolute inset-0 bg-[#18B8DA]/0 group-hover:bg-[#18B8DA]/10 transition-all duration-300" />
                                    <Image
                                        src={src}
                                        alt="Logo"
                                        fill
                                        sizes="64px"
                                        className="object-contain grayscale brightness-125 group-hover:brightness-150 transition-all duration-300"
                                    />
                                    {/* Corner accents */}
                                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#18B8DA] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#18B8DA] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                            ))}
                        </div>

                        {/* Description */}
                        <div className="space-y-4">
                            <p className="text-white/70 text-sm leading-relaxed">
                                Engineering excellence and innovative problem solving. Hosted by the{" "}
                                <span className="text-[#18B8DA]">School of Electrical Engineering</span> (SELECT), VIT Vellore.
                            </p>

                            {/* System ID Badge */}
                            <div className="inline-flex items-center gap-2 px-3 py-2 border border-[#18B8DA]/30 bg-[#051a28]/50 backdrop-blur-sm">
                                <div className="flex gap-1">
                                    <div className="w-1 h-1 rounded-full bg-[#18B8DA] animate-pulse" />
                                    <div className="w-1 h-1 rounded-full bg-[#18B8DA]/60 animate-pulse delay-150" />
                                    <div className="w-1 h-1 rounded-full bg-[#18B8DA]/30 animate-pulse delay-300" />
                                </div>
                                <span className="text-[9px] font-mono text-white/50 uppercase tracking-[0.3em]">
                                    SLCT-2026-MKTHN
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Navigation - Spans 2 columns */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-px bg-linear-to-r from-[#18B8DA] to-transparent" />
                            <h4 className="text-white font-bold text-xs uppercase tracking-[0.35em]">Navigation</h4>
                        </div>

                        <ul className="flex flex-col gap-3">
                            {navLinks.map((item, idx) => (
                                <li key={item.label} className="group">
                                    <a
                                        className="cursor-target flex items-center gap-3 text-white/60 hover:text-[#18B8DA] transition-all duration-300 text-sm font-mono"
                                        href={item.href}
                                        style={{ animationDelay: `${idx * 50}ms` }}
                                    >
                                        <ChevronRight className="w-3 h-3 text-[#18B8DA]/50 group-hover:text-[#18B8DA] group-hover:translate-x-1 transition-all duration-300" />
                                        <span className="group-hover:tracking-wider transition-all duration-300">[ {item.label} ]</span>
                                        <div className="h-px flex-1 bg-[#18B8DA]/0 group-hover:bg-[#18B8DA]/30 transition-all duration-500 max-w-0 group-hover:max-w-10" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Venue Map Placeholder - Spans 4 columns */}
                    <div className="lg:col-span-4 flex flex-col gap-4">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-px bg-linear-to-r from-[#18B8DA] to-transparent" />
                            <h4 className="text-white font-bold text-xs uppercase tracking-[0.35em]">Venue Location</h4>
                        </div>

                        {/* Map Container */}
                        <a
                            href="https://maps.app.goo.gl/HbNcNvbpjxTEvX2a9"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Open venue in Google Maps"
                            className="relative group block"
                        >
                            {/* Animated border effect */}
                            <div className="absolute -inset-px bg-linear-to-r from-[#18B8DA]/50 via-transparent to-[#18B8DA]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

                            <div className="relative h-48 border border-[#18B8DA]/30 bg-linear-to-br from-[#051a28]/50 to-[#00121F]/50 backdrop-blur-sm overflow-hidden group-hover:border-[#18B8DA]/60 transition-all duration-300">
                                {/* Embedded Google Map (non-interactive; click opens Google Maps in new tab) */}
                                <iframe
                                    title="Vellore Institute of Technology Map"
                                    src="https://www.google.com/maps?output=embed&z=15&ll=12.9692232,79.1559336&q=Vellore%20Institute%20of%20Technology"
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="absolute inset-0 w-full h-full pointer-events-none"
                                    style={{ border: 0 }}
                                />

                                {/* Scanning line effect */}
                                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-[#18B8DA] to-transparent animate-[scan_3s_ease-in-out_infinite]" />
                                </div>

                                {/* Corner decorations */}
                                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#18B8DA]/50" />
                                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#18B8DA]/50" />
                                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#18B8DA]/50" />
                                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#18B8DA]/50" />
                            </div>
                        </a>
                    </div>

                    {/* Contact & Network - Spans 3 columns */}
                    <div className="lg:col-span-3 flex flex-col gap-8">
                        {/* Coordinates */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-8 h-px bg-linear-to-r from-[#18B8DA] to-transparent" />
                                <h4 className="text-white font-bold text-xs uppercase tracking-[0.35em]">Coordinates</h4>
                            </div>

                            {/* Location */}
                            <div className="group flex gap-3 items-start p-3 border border-[#18B8DA]/20 bg-[#051a28]/30 hover:border-[#18B8DA]/50 hover:bg-[#051a28]/50 transition-all duration-300">
                                <div className="text-[#18B8DA] mt-0.5 group-hover:scale-110 transition-transform duration-300">
                                    <Radio size={16} />
                                </div>
                                <div className="flex flex-col gap-1 flex-1">
                                    <p className="text-white/50 text-[10px] font-mono uppercase tracking-[0.25em]">Location</p>
                                    <p className="text-white text-xs leading-tight">VIT Vellore Campus, TN, India 632014</p>
                                </div>
                            </div>

                            {/* Email & Phone */}
                            <div className="group flex gap-3 items-start p-3 border border-[#18B8DA]/20 bg-[#051a28]/30 hover:border-[#18B8DA]/50 hover:bg-[#051a28]/50 transition-all duration-300">
                                <div className="text-[#18B8DA] mt-0.5 group-hover:scale-110 transition-transform duration-300">
                                    <Mail size={16} />
                                </div>
                                <div className="flex flex-col gap-1 flex-1">
                                    <p className="text-white/50 text-[10px] font-mono uppercase tracking-[0.25em]">Comm_Link</p>
                                    <a href="mailto:makeathonvellore@gmail.com" className="text-white text-xs hover:text-[#18B8DA] transition-colors">
                                        makeathonvellore@gmail.com
                                    </a>
                                    <a href="tel:+919309168579" className="text-white text-xs hover:text-[#18B8DA] transition-colors">
                                        +91 93091 68579
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Network */}
                        {/* Network */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-8 h-px bg-linear-to-r from-[#18B8DA] to-transparent" />
                                <h4 className="text-white font-bold text-xs uppercase tracking-[0.35em]">Network</h4>
                            </div>

                            <div className="flex gap-3">
                                {socialNodes.map((node, i) => (
                                    <a
                                        key={i}
                                        className="cursor-target relative w-12 h-12 border border-[#18B8DA]/30 bg-linear-to-br from-[#051a28]/50 to-[#00121F]/50 flex items-center justify-center hover:border-[#18B8DA] transition-all duration-300 group"
                                        href={node.href}
                                        // Added these two lines below
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onMouseEnter={() => setActiveNode(i)}
                                        onMouseLeave={() => setActiveNode(null)}
                                        title={node.label}
                                    >
                                        {/* Glow effect */}
                                        <div className="absolute inset-0 bg-[#18B8DA]/0 group-hover:bg-[#18B8DA]/10 transition-all duration-300" />

                                        <node.icon className="relative z-10 text-[#18B8DA] w-5 h-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />

                                        {/* Active indicator */}
                                        {activeNode === i && (
                                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#18B8DA] rounded-full animate-pulse" />
                                        )}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Collaborate With Us Section */}
                <div className="pb-2 mb-2">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
                        <div className="flex-1 max-w-2xl">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-8 h-px bg-linear-to-r from-[#18B8DA] to-transparent" />
                                <h4 className="text-white font-bold text-xs uppercase tracking-[0.35em]">Collaborate With Us</h4>
                            </div>

                            <form onSubmit={handleSubmit} className="relative">
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="Enter your email address"
                                        className="flex-1 bg-[#051a28]/30 border border-[#18B8DA]/20 px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#18B8DA]/50 focus:bg-[#051a28]/50 transition-all font-mono"
                                        disabled={isSubmitting}
                                    />
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="bg-[#18B8DA] hover:bg-[#15a3be] text-[#00121F] px-8 py-3 font-bold text-xs tracking-[0.25em] uppercase transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? "SENDING..." : "SUBMIT"}
                                    </button>
                                </div>

                                {/* Status Messages */}
                                {(status === "success" || status === "error") && (
                                    <div className="mt-4">
                                        {status === "success" && (
                                            <p className="text-[#18B8DA] text-xs flex items-center gap-2 font-mono">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#18B8DA] animate-pulse"></span>
                                                {statusMessage || "Received. We will be in touch."}
                                            </p>
                                        )}
                                        {status === "error" && (
                                            <p className="text-red-400 text-xs font-mono">{statusMessage || "Submission failed. Please try again."}</p>
                                        )}
                                    </div>
                                )}
                            </form>
                        </div>

                        {/* System Status Display */}
                        <div className="flex items-center gap-4 mt-11.5">
                            {/* Time Display */}
                            <div className="hidden sm:flex items-center gap-2 px-4 py-2 border border-[#18B8DA]/20 bg-[#051a28]/50 backdrop-blur-sm">
                                <Clock className="w-3 h-3 text-[#18B8DA]/70" />
                                <span className="text-[#18B8DA]/80 font-mono text-[10px] font-bold tracking-wider">{systemTime}</span>
                            </div>

                            {/* Status Badge */}
                            <div className="flex items-center gap-3 px-5 py-2.5 border border-emerald-500/30 bg-linear-to-r from-emerald-950/50 to-[#051a28]/50 backdrop-blur-sm shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                                <div className="relative">
                                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                    <div className="absolute inset-0 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
                                </div>
                                <span className="text-emerald-300 font-mono text-[10px] font-bold tracking-[0.25em] uppercase">Status: Active</span>
                                <div className="w-px h-3 bg-white/20" />
                                <Zap className="w-3 h-3 text-white/40" />
                                <span className="text-white/40 font-mono text-[10px] uppercase">{ping}ms</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-2">
                    {/* Copyright */}
                    <div className="flex flex-col gap-2 items-center md:items-start font-mono">
                        <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase">© 2026 SELECT MAKEATHON HQ</p>
                    </div>


                </div>
            </div>

            {/* Bottom animated border */}
            <div className="absolute bottom-0 left-0 w-full h-0.5 overflow-hidden z-50">
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-[#18BBDA]/40 to-transparent"></div>
                <div className="absolute top-0 left-0 h-full w-full bg-linear-to-r from-transparent via-[#18BBDA] to-transparent opacity-100 animate-shine-professional"></div>
            </div>

            <style jsx>{`
				@keyframes scan {
					0%,
					100% {
						transform: translateY(0);
					}
					50% {
						transform: translateY(192px);
					}
				}
				@keyframes shine-professional {
					0% {
						transform: translateX(-100%);
					}
					100% {
						transform: translateX(100%);
					}
				}

				.animate-shine-professional {
					animation: shine-professional 3s infinite ease-in-out;
				}
			`}</style>
        </footer>
    );
}