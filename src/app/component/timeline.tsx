"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Zap,
  Users,
  Clock,
  Cpu,
  Mic,
  Package,
  ClipboardCheck,
  Award,
  Trophy,
  Megaphone,
  Radio,
} from "lucide-react";
import DecryptedText from "@/components/DecryptedText";

/* ── data types ─────────────────────────────────────────── */
type TimelineEvent = {
  id: string;
  time: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

type DaySchedule = {
  label: string;
  date: string;
  events: TimelineEvent[];
};

/* ── schedule data ──────────────────────────────────────── */
const schedule: DaySchedule[] = [
  {
    label: "SHORTLISTING",
    date: "7 March 2026",
    events: [
      {
        id: "00",
        time: "7th March 2026",
        title: "Shortlisting Round",
        description:
          "All registered teams will undergo evaluation. Selected teams will be notified via email.",
        icon: <ClipboardCheck className="w-7 h-7" />,
      },
    ],
  },
  {
    label: "DAY 1",
    date: "26 March 2026",
    events: [
      {
        id: "01",
        time: "08:00 AM",
        title: "Start of Event | Check-in | Inaugural Ceremony",
        description:
          "Teams arrive and register at Era Sezhiyan Hall every team gets their workspace. Inaugural Ceremony is held.",
        icon: <ClipboardCheck className="w-7 h-7" />,
      },
      {
        id: "02",
        time: "10:00 AM",
        title: "Initial Pitching | Hardware Distribution",
        description:
          "Official kick-off with keynote addresses, followed by each team's short introduction and initial pitch. Hardware kits and development resources are distributed.",
        icon: <Mic className="w-7 h-7" />,
      },
      {
        id: "03",
        time: "12:00 – 03:00 PM",
        title: "Internal Review | Architecture Feedback",
        description:
          "Mentors rotate across teams for a guidance review. Architecture feedback, feasibility checks, and prototype guidance are provided during this window.",
        icon: <Cpu className="w-7 h-7" />,
      },
      {
        id: "04",
        time: "05:00 PM",
        title: "Review Round 1 | Scored Feedback",
        description:
          "First formal evaluation round. Judges assess progress, technical depth, and innovation potential. Teams receive scored feedback on their prototypes.",
        icon: <Package className="w-7 h-7" />,
      },
    ],
  },
  {
    label: "DAY 2",
    date: "27 March 2026",
    events: [
      {
        id: "05",
        time: "09:00 AM",
        title: "Review Round 2",
        description:
          "Second evaluation checkpoint. Teams demonstrate overnight progress, refined prototypes, and updated technical documentation to the panel.",
        icon: <ClipboardCheck className="w-7 h-7" />,
      },
      {
        id: "06",
        time: "02:30 PM",
        title: "Final Pitching",
        description:
          "Teams present their completed projects in a final demo session. Each pitch is timed and scored across innovation, execution, and impact.",
        icon: <Megaphone className="w-7 h-7" />,
      },
      {
        id: "07",
        time: "04:00 PM",
        title: "Top 10 Announcement",
        description:
          "The shortlisted top-10 teams are announced. Selected teams prepare for the grand finale showcase in front of the full judging panel.",
        icon: <Award className="w-7 h-7" />,
      },
      {
        id: "08",
        time: "06:00 PM",
        title: "Winners Declaration & Prize Distribution",
        description:
          "Grand finale — winners across all tracks are revealed. Prizes, certificates, and special recognitions are awarded on stage.",
        icon: <Trophy className="w-7 h-7" />,
      },
    ],
  },
];

/* ── fade-in hook ───────────────────────────────────────── */
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

/* ── single timeline card ───────────────────────────────── */
function TimelineCard({
  event,
  index,
}: {
  event: TimelineEvent;
  index: number;
}) {
  const { ref, visible } = useFadeIn();
  const delay = `${index * 120}ms`;

  return (
    <div
      ref={ref}
      className="relative grid grid-cols-1 md:grid-cols-[auto_1fr] gap-0 md:gap-6 items-start"
      style={{ transitionDelay: delay }}
    >
      {/* ── LEFT: icon node on the vertical spine ── */}
      <div className="relative z-10 flex flex-col items-center">
        <div
          className={`
            w-16 h-16 md:w-20 md:h-20 border-2 flex items-center justify-center relative
            rounded-sm transition-all duration-500
            border-white/10 bg-[#001018]
            ${visible ? "opacity-100 scale-100" : "opacity-0 scale-75"}
          `}
          style={{ transitionDelay: delay }}
        >
          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-[#18B8DA]" />
          <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-[#18B8DA]" />
          <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-[#18B8DA]" />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-[#18B8DA]" />

          <div className="text-[#18B8DA]/80">{event.icon}</div>

          {/* ID badge — simple two-digit number */}
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2">
            <div className="bg-[#00121F] px-3 py-0.5 border border-white/10 rounded-sm">
              <span className="text-[11px] font-mono font-bold text-[#18B8DA]/70 tracking-widest">
                {event.id}
              </span>
            </div>
          </div>

          {/* Category dot */}
          <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-[#00121F] border border-white/10 flex items-center justify-center rounded-sm">
            <div className="w-1.5 h-1.5 bg-[#18B8DA]/50" />
          </div>
        </div>
      </div>

      {/* ── RIGHT: content card ── */}
      <div className="hidden md:block">
        <CardContent event={event} visible={visible} delay={delay} />
      </div>

      {/* ── MOBILE: always show card below the node ── */}
      <div className="md:hidden mt-5 col-span-full">
        <CardContent event={event} visible={visible} delay={delay} />
      </div>
    </div>
  );
}

/* ── card inner content ─────────────────────────────────── */
function CardContent({
  event,
  visible,
  delay,
}: {
  event: TimelineEvent;
  visible: boolean;
  delay: string;
}) {
  return (
    <div
      className={`
        border border-white/10 bg-[#001018] p-5 md:p-6 rounded-sm
        transition-all duration-600 ease-out
        hover:border-[#18B8DA]/45 hover:scale-[1.02]
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
      style={{ transitionDelay: delay }}
    >
      {/* Header row: title + time indicator */}
      <div className="flex items-start justify-between mb-3 gap-3">
        <div className="flex-1">
          {/* Title */}
          <h3 className="text-white text-lg md:text-xl font-bold tracking-tight leading-snug uppercase">
            {event.title}
          </h3>
        </div>

        {/* Time indicator — like old +V badge */}
        <div className="flex items-center gap-2 px-3 py-1 bg-[#18B8DA]/10 border border-[#18B8DA]/25 rounded-sm shrink-0 mt-1">
          <span className="text-[#18B8DA] text-xs font-mono font-bold tracking-widest uppercase">
            {event.time}
          </span>
          <Radio className="w-3 h-3 text-[#18B8DA]/50" />
        </div>
      </div>

      {/* Description */}
      <p className="text-white/55 text-sm md:text-base leading-relaxed">
        {event.description}
      </p>
    </div>
  );
}

/* ── main component ─────────────────────────────────────── */
export default function TimelinePage() {
  const [connectedNodes, setConnectedNodes] = useState<number | null>(() => {
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem("connectedNodes");
      return cached ? Number(cached) : null;
    }
    return null;
  });
  const [systemVoltage, setSystemVoltage] = useState(0);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const GOOGLE_FORM_ENDPOINT =
    "https://script.google.com/macros/s/AKfycbygbUEWrszpJQbFX-cIFcKKCkcSoSXnsyRE06sOEqCDL9Pl1EiSlT6fH39xVRyKOQmbhg/exec";

  const hackathonStart = new Date("2026-03-26T18:00:00");
  const hackathonEnd = new Date("2026-03-28T06:00:00");

  useEffect(() => {
    const fetchRegistrationCount = async () => {
      try {
        const response = await fetch(
          `${GOOGLE_FORM_ENDPOINT}?t=${Date.now()}`,
          { method: "GET", headers: { Accept: "application/json" } }
        );
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        if (data && typeof data.count === "number") {
          setConnectedNodes(data.count);
          localStorage.setItem("connectedNodes", String(data.count));
        }
      } catch (error) {
        console.error("Terminal Sync Error:", error);
      }
    };

    fetchRegistrationCount();
    const interval = setInterval(fetchRegistrationCount, 30_000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = +hackathonStart - +now;

      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
        setSystemVoltage(0);
      } else {
        const elapsedMs = +now - +hackathonStart;
        const elapsedHours = elapsedMs / (1000 * 60 * 60);
        setSystemVoltage(Math.min(36, Math.max(0, elapsedHours)));

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

  return (
    <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 py-20 sm:py-24 text-white">
      {/* Subtle circuit pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="timeline-circuit"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M10 10 L10 40 L40 40 L40 70 M60 30 L90 30 M30 60 L30 90"
                stroke="#18B8DA"
                strokeWidth="0.5"
                fill="none"
              />
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
        {/* ── Section Header ─────────────────────────── */}
        <div className="mb-14 border-l-2 border-[#18B8DA] pl-5">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-white/55">
            Event Timeline
          </p>
          <h2 className="mt-3 font-ethnocentric text-white text-2xl sm:text-3xl">
            MAKEATHON &apos;26 Schedule
          </h2>
          <p className="mt-4 max-w-3xl text-white/75 leading-relaxed">
            Two days of building, pitching, and pushing boundaries at{" "}
            <span className="text-[#18B8DA]">Era Sezhiyan Hall, MG Block</span>{" "}
            26 &amp; 27 March 2026.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <div className="h-2 w-2 bg-[#18B8DA]" />
            <span className="text-[#18B8DA]/70 text-sm font-mono tracking-[0.3em] uppercase">
              System Version 3.6.0
            </span>
          </div>

          {/* ── Status Cards ──── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {/* Voltage */}
            <div className="border border-white/10 bg-[#001018] p-5 relative overflow-hidden group hover:border-[#18B8DA]/45 transition-colors rounded-sm">
              <div className="absolute top-0 right-0 w-16 h-16 border-l border-b border-white/10" />
              <div className="flex items-start justify-between mb-2">
                <span className="text-white/55 text-xs font-mono tracking-[0.25em] uppercase">
                  System Voltage
                </span>
                <Zap className="w-5 h-5 text-[#18B8DA]" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-white text-3xl font-bold font-mono">
                  {systemVoltage.toFixed(2)}V
                </span>
                <span className="text-white/55 text-sm font-mono uppercase">
                  Nominal
                </span>
              </div>
            </div>

            {/* Connected Nodes */}
            <div className="border border-white/10 bg-[#001018] p-5 relative overflow-hidden group hover:border-[#18B8DA]/45 transition-colors rounded-sm">
              <div className="absolute top-0 right-0 w-16 h-16 border-l border-b border-white/10" />
              <div className="flex items-start justify-between mb-2">
                <span className="text-white/55 text-xs font-mono tracking-[0.25em] uppercase">
                  Connected Nodes
                </span>
                <Users className="w-5 h-5 text-[#18B8DA]" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-white text-3xl font-bold font-mono">
                  {connectedNodes !== null ? connectedNodes : "--"}
                </span>
                <span className="text-white/55 text-sm font-mono uppercase">
                  Active
                </span>
              </div>
            </div>

            {/* Clock / Countdown */}
            <div className="border border-white/10 bg-[#001018] p-5 relative overflow-hidden group hover:border-[#18B8DA]/45 transition-colors rounded-sm">
              <div className="absolute top-0 right-0 w-16 h-16 border-l border-b border-white/10" />
              <div className="flex items-start justify-between mb-2">
                <span className="text-white/55 text-xs font-mono tracking-[0.25em] uppercase">
                  Launch Date
                </span>
                <Clock className="w-5 h-5 text-[#18B8DA]" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white text-2xl font-bold font-mono">
                  <DecryptedText
                    text="26 Mar 2026 | 18:00"
                    speed={180}
                    maxIterations={15}
                    characters="0123456789:|-ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                    animateOn="both"
                    sequential
                    revealDirection="start"
                    className="text-white"
                    encryptedClassName="text-[#18B8DA]/50"
                  />
                </span>
                <span className="text-[#18B8DA]/70 text-xs font-mono uppercase tracking-wider">
                  <DecryptedText
                    text={`T-Minus ${countdown.days}d ${countdown.hours}h ${countdown.minutes}m ${countdown.seconds}s`}
                    speed={180}
                    maxIterations={15}
                    characters="0123456789:|-ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                    animateOn="both"
                    sequential
                    revealDirection="start"
                    className="text-white"
                    encryptedClassName="text-[#18B8DA]/70"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Day Sections ───────────────────────────── */}
        {schedule.map((day) => (
          <div key={day.label} className="mb-20 last:mb-0">
            {/* Day heading with electrified line */}
            <DayHeading label={day.label} date={day.date} />

            {/* Vertical timeline */}
            <div className="relative mt-10">
              {/* Vertical spine — desktop (left side) */}
              <div className="hidden md:block absolute left-[39px] top-0 bottom-0 w-px bg-white/10" />
              {/* Vertical spine — mobile (left edge) */}
              <div className="md:hidden absolute left-[31px] top-0 bottom-0 w-px bg-white/10" />

              <div className="flex flex-col gap-14 md:gap-16">
                {day.events.map((event, idx) => (
                  <TimelineCard
                    key={event.id}
                    event={event}
                    index={idx}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* ── Food & Hospitality Note ───────────────── */}
        <div className="mt-14 flex items-start gap-4 px-5 py-4 border border-[#18B8DA]/20 bg-[#001018] rounded-sm">
          <Zap className="w-5 h-5 text-[#18B8DA] shrink-0 mt-0.5" />
          <p className="text-white/65 text-sm md:text-base leading-relaxed">
            <span className="text-[#18B8DA] font-bold uppercase tracking-wider text-xs">Note</span>
            <span className="text-white/25 mx-2">|</span>
            Food and refreshments will be provided at the venue throughout the duration of the hackathon. Stay fuelled, stay focused.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── day heading component ──────────────────────────────── */
function DayHeading({ label, date }: { label: string; date: string }) {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      className={`
        flex items-center gap-4 transition-all duration-700
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      `}
    >
      <div className="flex items-center gap-3 px-5 py-3 border border-[#18B8DA]/30 bg-[#001018] rounded-sm shrink-0">
        <div className="h-3 w-3 bg-[#18B8DA] animate-pulse" />
        <span className="font-ethnocentric text-[#18B8DA] text-base md:text-lg tracking-wider">
          {label}
        </span>
        <span className="text-white/40 font-mono text-xs">|</span>
        <span className="text-white/60 font-mono text-xs md:text-sm tracking-widest uppercase">
          {date}
        </span>
      </div>
      <div className="hidden sm:block flex-1 h-px bg-gradient-to-r from-[#18B8DA]/30 to-transparent" />
    </div>
  );
}