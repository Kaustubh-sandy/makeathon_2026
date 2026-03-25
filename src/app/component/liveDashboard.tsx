"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { onValue, ref } from "firebase/database";
import { db } from "@/lib/firebase";
import Counter from "@/components/Counter";
import DecryptedText from "@/components/DecryptedText";

type LiveUpdate = {
  id: string;
  timestamp?: number;
  text?: string;
};

export default function LiveDashboard() {
  const [timer, setTimer] = useState({ endTime: 0, isRunning: false, remainingMs: null as number | null });
  const [nowTs, setNowTs] = useState(() => Date.now());
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window === "undefined" ? 1024 : window.innerWidth
  );

  const [memes, setMemes] = useState<string[]>([]);
  const [currentMemeIndex, setCurrentMemeIndex] = useState(0);

  const [liveUpdates, setLiveUpdates] = useState<LiveUpdate[]>([]);

  useEffect(() => {
    const timerRef = ref(db, "timer");
    const memesRef = ref(db, "memes");
    const updatesRef = ref(db, "liveUpdates");

    const unsubscribeTimer = onValue(timerRef, (snapshot) => {
      const value = snapshot.val();
      if (value) {
        setTimer({
          endTime: Number(value.endTime || 0),
          isRunning: Boolean(value.isRunning),
          remainingMs: value.remainingMs != null ? Number(value.remainingMs) : null,
        });
        setNowTs(Date.now());
      }
    });

    const unsubscribeMemes = onValue(memesRef, (snapshot) => {
      const value = snapshot.val();
      if (value) {
        const urlArray = Object.values(value) as string[];
        setMemes(urlArray);
        setCurrentMemeIndex(0);
      } else {
        setMemes([]);
      }
    });

    const unsubscribeUpdates = onValue(updatesRef, (snapshot) => {
      const value = snapshot.val();
      if (value) {
        const arr = Object.keys(value)
          .map((k) => ({ id: k, ...(value[k] as Omit<LiveUpdate, "id">) }))
          .reverse();
        setLiveUpdates(arr);
      } else {
        setLiveUpdates([]);
      }
    });

    return () => {
      unsubscribeTimer();
      unsubscribeMemes();
      unsubscribeUpdates();
    };
  }, []);

  // Timer Tick
  useEffect(() => {
    if (!timer.isRunning) return;
    const intervalId = window.setInterval(() => {
      setNowTs(Date.now());
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timer.isRunning]);

  // Meme auto-rotate (every 5 seconds)
  useEffect(() => {
    if (memes.length <= 1) return;
    const intervalId = window.setInterval(() => {
      setCurrentMemeIndex((prev) => (prev + 1) % memes.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [memes.length]);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const remainingMs = useMemo(() => {
    if (!timer.isRunning && timer.remainingMs != null) {
      return timer.remainingMs;
    }
    return Math.max(timer.endTime - nowTs, 0);
  }, [timer.endTime, nowTs, timer.isRunning, timer.remainingMs]);

  const { hours, minutes, seconds } = useMemo(() => {
    const totalSecs = Math.floor(remainingMs / 1000);
    return {
      hours: Math.floor(totalSecs / 3600),
      minutes: Math.floor((totalSecs % 3600) / 60),
      seconds: totalSecs % 60,
    };
  }, [remainingMs]);

  const timerUI = useMemo(() => {
    if (viewportWidth < 360) {
      return { fontSize: 28, gap: 2, hPadding: 2, colonClass: "mx-1 text-xl", titleClass: "text-[10px]" };
    }
    if (viewportWidth < 480) {
      return { fontSize: 36, gap: 3, hPadding: 2, colonClass: "mx-1 text-2xl", titleClass: "text-xs" };
    }
    if (viewportWidth < 640) {
      return { fontSize: 56, gap: 4, hPadding: 3, colonClass: "mx-1.5 text-5xl", titleClass: "text-xs" };
    }
    if (viewportWidth < 768) {
      return { fontSize: 68, gap: 5, hPadding: 4, colonClass: "mx-2 text-6xl", titleClass: "text-sm" };
    }
    return { fontSize: 96, gap: 8, hPadding: 6, colonClass: "mx-3 text-7xl", titleClass: "text-sm" };
  }, [viewportWidth]);

  return (
    <section
      id="live-dashboard"
      className="relative z-10 border-b border-[#18B8DA]/25 px-4 pt-10 sm:pt-12"
    >
      <div className="mx-auto w-full max-w-7xl">

        {/* TOP ROW: TIMER */}
        <div className="mt-1 flex flex-col items-center justify-center p-8 ">
          <p className={`mb-6 font-mono font-bold uppercase tracking-[0.35em] text-[#18B8DA] ${timerUI.titleClass}`}>
            Live Hackathon Timer
          </p>

          <div className="w-full overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden text-center">
            <div className="inline-flex items-center justify-center text-white font-ethnocentric tracking-widest" style={{ textShadow: "0 0 24px rgba(24,184,218,0.45)" }}>
              <Counter
                value={hours}
                places={[10, 1]}
                fontSize={timerUI.fontSize}
                gap={timerUI.gap}
                horizontalPadding={timerUI.hPadding}
                textColor="white"
                gradientFrom="#00121F"
                gradientTo="transparent"
              />
              <span className={`${timerUI.colonClass} text-[#18B8DA] animate-pulse`}>:</span>
              <Counter
                value={minutes}
                places={[10, 1]}
                fontSize={timerUI.fontSize}
                gap={timerUI.gap}
                horizontalPadding={timerUI.hPadding}
                textColor="white"
                gradientFrom="#00121F"
                gradientTo="transparent"
              />
              <span className={`${timerUI.colonClass} text-[#18B8DA] animate-pulse`}>:</span>
              <Counter
                value={seconds}
                places={[10, 1]}
                fontSize={timerUI.fontSize}
                gap={timerUI.gap}
                horizontalPadding={timerUI.hPadding}
                textColor="white"
                gradientFrom="#00121F"
                gradientTo="transparent"
              />
            </div>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full opacity-75 ${timer.isRunning ? 'bg-[#18B8DA]' : 'bg-red-500'}`}></span>
              <span className={`relative inline-flex h-3 w-3 ${timer.isRunning ? 'bg-[#18B8DA]' : 'bg-red-500'}`}></span>
            </span>
            <p className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white/80">
              {timer.isRunning ? "System Active & Counting" : "Clock Paused"}
            </p>
          </div>
        </div>

        {/* BOTTOM ROW: MEMES & LIVE UPDATES */}
        <div className="grid gap-8 lg:grid-cols-2">

          {/* MEME FEED */}
          <div className="p-6 flex flex-col h-100">

            <div className="relative flex-1 overflow-hidden rounded-xl border border-white/10 bg-black/35">
              <AnimatePresence mode="wait">
                {memes.length > 0 ? (
                  <motion.img
                    key={memes[currentMemeIndex]}
                    src={memes[currentMemeIndex]}
                    alt="Live meme"
                    className="h-full w-full object-contain bg-black/50"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                ) : (
                  <motion.div
                    key="meme-placeholder"
                    className="flex h-full items-center justify-center p-6 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="flex flex-col items-center opacity-40">
                      <svg className="w-12 h-12 mb-3 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm font-mono tracking-widest text-white uppercase">Awaiting Transmission</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* LIVE UPDATES */}
          <div className="p-6 flex flex-col h-100">
            <div className="flex items-center justify-between mb-6">
              <p className="font-ethnocentric text-sm font-bold uppercase tracking-[0.35em] text-[#18B8DA]">Disrupting System</p>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 bg-green-500"></span>
              </span>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-3">
              <AnimatePresence>
                {liveUpdates.length > 0 ? (
                  liveUpdates.map((update, idx) => (
                    <motion.div
                      key={update.id}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05, duration: 0.3 }}
                      className="group relative rounded-lg border border-[#18B8DA]/20 bg-[#18B8DA]/5 p-4 hover:bg-[#18B8DA]/10 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <svg className="w-5 h-5 text-[#18B8DA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span className="text-sm font-mono font-bold text-[#18B8DA]/85">
                          {update.timestamp ? new Date(update.timestamp).toLocaleTimeString() : "LIVE"}
                        </span>
                      </div>
                      <DecryptedText
                        text={update.text || "Live system message"}
                        animateOn="view"
                        sequential
                        speed={24}
                        className="font-montserrat text-lg md:text-xl font-bold text-white leading-relaxed"
                        encryptedClassName="font-montserrat text-lg md:text-xl font-bold text-[#18B8DA]/80 leading-relaxed"
                      />
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex h-full items-center justify-center opacity-40 flex-col"
                  >
                    <svg className="w-12 h-12 mb-3 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <span className="text-sm font-mono font-bold tracking-widest text-white uppercase">No active operations</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Scrollbar styling injected for this component */}
            <style jsx>{`
              .custom-scrollbar::-webkit-scrollbar {
                width: 4px;
              }
              .custom-scrollbar::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.02);
              }
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background: rgba(24, 184, 218, 0.3);
                border-radius: 4px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: rgba(24, 184, 218, 0.8);
              }
            `}</style>
          </div>

        </div>
      </div>
    </section>
  );
}
