"use client";
import { GraduationCap, Zap, ArrowRight, Activity, Database, Cpu } from "lucide-react";
import { useState, useEffect } from "react";

type Stat = { label: string; value: string; prefix?: string; animated?: boolean };

const stats: Stat[] = [
    { label: "Teams", value: "60", prefix: "+", animated: true },
    { label: "Participants", value: "350", prefix: "+", animated: true },
    { label: "Industrial Judges", value: "30", prefix: "+", animated: true },
    { label: "Colleges", value: "20", prefix: "+", animated: true },
    { label: "Participation", value: "National-Level" },
    { label: "Community", value: "Students, Researchers & Professionals" }
];

const partners = [
    { name: "Schneider Electric", logo: "/assets/schneider-electric.png", width: "w-56", height: "h-32" },
    { name: "Danfoss", logo: "/assets/danfoss-logo.png", width: "w-48", height: "h-28" },
    { name: "Agora", logo: "/assets/agora.png", width: "w-44", height: "h-28" },
    { name: "BRAIC", logo: "/assets/braic.png", width: "w-48", height: "h-28" },
];


function AnimatedCounter({ end, duration = 2000 }: { end: number; duration?: number }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number;
        let animationFrame: number;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);

            setCount(Math.floor(progress * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration]);

    return <>{count}</>;
}

export default function AboutUs() {
    const [activeMetric, setActiveMetric] = useState(0);
    // ADDED: State to manage fluctuating heights
    const [heights, setHeights] = useState<number[]>(Array(8).fill(18));

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveMetric((prev) => (prev + 1) % 4);
        }, 3000);

        // ADDED: Interval to fluctuate the data stream heights
        const streamInterval = setInterval(() => {
            setHeights(Array.from({ length: 8 }, () => Math.floor(Math.random() * 20) + 10));
        }, 150);

        return () => {
            clearInterval(interval);
            clearInterval(streamInterval);
        };
    }, []);

    return (
        <div className="w-full text-white selection:bg-[#18B8DA] selection:text-[#00121F] bg-transparent">
            <div className="relative z-10">

                {/* HERO SECTION - Removed hard backgrounds */}
                <section className="w-full py-20 sm:py-24 lg:py-10 relative overflow-hidden bg-transparent">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {/* Data visualization grid - kept but made more subtle */}
                        {/* <div className="absolute inset-0 opacity-[0.03]">
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(24,184,218,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(24,184,218,0.5)_1px,transparent_1px)] bg-[size:50px_50px]" />
                        </div> */}
                    </div>

                    <div className="mx-auto w-full max-w-7xl px-6 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                            {/* LEFT: Main Content */}
                            <div className="lg:col-span-7 space-y-10">
                                {/* System Badge - Using semi-transparent background with blur */}
                                <div className="inline-flex items-center gap-3 border border-white/10 bg-[#001018] px-4 py-2 rounded-sm">
                                    <div className="relative">
                                        <div className="w-2 h-2 bg-green-500 animate-pulse" />
                                        <div className="absolute inset-0 w-2 h-2 bg-green-500 animate-ping" />
                                    </div>
                                    <span className="text-[11px] font-mono font-bold uppercase tracking-[0.35em] text-[#18B8DA]">
                                        System.Initialize // 2026
                                    </span>
                                    <div className="h-3 w-px bg-[#18B8DA]/30" />
                                    <Activity className="w-3 h-3 text-[#18B8DA]" />
                                </div>

                                <div className="space-y-6">
                                    <div className="relative inline-block">
                                        <h1 className="font-ethnocentric text-5xl sm:text-6xl md:text-7xl leading-none tracking-tight text-white">
                                            SELECT
                                        </h1>
                                        <div className="absolute -bottom-1 left-0 right-0 h-1 bg-[#18B8DA]" />
                                    </div>
                                    <h1 className="font-ethnocentric text-5xl sm:text-6xl md:text-7xl leading-none tracking-tight -mt-5">
                                        <span className="text-[#18B8DA]">MAKEATHON</span>
                                    </h1>

                                    <div className="flex items-center -mt-4">

                                        {/* ROW 1: Dynamically Fluctuating - Inverted */}
                                        <div className="flex items-start gap-1 h-10">
                                            {heights.map((h, i) => (
                                                <div
                                                    key={`s1-${i}`}
                                                    className="w-1 bg-[#18B8DA] transition-all duration-150 ease-in-out"
                                                    style={{
                                                        height: `${h}px`,
                                                        animation: "pulse 2s ease-in-out infinite",
                                                    }}
                                                />
                                            ))}
                                        </div>

                                        {/* ROW 2: Dynamically Fluctuating with offset - Inverted */}
                                        <div className="flex items-start gap-1 h-10">
                                            {heights.map((h, i) => (
                                                <div
                                                    key={`s2-${i}`}
                                                    className="w-1 bg-[#18B8DA] transition-all duration-150 ease-in-out"
                                                    style={{
                                                        height: `${Math.max(5, 30 - h)}px`,
                                                        animation: "pulse 2s ease-in-out infinite",
                                                    }}
                                                />
                                            ))}
                                        </div>

                                        {/* ROW 3: Dynamically Fluctuating with scale - Inverted */}
                                        <div className="flex items-start gap-1 h-10">
                                            {heights.map((h, i) => (
                                                <div
                                                    key={`s3-${i}`}
                                                    className="w-1 bg-[#18B8DA] transition-all duration-150 ease-in-out"
                                                    style={{
                                                        height: `${(h * 0.6) + 4}px`,
                                                        animation: "pulse 2s ease-in-out infinite",
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Description - Using glass effect instead of solid background */}
                                <div className="border-l-2 border-[#18B8DA] bg-[#001018] p-6 -mt-8 font-mono text-sm">
                                    <div className="flex items-center gap-2 mb-3">
                                        {/* <span className="text-[#18B8DA]">&gt;</span> */}
                                        <span className="text-white text-xs uppercase tracking-wider"> mission_brief.txt</span>
                                    </div>
                                    {/* <p className="text-white/80 leading-relaxed mb-3">
                                        A flagship  innovation challenge where students, designers, and
                                        technology enthusiasts build real-world solutions to industry problem statements.
                                    </p>  */}
                                    <p className="text-white/85 leading-relaxed font-semibold">
                                        Makeathon&apos;26 is a <span className="text-[#18B8DA] font-bold">36-hour</span> national-level hardware
                                        hackathon where participants design and build real
                                        physical systems. The event focuses on hands-on
                                        engineering, rapid prototyping, and real-world
                                        problem solving.
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-4 -mt-6">
                                    <div
                                        className="cursor-not-allowed relative overflow-hidden bg-[#18B8DA]/60 px-8 py-4 text-xs font-black uppercase tracking-[0.35em] text-[#00121F]"
                                    >
                                        <span className="relative flex items-center gap-2">
                                            Registration Opening Soon
                                        </span>
                                    </div>
                                    <a
                                        href="#tracks"
                                        className="cursor-target border border-white/15 bg-[#00121F]/30 px-8 py-4 text-xs font-black uppercase tracking-[0.35em] text-white/85 transition-colors hover:border-[#18B8DA]/35 hover:bg-[#18B8DA]/10"
                                    >
                                        View Tracks
                                    </a>
                                </div>
                            </div>

                            {/* RIGHT: Live Metrics Dashboard */}
                            <div className="lg:col-span-5 space-y-4">
                                <div className="border border-white/10 bg-[#001018] p-4 rounded-sm">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[11px] font-mono font-bold tracking-[0.3em] uppercase text-[#18B8DA]">
                                            Metrics
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-[#18B8DA] animate-pulse" />
                                            <span className="text-[10px] font-mono text-white/50 uppercase">Online</span>
                                        </div>
                                    </div>
                                    <div className="h-0.5 bg-[#18B8DA]/20" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {stats.slice(0, 4).map((stat, idx) => (
                                        <div
                                            key={stat.label}
                                            className={`border p-5 transition-all duration-300 rounded-sm ${activeMetric === idx
                                                ? "border-[#18B8DA]/60 bg-[#001018] shadow-[0_0_20px_rgba(24,184,218,0.18)]"
                                                : "border-white/10 bg-[#001018]"
                                                }`}
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <Database className={`w-4 h-4 transition-colors ${activeMetric === idx ? "text-[#18B8DA]" : "text-white/30"}`} />
                                                <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                                                    #{idx + 1}
                                                </div>
                                            </div>

                                            <div className="mb-2">
                                                <span className="text-3xl font-bold text-white font-mono">
                                                    {stat.animated ? <AnimatedCounter end={parseInt(stat.value)} /> : stat.value}
                                                </span>
                                                {stat.prefix && <span className="text-[#18B8DA] text-xl font-bold">{stat.prefix}</span>}
                                            </div>

                                            <div className="text-[12px] font-mono uppercase tracking-wider text-white">
                                                {stat.label}
                                            </div>

                                            <div className="mt-3 h-1 bg-white/10 overflow-hidden">
                                                <div
                                                    className={`h-full bg-[#18B8DA] transition-all duration-1000 ${activeMetric === idx ? "w-full" : "w-0"
                                                        }`}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-3">
                                    {stats.slice(4).map((stat) => (
                                        <div
                                            key={stat.label}
                                            className="border border-white/10 bg-[#001018] p-4 hover:border-[#18B8DA]/35 transition-colors rounded-sm"
                                        >
                                            <div className="flex items-start gap-3">
                                                <Cpu className="w-4 h-4 text-[#18B8DA] mt-0.5 shrink-0" />
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-[11px] font-mono uppercase tracking-wider text-white/50 mb-1">
                                                        {stat.label}
                                                    </div>
                                                    <div className="text-sm font-bold text-white/90">{stat.value}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* INSTITUTIONAL DNA - Background made transparent */}
                <section className="w-full py-20 sm:py-24 lg:py-28 border-y border-[#18B8DA]/10 relative overflow-hidden bg-transparent">
                    <div className="mx-auto max-w-7xl px-6 relative z-10">
                        <div className="flex items-center mb-16">
                            <div className="flex-1 h-0.75 bg-linear-to-r from-transparent via-[#18B8DA]/30 to-transparent" />
                            <div className="px-8">
                                <div className="flex items-center gap-4">
                                    <div className="flex gap-1">
                                        <div className="w-1 h-1 bg-[#18B8DA]" />
                                        <div className="w-1 h-1 bg-[#18B8DA]/60" />
                                        <div className="w-1 h-1 bg-[#18B8DA]/30" />
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-ethnocentric text-white text-center">
                                        Institutional <span className="text-[#18B8DA]">DNA</span>
                                    </h2>
                                    <div className="flex gap-1">
                                        <div className="w-1 h-1 bg-[#18B8DA]/30" />
                                        <div className="w-1 h-1 bg-[#18B8DA]/60" />
                                        <div className="w-1 h-1 bg-[#18B8DA]" />
                                    </div>
                                </div>
                                <p className="text-center text-[#18B8DA]/60 text-xl font-mono mt-2 tracking-wider uppercase">
                                    Core Infrastructure
                                </p>
                            </div>
                            <div className="flex-1 h-0.75 bg-linear-to-r from-transparent via-[#18B8DA]/30 to-transparent" />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
                            {/* VIT Card - Transparent bg */}
                            <div className="relative">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.75 h-8 bg-[#18B8DA]/30 -translate-y-8 hidden lg:block" />
                                <div className="border border-white/10 bg-[#001018] p-8 rounded-sm h-full flex flex-col">
                                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#18B8DA]" />
                                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#18B8DA]" />
                                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#18B8DA]" />
                                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#18B8DA]" />

                                    <div className="flex items-start justify-between mb-8">
                                        <div>
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="w-2 h-2 bg-[#18B8DA]" />
                                                <span className="text-[10px] font-mono font-bold text-[#18B8DA] tracking-[0.3em] uppercase">
                                                    Node_01 // VIT
                                                </span>
                                            </div>
                                            <h3 className="text-2xl md:text-3xl font-ethnocentric text-white">About VIT</h3>
                                        </div>
                                        <GraduationCap className="text-[#18B8DA]/25" size={48} strokeWidth={1} />
                                    </div>
                                    <p className="text-white mb-8 leading-relaxed text-xl">
                                        Vellore Institute of Technology (VIT) is one of India’s leading private universities, accredited with A++ by NAAC and consistently ranked among the top institutions by NIRF.
                                        With 40,000+ students and strong industry and international collaborations, VIT provides an ideal ecosystem for innovation-driven events like Makeathon.
                                    </p>
                                    <div className="grid grid-cols-2 gap-4 border-t border-[#18B8DA]/20 pt-6 mt-auto">
                                        <div className="border border-white/10 bg-[#00121F]/30 p-4 rounded-sm">
                                            <span className="text-[10px] font-mono font-bold text-[#18B8DA]/60 uppercase tracking-wider block mb-2">
                                                QS World Rank
                                            </span>
                                            <div className="text-2xl font-bold text-white font-mono">151-200</div>
                                        </div>
                                        <div className="border border-white/10 bg-[#00121F]/30 p-4 rounded-sm">
                                            <span className="text-[8px] font-mono font-bold text-[#18B8DA]/60 uppercase tracking-wider block mb-2">
                                                NIRF Rank
                                            </span>
                                            <div className="text-2xl font-bold text-white font-mono">#11</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* SELECT Card - Transparent bg */}
                            <div className="relative">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-[#18B8DA]/30 -translate-y-8 hidden lg:block" />
                                <div className="border border-white/10 bg-[#001018] p-8 rounded-sm h-full flex flex-col">
                                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#18B8DA]" />
                                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#18B8DA]" />
                                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#18B8DA]" />
                                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#18B8DA]" />

                                    <div className="flex items-start justify-between mb-8">
                                        <div>
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="w-2 h-2 bg-[#18B8DA]" />
                                                <span className="text-[10px] font-mono font-bold text-[#18B8DA] tracking-[0.3em] uppercase">
                                                    Node_02 // SELECT
                                                </span>
                                            </div>
                                            <h3 className="text-2xl md:text-3xl font-ethnocentric text-white">About SELECT</h3>
                                        </div>
                                        <Zap className="text-[#18B8DA]/25" size={48} strokeWidth={1} />
                                    </div>
                                    <p className="text-white mb-8 leading-relaxed text-xl">
                                        Makeathon 26 is organized by the School of Electrical and Electronics Engineering (SELECT), VIT Vellore.
                                        SELECT trains future-ready engineers in electrical, electronics, embedded systems, automation, and power engineering, supported by advanced labs and Centres of Excellence in power systems, control, and industrial automation.

                                    </p>
                                    <div className="grid grid-cols-2 gap-4 border-t border-[#18B8DA]/20 pt-6 mt-auto">
                                        <div className="flex items-center gap-3 border border-white/10 bg-[#00121F]/30 p-4 rounded-sm">
                                            <div className="w-2 h-2 bg-[#18B8DA]" />
                                            <span className="text-[12px] font-mono font-bold text-white uppercase tracking-wider">
                                                ABET
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 border border-white/10 bg-[#00121F]/40 p-4 rounded-sm">
                                            <div className="w-2 h-2 bg-[#18B8DA]" />
                                            <span className="text-[12px] font-mono font-bold text-white uppercase tracking-wider">
                                                40+ Labs
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Partners - Matrix Style */}
                        <div className="mt-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-px flex-1 bg-[#18B8DA]/20" />
                                <div className="flex items-center gap-3">
                                    <div className="w-1 h-1 bg-[#18B8DA]" />
                                    <span className="text-[12px] font-mono font-bold text-[#18B8DA] uppercase tracking-[0.4em]">
                                        Consortium Partners
                                    </span>
                                    <div className="w-1 h-1 bg-[#18B8DA]" />
                                </div>
                                <div className="h-px flex-1 bg-[#18B8DA]/20" />
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {partners.map((p, idx) => (
                                    <div
                                        key={p.name}
                                        className="p-4 flex items-center justify-center min-h-[100px]"
                                        style={{ animationDelay: `${idx * 100}ms` }}
                                    >
                                        <img
                                            src={p.logo}
                                            alt={p.name}
                                            className={`${p.width} ${p.height} object-contain opacity-90 hover:opacity-100 transition-opacity`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}