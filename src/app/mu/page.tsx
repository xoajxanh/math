"use client";

import { useState, useEffect, useRef, useMemo } from "react";

// --- Types & Data ---
interface Boss {
  id: string;
  name: string;
  mapId: string;
  subMap?: string;
}

interface BossState {
  spawnTime: number; // timestamp in ms when the boss spawns (0 means alive)
  defaultCooldown: number; // in seconds
}

interface MapArea {
  id: string;
  name: string;
  color: string;
}

const MAPS: MapArea[] = [
  { id: "wild", name: "Hoang Dã 🌲", color: "bg-emerald-50 border-emerald-400 text-emerald-900" },
  { id: "jewelry", name: "Trang Sức 💎", color: "bg-amber-50 border-amber-400 text-amber-900" },
  { id: "trial", name: "Thí Luyện ⚔️", color: "bg-purple-50 border-purple-400 text-purple-900" },
  { id: "purgatory", name: "Luyện Ngục 🔥", color: "bg-rose-50 border-rose-400 text-rose-900" }
];

const INITIAL_BOSSES: Boss[] = [
  // Hoang Dã (6)
  { id: "w1", name: "Hoang Dã 1(1)", mapId: "wild" },
  { id: "w2", name: "Hoang Dã 1(2)", mapId: "wild" },
  { id: "w3", name: "Hoang Dã 2(1)", mapId: "wild" },
  { id: "w4", name: "Hoang Dã 2(2)", mapId: "wild" },
  { id: "w5", name: "Hoang Dã 3(1)", mapId: "wild" },
  { id: "w6", name: "Hoang Dã 3(2)", mapId: "wild" },
  // Trang Sức (2)
  { id: "j1", name: "Trang Sức 1", mapId: "jewelry" },
  { id: "j2", name: "Trang Sức 2", mapId: "jewelry" },
  // Thí Luyện (3)
  { id: "t1", name: "Thí Luyện 1", mapId: "trial" },
  { id: "t2", name: "Thí Luyện 2", mapId: "trial" },
  { id: "t3", name: "Thí Luyện 3", mapId: "trial" },
  // Luyện Ngục (C7) - 3
  { id: "p1", name: "Luyện Ngục 1", mapId: "purgatory", subMap: "C7" },
  { id: "p2", name: "Luyện Ngục 2", mapId: "purgatory", subMap: "C7" },
  { id: "p3", name: "Luyện Ngục 3", mapId: "purgatory", subMap: "C7" },
  // Luyện Ngục (C6) - 5
  { id: "p6_1_1", name: "Luyện Ngục 1(1)", mapId: "purgatory", subMap: "C6" },
  { id: "p6_1_2", name: "Luyện Ngục 1(2)", mapId: "purgatory", subMap: "C6" },
  { id: "p6_2_1", name: "Luyện Ngục 2(1)", mapId: "purgatory", subMap: "C6" },
  { id: "p6_2_2", name: "Luyện Ngục 2(2)", mapId: "purgatory", subMap: "C6" },
  { id: "p6_3", name: "Luyện Ngục 3", mapId: "purgatory", subMap: "C6" },
];

const DEFAULT_COOLDOWN = 15 * 60; // 15 phút mặc định

export default function MuPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [bossStates, setBossStates] = useState<Record<string, BossState>>({});
  const [now, setNow] = useState(Date.now());
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [purgatoryMode, setPurgatoryMode] = useState<"C6" | "C7">("C7");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [collapsedMaps, setCollapsedMaps] = useState<Record<string, boolean>>({});

  const toggleMapCollapse = (mapId: string) => {
    setCollapsedMaps(prev => ({ ...prev, [mapId]: !prev[mapId] }));
  };

  // Audio Context cho tiếng tick
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem("mu_boss_timers");
    if (saved) {
      try {
        setBossStates(JSON.parse(saved));
      } catch (e) {
        console.error("Lỗi load JSON:", e);
      }
    } else {
      const initialStates: Record<string, BossState> = {};
      INITIAL_BOSSES.forEach(b => {
        initialStates[b.id] = { spawnTime: 0, defaultCooldown: DEFAULT_COOLDOWN };
      });
      setBossStates(initialStates);
    }
  }, []);

  // Save to LocalStorage whenever state changes
  useEffect(() => {
    if (Object.keys(bossStates).length > 0) {
      localStorage.setItem("mu_boss_timers", JSON.stringify(bossStates));
    }
  }, [bossStates]);

  useEffect(() => {
    const savedMode = localStorage.getItem("mu_purgatory_mode");
    if (savedMode === "C6" || savedMode === "C7") {
      setPurgatoryMode(savedMode);
    }
  }, []);

  const handleModeChange = (mode: "C6" | "C7") => {
    setPurgatoryMode(mode);
    localStorage.setItem("mu_purgatory_mode", mode);
  };

  // Tick interval
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const interval = setInterval(() => {
      const currentNow = Date.now();
      setNow(currentNow);

      if (soundEnabled) {
        // Kiểm tra xem có boss nào <= 30s không
        let hasUrgent = false;
        for (const bossId in bossStates) {
          const bs = bossStates[bossId];
          const remaining = Math.max(0, Math.ceil((bs.spawnTime - currentNow) / 1000));
          if (remaining > 0 && remaining <= 30) {
            hasUrgent = true;
            break;
          }
        }
        if (hasUrgent) {
          playTickSound();
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isAuthenticated, bossStates, soundEnabled]);

  const getAudioCtx = () => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        audioCtxRef.current = new AudioContextClass();
      }
    }
    if (audioCtxRef.current?.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const playTickSound = () => {
    const ctx = getAudioCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.5, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "12345ZXC") {
      setIsAuthenticated(true);
      setError("");
      // Kích hoạt audio context ngay khi click (đáp ứng policy trình duyệt)
      getAudioCtx();
    } else {
      setError("Mật khẩu không đúng!");
      setPassword("");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900">
        <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl border-2 border-slate-700 w-full max-w-md">
          <h1 className="text-2xl font-black text-amber-500 mb-6 text-center tracking-widest">HỆ THỐNG MẬT TÔNG</h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-600 bg-slate-700 text-slate-100 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 outline-none transition-all font-mono tracking-widest text-center text-xl"
                placeholder="••••••••"
                autoFocus
              />
            </div>
            {error && <p className="text-rose-500 font-bold text-sm text-center animate-pulse">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 mt-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-900 font-black rounded-xl transition-all active:scale-95 shadow-[0_0_15px_rgba(245,158,11,0.5)]"
            >
              KẾT NỐI
            </button>
          </form>
        </div>
      </div>
    );
  }



  // Calculate upcoming bosses
  const upcomingBosses = INITIAL_BOSSES.filter(b => !b.subMap || b.subMap === purgatoryMode).map(b => {
    const state = bossStates[b.id] || { spawnTime: 0, defaultCooldown: DEFAULT_COOLDOWN };
    const remaining = state.spawnTime === -1 ? -1 : Math.max(0, Math.ceil((state.spawnTime - now) / 1000));
    return { ...b, remaining, state };
  })
  .filter(b => b.remaining !== -1)
  .sort((a, b) => a.remaining - b.remaining);

  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-100 font-sans">
      
      {/* LEFT: MAIN PANEL */}
      <div className="flex-1 p-2 md:p-3 flex flex-col h-screen overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-3 bg-slate-800 p-2 px-4 rounded-2xl border border-slate-700 shadow-lg">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🐉</span>
            <h1 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 uppercase tracking-wider">
              Mu Boss Timer
            </h1>
          </div>
          <button 
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              if (!soundEnabled) getAudioCtx(); // init audio ctx
            }}
            className={`px-3 py-1.5 rounded-xl font-bold border-2 transition-all flex items-center gap-2 text-sm
              ${soundEnabled ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-slate-700 border-slate-600 text-slate-400 hover:bg-slate-600'}`}
          >
            {soundEnabled ? '🔊 Bật Âm Báo' : '🔇 Tắt Âm Báo'}
          </button>
        </div>

        {/* 4 Maps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 flex-1 overflow-y-auto pr-2 pb-10 custom-scrollbar content-start">
          {MAPS.map(mapArea => {
            const mapBosses = INITIAL_BOSSES.filter(b => b.mapId === mapArea.id && (!b.subMap || b.subMap === purgatoryMode));
            return (
              <div key={mapArea.id} className={`p-3 rounded-2xl border-2 flex flex-col bg-slate-800/50 ${mapArea.color.replace('bg-', 'border-').split(' ')[1]}`}>
                <div 
                  className="flex items-center justify-between border-b border-slate-700 pb-1 mb-2 cursor-pointer hover:bg-slate-700/30 rounded-lg transition-colors px-2 -mx-2"
                  onClick={() => toggleMapCollapse(mapArea.id)}
                >
                  <h2 className="text-lg font-black flex items-center gap-2">
                    <span className="text-xl">{mapArea.name.slice(-2)}</span> 
                    {mapArea.name.slice(0, -2)}
                  </h2>
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    {mapArea.id === "purgatory" && (
                      <div className="flex gap-1 bg-slate-900 rounded-lg p-1 border border-slate-700">
                        <button
                          onClick={() => handleModeChange("C6")}
                          className={`px-3 py-1 rounded text-sm font-bold transition-colors ${purgatoryMode === "C6" ? "bg-rose-500 text-white" : "text-slate-400 hover:text-slate-200"}`}
                        >
                          C6
                        </button>
                        <button
                          onClick={() => handleModeChange("C7")}
                          className={`px-3 py-1 rounded text-sm font-bold transition-colors ${purgatoryMode === "C7" ? "bg-rose-500 text-white" : "text-slate-400 hover:text-slate-200"}`}
                        >
                          C7
                        </button>
                      </div>
                    )}
                    <span className="text-slate-500 ml-1 text-sm bg-slate-900 p-1 rounded-lg border border-slate-700 w-8 flex justify-center">{collapsedMaps[mapArea.id] ? '▼' : '▲'}</span>
                  </div>
                </div>
                
                {!collapsedMaps[mapArea.id] && (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 flex-1 content-start">
                  {mapBosses.map(boss => (
                    <BossCard 
                      key={boss.id} 
                      boss={boss} 
                      state={bossStates[boss.id]} 
                      now={now}
                      updateState={(newState) => setBossStates(prev => ({...prev, [boss.id]: newState}))}
                    />
                  ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* MOBILE SIDEBAR TOGGLE BUTTON */}
      <button 
        className="lg:hidden fixed right-0 top-1/2 -translate-y-1/2 bg-amber-500 hover:bg-amber-400 text-slate-900 rounded-l-xl p-2 z-50 shadow-[0_0_15px_rgba(245,158,11,0.5)] border-2 border-r-0 border-amber-600 font-black transition-all"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? '▶' : '⏳'}
      </button>

      {/* OVERLAY for Mobile */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* RIGHT: UPCOMING PANEL */}
      <div className={`
        fixed lg:static top-0 right-0 h-screen z-50
        w-80 bg-slate-800 border-l-2 border-slate-700 flex flex-col shadow-2xl transition-transform duration-300
        ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-5 border-b border-slate-700 bg-slate-900/50 flex justify-between items-center">
          <h2 className="text-xl font-black text-amber-400 uppercase tracking-widest flex items-center gap-2">
            <span>⏳</span> Sắp Xuất Hiện
          </h2>
          <button 
            className="lg:hidden text-slate-400 hover:text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            ✕
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {upcomingBosses.length === 0 ? (
            <div className="text-center text-slate-500 font-bold mt-10 p-4 border-2 border-dashed border-slate-700 rounded-xl">
              Chưa có Boss nào đang đếm ngược
            </div>
          ) : (
            upcomingBosses.map(b => (
              <div key={b.id} className={`p-3 rounded-xl border-2 flex flex-col gap-1 transition-all
                ${b.remaining <= 30 && b.remaining > 0 ? 'bg-rose-500/20 border-rose-500 animate-pulse shadow-[0_0_15px_rgba(243,24,71,0.3)]' : b.remaining === 0 ? 'bg-emerald-900/20 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-slate-700/50 border-slate-600'}
              `}>
                <div className="flex justify-between items-start">
                  <span className="font-bold text-sm text-slate-200">
                    <BossNameRenderer name={b.name} />
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-bold">
                    {MAPS.find(m => m.id === b.mapId)?.name.split(' ')[0]}
                  </span>
                </div>
                {b.remaining === 0 ? (
                  <div className="text-emerald-400 font-bold font-mono px-2 py-1 rounded text-sm w-max">
                    Đã xuất hiện
                  </div>
                ) : (
                  <div className={`text-xl font-mono font-black ${b.remaining <= 30 ? 'text-rose-400' : 'text-amber-400'}`}>
                    {formatTime(b.remaining)}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}

// --- Components ---

function BossCard({ boss, state, now, updateState }: { 
  boss: Boss; 
  state: BossState | undefined; 
  now: number; 
  updateState: (s: BossState) => void;
}) {
  const safeState = state || { spawnTime: 0, defaultCooldown: DEFAULT_COOLDOWN };
  const isIgnored = safeState.spawnTime === -1;
  const remainingSeconds = isIgnored ? 0 : Math.max(0, Math.ceil((safeState.spawnTime - now) / 1000));

  // Picker States
  const [activeDigitIndex, setActiveDigitIndex] = useState<number | null>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  // Parse current MM:SS into digits
  const m = Math.floor(remainingSeconds / 60);
  const s = remainingSeconds % 60;
  
  const mTens = Math.floor(m / 10);
  const mOnes = m % 10;
  const sTens = Math.floor(s / 10);
  const sOnes = s % 10;

  const digits = [mTens, mOnes, sTens, sOnes];

  // Close popup if click outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setActiveDigitIndex(null);
      }
    };
    if (activeDigitIndex !== null) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [activeDigitIndex]);

  const handleDigitSelect = (index: number, val: number) => {
    const newDigits = [...digits];
    newDigits[index] = val;
    
    // Recalculate total seconds
    const newM = newDigits[0] * 10 + newDigits[1];
    const newS = newDigits[2] * 10 + newDigits[3];
    const totalSeconds = newM * 60 + newS;

    updateState({
      ...safeState,
      spawnTime: totalSeconds > 0 ? now + totalSeconds * 1000 : 0
    });
    setActiveDigitIndex(null);
  };

  const toggleIgnore = () => {
    updateState({
      ...safeState,
      spawnTime: isIgnored ? now + 30 * 60 * 1000 : -1
    });
  };

  return (
    <div className={`bg-slate-900 border-2 rounded-2xl p-2.5 flex flex-col justify-between relative shadow-md transition-colors
      ${remainingSeconds === 0 && !isIgnored ? 'border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'border-slate-700 hover:border-slate-500'}
    `}>
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-slate-200 text-xs leading-tight w-full">
          <BossNameRenderer name={boss.name} />
        </h3>
      </div>

      {/* Timer & Kill Action */}
      <div className="flex items-center justify-between gap-2 mt-auto">
        {/* Timer Display */}
        <div className="relative" ref={pickerRef}>
          {isIgnored ? (
            <div className="text-xl font-black font-mono text-slate-500 bg-slate-800 px-2 py-0.5 rounded-xl border border-slate-700">
              BỎ QUA
            </div>
          ) : (
            <div className={`flex items-center text-2xl font-black font-mono tracking-widest px-2 py-1 rounded-xl border-2 shadow-inner
              ${remainingSeconds === 0 ? 'text-emerald-400 bg-emerald-900/30 border-emerald-500/30' : 'text-amber-400 bg-slate-800 border-slate-600'}
            `}>
              <DigitSpan val={mTens} isActive={activeDigitIndex === 0} onClick={() => setActiveDigitIndex(0)} />
              <DigitSpan val={mOnes} isActive={activeDigitIndex === 1} onClick={() => setActiveDigitIndex(1)} />
              <span className={`mx-1 pb-1 ${remainingSeconds === 0 ? 'text-emerald-500/50' : 'text-slate-500'}`}>:</span>
              <DigitSpan val={sTens} isActive={activeDigitIndex === 2} onClick={() => setActiveDigitIndex(2)} />
              <DigitSpan val={sOnes} isActive={activeDigitIndex === 3} onClick={() => setActiveDigitIndex(3)} />
            </div>
          )}

          {/* Popups */}
          {activeDigitIndex === 0 && <DigitPopup options={[0, 1, 2]} onSelect={(v) => handleDigitSelect(0, v)} />}
          {activeDigitIndex === 1 && <DigitPopup options={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]} onSelect={(v) => handleDigitSelect(1, v)} />}
          {activeDigitIndex === 2 && <DigitPopup options={[0, 1, 2, 3, 4, 5]} onSelect={(v) => handleDigitSelect(2, v)} />}
          {activeDigitIndex === 3 && <DigitPopup options={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]} onSelect={(v) => handleDigitSelect(3, v)} />}
        </div>

        {/* Ignore/Enable Button */}
        <button 
          onClick={toggleIgnore}
          title={isIgnored ? "Bật theo dõi" : "Bỏ qua boss này"}
          className={`w-10 h-10 border-2 rounded-xl flex items-center justify-center text-lg transition-all active:scale-90 flex-shrink-0
            ${isIgnored ? 'bg-slate-700 border-slate-600 grayscale opacity-50' : 'bg-rose-500/10 hover:bg-rose-500/30 border-rose-500/50'}
          `}
        >
          💀
        </button>
      </div>
    </div>
  );
}

function DigitSpan({ val, isActive, onClick }: { val: number; isActive: boolean; onClick: () => void }) {
  return (
    <span 
      onClick={onClick}
      className={`cursor-pointer px-1 rounded-md transition-colors
        ${isActive ? 'bg-amber-500 text-slate-900' : 'hover:bg-slate-700 hover:text-white'}
      `}
    >
      {val}
    </span>
  );
}

function DigitPopup({ options, onSelect }: { options: number[], onSelect: (v: number) => void }) {
  return (
    <div className="absolute top-full left-0 mt-2 z-50 bg-slate-800 border-2 border-amber-500 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.5)] p-2 grid grid-cols-3 gap-2 w-48 animate-pop">
      {options.map(num => (
        <button
          key={num}
          onClick={() => onSelect(num)}
          className="py-2 bg-slate-700 hover:bg-amber-400 hover:text-slate-900 text-white font-mono font-black text-xl rounded-lg transition-colors border border-slate-600"
        >
          {num}
        </button>
      ))}
      <div className="col-span-full pt-1">
        <div className="text-[10px] text-center text-slate-400 font-bold uppercase">Chọn 1 số</div>
      </div>
    </div>
  );
}

// --- Utils ---
function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function BossNameRenderer({ name }: { name: string }) {
  const match = name.match(/^(.*?)\s*\((.*?)\)$/);
  if (!match) return <>{name}</>;
  return (
    <span className="flex items-center">
      {match[1]}
      <span className="ml-1.5 text-[10px] text-amber-400 font-bold -translate-y-[2px]">({match[2]})</span>
    </span>
  );
}
