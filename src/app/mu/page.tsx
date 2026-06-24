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
  claimedBy?: string;
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
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "12345ZXC";
const ADMIN_PASSWORD_SUPER = process.env.NEXT_PUBLIC_SUPER_ADMIN_PASSWORD || "0chomayBIK!@#";

export default function MuPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [characterName, setCharacterName] = useState("");
  const [inputCharName, setInputCharName] = useState("");
  const [error, setError] = useState("");

  const [bossStates, setBossStates] = useState<Record<string, BossState>>({});
  const [now, setNow] = useState(Date.now());
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [mapModes, setMapModes] = useState<Record<string, "C6" | "C7">>({
    wild: "C7", jewelry: "C7", trial: "C7", purgatory: "C7"
  });
  const [upcomingMode, setUpcomingMode] = useState<"C6" | "C7">("C7");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [collapsedMaps, setCollapsedMaps] = useState<Record<string, boolean>>({});
  const [mapSettings, setMapSettings] = useState<Record<string, { defaultCooldown: number, isX2: boolean }>>({});
  const [settingMapKey, setSettingMapKey] = useState<string | null>(null);
  const [tempCooldownStr, setTempCooldownStr] = useState("");
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [isRefreshingData, setIsRefreshingData] = useState(false);
  const isReady = useRef(false);

  const toggleMapCollapse = (mapId: string) => {
    setCollapsedMaps(prev => ({ ...prev, [mapId]: !prev[mapId] }));
  };

  // Audio Context cho tiếng tick
  const audioCtxRef = useRef<AudioContext | null>(null);

  const loadData = async (silent = false) => {
    try {
      const res = await fetch('/api/mu');
      const data = await res.json();
      if (data.bossStates && Object.keys(data.bossStates).length > 0) {
        setBossStates(prev => JSON.stringify(prev) === JSON.stringify(data.bossStates) ? prev : data.bossStates);
      }
      if (data.mapSettings && Object.keys(data.mapSettings).length > 0) {
        setMapSettings(prev => JSON.stringify(prev) === JSON.stringify(data.mapSettings) ? prev : data.mapSettings);
      }
      isReady.current = true;
    } catch (e) {
      if (!silent) console.error("Lỗi load JSON:", e);
      isReady.current = true;
    }
  };

  // Load from API and LocalStorage (for modes)
  useEffect(() => {
    const savedPassword = localStorage.getItem("mu_admin_password");
    if (savedPassword === ADMIN_PASSWORD_SUPER) {
      setIsAuthenticated(true);
      setIsAdmin(true);
    } else if (savedPassword === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setIsAdmin(false);
    } else if (savedPassword) {
      localStorage.removeItem("mu_admin_password");
    }

    const savedCharName = localStorage.getItem("mu_character_name");
    if (savedCharName) {
      setCharacterName(savedCharName);
      setInputCharName(savedCharName);
    }

    loadData();

    const savedModes = localStorage.getItem("mu_map_modes");
    if (savedModes) {
      try {
        setMapModes(JSON.parse(savedModes));
      } catch (e) { }
    }

    const savedUpcomingMode = localStorage.getItem("mu_upcoming_mode");
    if (savedUpcomingMode === "C6" || savedUpcomingMode === "C7") {
      setUpcomingMode(savedUpcomingMode);
    }
  }, []);

  // Auto Update logic
  useEffect(() => {
    if (!autoUpdate) return;
    const interval = setInterval(() => {
      loadData(true);
    }, 3000);
    return () => clearInterval(interval);
  }, [autoUpdate]);

  // Save to API whenever state changes
  useEffect(() => {
    if (isReady.current && (Object.keys(bossStates).length > 0 || Object.keys(mapSettings).length > 0)) {
      fetch('/api/mu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bossStates, mapSettings })
      }).catch(e => console.error("Lỗi save JSON:", e));
    }
  }, [bossStates, mapSettings]);

  const handleModeChange = (mapId: string, mode: "C6" | "C7") => {
    setMapModes(prev => {
      const newModes = { ...prev, [mapId]: mode };
      localStorage.setItem("mu_map_modes", JSON.stringify(newModes));
      return newModes;
    });
  };

  const handleUpcomingModeChange = (mode: "C6" | "C7") => {
    setUpcomingMode(mode);
    localStorage.setItem("mu_upcoming_mode", mode);
  };

  const openSettings = (mapKey: string) => {
    const current = mapSettings[mapKey]?.defaultCooldown || DEFAULT_COOLDOWN;
    const m = Math.floor(current / 60).toString().padStart(2, '0');
    const s = (current % 60).toString().padStart(2, '0');
    setTempCooldownStr(`${m}:${s}`);
    setSettingMapKey(mapKey);
  };

  const saveSettings = () => {
    if (settingMapKey) {
      let totalSeconds = 0;
      if (tempCooldownStr.includes(':')) {
        const parts = tempCooldownStr.split(':');
        const m = parseInt(parts[0]) || 0;
        const s = parseInt(parts[1]) || 0;
        totalSeconds = m * 60 + s;
      } else {
        const val = parseFloat(tempCooldownStr);
        if (!isNaN(val)) totalSeconds = val * 60;
      }

      if (totalSeconds > 0) {
        setMapSettings(prev => ({
          ...prev,
          [settingMapKey]: {
            ...(prev[settingMapKey] || { isX2: false }),
            defaultCooldown: totalSeconds
          }
        }));
      }
      setSettingMapKey(null);
    }
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

  const unlockAudio = () => {
    const ctx = getAudioCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    gain.gain.value = 0; // im lặng để unlock
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.001);
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
    if (!isAuthenticated) {
      if (password === ADMIN_PASSWORD_SUPER) {
        setIsAuthenticated(true);
        setIsAdmin(true);
        setError("");
        localStorage.setItem("mu_admin_password", password);
        unlockAudio();
      } else if (password === ADMIN_PASSWORD) {
        setIsAuthenticated(true);
        setIsAdmin(false);
        setError("");
        localStorage.setItem("mu_admin_password", password);
        unlockAudio();
      } else {
        setError("Mật khẩu không đúng!");
        setPassword("");
        return;
      }
    }

    if (inputCharName.trim() === "") {
      setError("Vui lòng nhập tên nhân vật!");
      return;
    }

    localStorage.setItem("mu_character_name", inputCharName.trim());
    setCharacterName(inputCharName.trim());
    setError("");
  };

  const handleClaimBoss = (bossStateKey: string) => {
    const currentClaim = bossStates[bossStateKey]?.claimedBy;
    
    // Ngăn không cho chọn đè nếu người khác đã chọn
    if (currentClaim && currentClaim !== characterName) {
      alert(`Boss này đã được [${currentClaim}] nhận rồi!`);
      return;
    }

    setBossStates(prev => {
      const newState = { ...prev };
      
      let wasAlreadyClaimedByMe = false;
      // Remove claim from any other boss claimed by this user
      for (const key in newState) {
        if (newState[key].claimedBy === characterName) {
          if (key === bossStateKey) wasAlreadyClaimedByMe = true;
          newState[key] = { ...newState[key], claimedBy: undefined };
        }
      }

      // Claim the new boss (toggle off if clicking the same one)
      if (!wasAlreadyClaimedByMe) {
        newState[bossStateKey] = {
          ...(newState[bossStateKey] || { spawnTime: 0, defaultCooldown: DEFAULT_COOLDOWN }),
          claimedBy: characterName
        };
      }

      return newState;
    });
  };

  const handleChangeAccount = () => {
    localStorage.removeItem("mu_character_name");
    setCharacterName("");
    setInputCharName("");
    
    // Tự động hủy claim boss của user hiện tại
    setBossStates(prev => {
      let changed = false;
      const newState = { ...prev };
      for (const key in newState) {
        if (newState[key].claimedBy === characterName) {
           newState[key] = { ...newState[key], claimedBy: undefined };
           changed = true;
        }
      }
      return changed ? newState : prev;
    });
  };

  // Calculate upcoming bosses (Moved above early return to avoid React Hooks mismatch)
  const allActiveBosses = useMemo(() => {
    return MAPS.flatMap(mapArea => {
      const mode = upcomingMode;
      const mapBosses = INITIAL_BOSSES.filter(b => b.mapId === mapArea.id && (!b.subMap || b.subMap === mode));
      return mapBosses.map(b => {
        const stateKey = b.mapId === "purgatory" ? b.id : `${b.id}_${mode}`;
        return { ...b, stateKey, mode };
      });
    });
  }, [upcomingMode]);

  const upcomingBosses = allActiveBosses.map(b => {
    const state = bossStates[b.stateKey] || { spawnTime: 0, defaultCooldown: DEFAULT_COOLDOWN };
    const remaining = state.spawnTime === -1 ? -1 : Math.max(0, Math.ceil((state.spawnTime - now) / 1000));
    return { ...b, remaining, state };
  })
    .filter(b => b.remaining !== -1)
    .sort((a, b) => a.remaining - b.remaining);

  if (!isAuthenticated || !characterName) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-slate-900 p-4">
        <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl border-2 border-slate-700 w-full max-w-md mb-6">
          <h1 className="text-2xl font-black text-amber-500 mb-6 text-center tracking-widest">MU VĨNH HẰNG BOSS</h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            {!isAuthenticated && (
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-600 bg-slate-700 text-slate-100 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 outline-none transition-all font-mono tracking-widest text-center text-xl"
                  placeholder="Mật khẩu"
                  autoFocus
                />
              </div>
            )}
            <div>
              <input
                type="text"
                value={inputCharName}
                onChange={(e) => setInputCharName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-600 bg-slate-700 text-slate-100 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 outline-none transition-all font-bold text-center text-xl"
                placeholder="Tên nhân vật"
                autoFocus={isAuthenticated}
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

        {/* Info Panel */}
        <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 w-full max-w-md text-slate-300 text-sm leading-relaxed shadow-lg">
          <h2 className="text-amber-400 font-bold mb-3 flex items-center gap-2 text-lg">
            <span>ℹ️</span> Hướng dẫn tính năng
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-slate-100">Tên nhân vật:</strong> Dùng để định danh trên hệ thống. 
              Các thành viên khác sẽ nhìn thấy tên này khi bạn đánh dấu boss.
            </li>
            <li>
              <strong className="text-slate-100">Chọn Boss:</strong> Ở bảng <i>Sắp Xuất Hiện</i>, hãy bấm vào boss bạn đang canh để <b>đánh dấu (claim)</b>. 
              Một thông báo 🎯 sẽ hiển thị báo cho người khác biết boss này đã có chủ.
            </li>
            <li>
              <strong className="text-slate-100">Giới hạn:</strong> Mỗi người chỉ được đánh dấu tối đa <b>1 boss</b> cùng lúc. 
              Nếu chọn boss mới, đánh dấu cũ sẽ tự động bị thu hồi.
            </li>
          </ul>
        </div>
      </div>
    );
  }


  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-100 font-sans">

      {/* LEFT: MAIN PANEL */}
      <div className="flex-1 p-2 md:p-3 flex flex-col h-screen overflow-hidden">

        {/* Top Mini Header for User Info */}
        <div className="flex justify-between items-center mb-2 px-2">
          <div className="text-sm font-bold text-slate-400">
            Nhân vật: <span className="text-amber-400 text-base ml-1">{characterName}</span>
          </div>
          <button 
            onClick={handleChangeAccount}
            className="text-xs text-rose-400 hover:text-rose-300 underline decoration-rose-400/30 underline-offset-4 transition-colors font-bold"
          >
            Đổi tài khoản
          </button>
        </div>

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
              if (!soundEnabled) unlockAudio();
            }}
            className={`px-2 md:px-3 py-1.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-all shadow-md ${soundEnabled ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50' : 'bg-slate-700 text-slate-400 border border-slate-600'}`}
          >
            <span className="text-base md:text-sm">{soundEnabled ? '🔊' : '🔇'}</span>
            <span className="hidden md:inline">{soundEnabled ? 'Bật âm báo' : 'Tắt âm báo'}</span>
          </button>
        </div>

        {/* 4 Maps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 flex-1 overflow-y-auto pr-2 pb-10 custom-scrollbar content-start">
          {MAPS.map(mapArea => {
            const currentMode = mapModes[mapArea.id] || "C7";
            const mapKey = `${mapArea.id}_${currentMode}`;
            const mapBosses = INITIAL_BOSSES.filter(b => b.mapId === mapArea.id && (!b.subMap || b.subMap === currentMode)).map(b => {
              const stateKey = b.mapId === "purgatory" ? b.id : `${b.id}_${currentMode}`;
              return { ...b, stateKey };
            });

            return (
              <div key={mapArea.id} className={`p-3 rounded-2xl border-2 flex flex-col bg-slate-800/50 ${mapArea.color.replace('bg-', 'border-').split(' ')[1]}`}>
                <div
                  className="flex items-center justify-between border-b border-slate-700 pb-1 mb-2 cursor-pointer hover:bg-slate-700/30 rounded-lg transition-colors px-2 -mx-2"
                  onClick={() => toggleMapCollapse(mapArea.id)}
                >
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <h2 className="text-base md:text-lg font-black flex items-center gap-1 md:gap-2 whitespace-nowrap">
                      <span className="text-lg md:text-xl">{mapArea.name.slice(-2)}</span>
                      <span className="truncate max-w-[120px] xs:max-w-none">{mapArea.name.slice(0, -2)}</span>
                    </h2>

                    {/* Settings & x2 */}
                    <button 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        if (!isAdmin) {
                          alert("Bạn không phải Admin nên không thể cài đặt thời gian mặc định!");
                          return;
                        }
                        openSettings(mapKey); 
                      }}
                      className="text-slate-400 hover:text-amber-400 transition-colors px-1"
                      title="Cài đặt thời gian mặc định"
                    >
                      ⚙️
                    </button>
                    <button 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        if (!isAdmin) {
                          alert("Bạn không phải Admin nên không thể chia đôi thời gian (x2)!");
                          return;
                        }
                        setMapSettings(prev => ({
                          ...prev,
                          [mapKey]: {
                            ...(prev[mapKey] || { defaultCooldown: DEFAULT_COOLDOWN }),
                            isX2: !(prev[mapKey]?.isX2)
                          }
                        }));
                      }}
                      className={`px-2 py-0.5 rounded text-xs font-black transition-colors ${mapSettings[mapKey]?.isX2 ? 'bg-amber-500 text-slate-900 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'bg-slate-700 text-slate-400'}`}
                      title="Kích hoạt chia đôi thời gian (x2)"
                    >
                      x2
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1 bg-slate-900 rounded-lg p-1 border border-slate-700" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleModeChange(mapArea.id, "C6")}
                        className={`px-3 py-1 rounded text-sm font-bold transition-colors ${currentMode === "C6" ? "bg-rose-500 text-white" : "text-slate-400 hover:text-slate-200"}`}
                      >
                        C6
                      </button>
                      <button
                        onClick={() => handleModeChange(mapArea.id, "C7")}
                        className={`px-3 py-1 rounded text-sm font-bold transition-colors ${currentMode === "C7" ? "bg-rose-500 text-white" : "text-slate-400 hover:text-slate-200"}`}
                      >
                        C7
                      </button>
                    </div>
                    <span 
                      onClick={(e) => { e.stopPropagation(); toggleMapCollapse(mapArea.id); }} 
                      className="text-slate-500 ml-1 text-sm bg-slate-900 p-1 rounded-lg border border-slate-700 w-8 flex justify-center hover:bg-slate-800 transition-colors"
                    >
                      {collapsedMaps[mapArea.id] ? '▼' : '▲'}
                    </span>
                  </div>
                </div>

                {!collapsedMaps[mapArea.id] && (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 flex-1 content-start">
                    {mapBosses.map(boss => (
                      <BossCard
                        key={boss.stateKey}
                        boss={boss}
                        state={bossStates[boss.stateKey]}
                        now={now}
                        mapSetting={mapSettings[mapKey]}
                        updateState={(newState) => setBossStates(prev => ({ ...prev, [boss.stateKey]: newState }))}
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

      {/* MAP SETTING MODAL */}
      {settingMapKey && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm px-4">
          <div className="bg-slate-800 p-6 rounded-2xl border-2 border-amber-500 shadow-2xl w-full max-w-sm">
            <h3 className="text-xl font-black text-amber-400 mb-4 uppercase text-center">Cài Đặt Thời Gian</h3>
            <div className="mb-4">
              <label className="block text-slate-400 text-sm font-bold mb-2">Thời gian mặc định (MM:SS)</label>
              <input
                type="text"
                value={tempCooldownStr}
                onChange={e => {
                  const val = e.target.value.replace(/[^0-9:]/g, '');
                  setTempCooldownStr(val);
                }}
                placeholder="Ví dụ: 14:30"
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-600 bg-slate-700 text-slate-100 focus:border-amber-500 outline-none text-center text-xl font-mono"
                autoFocus
                onKeyDown={e => { if (e.key === 'Enter') saveSettings() }}
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setSettingMapKey(null)}
                className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 text-slate-300 font-bold rounded-xl transition-colors"
              >
                HỦY
              </button>
              <button
                onClick={saveSettings}
                className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-black rounded-xl transition-colors"
              >
                LƯU
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RIGHT: UPCOMING PANEL */}
      <div className={`
        fixed lg:static top-0 right-0 h-screen z-50
        w-80 bg-slate-800 border-l-2 border-slate-700 flex flex-col shadow-2xl transition-transform duration-300
        ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-3 border-b border-slate-700 bg-slate-900/50 flex flex-col gap-2">
          {/* Header Row: Title & C6/C7 Picker */}
          <div className="flex justify-between items-center">
            <h2 className="text-base lg:text-lg font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5 lg:gap-2 whitespace-nowrap">
              <span>⏳</span> Sắp Xuất Hiện
            </h2>

            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="flex gap-1 bg-slate-800 rounded p-1 border border-slate-700">
                <button
                  onClick={() => handleUpcomingModeChange("C6")}
                  className={`px-2 py-0.5 rounded-sm text-xs font-bold transition-colors ${upcomingMode === "C6" ? "bg-rose-500 text-white" : "text-slate-400 hover:text-slate-200"}`}
                >
                  C6
                </button>
                <button
                  onClick={() => handleUpcomingModeChange("C7")}
                  className={`px-2 py-0.5 rounded-sm text-xs font-bold transition-colors ${upcomingMode === "C7" ? "bg-rose-500 text-white" : "text-slate-400 hover:text-slate-200"}`}
                >
                  C7
                </button>
              </div>
              <button
                className="lg:hidden text-slate-400 hover:text-white"
                onClick={() => setIsSidebarOpen(false)}
              >
                ✕
              </button>
            </div>
          </div>

          {/* Auto Update Row */}
          <div className="flex items-center justify-between mt-1 border-t border-slate-800 pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-200 transition-colors text-xs font-bold">
              <input
                type="checkbox"
                checked={autoUpdate}
                onChange={(e) => setAutoUpdate(e.target.checked)}
                className="w-3.5 h-3.5 accent-amber-500 rounded bg-slate-800 border-slate-600"
              />
              Tự động cập nhật
            </label>
            <button
              onClick={async () => {
                setIsRefreshingData(true);
                await loadData();
                setTimeout(() => setIsRefreshingData(false), 500);
              }}
              className={`px-2 py-1 bg-slate-700 hover:bg-slate-600 rounded text-xs font-bold transition-all flex items-center gap-1 ${isRefreshingData ? 'opacity-50 pointer-events-none' : ''}`}
            >
              <span className={isRefreshingData ? 'animate-spin' : ''}>🔄</span> Làm mới
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {upcomingBosses.length === 0 ? (
            <div className="text-center text-slate-500 font-bold mt-10 p-4 border-2 border-dashed border-slate-700 rounded-xl">
              Chưa có Boss nào đang đếm ngược
            </div>
          ) : (
            upcomingBosses.map(b => (
              <div key={b.id}
                onClick={() => handleClaimBoss(b.stateKey)}
                className={`relative p-3 rounded-xl border-2 flex flex-col gap-1 transition-all cursor-pointer overflow-hidden group
                ${b.remaining <= 30 && b.remaining > 0 ? 'bg-rose-500/20 border-rose-500 animate-pulse shadow-[0_0_15px_rgba(243,24,71,0.3)]' : b.remaining === 0 ? 'bg-emerald-900/20 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-slate-700/50 hover:border-amber-400 border-slate-600'}
              `}>
                {/* CLAIM OVERLAY */}
                {b.state.claimedBy && (
                  <div className={`absolute inset-0 z-10 flex items-center justify-center backdrop-blur-[2px] bg-slate-900/60 transition-all
                    ${b.state.claimedBy === characterName ? 'border-[3px] border-amber-400 shadow-inner' : 'group-hover:bg-slate-900/40'}
                  `}>
                    <div className="bg-amber-500/90 text-slate-900 px-4 py-1 rounded-xl font-black text-lg shadow-[0_0_15px_rgba(245,158,11,0.6)] transform -rotate-12 scale-110 pointer-events-none border-2 border-amber-300">
                      🎯 {b.state.claimedBy}
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-start relative z-20 pointer-events-none">
                  <span className="font-bold text-sm text-slate-200">
                    <BossNameRenderer name={b.name} />
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-bold">
                    {MAPS.find(m => m.id === b.mapId)?.name.split(' ')[0]} - {b.mode}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-1 relative z-20">
                  <div className="pointer-events-none">
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

                  <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => {
                        const mapKey = `${b.mapId}_${b.mode}`;
                        const mapSetting = mapSettings[mapKey];
                        const defaultCd = mapSetting?.defaultCooldown || DEFAULT_COOLDOWN;
                        const isX2 = mapSetting?.isX2 || false;
                        const finalCd = isX2 ? defaultCd / 2 : defaultCd;
                        setBossStates(prev => ({
                          ...prev,
                          [b.stateKey]: {
                            ...b.state,
                            spawnTime: now + finalCd * 1000
                          }
                        }));
                      }}
                      title="Làm mới thời gian"
                      className="w-8 h-8 border-2 rounded-lg flex items-center justify-center text-sm transition-all active:scale-90 flex-shrink-0 bg-blue-500/10 hover:bg-blue-500/30 border-blue-500/50"
                    >
                      🔄
                    </button>

                    <button
                      onClick={() => {
                        const isIgnored = b.state.spawnTime === -1;
                        setBossStates(prev => ({
                          ...prev,
                          [b.stateKey]: {
                            ...b.state,
                            spawnTime: isIgnored ? 0 : -1
                          }
                        }));
                      }}
                      title={b.state.spawnTime === -1 ? "Bật theo dõi" : "Bỏ qua boss này"}
                      className={`w-8 h-8 border-2 rounded-lg flex items-center justify-center text-sm transition-all active:scale-90 flex-shrink-0 ${b.state.spawnTime === -1 ? 'bg-slate-700 border-slate-600 grayscale opacity-50' : 'bg-rose-500/10 hover:bg-rose-500/30 border-rose-500/50'
                        }`}
                    >
                      💀
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}

// --- Components ---

function BossCard({ boss, state, now, mapSetting, updateState }: {
  boss: Boss;
  state: BossState | undefined;
  now: number;
  mapSetting: { defaultCooldown: number, isX2: boolean } | undefined;
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
      spawnTime: isIgnored ? 0 : -1
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

        <div className="flex gap-1">
          {/* Refresh Button */}
          <button
            onClick={() => {
              const defaultCd = mapSetting?.defaultCooldown || DEFAULT_COOLDOWN;
              const isX2 = mapSetting?.isX2 || false;
              const finalCd = isX2 ? defaultCd / 2 : defaultCd;
              updateState({
                ...safeState,
                spawnTime: now + finalCd * 1000
              });
            }}
            title="Làm mới thời gian"
            className="w-10 h-10 border-2 rounded-xl flex items-center justify-center text-lg transition-all active:scale-90 flex-shrink-0 bg-blue-500/10 hover:bg-blue-500/30 border-blue-500/50"
          >
            🔄
          </button>

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
