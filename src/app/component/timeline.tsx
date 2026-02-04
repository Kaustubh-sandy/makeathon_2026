"use client";
import React, { useState, useEffect } from "react";
import { Zap, Users, Clock, Cpu, Utensils, Database, GitBranch, Terminal, Trophy, Radio } from "lucide-react";

type TimelineEvent = {
  id: string;
  time: string;
  timeCode: string;
  title: string;
  location: string;
  description: string;
  icon: React.ReactNode;
  status: "active" | "future" | "locked";
  category: "trace" | "protocol" | "bridge";
  actions?: { label: string; variant: "primary" | "secondary" }[];
};

export default function TimelinePage() {
  const [connectedNodes] = useState(482);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemVoltage, setSystemVoltage] = useState(0);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const hackathonStart = new Date("2026-03-26T18:00:00");
  const hackathonEnd = new Date("2026-03-28T06:00:00"); // 36 hours later

  // Rail voltage for each event (based on event ID)
  const getRailVoltage = (eventId: string) => {
    const parsed = Number.parseInt(eventId, 10);
    const base = Number.isFinite(parsed) ? parsed : 0;
    return (5 + base * 1.137).toFixed(3);
  };

  // Format current date like "5 Feb 26"
  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = String(date.getFullYear()).slice(-2);
    return `${day} ${month} ${year}`;
  };

  // Format time like "00:57"
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);

      // Calculate countdown to hackathon start
      const difference = +hackathonStart - +now;
      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
        setSystemVoltage(0); // Before hackathon starts
      } else {
        // Hackathon has started - calculate voltage based on elapsed hours
        const elapsedMs = +now - +hackathonStart;
        const elapsedHours = elapsedMs / (1000 * 60 * 60);
        const voltage = Math.min(36, Math.max(0, elapsedHours)); // 0-36V over 36 hours
        setSystemVoltage(voltage);

        // Show time remaining in hackathon
        const remaining = +hackathonEnd - +now;
        if (remaining > 0) {
          setCountdown({
            days: 0,
            hours: Math.floor((remaining / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((remaining / 1000 / 60) % 60),
            seconds: Math.floor((remaining / 1000) % 60),
          });
        } else {
          setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
          setSystemVoltage(36);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Determine event status based on current time
  const getEventStatus = (eventHour: number): "active" | "future" | "locked" => {
    const now = new Date();
    if (+now < +hackathonStart) return "future"; // Before hackathon

    const elapsedHours = (+now - +hackathonStart) / (1000 * 60 * 60);

    // Parse event hour from time string (e.g., "08:00:00" -> 8)
    if (elapsedHours >= eventHour && elapsedHours < eventHour + 4) return "active";
    if (elapsedHours >= eventHour) return "locked";
    return "future";
  };

  const timelineEvents: TimelineEvent[] = [
    {
      id: "01",
      time: "00:00:00",
      timeCode: "T-MINUS 00:00:00",
      title: "System Boot: Kickoff Ceremony",
      location: "VENUE REVEALING SOON",
      description: "Initialize the logic flow and synchronize protocols with all teams. Global parameters will be broadcasted here.",
      icon: <Cpu className="w-8 h-8" />,
      status: getEventStatus(0),
      category: "trace"
    },
    {
      id: "02",
      time: "08:00:00",
      timeCode: "T-PLUS 08:00:00",
      title: "Mentorship Bridge: Session 1",
      location: "VENUE REVEALING SOON",
      description: "Filtering signal from noise. Industry experts help decouple complex architecture bottlenecks.",
      icon: <Users className="w-8 h-8" />,
      status: getEventStatus(8),
      category: "bridge"
    },
    {
      id: "03",
      time: "12:00:00",
      timeCode: "T-PLUS 12:00:00",
      title: "Energy Burst: Midnight Snacks",
      location: "VENUE REVEALING SOON",
      description: "Charging capacitors. Refreshments served in the Commons Area to maintain high-frequency output.",
      icon: <Utensils className="w-8 h-8" />,
      status: getEventStatus(12),
      category: "bridge"
    },
    {
      id: "04",
      time: "20:00:00",
      timeCode: "T-PLUS 20:00:00",
      title: "Core Processing: Deep Work Phase",
      location: "VENUE REVEALING SOON",
      description: "Maximum throughput required. Teams focusing on core algorithmic efficiency and hardware integration.",
      icon: <Terminal className="w-8 h-8" />,
      status: getEventStatus(20),
      category: "trace"
    },
    {
      id: "05",
      time: "28:00:00",
      timeCode: "T-PLUS 28:00:00",
      title: "Integration Phase: System Merge",
      location: "VENUE REVEALING SOON",
      description: "All subsystems converge. Cross-functional testing and debugging protocols activated across tracks.",
      icon: <Database className="w-8 h-8" />,
      status: getEventStatus(28),
      category: "protocol"
    },
    {
      id: "06",
      time: "32:00:00",
      timeCode: "T-PLUS 32:00:00",
      title: "Signal Calibration: Final Testing",
      location: "VENUE REVEALING SOON",
      description: "System-wide component verification. All modules must report operational status and performance metrics.",
      icon: <GitBranch className="w-8 h-8" />,
      status: getEventStatus(32),
      category: "protocol"
    },
    {
      id: "07",
      time: "34:00:00",
      timeCode: "T-PLUS 34:00:00",
      title: "Signal Output: Final Showcase",
      location: "VENUE REVEALING SOON",
      description: "Broadcast final project results to the evaluator array. Voltage normalization and power down sequence.",
      icon: <Trophy className="w-8 h-8" />,
      status: getEventStatus(34),
      category: "trace"
    }
  ];

  return (
    <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 py-20 sm:py-24 text-white">
      {/* Subtle circuit pattern (section-local) */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="timeline-circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M10 10 L10 40 L40 40 L40 70 M60 30 L90 30 M30 60 L30 90" stroke="#18B8DA" strokeWidth="0.5" fill="none" />
              <circle cx="10" cy="10" r="2" fill="#18B8DA" />
              <circle cx="40" cy="40" r="2" fill="#18B8DA" />
              <circle cx="60" cy="30" r="2" fill="#18B8DA" />
              <circle cx="30" cy="60" r="2" fill="#18B8DA" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#timeline-circuit)" />
        </svg>
      </div>

      <div className="relative">
        {/* Header */}
        <div className="mb-10 border-l-2 border-[#18B8DA] pl-5">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-white/55">Timeline</p>
          <h2 className="mt-3 font-ethnocentric text-white text-2xl sm:text-3xl">36h Circuit Timeline</h2>
          <p className="mt-4 max-w-3xl text-white/75 leading-relaxed">
            Monitoring data traces and power surges through the 36-hour Makeathon cycle.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <div className="h-2 w-2 bg-[#18B8DA] shadow-[0_0_12px_rgba(24,184,218,0.5)]" />
            <span className="text-[#18B8DA]/70 text-sm font-mono tracking-[0.3em] uppercase">System Version 3.6.0</span>
          </div>

          {/* Status Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {/* Voltage */}
            <div className="border border-white/10 bg-[#001018] p-5 relative overflow-hidden group hover:border-[#18B8DA]/45 transition-colors rounded-sm">
              <div className="absolute top-0 right-0 w-16 h-16 border-l border-b border-white/10" />
              <div className="flex items-start justify-between mb-2">
                <span className="text-white/55 text-xs font-mono tracking-[0.25em] uppercase">System Voltage</span>
                <Zap className="w-5 h-5 text-[#18B8DA]" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-white text-3xl font-bold font-mono">{systemVoltage.toFixed(2)}V</span>
                <span className="text-white/55 text-sm font-mono uppercase">Nominal</span>
              </div>
            </div>

            {/* Connected Nodes */}
            <div className="border border-white/10 bg-[#001018] p-5 relative overflow-hidden group hover:border-[#18B8DA]/45 transition-colors rounded-sm">
              <div className="absolute top-0 right-0 w-16 h-16 border-l border-b border-white/10" />
              <div className="flex items-start justify-between mb-2">
                <span className="text-white/55 text-xs font-mono tracking-[0.25em] uppercase">Connected Nodes</span>
                <Users className="w-5 h-5 text-[#18B8DA]" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-white text-3xl font-bold font-mono">{connectedNodes}</span>
                <span className="text-white/55 text-sm font-mono uppercase">Active</span>
              </div>
            </div>

            {/* Clock - Current Date & Time */}
            <div className="border border-white/10 bg-[#001018] p-5 relative overflow-hidden group hover:border-[#18B8DA]/45 transition-colors rounded-sm">
              <div className="absolute top-0 right-0 w-16 h-16 border-l border-b border-white/10" />
              <div className="flex items-start justify-between mb-2">
                <span className="text-white/55 text-xs font-mono tracking-[0.25em] uppercase">System Clock</span>
                <Clock className="w-5 h-5 text-[#18B8DA]" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white text-2xl font-bold font-mono">
                  {formatDate(currentTime)} | {formatTime(currentTime)}
                </span>
                <span className="text-[#18B8DA]/70 text-xs font-mono uppercase tracking-wider">
                  T-Minus {countdown.days}d {countdown.hours}h {countdown.minutes}m {countdown.seconds}s
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline - Vertical Circuit Layout */}
        <div className="relative">
          {/* Vertical circuit line */}
          <div className="hidden sm:block absolute left-12 top-0 bottom-0 w-0.5 bg-white/10" />

          <div className="space-y-0">
            {timelineEvents.map((event, idx) => (
              <div key={event.id} className="relative flex flex-col sm:flex-row gap-4 sm:gap-6 group">
                {/* Circuit node icon */}
                <div className="relative z-10 shrink-0">
                  <div
                    className={`w-18 h-18 sm:w-24 sm:h-24 border-2 flex items-center justify-center relative transition-all rounded-sm ${event.status === "active"
                      ? "border-[#18B8DA]/70 bg-[#001018]"
                      : event.status === "future"
                        ? "border-white/10 bg-[#001018]"
                        : "border-white/10 bg-[#001018]"
                      }`}
                  >
                    {/* Corner brackets */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#18B8DA]" />
                    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#18B8DA]" />
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#18B8DA]" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#18B8DA]" />

                    {/* Icon */}
                    <div
                      className={`${event.status === "active"
                        ? "text-[#18B8DA]"
                        : event.status === "future"
                          ? "text-[#18B8DA]/60"
                          : "text-[#18B8DA]/30"
                        }`}
                    >
                      {event.icon}
                    </div>

                    {/* Status indicator */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                      <div className="bg-[#00121F] px-3 py-1 border border-white/10 rounded-sm">
                        <span className="text-sm font-mono font-bold text-[#18B8DA]/70 uppercase tracking-wider">
                          {event.id}
                        </span>
                      </div>
                    </div>

                    {/* Category badge */}
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#00121F] border border-white/10 flex items-center justify-center rounded-sm">
                      <div className={`w-1.5 h-1.5 ${event.status === "active" ? "bg-[#18B8DA]" : "bg-[#18B8DA]/40"}`} />
                    </div>
                  </div>

                  {/* Connection line to next node */}
                  {idx < timelineEvents.length - 1 && (
                    <div className="hidden sm:block absolute left-1/2 -translate-x-1/2 top-24 w-0.5 h-12 bg-white/10" />
                  )}
                </div>

                {/* Content Card */}
                <div className="flex-1 pb-10 sm:pb-12 ">
                  <div
                    className={`border p-6 transition-colors rounded-sm ${event.status === "active"
                      ? "border-[#18B8DA]/60 bg-[#001018]"
                      : event.status === "future"
                        ? "border-white/10 bg-[#001018] hover:border-[#18B8DA]/35"
                        : "border-white/10 bg-[#001018]"
                      }`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-white text-xl font-bold tracking-tight">{event.title}</h3>
                          {event.status === "active" && (
                            <span className="px-2 py-0.5 bg-[#18B8DA] text-[#00121F] text-[9px] font-mono font-bold tracking-wider uppercase rounded-sm">
                              ACTIVE TASK
                            </span>
                          )}
                          {event.status === "locked" && (
                            <span className="px-2 py-0.5 border border-white/15 text-white/45 text-[9px] font-mono font-bold tracking-wider uppercase rounded-sm">
                              LOCKED
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm font-mono">
                          <span className="text-[#18B8DA]">{event.timeCode}</span>
                          <span className="text-white/25">|</span>
                          <span className="text-white/55 uppercase tracking-wider">{event.location}</span>
                        </div>
                      </div>

                      {/* Main rail indicator */}
                      <div className="flex items-center gap-2 px-3 py-1 border border-white/10 bg-[#00121F]/30 rounded-sm">
                        <span className="text-white/55 text-xs font-mono uppercase tracking-wider">
                          +{getRailVoltage(event.id)}V
                        </span>
                        <Radio className="w-3 h-3 text-[#18B8DA]/50" />
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-white/60 text-base leading-relaxed mb-4">{event.description}</p>

                    {/* Actions */}
                    {event.actions && (
                      <div className="flex gap-3">
                        {event.actions.map((action, actionIdx) => (
                          <button
                            key={actionIdx}
                            className={`cursor-target px-4 py-2 text-sm font-mono font-bold tracking-wider uppercase transition-colors rounded-sm ${action.variant === "primary"
                              ? "bg-[#18B8DA] text-[#00121F] hover:bg-[#18B8DA]/90"
                              : "border border-white/15 text-[#18B8DA] hover:border-[#18B8DA]/45 hover:bg-[#18B8DA]/10"
                              }`}
                          >
                            {action.label} →
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}