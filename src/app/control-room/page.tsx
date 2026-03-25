"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { onValue, ref, set, update, push, remove } from "firebase/database";
import { db } from "@/lib/firebase";

const ADMIN_KEY = "makeathon26";

function ControlRoomContent() {
  const searchParams = useSearchParams();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputKey, setInputKey] = useState("");
  const [loginError, setLoginError] = useState(false);

  const [timerData, setTimerData] = useState({ isRunning: false, endTime: 0, remainingMs: null as number | null, pausedAt: null as number | null });
  const [timerHours, setTimerHours] = useState("");
  const [timerMinutes, setTimerMinutes] = useState("");

  const [currentTs, setCurrentTs] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setCurrentTs(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  
  const [memes, setMemes] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const [updateText, setUpdateText] = useState("");
  const [liveUpdates, setLiveUpdates] = useState<any[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (searchParams.get("key") === ADMIN_KEY) {
      setIsAuthenticated(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const timerDbRef = ref(db, "timer");
    const memesDbRef = ref(db, "memes");
    const updatesDbRef = ref(db, "liveUpdates");

    const unsubTimer = onValue(timerDbRef, (snapshot) => {
      const val = snapshot.val();
      if (val) {
        setTimerData({
          isRunning: Boolean(val?.isRunning),
          endTime: Number(val?.endTime || 0),
          remainingMs: val?.remainingMs != null ? Number(val.remainingMs) : null,
          pausedAt: val?.pausedAt != null ? Number(val.pausedAt) : null,
        });
      }
    });

    const unsubMemes = onValue(memesDbRef, (snapshot) => {
      const val = snapshot.val();
      if (val) {
        setMemes(Object.values(val));
      } else {
        setMemes([]);
      }
    });

    const unsubUpdates = onValue(updatesDbRef, (snapshot) => {
      const val = snapshot.val();
      if (val) {
        const arr = Object.keys(val).map(key => ({ id: key, ...val[key] })).reverse();
        setLiveUpdates(arr);
      } else {
        setLiveUpdates([]);
      }
    });

    return () => {
      unsubTimer();
      unsubMemes();
      unsubUpdates();
    };
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputKey === ADMIN_KEY) {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
      setInputKey("");
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#00121F] flex items-center justify-center px-4">
        <div className="w-full max-w-sm rounded-xl border border-[#18B8DA]/30 bg-[#041724]/90 p-8 shadow-[0_0_30px_rgba(24,184,218,0.15)] text-center">
          <div className="mb-6 flex justify-center">
            <svg className="w-12 h-12 text-[#18B8DA]/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="font-ethnocentric text-xl text-[#18B8DA] mb-2 uppercase tracking-wider">Restricted Access</h1>
          <p className="text-xs font-mono text-white/50 mb-8 uppercase tracking-widest">Provide Admin Credentials</p>
          
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input 
              type="password" 
              value={inputKey} 
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="Enter Access Key..." 
              className={`w-full rounded border ${loginError ? 'border-red-500/50 focus:border-red-500 text-red-200' : 'border-[#18B8DA]/30 focus:border-[#18B8DA] text-white'} bg-black/40 px-4 py-3 text-sm text-center font-mono outline-none transition uppercase tracking-widest`}
              autoFocus
            />
            {loginError && <p className="text-[10px] text-red-400 font-mono uppercase tracking-widest">Access Denied</p>}
            
            <button type="submit" className="mt-2 w-full rounded border border-[#18B8DA]/50 bg-[#18B8DA]/20 py-3 text-xs font-bold text-[#9ceaff] hover:bg-[#18B8DA]/30 transition uppercase tracking-widest">
              Authenticate
            </button>
          </form>
        </div>
      </main>
    );
  }

  const startHackathon = async () => {
    const h = parseInt(timerHours || "0", 10);
    const m = parseInt(timerMinutes || "0", 10);
    const ms = (h * 60 * 60 * 1000) + (m * 60 * 1000);
    
    if (ms <= 0) {
      setStatus("Please enter a valid time.");
      return;
    }

    await set(ref(db, "timer"), {
      endTime: Date.now() + ms,
      isRunning: true,
      remainingMs: null,
      pausedAt: null
    });
    setStatus(`Hackathon started for ${h}h ${m}m.`);
  };

  const pauseHackathon = async () => {
    const remaining = Math.max(0, timerData.endTime - Date.now());
    await update(ref(db, "timer"), { isRunning: false, remainingMs: remaining, pausedAt: Date.now() });
    setStatus("Hackathon timer paused.");
  };

  const resumeHackathon = async () => {
    const ms = timerData.remainingMs != null ? timerData.remainingMs : Math.max(0, timerData.endTime - Date.now());
    await update(ref(db, "timer"), { isRunning: true, endTime: Date.now() + ms, remainingMs: null, pausedAt: null });
    setStatus("Hackathon timer resumed.");
  };

  const resetHackathon = async () => {
    await set(ref(db, "timer"), {
      endTime: 0,
      isRunning: false,
      remainingMs: null,
      pausedAt: null
    });
    setStatus("Hackathon timer reset.");
  };

  // MULTI IMAGE UPLOAD (BASE64 TO AVOID STORAGE RULES)
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(Array.from(event.target.files));
    }
  };

  const uploadMemes = async () => {
    if (selectedFiles.length === 0) return;
    setIsUploading(true);
    setStatus(`Converting and uploading ${selectedFiles.length} meme(s)...`);

    try {
      const newBase64Urls: string[] = await Promise.all(
        selectedFiles.map((file) => {
          return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
          });
        })
      );
      
      const updatedMemes = [...memes, ...newBase64Urls];
      await set(ref(db, "memes"), updatedMemes);
      
      setStatus(`Successfully pushed ${selectedFiles.length} meme(s) to dashboard.`);
      setSelectedFiles([]);
      // we can't easily reset the input file value without a ref, but clearing selectedFiles is enough
    } catch (err: any) {
      console.error(err);
      setStatus("Failed to upload memes. File might be too large.");
    } finally {
      setIsUploading(false);
    }
  };

  const clearMemes = async () => {
    await set(ref(db, "memes"), []);
    setStatus("Cleared all memes.");
  };

  const formatMs = (ms: number) => {
    const totalSecs = Math.floor(ms / 1000);
    const h = Math.floor(totalSecs / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const deleteLiveUpdate = async (id: string) => {
    try {
      await remove(ref(db, `liveUpdates/${id}`));
      setStatus("Deleted message.");
    } catch (err) {
      setStatus("Failed to delete message.");
    }
  };

  const handleBroadcastClick = () => {
    if (!updateText.trim()) return;
    setShowConfirm(true);
  };

  const sendLiveUpdate = async () => {
    try {
      await push(ref(db, "liveUpdates"), {
        text: updateText.trim(),
        timestamp: Date.now()
      });
      setUpdateText("");
      setStatus("Sent live update.");
      setShowConfirm(false);
    } catch (err) {
      setStatus("Failed to send update.");
      setShowConfirm(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#00121F] px-4 py-12 text-white">
      <div className="mx-auto w-full max-w-3xl rounded-2xl border border-[#18B8DA]/35 bg-[#041724]/85 p-6 shadow-[0_0_30px_rgba(24,184,218,0.2)]">
        <h1 className="font-ethnocentric text-3xl text-[#18B8DA]">Control Room</h1>
        <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-white/70">
          Secret admin panel for live timer, memes, and updates.
        </p>

        {status && (
          <div className="mt-4 rounded-lg bg-[#18B8DA]/20 border border-[#18B8DA]/40 px-4 py-2 text-sm text-[#9ceaff]">
            System: {status}
          </div>
        )}

        {/* TIMER SECTION */}
        <div className="mt-6 border-t border-white/10 pt-6">
          <h2 className="text-xl font-bold text-[#18B8DA] mb-4">⏱ Manage Timer</h2>
          <div className="flex gap-4 items-end bg-black/20 p-4 rounded-xl border border-white/5">
            <div>
              <label className="mb-2 block font-mono text-xs uppercase text-white/60">Hours</label>
              <input type="number" min="0" value={timerHours} onChange={(e) => setTimerHours(e.target.value)} placeholder="e.g. 24" className="w-20 rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-white outline-none focus:border-[#18B8DA]" />
            </div>
            <div>
              <label className="mb-2 block font-mono text-xs uppercase text-white/60">Minutes</label>
              <input type="number" min="0" value={timerMinutes} onChange={(e) => setTimerMinutes(e.target.value)} placeholder="0" className="w-20 rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-white outline-none focus:border-[#18B8DA]" />
            </div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <button onClick={startHackathon} className="rounded-lg border border-[#18B8DA]/50 bg-[#18B8DA]/15 px-4 py-3 text-sm font-semibold text-[#9ceaff] transition hover:bg-[#18B8DA]/25">
              Start Timer
            </button>
            <button onClick={pauseHackathon} className="rounded-lg border border-yellow-400/40 bg-yellow-400/10 px-4 py-3 text-sm font-semibold text-yellow-200 transition hover:bg-yellow-400/20">
              Pause
            </button>
            <button onClick={resumeHackathon} className="rounded-lg border border-green-400/40 bg-green-400/10 px-4 py-3 text-sm font-semibold text-green-200 transition hover:bg-green-400/20">
              Resume
            </button>
            <button onClick={resetHackathon} className="rounded-lg border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm font-semibold text-red-200 transition hover:bg-red-400/20">
              Reset
            </button>
          </div>
          <p className="mt-3 font-mono text-xs text-white/50">
            Status: {timerData.isRunning ? "Running" : "Paused / Stopped"}
            {!timerData.isRunning && timerData.remainingMs != null && (
              <>
                <span className="ml-2 text-yellow-400 font-bold">
                  (Frozen at: {formatMs(timerData.remainingMs)} remaining)
                </span>
                {timerData.pausedAt != null && (
                  <span className="ml-2 text-red-400 font-bold">
                    [Paused for: {formatMs(Math.max(0, currentTs - timerData.pausedAt))}]
                  </span>
                )}
              </>
            )}
          </p>
        </div>

        {/* MEME SECTION */}
        <div className="mt-6 border-t border-white/10 pt-6">
          <h2 className="text-xl font-bold text-[#18B8DA] mb-4">🎭 Manage Memes</h2>
          <div className="bg-black/20 p-4 rounded-xl border border-white/5">
            <label className="mb-3 block font-mono text-xs uppercase tracking-[0.1em] text-white/70">
              Select & Push Memes (Images)
            </label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <input 
                type="file" 
                multiple 
                accept="image/*"
                onChange={handleFileSelect}
                disabled={isUploading}
                className="block text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#18B8DA]/10 file:text-[#18B8DA] hover:file:bg-[#18B8DA]/20 cursor-pointer"
              />
              {selectedFiles.length > 0 && (
                <button 
                  onClick={uploadMemes}
                  disabled={isUploading}
                  className="rounded-lg border border-[#18B8DA]/50 bg-[#18B8DA] px-4 py-2 text-sm font-bold text-[#00121F] transition hover:bg-[#129FB0]"
                >
                  {isUploading ? "Pushing..." : `Push ${selectedFiles.length} Meme(s) to DB`}
                </button>
              )}
            </div>
            
            {memes.length > 0 && (
              <div className="mt-5 border-t border-white/5 pt-4">
                <p className="text-xs text-white/50 mb-3">{memes.length} memes currently active on Dashboard.</p>
                <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                  {memes.map((url, i) => (
                    <img key={i} src={url} alt={`meme-${i}`} className="h-20 w-20 object-cover rounded shadow-md border border-white/10" />
                  ))}
                </div>
                <button onClick={clearMemes} className="mt-3 text-xs text-red-400 hover:text-red-300 underline">Clear All Active Memes</button>
              </div>
            )}
          </div>
        </div>

        {/* LIVE UPDATES SECTION */}
        <div className="mt-6 border-t border-white/10 pt-6">
          <h2 className="text-xl font-bold text-[#18B8DA] mb-4">📡 Status / Live Updates</h2>
          <div className="bg-black/20 p-4 rounded-xl border border-white/5">
            <textarea 
              value={updateText}
              onChange={(e) => setUpdateText(e.target.value)}
              placeholder="Type an announcement to broadcast..."
              className="w-full h-24 rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-white outline-none focus:border-[#18B8DA] resize-none"
            />
            {showConfirm ? (
              <div className="mt-3 rounded-lg border border-yellow-400/30 bg-yellow-400/10 p-3">
                <p className="text-sm text-yellow-200 mb-3">Are you sure you want to broadcast this message to the Live Dashboard?</p>
                <div className="flex gap-3">
                  <button onClick={sendLiveUpdate} className="rounded bg-yellow-400 px-4 py-1.5 text-xs font-bold text-black hover:bg-yellow-300">Confirm Send</button>
                  <button onClick={() => setShowConfirm(false)} className="rounded border border-white/20 bg-white/5 px-4 py-1.5 text-xs text-white hover:bg-white/10">Cancel</button>
                </div>
              </div>
            ) : (
              <button 
                onClick={handleBroadcastClick}
                className="mt-3 w-full rounded-lg border border-[#18B8DA]/50 bg-[#18B8DA]/15 py-3 text-sm font-bold text-[#9ceaff] transition hover:bg-[#18B8DA]/30"
              >
                Broadcast Message
              </button>
            )}

            {liveUpdates.length > 0 && (
              <div className="mt-5 space-y-2">
                <p className="text-xs text-white/50 tracking-wider">PREVIOUS MESSAGES:</p>
                {liveUpdates.slice(0, 5).map((upd) => (
                  <div key={upd.id} className="group relative rounded border border-white/10 bg-white/5 p-2 text-sm text-white/80">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[#18B8DA] text-xs font-mono">
                        [{new Date(upd.timestamp).toLocaleTimeString()}]
                      </span>
                      <button 
                        onClick={() => deleteLiveUpdate(upd.id)}
                        className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 text-xs px-2 py-0.5 rounded border border-red-500/30 bg-red-500/10 transition-opacity"
                        title="Delete message"
                      >
                        Delete
                      </button>
                    </div>
                    {upd.text}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}

export default function ControlRoomPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#00121F]" />}>
      <ControlRoomContent />
    </Suspense>
  );
}
