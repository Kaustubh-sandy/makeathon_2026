"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  Activity, ArrowRight, Shield, Sprout, Zap,
  Radar, Headphones, FileText
} from "lucide-react";

type ProblemStatement = {
  id: string;
  title: string;
  desc: string;
  constraints: string;
  protocols?: string;
};

type TrackData = {
  id: string;
  callName: string;
  title: string;
  description: string;
  imageSrc: string;
  icon: React.ReactNode;
  reportId: string;
  reportDate?: string;
  status: "CONFIDENTIAL" | "OPERATIONAL";
  stats: {
    teams: number;
    bounty: string;
    progress: number;
    nodeHealth?: string;
    timeRemaining: string;
  };
  problems: ProblemStatement[];
};

const TRACKS_CONTENT: Record<string, TrackData> = {
  "SEC-01": {
    id: "SEC-01",
    callName: "Motion Matrix",
    title: "Rethinking Movement. Rebuilding Mobility",
    description: "Analyzing technical challenges and mission parameters for the future of electric mobility.",
    imageSrc: "",
    icon: <Zap className="h-8 w-8" />,
    reportId: "EV_SYS_TECH_2024_Q4.RAW",
    status: "CONFIDENTIAL",
    stats: { teams: 48, bounty: "$12,000", progress: 48, timeRemaining: "48:12:05" },
    problems: [
      { id: "PS_01", title: "Smart EV Charging Infrastructure Optimization", desc: "Develop an algorithmic load-balancing framework for urban charging hubs to prevent grid instability while minimizing average wait times for EV users during peak hours.", constraints: "Real-time dynamic pricing, Grid-to-Vehicle (G2V) efficiency >92%" },
      { id: "PS_02", title: "Vehicle-to-Vehicle (V2V) Communication", desc: "Engineer a low-latency communication protocol for autonomous EV swarms to share battery state and spatial telemetry for optimized platoon energy consumption.", constraints: "Latency < 10ms, AES-GCM Encryption, Dedicated Short-Range Comm (DSRC)" },
      { id: "PS_03", title: "Digital Twin for EV Systems", desc: "Construct a high-fidelity digital twin that predicts battery thermal runaway events by analyzing cell-level data streams from BMS sensors using physics-informed neural networks.", constraints: "Edge-Cloud sync frequency 10Hz, Predictive accuracy >98%" },
      { id: "PS_04", title: "Low-Cost Sensor Substitution for EV Perception", desc: "Implement a software-based 'virtual sensor' approach to replace high-cost LiDAR units with a multi-modal fusion of ultrasonic and monocular camera feeds for object detection.", constraints: "Detection range >50m, 95% confidence in adverse weather" },
      { id: "PS_05", title: "Open Innovation", desc: "Propose your own innovative solution related to electric mobility, sustainable transportation, or smart vehicle systems. Bring your unique idea to revolutionize the future of movement.", constraints: "Must align with track theme; Clear problem definition; Viable MVP within 36 hours" },
    ]
  },
  "SEC-02": {
    id: "SEC-02",
    callName: "Iron Dome",
    title: "Defense and Strategic Security Systems",
    description: "Next-gen surveillance, encryption, and border tactical monitoring systems.",
    imageSrc: "",
    icon: <Shield className="h-8 w-8" />,
    reportId: "DEF_TECH_2024_09.RAW",
    status: "CONFIDENTIAL",
    stats: { teams: 142, bounty: "$25,000", progress: 65, timeRemaining: "48:12:05" },
    problems: [
      { id: "PS_01", title: "Autonomous Perimeter Breach Detection", desc: "Develop a computer vision model for edge devices that can distinguish between wildlife and human intruders in low-light infrared feeds with <0.05% false alarm rate.", constraints: "Edge Processing (Max 4W), Latency <200ms" },
      { id: "PS_02", title: "Stealth Mesh Communication", desc: "Engineer a peer-to-peer radio mesh protocol that utilizes frequency hopping to avoid detection by signal scanners in hostile environments while maintaining 256kbps throughput.", constraints: "AES-256 Encryption, Non-cellular dependency" },
      { id: "PS_03", title: "Multi-spectral Camouflage Assessment", desc: "AI-driven design tool for generating adaptive camouflage patterns optimized for specific terrain data sets (Urban, Forest, Desert).", constraints: "Pattern scalability, Spectral signature reduction" },
      { id: "PS_04", title: "Drone Swarm Mitigation System", desc: "Design a non-kinetic solution for neutralizing unauthorized micro-UAV swarms within a 500m radius using directed RF interference.", constraints: "Safe for civil frequencies, Portable form factor" },
      { id: "PS_05", title: "Open Innovation", desc: "Propose your own innovative solution related to defense, security, or strategic surveillance systems. Bring your unique idea to strengthen national security infrastructure.", constraints: "Must align with track theme; Clear problem definition; Viable MVP within 36 hours" },
    ]
  },
  "SEC-03": {
    id: "SEC-03",
    callName: "Planet Earth",
    title: "Agriculture and Sustainability",
    description: "Integrating precision IoT, edge AI, and sustainable tech to revolutionize global food security.",
    imageSrc: "",
    icon: <Sprout className="h-8 w-8" />,
    reportId: "AGRI_CORE_ANALYSIS.LOG",
    status: "OPERATIONAL",
    stats: { teams: 48, bounty: "$10,000", progress: 12, nodeHealth: "98%", timeRemaining: "36:45:12" },
    problems: [
      { id: "01", title: "Livestock Health and Welfare Monitoring", desc: "Create a wearable or non-invasive sensor fusion system to monitor vital signs and early symptoms of disease in cattle herds, transmitting data via LoRaWAN.", constraints: "Min 2-year battery life; Waterproof (IP67); Data latency < 5 min; Edge-based anomaly detection." },
      { id: "02", title: "Farmer Productivity Enhancement Platform", desc: "An integrated dashboard for small-scale farmers providing real-time soil analysis, hyper-local weather forecasting, and market price prediction using ML models.", constraints: "Multi-lingual voice support; Offline-first architecture; Low-bandwidth optimization (2G compatible)." },
      { id: "03", title: "Early Crop Disease Detection System", desc: "Development of a high-precision computer vision pipeline capable of identifying fungal and pest-related stressors in leafy crops through drone-captured multi-spectral imagery.", constraints: "F1-score > 0.92; Spectral alignment < 1px; Real-time processing on Jetson Nano or similar edge hardware." },
      { id: "04", title: "Adulteration Detection for Food and Liquids", desc: "Portable NIR spectroscopy or chemical sensor array to detect common adulterants in milk, honey, or oils at the source to ensure supply chain integrity.", constraints: "Detection limit < 0.5% concentration; Blockchain-linked data verification; Device cost < $100 USD." },
      { id: "05", title: "Open Innovation", desc: "Propose your own innovative solution related to agriculture, sustainability, or food security. Bring your unique idea to revolutionize global farming and environmental practices.", constraints: "Must align with track theme; Clear problem definition; Viable MVP within 36 hours" },
    ]
  },
  "SEC-04": {
    id: "SEC-04",
    callName: "Shield Protocol",
    title: "Disaster Management, Response and Resilience",
    description: "Emergency communication mesh networks and rapid response logistics.",
    imageSrc: "",
    icon: <Activity className="h-8 w-8" />,
    reportId: "DR_MESH_2024_ALPHA",
    reportDate: "2024.09.15",
    status: "OPERATIONAL",
    stats: { teams: 29, bounty: "$15,000", progress: 22, timeRemaining: "48:12:05" },
    problems: [
      { id: "PS_01", title: "Smart Off-Grid Mesh Communication System", desc: "Design a deployable, self-healing mesh network for emergency responders. The system must maintain voice and telemetry data flow when traditional infrastructure is destroyed.", constraints: "5km Node Range, 12h Internal Battery", protocols: "LoRaWAN / 802.11s Hybrid" },
      { id: "PS_02", title: "Low-Cost Disaster Early Warning System", desc: "A localized sensor fusion system (seismic, water-level, wind) for remote villages. Focus on ultra-low power consumption and community-wide alerting mechanisms.", constraints: "<$50 BOM Cost, Solar-ready" },
      { id: "PS_03", title: "Human Presence Detection Under Rubble", desc: "Develop a portable sensing unit utilizing UWB (Ultra-Wideband) radar or high-sensitivity acoustic arrays to detect micro-movements or respiratory signatures of victims.", constraints: "3m Depth Penetration" },
      { id: "PS_04", title: "Human-in-the-Loop AI Assistant", desc: "An edge-computing AI system that analyzes aerial drone footage in real-time to identify safe landing zones and survivor clusters.", constraints: "Offline Inference" },
      { id: "PS_05", title: "Open Innovation", desc: "Propose your own innovative solution related to disaster management, emergency response, or resilience systems. Bring your unique idea to save lives and improve crisis management.", constraints: "Must align with track theme; Clear problem definition; Viable MVP within 36 hours" },
    ]
  },
};

// Reusable Technical Report Content Component
function TechnicalReportContent({ trackData }: { trackData: TrackData }) {
  return (
    <div className="border border-white/10 rounded-sm p-4 sm:p-6 lg:p-8 relative overflow-hidden bg-[#001018]">
      <div className="absolute top-0 left-0 h-0.5 w-full bg-linear-to-r from-transparent via-[#18B8DA]/60 to-transparent opacity-40" />

      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 lg:mb-8 border-b border-white/10 pb-4 lg:pb-5 relative z-10 gap-3">
        <div>
          <h3 className="text-sm lg:text-base font-black text-[#18B8DA] flex items-center gap-2 uppercase tracking-[0.25em] lg:tracking-[0.35em]">
            <FileText className="w-4 h-4 lg:w-5 lg:h-5" />
            Technical Report
          </h3>
          <p className="mt-2 text-white/80 font-bold text-sm lg:text-base">
            {trackData.callName} <span className="text-white/35">/</span> <span className="font-mono text-white">{trackData.id}</span>
          </p>
          <p className="text-[#18B8DA]/60 text-[10px] lg:text-xs mt-1 uppercase tracking-wider">
            {trackData.title}
          </p>
          <p className="text-white/35 text-[10px] lg:text-xs font-mono mt-1 tracking-[0.2em] lg:tracking-[0.25em] uppercase">
            LOG_FILE_REF: {trackData.reportId} {trackData.reportDate && `// DATE: ${trackData.reportDate}`}
          </p>
        </div>
        <div className={`self-start text-[10px] lg:text-xs font-black px-2 lg:px-3 py-1 rounded-sm border ${trackData.status === "OPERATIONAL" ? "text-emerald-300 border-emerald-300/30" : "text-[#18B8DA] border-[#18B8DA]/35"}`}>
          {trackData.status}
        </div>
      </div>

      <div className="space-y-6 lg:space-y-10 font-mono relative z-10">
        {trackData.problems.map((ps) => (
          <div key={ps.id} className="group border-l-2 border-white/10 pl-3 lg:pl-5 hover:border-[#18B8DA]/70 transition-colors">
            <div className="flex justify-between mb-2 items-baseline gap-4">
              <h4 className="text-[#18B8DA] font-bold text-sm lg:text-base leading-tight uppercase tracking-tight">{ps.id}: {ps.title}</h4>
            </div>
            <p className="text-white text-xs lg:text-sm leading-relaxed mb-3 lg:mb-4">{ps.desc}</p>
            <div className="space-y-1 text-[10px] lg:text-xs uppercase tracking-wider">
              <div><span className="text-[#18B8DA]/70 font-black">Constraints:</span> <span className="text-white/45">{ps.constraints}</span></div>
              {ps.protocols && <div><span className="text-[#18B8DA]/70 font-black">Protocols:</span> <span className="text-white/45">{ps.protocols}</span></div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TracksHub() {
  const [activeTrack, setActiveTrack] = useState<string>("SEC-01");
  const [supportMessage, setSupportMessage] = useState<{ type: 'success' | 'error' | null; text: string }>({ type: null, text: '' });
  const currentData = TRACKS_CONTENT[activeTrack];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 text-white selection: overflow-x-hidden">

      {/* Title Section */}
      <div className="mb-10 border-l-2 border-[#18B8DA] pl-5">
        <p className="text-sm font-black uppercase tracking-[0.35em] text-white">Tracks</p>
        <h2 className="mt-3 font-ethnocentric text-white text-2xl sm:text-3xl">
          Challenge Tracks
        </h2>
        <p className="mt-4 max-w-3xl text-white leading-relaxed">
          Choose a track to explore curated problem statements and constraints. Current selection: <span className="font-mono text-[#18B8DA]">{currentData.id}</span>
        </p>
      </div>

      {/* Background Selection Grid - On mobile, show technical report inline below each selected track */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
        {Object.values(TRACKS_CONTENT).map((track) => (
          <div key={track.id} className="contents lg:block">
            <button
              onClick={() => setActiveTrack(track.id)}
              className={`cursor-target relative p-6 min-h-70 text-left border overflow-hidden transition-colors duration-300 group rounded-sm flex flex-col justify-between bg-[#001018] w-full ${activeTrack === track.id
                ? "border-[#18B8DA]/70 ring-1 ring-[#18B8DA]/30"
                : "border-white/10 hover:border-[#18B8DA]/45"
                }`}
            >
              <div className="absolute inset-0 pointer-events-none">
                <div className={`absolute inset-0 transition-opacity duration-500 ${activeTrack === track.id ? "opacity-20" : "opacity-12 group-hover:opacity-16"}`}>
                  {/* <Image
                    src={track.imageSrc}
                    alt={track.title}
                    fill
                    sizes="(min-width: 1024px) 260px, (min-width: 768px) 50vw, 100vw"
                    className="object-contain"
                    priority={track.id === "SEC-01"}
                  /> */}
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-[#00121F]/70 via-transparent to-transparent" />
              </div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className={activeTrack === track.id ? "text-[#18B8DA]" : "text-white/40 group-hover:text-[#18B8DA]"}>
                    {track.icon}
                  </div>
                  <span className="text-xs font-mono text-white/35 tracking-[0.25em] uppercase">{track.id}</span>
                </div>
              </div>

              <div className="relative z-10">
                <h3 className={`text-xl font-extrabold uppercase tracking-tight transition-colors ${activeTrack === track.id ? "text-[#18B8DA]" : "text-white"}`}>
                  {track.callName}
                </h3>
                <p className="mt-1 text-xs text-[#18B8DA]/70 font-mono uppercase tracking-wider">
                  {track.title}
                </p>
                <p className="mt-2 text-sm text-white/60 leading-relaxed line-clamp-2">
                  {track.description}
                </p>
                <div className="mt-5 flex items-center gap-2 text-[#18B8DA] text-xs font-black uppercase tracking-[0.35em]">
                  <span>{activeTrack === track.id ? "Sector Active" : "Analyze Sector"}</span>
                  {activeTrack === track.id ? <Radar className="w-3 h-3 animate-pulse" /> : <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />}
                </div>
              </div>
            </button>

            {/* Mobile only: Show technical report inline below the selected track */}
            {activeTrack === track.id && (
              <div className="lg:hidden mt-4">
                <TechnicalReportContent trackData={track} />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Technical Report - Hidden on mobile (shown inline above), visible on lg+ */}
        <div className="hidden lg:block flex-1 border border-white/10 rounded-sm p-6 sm:p-8 relative overflow-hidden bg-[#001018]">
          <div className="absolute top-0 left-0 h-0.5 w-full bg-linear-to-r from-transparent via-[#18B8DA]/60 to-transparent opacity-40" />

          <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-5 relative z-10">
            <div>
              <h3 className="text-base font-black text-[#18B8DA] flex items-center gap-2 uppercase tracking-[0.35em]">
                <FileText className="w-5 h-5" />
                Technical Report
              </h3>
              <p className="mt-2 text-white/80 font-bold">
                {currentData.callName} <span className="text-white/35">/</span> <span className="font-mono text-white">{currentData.id}</span>
              </p>
              <p className="text-[#18B8DA]/60 text-xs mt-1 uppercase tracking-wider">
                {currentData.title}
              </p>
              <p className="text-white/35 text-xs font-mono mt-1 tracking-[0.25em] uppercase">
                LOG_FILE_REF: {currentData.reportId} {currentData.reportDate && `// DATE: ${currentData.reportDate}`}
              </p>
            </div>
            <div className={`text-xs font-black px-3 py-1 rounded-sm border ${currentData.status === "OPERATIONAL" ? "text-emerald-300 border-emerald-300/30" : "text-[#18B8DA] border-[#18B8DA]/35"}`}>
              {currentData.status}
            </div>
          </div>

          <div className="space-y-10 font-mono relative z-10">
            {currentData.problems.map((ps) => (
              <div key={ps.id} className="group border-l-2 border-white/10 pl-5 hover:border-[#18B8DA]/70 transition-colors">
                <div className="flex justify-between mb-2 items-baseline gap-4">
                  <h4 className="text-[#18B8DA] font-bold text-base leading-tight uppercase tracking-tight">{ps.id}: {ps.title}</h4>
                </div>
                <p className="text-white text-sm leading-relaxed mb-4">{ps.desc}</p>
                <div className="space-y-1 text-xs uppercase tracking-wider">
                  <div><span className="text-[#18B8DA]/70 font-black">Constraints:</span> <span className="text-white/45">{ps.constraints}</span></div>
                  {ps.protocols && <div><span className="text-[#18B8DA]/70 font-black">Protocols:</span> <span className="text-white/45">{ps.protocols}</span></div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-80 flex flex-col gap-6">
          <div className="border border-white/10 rounded-sm p-6 bg-[#001018]">
            <h3 className="text-sm font-black text-[#18B8DA] mb-6 uppercase tracking-[0.35em]">
              Sector Info
            </h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center text-xs uppercase border-b border-white/5 pb-4">
                <span className="text-white/40 tracking-[0.25em]">Sector Bounty</span>
                <span className="font-mono font-bold text-[#18B8DA]">REVEALING SOON</span>
              </div>

              {/* Support Form */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <Headphones className="text-[#18B8DA] h-5 w-5" />
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.35em] text-white/55">Tech Support</p>
                    <p className="text-sm text-white/70">Have a doubt? Ask us!</p>
                  </div>
                </div>

                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const emailInput = form.elements.namedItem('supportEmail') as HTMLInputElement;
                    const doubtInput = form.elements.namedItem('doubt') as HTMLTextAreaElement;
                    const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;

                    const email = emailInput.value;
                    const doubt = doubtInput.value;

                    if (!email || !doubt) return;

                    submitBtn.disabled = true;
                    submitBtn.textContent = 'SENDING...';
                    setSupportMessage({ type: null, text: '' });

                    try {
                      await fetch('https://script.google.com/macros/s/AKfycbxDHBt4JXhL3c7qt0h8WX_Y5Ut-OF-NbbM09WMW9nQOsuxLY2pHHaaClBxJi7QNt123XQ/exec', {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, doubt, track: activeTrack, timestamp: new Date().toISOString() })
                      });

                      emailInput.value = '';
                      doubtInput.value = '';
                      submitBtn.textContent = 'SENT ✓';
                      setSupportMessage({ type: 'success', text: 'Thank you! We will reach out to you soon.' });
                      setTimeout(() => {
                        submitBtn.textContent = 'SUBMIT →';
                        submitBtn.disabled = false;
                      }, 2000);
                    } catch {
                      submitBtn.textContent = 'RETRY →';
                      setSupportMessage({ type: 'error', text: 'Something went wrong. Please try again or contact us directly.' });
                      setTimeout(() => {
                        submitBtn.disabled = false;
                      }, 1000);
                    }
                  }}
                  className="space-y-3"
                >
                  <input
                    type="email"
                    name="supportEmail"
                    placeholder="Your email"
                    required
                    className="w-full px-4 py-3 bg-[#00121F] border border-white/10 text-white placeholder-white/30 text-sm font-mono focus:outline-none focus:border-[#18B8DA]/50 rounded-sm"
                  />
                  <textarea
                    name="doubt"
                    placeholder="Describe your doubt..."
                    required
                    rows={3}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = 'auto';
                      target.style.height = Math.min(target.scrollHeight, 200) + 'px';
                    }}
                    className="w-full px-4 py-3 bg-[#00121F] border border-white/10 text-white placeholder-white/30 text-sm font-mono focus:outline-none focus:border-[#18B8DA]/50 rounded-sm resize-none overflow-y-auto"
                    style={{ minHeight: '80px', maxHeight: '200px' }}
                  />
                  <button
                    type="submit"
                    className="cursor-target w-full px-4 py-3 bg-[#18B8DA] text-[#00121F] font-bold text-sm uppercase tracking-[0.2em] hover:bg-[#18B8DA]/90 transition-colors rounded-sm disabled:opacity-50"
                  >
                    Submit →
                  </button>
                  {supportMessage.type && (
                    <p className={`text-xs text-center py-2 ${supportMessage.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {supportMessage.text}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}