import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { WORDS } from './data/words.js';
import { STAGES, LEVELS, STAGE_XP, BONUS_XP_80, BONUS_XP_100, STREAK_MILESTONES, calculateLevel } from './data/levels.js';
import { speakKorean, gEx99, hasBatchim } from './utils/koreanHelper.js';
import { buildSchedule, buildContentToSeq, prepareWordsWithExamples } from './utils/schedule.js';
import { GRAMMAR_TOPICS } from './data/grammarData.js';

// API manzilimiz (Render serveri):
const API_URL = "https://hanu-bot.onrender.com/api/save-progress";

export default function App() {
  // 1. Mavzu (Light / Dark)
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    try {
      return localStorage.getItem("kor_uz_theme") || "light";
    } catch {
      return "light";
    }
  });

  // 2. Asosiy tablar: 'home', 'levels', 'grammar', 'stats', 'menu'
  const [activeTab, setActiveTab] = useState("home");
  const [levelSubTab, setLevelSubTab] = useState("leaderboard"); // "leaderboard" | "levels"

  // 3. Qidiruv
  const [searchQuery, setSearchQuery] = useState("");

  // 4. Modallar
  const [selectedDayModal, setSelectedDayModal] = useState(null);
  const [activeStudyStage, setActiveStudyStage] = useState(null); // { day, stageId, words, review, noXp }
  const [toastMessage, setToastMessage] = useState(null);
  const [showAllDaysModal, setShowAllDaysModal] = useState(false);
  const [showDayMistakesModal, setShowDayMistakesModal] = useState(false);
  const [showAllMistakesModal, setShowAllMistakesModal] = useState(false);
  const [mistakesFilterDay, setMistakesFilterDay] = useState(null);
  const [levelUpData, setLevelUpData] = useState(null);

  // 5. XP va Yutuqlar (LocalStorage)
  const [xp, setXp] = useState(() => {
    if (typeof window === "undefined") return 0;
    try {
      const p = localStorage.getItem("koruz_xp");
      return p ? parseInt(p, 10) || 0 : 0;
    } catch {
      return 0;
    }
  });

  const [xpGiven, setXpGiven] = useState(() => {
    if (typeof window === "undefined") return {};
    try {
      const p = localStorage.getItem("koruz_xp_given");
      return p ? JSON.parse(p) : {};
    } catch {
      return {};
    }
  });

  const [progress, setProgress] = useState(() => {
    if (typeof window === "undefined") return {};
    try {
      const p = localStorage.getItem("koruz_progress");
      return p ? JSON.parse(p) : {};
    } catch {
      return {};
    }
  });

  // Xatolar (bo'sh yoki noto'g'ri tushgan ghost yozuvlarni tozalaymiz)
  const [wrongWords, setWrongWords] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      const p = localStorage.getItem("koruz_wrong");
      const parsed = p ? JSON.parse(p) : [];
      // Bo'sh yoki noto'g'ri ghost yozuvlarni filtrlaymiz (masalan, foydalanuvchi javob bermagan holatlar)
      return parsed.filter(w => w && w.kr && w.userAnswer && w.userAnswer !== "(bo'sh)" && w.userAnswer.trim() !== "" && w.userAnswer !== "(Bilmadim)");
    } catch {
      return [];
    }
  });

  const [grammarProgress, setGrammarProgress] = useState(() => {
    if (typeof window === "undefined") return {};
    try {
      const p = localStorage.getItem("koruz_grammar_progress");
      return p ? JSON.parse(p) : {};
    } catch {
      return {};
    }
  });

  const [xpToast, setXpToast] = useState(null);
  const prevLevelRef = useRef(null);

  // 6. Streak (Kunlik ketma-ketlik)
  const [streak, setStreak] = useState(() => {
    if (typeof window === "undefined") return { count: 0, date: "" };
    try {
      const p = localStorage.getItem("kor_uz_streak");
      return p ? JSON.parse(p) : { count: 0, date: "" };
    } catch {
      return { count: 0, date: "" };
    }
  });

  // Jadval va so'zlar
  const schedule = useMemo(() => buildSchedule(WORDS.length, 30), []);
  const totalDays = schedule.length;
  const contentToSeq = useMemo(() => buildContentToSeq(schedule), [schedule]);
  const wordsWithExamples = useMemo(() => prepareWordsWithExamples(WORDS, 30), []);

  // Level ma'lumotlari (5x mutanosib qisqartirilgan)
  const levelInfo = useMemo(() => calculateLevel(xp), [xp]);
  const currentLevel = levelInfo.level;

  // Toast bildirishnoma
  const showToast = useCallback((msg) => {
    setToastMessage(msg);
  }, []);

  useEffect(() => {
    if (!toastMessage) return;
    const t = setTimeout(() => setToastMessage(null), 2500);
    return () => clearTimeout(t);
  }, [toastMessage]);

  // XP qo'shish funksiyasi
  const addXp = useCallback((amount) => {
    if (amount <= 0) return;
    setXp((prev) => prev + amount);
    setXpToast(amount);
    setTimeout(() => setXpToast(null), 1800);
  }, []);

  // Level ko'tarilishini kuzatish
  useEffect(() => {
    if (prevLevelRef.current === null) {
      prevLevelRef.current = currentLevel;
      return;
    }
    if (currentLevel > (prevLevelRef.current || 1)) {
      const def = LEVELS[currentLevel - 1];
      setLevelUpData({ level: currentLevel, levelDef: def });
    }
    prevLevelRef.current = currentLevel;
  }, [currentLevel]);

  // LocalStorage saqlashlar
  useEffect(() => {
    try { localStorage.setItem("kor_uz_theme", theme); } catch {}
  }, [theme]);

  useEffect(() => {
    try { localStorage.setItem("koruz_xp", String(xp)); } catch {}
  }, [xp]);

  useEffect(() => {
    try { localStorage.setItem("koruz_progress", JSON.stringify(progress)); } catch {}
  }, [progress]);

  useEffect(() => {
    try { localStorage.setItem("koruz_xp_given", JSON.stringify(xpGiven)); } catch {}
  }, [xpGiven]);

  useEffect(() => {
    try { localStorage.setItem("koruz_wrong", JSON.stringify(wrongWords)); } catch {}
  }, [wrongWords]);

  useEffect(() => {
    try { localStorage.setItem("kor_uz_streak", JSON.stringify(streak)); } catch {}
  }, [streak]);

  useEffect(() => {
    try { localStorage.setItem("koruz_grammar_progress", JSON.stringify(grammarProgress)); } catch {}
  }, [grammarProgress]);

  // Server (Bot API) ga avtomatik natijalarni yuborish
  const syncProgressWithServer = useCallback((day, stageName, currentXp) => {
    try {
      const tg = window.Telegram && window.Telegram.WebApp;
      const user = tg && tg.initDataUnsafe && tg.initDataUnsafe.user;
      if (!user || !user.id) return;

      fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          first_name: user.first_name || "",
          username: user.username || "",
          day: day || 1,
          stage_name: stageName || "Dars",
          xp: currentXp || 0
        })
      }).catch(() => {});
    } catch {}
  }, []);

  // Dars qilganda streakni yangilash
  const markStudied = useCallback((curDay) => {
    try {
      const td = new Date().toISOString().slice(0, 10);
      if (localStorage.getItem("kor_uz_last_study") === td) return;
      localStorage.setItem("kor_uz_last_study", td);

      const ys = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
      let nextStreak = streak.date === ys
        ? { count: streak.count + 1, date: td, awarded: streak.awarded || [] }
        : streak.date === td
        ? streak
        : { count: 1, date: td, awarded: [] };

      let bonus = 0;
      const hit = [];
      for (const m of STREAK_MILESTONES) {
        if (nextStreak.count >= m.d && !(nextStreak.awarded || []).includes(m.d)) {
          bonus += m.xp;
          hit.push(m.d);
        }
      }

      if (hit.length) {
        nextStreak = { ...nextStreak, awarded: [...(nextStreak.awarded || []), ...hit] };
        addXp(bonus);
        showToast(`🔥 ${nextStreak.count} kunlik streak! +${bonus} XP bonus!`);
      }

      setStreak(nextStreak);
      localStorage.setItem("kor_uz_streak", JSON.stringify(nextStreak));

      syncProgressWithServer(curDay, "Dars o'tdi", xp);
    } catch {}
  }, [streak, addXp, showToast, syncProgressWithServer, xp]);

  // Joriy kunni aniqlash
  const currentDay = useMemo(() => {
    for (let p = 1; p <= totalDays; p++) {
      const v = progress[p] || {};
      const completed = STAGES.filter((s) => (v[s.id]?.pct || 0) >= 80).length;
      if (completed < STAGES.length) return p;
    }
    return totalDays;
  }, [progress, totalDays]);

  // Ranglar
  // Modal ochilganda fon sahifasining aylanishini to'sib, faqat modalni aylantirish
  const isAnyModalOpen = Boolean(selectedDayModal || activeStudyStage || showAllDaysModal || showDayMistakesModal || showAllMistakesModal || levelUpData);
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (isAnyModalOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isAnyModalOpen]);

  const isDark = theme === "dark";
  const bgMain = isDark ? "#121212" : "#f6f5f1";
  const cardBg = isDark ? "#1e1e1e" : "#ffffff";
  const textMain = isDark ? "#f6f5f1" : "#121212";
  const textMuted = isDark ? "#a1a1a1" : "#6b6b6b";
  const borderColor = isDark ? "#2a2a2a" : "#e9e6df";

  // Qidiruv natijalari
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return wordsWithExamples.filter((w) => w.kr.includes(q) || w.uz.toLowerCase().includes(q)).slice(0, 20);
  }, [searchQuery, wordsWithExamples]);

  // Kun bo'yicha so'zlar
  const getDayWords = useCallback((dayNum) => {
    const s = schedule[dayNum - 1];
    if (!s) return [];
    return s.type === "content"
      ? wordsWithExamples.filter((w) => w.day === s.cd)
      : wordsWithExamples.filter((w) => w.day >= s.rs && w.day <= s.re);
  }, [schedule, wordsWithExamples]);

  // Kun bo'yicha statistika
  const getDayProgress = useCallback((dayNum) => {
    const v = progress[dayNum] || {};
    const avg = STAGES.reduce((acc, s) => acc + (v[s.id]?.pct || 0), 0) / STAGES.length;
    const completedCount = STAGES.filter((s) => (v[s.id]?.pct || 0) >= 80).length;
    const isCompleted = completedCount === STAGES.length;
    return { avg, completedCount, isCompleted, dp: v };
  }, [progress]);

  // Kun qulflanganligini tekshirish
  const isDayLocked = useCallback((dayNum) => {
    if (dayNum === 1) return false;
    const prev = progress[dayNum - 1] || {};
    return STAGES.filter((s) => (prev[s.id]?.pct || 0) >= 80).length < STAGES.length;
  }, [progress]);

  // Bosqich qulflanganligini tekshirish
  const isStageLocked = useCallback((dayNum, stageIndex) => {
    if (stageIndex === 0) return false;
    const prevStage = STAGES[stageIndex - 1];
    return (progress[dayNum]?.[prevStage.id]?.pct || 0) < 80;
  }, [progress]);

  // Mutanosib va toza hisoblangan umumiy statistika
  const overallStats = useMemo(() => {
    let correct = 0, stagesTotal = 0, completed = 0;
    const totalStages = totalDays * STAGES.length;
    for (let d = 1; d <= totalDays; d++) {
      for (const s of STAGES) {
        const item = progress[d]?.[s.id];
        if (item) {
          correct += item.correct || 0;
          stagesTotal += item.total || 0;
          if (item.pct >= 80) completed++;
        }
      }
    }
    // Haqiqiy xatolar soni (faqat haqiqiy javob kiritilgan bo'lsa):
    const realMistakes = wrongWords.filter(w => w && w.userAnswer && w.userAnswer.trim() !== "" && w.userAnswer !== "(bo'sh)" && w.userAnswer !== "(Bilmadim)");
    // Agar jami javoblar 0 bo'lsa, xatolar ham 0 bo'ladi (mutanosiblik):
    const displayMistakes = stagesTotal > 0 ? realMistakes.length : 0;
    const finalTotalAll = Math.max(stagesTotal, correct + displayMistakes);
    let avg = 0;
    if (finalTotalAll > 0) {
      if (correct === finalTotalAll) {
        avg = 100;
      } else {
        const raw = (correct / finalTotalAll) * 100;
        avg = parseFloat(raw.toFixed(1));
      }
    }
    return { totalCorrect: correct, totalAll: finalTotalAll, completedStages: completed, totalStages, avg, mistakesCount: displayMistakes };
  }, [progress, totalDays, wrongWords]);

  // Xatoni yozib olish (faqat haqiqiy javob kiritilgan bo'lsa)
  const handleWrongAnswer = useCallback((wrongItem) => {
    if (!wrongItem || !wrongItem.kr) return;
    // Bo'sh javoblarni xatoga kiritmaymiz
    if (!wrongItem.userAnswer || wrongItem.userAnswer.trim() === "" || wrongItem.userAnswer === "(bo'sh)") {
      return;
    }
    const entry = {
      ...wrongItem,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      timestamp: Date.now()
    };
    setWrongWords((prev) => {
      if (prev.some((w) => w.day === wrongItem.day && w.stageId === wrongItem.stageId && w.kr === wrongItem.kr)) {
        return prev;
      }
      return [entry, ...prev].slice(0, 500);
    });
  }, []);

  const curDayProgress = getDayProgress(currentDay);
  const curDayWords = getDayWords(currentDay);
  const nextDay = currentDay < totalDays ? currentDay + 1 : null;
  const nextDayLocked = nextDay ? isDayLocked(nextDay) : false;
  const nextDayWords = nextDay ? getDayWords(nextDay) : [];

  return (
    <div style={{ background: bgMain, color: textMain, minHeight: "100vh" }} className="font-sans antialiased selection:bg-black/10">
      
      {/* HEADER */}
      <header className="sticky top-0 z-20 backdrop-blur-xl border-b" style={{ background: isDark ? "rgba(18,18,18,0.85)" : "rgba(246,245,241,0.85)", borderColor }}>
        <div className="max-w-[980px] mx-auto px-4 sm:px-6 h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center font-bold text-[14px] shrink-0">KOR</div>
            <div className="min-w-0">
              <div className="font-bold text-[15px] leading-none tracking-tight truncate">HANU Pro</div>
              <div className="text-[11px] mt-[3px] truncate" style={{ color: textMuted }}>
                {totalDays} kun • {WORDS.length} so'z
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
              className="w-9 h-9 rounded-full flex items-center justify-center text-[16px] border"
              style={{ background: cardBg, borderColor }}
              aria-label="theme"
            >
              {isDark ? "☀️" : "🌙"}
            </button>

            {streak.count > 0 && (
              <div className="flex items-center gap-1 h-9 rounded-full border px-3" style={{ background: cardBg, borderColor: "#f59e0b" }}>
                <span className="text-[12px] font-bold text-amber-500">🔥 {streak.count} kun</span>
              </div>
            )}

            <button
              onClick={() => {
                setActiveTab("levels");
                setLevelSubTab("leaderboard");
              }}
              className="flex items-center gap-2 h-9 rounded-full border px-3 hover:opacity-80 transition-opacity cursor-pointer shadow-xs"
              style={{ background: cardBg, borderColor }}
              title="Reyting va Darajalarni ko'rish"
            >
              <span className="text-[13px]">⚡</span>
              <span className="text-[12px] font-bold">{xp.toLocaleString()} XP</span>
              <span className="text-[10px] px-1.5 py-[1px] rounded-full text-white font-bold" style={{ background: levelInfo.levelDef.gradient }}>
                Lv {currentLevel}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* XP TOAST */}
      {xpToast !== null && (
        <div className="fixed top-[76px] right-4 z-30 pointer-events-none toast-in">
          <div className="bg-black text-white px-4 py-2 rounded-full text-[13px] font-bold shadow-xl flex items-center gap-1.5">
            <span>+{xpToast} XP</span>
            <span>⚡</span>
          </div>
        </div>
      )}

      {/* ASOSIY SAHIFA */}
      <main className="max-w-[980px] mx-auto px-4 sm:px-6 pb-28 pt-6">
        
        {/* TAB 1: BOSH SAHIFA */}
        {activeTab === "home" && (() => {
          const unfinishedStageIdx = STAGES.findIndex((s) => {
            const item = curDayProgress.dp[s.id];
            return !(item && item.pct >= 80);
          });
          const nextUnfinishedStage = unfinishedStageIdx !== -1 ? STAGES[unfinishedStageIdx] : STAGES[0];
          const isDayAllDone = curDayProgress.isCompleted || curDayProgress.avg >= 80;
          const neededPct = Math.max(1, 80 - Math.round(curDayProgress.avg));

          return (
            <div className="space-y-4">
              {/* 1. LEVEL & PROGRESS IXCHAM KARTASI */}
              <div
                onClick={() => {
                  setActiveTab("levels");
                  setLevelSubTab("levels");
                }}
                className="rounded-[20px] p-4 border flex items-center justify-between gap-3 cursor-pointer hover:shadow-md transition-all"
                style={{ background: cardBg, borderColor }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-[20px] shrink-0 text-white shadow-sm" style={{ background: levelInfo.levelDef.gradient }}>
                    {levelInfo.levelDef.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-[13px]">
                      Lv {currentLevel} {levelInfo.levelDef.name} • {levelInfo.inLevelXp.toLocaleString()}/{levelInfo.needForLevel.toLocaleString()} XP
                    </div>
                    <div className="text-[11px] truncate" style={{ color: textMuted }}>
                      {levelInfo.remaining > 0 ? `${levelInfo.remaining.toLocaleString()} XP qoldi (Lv ${currentLevel + 1} gacha)` : "Maksimal daraja! 🌟"}
                    </div>
                    <div className="mt-2 h-1.5 w-[130px] rounded-full overflow-hidden" style={{ background: borderColor }}>
                      <div className="h-full transition-all" style={{ width: `${levelInfo.pct}%`, background: levelInfo.levelDef.gradient }} />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2.5 shrink-0">
                  <div className="text-center">
                    <div className="font-bold text-[15px] leading-none text-green-600">{overallStats.avg}%</div>
                    <div className="text-[10px] mt-0.5" style={{ color: textMuted }}>o'rtacha</div>
                  </div>
                  <div className="w-[1px]" style={{ background: borderColor }} />
                  <div className="text-center">
                    <div className="font-bold text-[15px] leading-none">{overallStats.completedStages}/{overallStats.totalStages}</div>
                    <div className="text-[10px] mt-0.5" style={{ color: textMuted }}>bosqich</div>
                  </div>
                </div>
              </div>

              {/* 2. JORIY KUN KARTASI (ASOSIY DIQQAT MARKAZI) */}
              <div
                className="rounded-[24px] border p-5 sm:p-6 shadow-sm"
                style={{ background: cardBg, borderColor, borderWidth: "1px" }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[18px]">📚</span>
                    <span className="font-bold text-[12px] tracking-wider px-3 py-1 rounded-full bg-black text-white">JORIY KUN</span>
                    {isDayAllDone && (
                      <span className="text-[11px] px-2 py-[2px] rounded-full bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300 font-semibold">
                        ✅ Tugallangan
                      </span>
                    )}
                  </div>
                  <div className="text-[12px] font-semibold" style={{ color: textMuted }}>
                    {curDayProgress.completedCount}/5 bosqich
                  </div>
                </div>

                <div className="mt-4 flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <div className="text-[28px] sm:text-[32px] font-bold leading-none">
                        {schedule[currentDay - 1]?.type === "weekly" ? "📅 Haftalik takrorlash" :
                         schedule[currentDay - 1]?.type === "monthly" ? "🗓️ Oylik takrorlash" :
                         schedule[currentDay - 1]?.type === "general" ? "🌍 Umumiy takrorlash" : `Kun ${currentDay}`}
                      </div>
                      <div className="text-[13px]" style={{ color: textMuted }}>{curDayWords.length} ta so'z</div>
                    </div>

                    {/* Bosqichlar ikonkalari */}
                    <div className="mt-3 flex gap-1.5 flex-wrap">
                      {STAGES.map((s, idx) => {
                        const item = curDayProgress.dp[s.id];
                        const isDone = item && item.pct >= 80;
                        const locked = isStageLocked(currentDay, idx);
                        const isCurrent = s.id === nextUnfinishedStage.id && !isDone;

                        return (
                          <div
                            key={s.id}
                            className={`w-8 h-8 rounded-full border flex items-center justify-center text-[12px] font-bold transition-all ${
                              isCurrent ? "ring-2 ring-black dark:ring-white scale-105" : ""
                            }`}
                            style={{
                              background: isDone ? "#16a34a" : locked ? (isDark ? "#222" : "#eee") : (isDark ? "#333" : "#111"),
                              color: isDone ? "#fff" : locked ? "#888" : "#fff",
                              borderColor: isDone ? "#16a34a" : locked ? (isDark ? "#333" : "#ddd") : "#111"
                            }}
                            title={`${s.name}: ${item ? item.pct + "%" : locked ? "Qulflangan" : "Boshlanmagan"}`}
                          >
                            {locked ? "🔒" : isDone ? "✓" : s.icon}
                          </div>
                        );
                      })}
                    </div>

                    {/* Namunaviy so'zlar chiplari */}
                    <div className="mt-3.5 flex flex-wrap gap-1.5">
                      {curDayWords.slice(0, 5).map((w) => (
                        <span key={w.id} className="kr text-[11px] px-2.5 py-1 rounded-full border font-medium" style={{ borderColor, background: isDark ? "#222" : "#faf8f3" }}>
                          {w.kr}
                        </span>
                      ))}
                      {curDayWords.length > 5 && (
                        <span className="text-[11px] px-2 py-1 rounded-full font-medium" style={{ color: textMuted }}>
                          +{curDayWords.length - 5}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Progress halqasi */}
                  <div className="relative w-[72px] h-[72px] shrink-0">
                    <svg width="72" height="72" className="progress-ring">
                      <circle cx="36" cy="36" r="28" stroke={borderColor} strokeWidth="5" fill="none" />
                      <circle
                        cx="36"
                        cy="36"
                        r="28"
                        stroke={curDayProgress.avg >= 80 ? "#16a34a" : "#111"}
                        strokeWidth="5"
                        fill="none"
                        strokeDasharray={175.9}
                        strokeDashoffset={175.9 - (175.9 * Math.min(100, curDayProgress.avg)) / 100}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-[16px] font-bold leading-none">{Math.round(curDayProgress.avg)}%</div>
                      <div className="text-[9px] mt-0.5" style={{ color: textMuted }}>progress</div>
                    </div>
                  </div>
                </div>

                {/* PROGRESS VA KEYINGI HARAKAT ANIQ IZOHI */}
                <div className="mt-4 p-3.5 rounded-2xl border flex items-center gap-3 text-[13px]" style={{ borderColor, background: isDark ? "#1a1a1a" : "#faf8f3" }}>
                  <span className="text-[20px] shrink-0">{isDayAllDone ? "🎉" : "🎯"}</span>
                  <div className="leading-snug flex-1">
                    {isDayAllDone ? (
                      <span className="font-semibold text-green-600">
                        Kun {currentDay}: {Math.round(curDayProgress.avg)}% · Barcha bosqichlar yakunlandi! Keyingi kun ochildi.
                      </span>
                    ) : (
                      <span>
                        <strong className="font-bold">Kun {currentDay}: {Math.round(curDayProgress.avg)}%</strong> · <span className="font-semibold text-amber-600">{nextUnfinishedStage.name}</span>ni bajaring — keyingi kun ochilishiga <strong className="font-bold">{neededPct}%</strong> qoldi
                      </span>
                    )}
                  </div>
                </div>

                {/* ASOSIY HARAKAT TUGMASI (QORA CTA) */}
                <button
                  onClick={() => {
                    setActiveStudyStage({
                      day: currentDay,
                      stageId: nextUnfinishedStage.id,
                      words: getDayWords(currentDay),
                      review: false,
                      noXp: false
                    });
                  }}
                  className="mt-4 w-full h-[54px] rounded-2xl font-bold text-[15px] text-white bg-black hover:bg-[#222] transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>{isDayAllDone ? "Darsni takrorlash" : "Darsni davom ettirish"}</span>
                  <span>·</span>
                  <span>{nextUnfinishedStage.name}</span>
                  <span>→</span>
                </button>

                {/* IKKILAMCHI KICHIK TUGMA: BOSQICHLARNI KO'RISH */}
                <button
                  onClick={() => setSelectedDayModal(currentDay)}
                  className="mt-2.5 w-full h-10 rounded-xl font-semibold text-[13px] border hover:bg-black/5 transition-colors flex items-center justify-center gap-1.5"
                  style={{ borderColor, color: textMuted }}
                >
                  <span>📖</span>
                  <span>Bosqichlarni ko'rish ({curDayProgress.completedCount}/5 bosqich)</span>
                </button>
              </div>

              {/* 3. QIDIRUV (JORIY DARS KARTASIDAN KEYIN JOYLASHTIRILGAN) */}
              <div className="relative">
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="So'z qidirish — masalan: olma, 사과, kitob..."
                  className="w-full h-[48px] rounded-2xl px-4 pr-11 text-[14px] outline-none border transition-all"
                  style={{ background: cardBg, borderColor, color: textMain }}
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[16px] opacity-60">🔍</span>

                {searchQuery.trim() && (
                  <div className="mt-2.5 rounded-2xl border overflow-hidden anim-in shadow-sm" style={{ background: cardBg, borderColor }}>
                    {searchResults.length === 0 ? (
                      <div className="p-4 text-[13px]" style={{ color: textMuted }}>Hech narsa topilmadi</div>
                    ) : (
                      searchResults.slice(0, 20).map((w) => (
                        <div key={w.id} className="flex items-center justify-between px-4 py-3 border-b last:border-0 hover:bg-black/5 transition-colors" style={{ borderColor }}>
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="kr font-bold text-[15px]">{w.kr}</span>
                            <span className="text-[13px]" style={{ color: textMuted }}>→ {w.uz}</span>
                            <span className="text-[10px] px-2 py-[2px] rounded-full border shrink-0" style={{ borderColor, color: textMuted }}>
                              Kun {contentToSeq[w.day] || w.day}
                            </span>
                          </div>
                          <button onClick={() => speakKorean(w.kr)} className="w-8 h-8 rounded-full flex items-center justify-center border shrink-0 hover:bg-black/5" style={{ borderColor }}>
                            🔊
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>

              {/* 4. KEYINGI KUN KARTASI */}
              {nextDay && (
                <div
                  className={`rounded-[20px] border p-4 sm:p-5 flex items-center justify-between gap-3 ${nextDayLocked ? "opacity-80" : ""}`}
                  style={{ background: cardBg, borderColor, borderStyle: nextDayLocked ? "dashed" : "solid", borderWidth: "1px" }}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-[18px] shrink-0 border ${nextDayLocked ? "bg-[#eee] text-[#999] dark:bg-neutral-800" : "bg-black text-white"}`}>
                      {nextDayLocked ? "🔒" : "⏭️"}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold tracking-widest" style={{ color: textMuted }}>KEYINGI KUN</span>
                        {nextDayLocked && <span className="text-[10px] px-2 py-[1px] rounded-full bg-[#eee] dark:bg-neutral-800 text-[#777] font-semibold">🔒 Qulflangan</span>}
                      </div>
                      <div className="font-bold text-[15px] mt-0.5">Kun {nextDay} • {nextDayWords.length} ta so'z</div>
                      <div className="text-[12px] mt-0.5 truncate" style={{ color: textMuted }}>
                        {nextDayLocked ? "Avval joriy kunni 80% dan oshiring" : `${nextDayWords.slice(0, 3).map((w) => w.kr).join(", ")}...`}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (nextDayLocked) {
                        showToast("Avval joriy kunni 80% dan oshiring");
                        return;
                      }
                      setSelectedDayModal(nextDay);
                    }}
                    className={`h-10 px-4 rounded-xl text-[13px] font-bold shrink-0 ${nextDayLocked ? "bg-[#e5e5e5] text-[#888] dark:bg-neutral-800" : "bg-black text-white"}`}
                  >
                    {nextDayLocked ? "🔒" : "Ochish"}
                  </button>
                </div>
              )}

              {/* 5. BARCHA KUNLAR TUGMASI */}
              <button
                onClick={() => setShowAllDaysModal(true)}
                className="w-full h-[52px] rounded-[20px] border-2 border-dashed flex items-center justify-center gap-3 font-bold text-[14px] hover:bg-black/5 transition-colors"
                style={{ background: cardBg, borderColor, color: textMain }}
              >
                <span>📅</span>
                <span>Barcha kunlar ({totalDays})</span>
                <span className="text-[11px] px-2 py-[2px] rounded-full border" style={{ borderColor, color: textMuted }}>
                  {overallStats.completedStages}/{overallStats.totalStages} tugallangan
                </span>
              </button>
            </div>
          );
        })()}

        {activeTab === "levels" && (
          <div className="space-y-4 anim-in">
            {/* Yuqori panel: orqaga qaytish */}
            <div className="flex items-center justify-between pb-2 border-b" style={{ borderColor }}>
              <button
                onClick={() => setActiveTab("home")}
                className="flex items-center gap-1.5 text-[14px] font-bold px-3 py-1.5 rounded-xl border hover:bg-black/5 transition-colors"
                style={{ borderColor, color: textMain }}
              >
                <span>←</span>
                <span>Bosh sahifaga</span>
              </button>
              <div className="text-[12px] font-semibold" style={{ color: textMuted }}>
                {levelSubTab === "leaderboard" ? "O'quvchilar reytingi" : `Daraja ${currentLevel}`}
              </div>
            </div>

            {/* TOP SUB-TAB SWITCHER */}
            <div className="flex rounded-2xl border p-1" style={{ background: cardBg, borderColor }}>
              <button
                onClick={() => setLevelSubTab("leaderboard")}
                className={`flex-1 py-2.5 rounded-xl font-bold text-[13px] transition-all flex items-center justify-center gap-1.5 ${levelSubTab === "leaderboard" ? "bg-black text-white shadow-sm" : ""}`}
                style={{ color: levelSubTab === "leaderboard" ? "#fff" : textMuted }}
              >
                <span>🏆</span>
                <span>TOP Reyting & Eslatma</span>
              </button>
              <button
                onClick={() => setLevelSubTab("levels")}
                className={`flex-1 py-2.5 rounded-xl font-bold text-[13px] transition-all flex items-center justify-center gap-1.5 ${levelSubTab === "levels" ? "bg-black text-white shadow-sm" : ""}`}
                style={{ color: levelSubTab === "levels" ? "#fff" : textMuted }}
              >
                <span>⚡</span>
                <span>Darajalar (Level {currentLevel})</span>
              </button>
            </div>

            {levelSubTab === "leaderboard" ? (
              <LeaderboardAndRemindersView
                isDark={isDark}
                cardBg={cardBg}
                borderColor={borderColor}
                textMain={textMain}
                textMuted={textMuted}
                userXp={xp}
                currentDay={currentDay}
                showToast={showToast}
              />
            ) : (
              <div className="space-y-4 anim-in">
                {/* LEVEL KARTASI: IXCHAM VA ZAMONAVIY */}
                <div className="rounded-[24px] border overflow-hidden p-5 sm:p-6 shadow-sm" style={{ background: levelInfo.levelDef.gradient, color: "#fff" }}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-[56px] h-[56px] rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center text-[28px] shadow-lg shrink-0">
                        {levelInfo.levelDef.icon}
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-white/20">LEVEL {currentLevel}</span>
                        <div className="text-[22px] font-black mt-1 leading-none">{levelInfo.levelDef.name}</div>
                        <div className="text-[12px] mt-1 opacity-90 truncate">{levelInfo.levelDef.desc}</div>
                        <div className="mt-2 text-[12px] font-bold">
                          {levelInfo.inLevelXp.toLocaleString()} / {levelInfo.needForLevel.toLocaleString()} XP • {levelInfo.remaining > 0 ? `${levelInfo.remaining.toLocaleString()} XP qoldi` : "Maksimal daraja! 🌟"}
                        </div>
                      </div>
                    </div>

                    <div className="relative w-[76px] h-[76px] shrink-0">
                      <svg width="76" height="76" className="progress-ring">
                        <circle cx="38" cy="38" r="30" stroke="rgba(255,255,255,0.25)" strokeWidth="6" fill="none" />
                        <circle
                          cx="38"
                          cy="38"
                          r="30"
                          stroke="#fff"
                          strokeWidth="6"
                          fill="none"
                          strokeDasharray={188.5}
                          strokeDashoffset={188.5 - (188.5 * levelInfo.pct) / 100}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-[18px] font-black leading-none">{levelInfo.pct}%</div>
                        <div className="text-[9px] opacity-80 mt-0.5">Lv {currentLevel}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-[11px] opacity-85">
                    <span>Jami to'plangan: {xp.toLocaleString()} XP</span>
                    <span>Umumiy marra: 275,000 XP</span>
                  </div>
                </div>

                {/* STREAK BONUSLARI (IKKINCHI DARAJA) */}
                <div className="rounded-[20px] border p-4 sm:p-5" style={{ background: cardBg, borderColor }}>
                  <div className="flex items-center gap-2 mb-1.5 font-bold text-[14px]">
                    <span>🔥</span>
                    <span>Streak Bonuslari</span>
                  </div>
                  <div className="text-[11px] mb-3" style={{ color: textMuted }}>
                    Joriy streak: {streak.count} kun ketma-ket • Har kuni kamida 1 bo'lim bajaring
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {STREAK_MILESTONES.map((ms) => {
                      const done = (streak.awarded || []).includes(ms.d);
                      return (
                        <div
                          key={ms.d}
                          className="flex items-center justify-between rounded-xl p-2.5 border"
                          style={{
                            borderColor: done ? "#16a34a" : borderColor,
                            background: done ? (isDark ? "#0f2818" : "#f0fdf4") : "transparent"
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <span>{done ? "✅" : "🔒"}</span>
                            <span className="font-bold text-[12px]">{ms.d} kun ketma-ket</span>
                          </div>
                          <span className="text-[12px] font-bold" style={{ color: done ? "#16a34a" : textMuted }}>
                            +{ms.xp.toLocaleString()} XP
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 10 TA LEVEL RO'YXATI */}
                <div className="space-y-2.5">
                  <h3 className="font-bold text-[15px]">Barcha Level'lar (10 ta)</h3>
                  {LEVELS.map((lvl) => {
                    const unlocked = xp >= lvl.total;
                    const isCur = currentLevel === lvl.level;
                    return (
                      <div
                        key={lvl.level}
                        className={`rounded-[18px] border p-3.5 flex items-center gap-3.5 transition-all ${
                          isCur ? "ring-2 ring-black dark:ring-white shadow-sm" : ""
                        }`}
                        style={{ background: cardBg, borderColor }}
                      >
                        <div className="w-[46px] h-[46px] rounded-xl flex items-center justify-center text-[20px] text-white shrink-0" style={{ background: lvl.gradient }}>
                          {unlocked ? "✅" : lvl.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-[13px] flex items-center gap-2">
                            <span>Lv {lvl.level} • {lvl.name}</span>
                            {isCur && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-black text-white dark:bg-white dark:text-black font-bold">Hozirgi</span>}
                          </div>
                          <div className="text-[11px] truncate mt-0.5" style={{ color: textMuted }}>
                            {lvl.desc} • {lvl.total.toLocaleString()} XP da ochiladi
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "grammar" && (
          <GrammarModuleView
            isDark={isDark}
            cardBg={cardBg}
            borderColor={borderColor}
            textMain={textMain}
            textMuted={textMuted}
            grammarProgress={grammarProgress}
            onUpdateGrammarProgress={(topicId, pct) => {
              setGrammarProgress((prev) => ({
                ...prev,
                [topicId]: Math.max(prev[topicId] || 0, pct)
              }));
            }}
          />
        )}

        {/* TAB 4: STATISTIKA VA XATOLAR */}
        {activeTab === "stats" && (
          <div className="space-y-4 anim-in">
            <h2 className="text-[22px] font-bold">Statistika</h2>
            
            {/* 4 TA ASOSIY KO'RSATKICH KARTASI */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-2xl border p-4 shadow-xs" style={{ background: cardBg, borderColor }}>
                <div className="text-[11px] font-semibold" style={{ color: textMuted }}>Jami javoblar</div>
                <div className="text-[22px] font-black mt-1">{overallStats.totalAll.toLocaleString()}</div>
                <div className="text-[10px] mt-0.5" style={{ color: textMuted }}>savol ishlangan</div>
              </div>

              <div className="rounded-2xl border p-4 shadow-xs" style={{ background: cardBg, borderColor }}>
                <div className="text-[11px] font-semibold" style={{ color: textMuted }}>To'g'ri javoblar</div>
                <div className="text-[22px] font-black mt-1 text-green-600">{overallStats.totalCorrect.toLocaleString()}</div>
                <div className="text-[10px] mt-0.5 text-green-600 font-semibold">to'g'ri topildi</div>
              </div>

              <div className="rounded-2xl border p-4 shadow-xs" style={{ background: cardBg, borderColor }}>
                <div className="text-[11px] font-semibold" style={{ color: textMuted }}>O'rtacha aniqlik</div>
                <div className="text-[22px] font-black mt-1">{overallStats.avg}%</div>
                <div className="text-[10px] mt-0.5" style={{ color: textMuted }}>aniqlik darajasi</div>
              </div>

              <div className="rounded-2xl border p-4 shadow-xs" style={{ background: cardBg, borderColor }}>
                <div className="text-[11px] font-semibold" style={{ color: textMuted }}>Yakunlangan bosqich</div>
                <div className="text-[22px] font-black mt-1">{overallStats.completedStages} / {overallStats.totalStages}</div>
                <div className="text-[10px] mt-0.5" style={{ color: textMuted }}>ta bosqich yakunlangan</div>
              </div>
            </div>

            {/* XATOLARNI TAKRORLASH TUGMASI VA KARTALARI */}
            <div className="rounded-[24px] border p-5 space-y-4" style={{ background: cardBg, borderColor }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center text-[20px]">
                    📋
                  </div>
                  <div>
                    <div className="font-bold text-[15px]">Lug'at xatoliklari</div>
                    <div className="text-[11px]" style={{ color: textMuted }}>
                      Jami {overallStats.mistakesCount} ta xato so'z qayd etilgan
                    </div>
                  </div>
                </div>
                <span className="text-[18px] font-black text-amber-600">
                  {overallStats.mistakesCount} ta
                </span>
              </div>

              {overallStats.mistakesCount > 0 ? (
                <div className="space-y-3 pt-2 border-t" style={{ borderColor }}>
                  <p className="text-[12px] leading-relaxed" style={{ color: textMuted }}>
                    Xatolaringizni maxsus takrorlash orqali so'zlarni xotirangizda mustahkamlang.
                  </p>
                  <button
                    onClick={() => {
                      setActiveStudyStage({
                        day: "mistakes",
                        stageId: "flash",
                        words: wrongWords,
                        review: true,
                        noXp: true
                      });
                    }}
                    className="w-full h-12 rounded-xl bg-black text-white font-bold text-[14px] flex items-center justify-center gap-2 hover:bg-[#222] transition-colors shadow-sm"
                  >
                    <span>🔄</span>
                    <span>Xatolarni takrorlash ({overallStats.mistakesCount} ta so'z)</span>
                  </button>
                </div>
              ) : (
                <div className="pt-2 border-t text-[12px] text-green-600 font-semibold flex items-center gap-1.5" style={{ borderColor }}>
                  <span>🎉</span>
                  <span>Hozircha xatoliklar yo'q, barcha javoblar to'g'ri o'zlashtirilmoqda!</span>
                </div>
              )}
            </div>

            {/* QO'SHIMCHA XATOLAR RO'YXATI KARTALARI */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => setShowDayMistakesModal(true)}
                className="rounded-[20px] border p-4 text-left hover:shadow-md transition-shadow"
                style={{ background: cardBg, borderColor }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-900 flex items-center justify-center text-[18px]">❌</div>
                    <div>
                      <div className="font-bold text-[13px]">Joriy kun xatolari</div>
                      <div className="text-[11px]" style={{ color: textMuted }}>Kun {currentDay}</div>
                    </div>
                  </div>
                  <div className="text-[18px] font-bold">{wrongWords.filter((w) => w.day === currentDay).length}</div>
                </div>
              </button>

              <button
                onClick={() => { setMistakesFilterDay(null); setShowAllMistakesModal(true); }}
                className="rounded-[20px] border p-4 text-left hover:shadow-md transition-shadow"
                style={{ background: cardBg, borderColor }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-900 flex items-center justify-center text-[18px]">📋</div>
                    <div>
                      <div className="font-bold text-[13px]">Barcha xatolar</div>
                      <div className="text-[11px]" style={{ color: textMuted }}>Barcha kunlar bo'yicha</div>
                    </div>
                  </div>
                  <div className="text-[18px] font-bold">{overallStats.mistakesCount}</div>
                </div>
              </button>
            </div>
          </div>
        )}

        {activeTab === "menu" && (() => {
          const tg = typeof window !== "undefined" && window.Telegram && window.Telegram.WebApp;
          const tgUser = tg?.initDataUnsafe?.user;

          return (
            <div className="space-y-4 max-w-[560px] anim-in">
              <h2 className="text-[22px] font-bold">Profil & Sozlamalar</h2>

              {/* 1. AKKAUNT / PROFIL KARTASI */}
              <div className="rounded-[24px] border p-5 shadow-xs" style={{ background: cardBg, borderColor }}>
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-[26px] text-white shadow-sm shrink-0" style={{ background: levelInfo.levelDef.gradient }}>
                    {levelInfo.levelDef.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-[16px] truncate">
                      {tgUser?.first_name ? `${tgUser.first_name} ${tgUser.last_name || ""}` : "O'quvchi (Mehmon)"}
                    </div>
                    <div className="text-[12px] truncate" style={{ color: textMuted }}>
                      {tgUser?.username ? `@${tgUser.username}` : tgUser?.id ? `ID: ${tgUser.id}` : "Veb-brauzer versiyasi"}
                    </div>
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className="text-[11px] px-2 py-0.5 rounded-full text-white font-bold" style={{ background: levelInfo.levelDef.gradient }}>
                        Level {currentLevel}
                      </span>
                      <span className="text-[11px] font-semibold text-amber-500">
                        ⚡ {xp.toLocaleString()} XP
                      </span>
                      {streak.count > 0 && (
                        <span className="text-[11px] font-semibold text-orange-500">
                          🔥 {streak.count} kun
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. TEZKOR BO'LIMLAR (REYTING VA LEVEL) */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setActiveTab("levels");
                    setLevelSubTab("leaderboard");
                  }}
                  className="rounded-2xl border p-4 text-left hover:shadow-md transition-all flex flex-col justify-between"
                  style={{ background: cardBg, borderColor }}
                >
                  <div className="text-[24px] mb-2">🏆</div>
                  <div>
                    <div className="font-bold text-[14px]">TOP Reyting</div>
                    <div className="text-[11px] mt-0.5" style={{ color: textMuted }}>O'quvchilar ro'yxati & Eslatma</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setActiveTab("levels");
                    setLevelSubTab("levels");
                  }}
                  className="rounded-2xl border p-4 text-left hover:shadow-md transition-all flex flex-col justify-between"
                  style={{ background: cardBg, borderColor }}
                >
                  <div className="text-[24px] mb-2">⚡</div>
                  <div>
                    <div className="font-bold text-[14px]">Level & Yutuqlar</div>
                    <div className="text-[11px] mt-0.5" style={{ color: textMuted }}>10 ta daraja & streak</div>
                  </div>
                </button>
              </div>

              {/* 3. SOZLAMALAR KARTASI */}
              <div className="rounded-[24px] border p-5 space-y-4 shadow-xs" style={{ background: cardBg, borderColor }}>
                <div className="font-bold text-[14px]">Ilova sozlamalari</div>

                {/* Mavzu (Light / Dark) */}
                <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor }}>
                  <div>
                    <div className="text-[13px] font-medium">Mavzu (Ko'rinish)</div>
                    <div className="text-[11px]" style={{ color: textMuted }}>Yorug' yoki qorong'i rejim</div>
                  </div>
                  <div className="flex items-center gap-1.5 p-1 rounded-full border" style={{ borderColor }}>
                    <button
                      onClick={() => setTheme("light")}
                      className={`h-8 px-3.5 rounded-full text-[12px] font-bold transition-colors ${!isDark ? "bg-black text-white" : ""}`}
                    >
                      Light
                    </button>
                    <button
                      onClick={() => setTheme("dark")}
                      className={`h-8 px-3.5 rounded-full text-[12px] font-bold transition-colors ${isDark ? "bg-white text-black" : ""}`}
                    >
                      Dark
                    </button>
                  </div>
                </div>

                {/* Dars eslatmalari holati */}
                <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor }}>
                  <div>
                    <div className="text-[13px] font-medium">Kunlik eslatma</div>
                    <div className="text-[11px]" style={{ color: textMuted }}>Telegram orqali kunlik dars eslatmasi</div>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab("levels");
                      setLevelSubTab("leaderboard");
                    }}
                    className="h-8 px-3.5 rounded-xl border text-[12px] font-bold hover:bg-black/5"
                    style={{ borderColor }}
                  >
                    Boshqarish ›
                  </button>
                </div>
              </div>

              {/* 4. O'RGANISH TIZIMI TAVSIFI */}
              <div className="rounded-[24px] border p-5 shadow-xs" style={{ background: cardBg, borderColor }}>
                <div className="font-semibold text-[14px]">O'rganish tizimi haqida</div>
                <ul className="mt-2.5 text-[12px] leading-6 list-disc pl-4 space-y-1" style={{ color: textMuted }}>
                  <li>1,051 ta saralangan so'z va iboralar ({totalDays} kunlik dars)</li>
                  <li>Har bir so'z 5 bosqichda: Flashcard, Test, Yozish, Tarjima, Tinglash</li>
                  <li>80% to'planganda keyingi bosqich va keyingi kun ochiladi</li>
                  <li>Koreys tili 28 ta grammatik mavzusi va test mashqlari</li>
                  <li>Streak: har kuni dars o'tib o'z ketma-ketlik XP bonuslarini oling!</li>
                </ul>
              </div>

              {/* 5. PROGRESSNI QAYTA O'RNATISH (RESET PROGRESS) */}
              <div className="rounded-[24px] border p-5 border-red-200 dark:border-red-900 bg-red-500/5 space-y-2">
                <div className="text-[13px] font-bold text-red-600 dark:text-red-400">
                  ⚠️ Progressni tozalash (Reset)
                </div>
                <p className="text-[11px] leading-relaxed" style={{ color: textMuted }}>
                  Agar ilovani boshidan toza boshlamoqchi bo'lsangiz, barcha progress, xatolar va grammatika ko'rsatkichlarini nollashingiz mumkin.
                </p>
                <button
                  onClick={() => {
                    if (window.confirm("Barcha dars va grammatika progressini o'chirib, noldan boshlamoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi.")) {
                      try {
                        localStorage.removeItem("koruz_progress");
                        localStorage.removeItem("koruz_grammar_progress");
                        localStorage.removeItem("koruz_wrong");
                        localStorage.removeItem("koruz_xp");
                        localStorage.removeItem("koruz_xp_given");
                        localStorage.removeItem("kor_uz_streak");
                        window.location.reload();
                      } catch (e) {
                        alert("Xatolik bo'ldi");
                      }
                    }
                  }}
                  className="mt-2 h-10 px-4 rounded-xl border border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 font-bold text-[12px] hover:bg-red-500/10 transition-colors"
                >
                  Barcha progressni qayta o'rnatish
                </button>
              </div>
            </div>
          );
        })()}

        </main>

      {/* PASTKI NAVIGATSIYA */}
      <nav className="fixed bottom-0 left-0 right-0 z-20 border-t backdrop-blur-xl" style={{ background: isDark ? "rgba(18,18,18,0.92)" : "rgba(246,245,241,0.92)", borderColor }}>
        <div className="max-w-[980px] mx-auto h-[72px] flex items-center justify-around px-2">
          {[
            { id: "home", label: "Bosh sahifa", icon: "🏠" },
            { id: "grammar", label: "Grammatika", icon: "📘" },
            { id: "stats", label: "Statistika", icon: "📊" },
            { id: "menu", label: "Profil", icon: "👤" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setActiveTab(item.id);
              }}
              className={`flex-1 flex flex-col items-center justify-center gap-1 py-2 px-2 rounded-2xl transition-all ${
                activeTab === item.id ? "bg-black text-white shadow-sm" : "hover:bg-black/5"
              }`}
              style={{ color: activeTab === item.id ? "#fff" : (isDark ? "#b0b0b0" : "#555") }}
            >
              <span className="text-[18px] leading-none">{item.icon}</span>
              <span className="text-[10px] font-semibold whitespace-nowrap">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* MODAL 1: BOSQICHLARNI KO'RISH */}
      {selectedDayModal && (
        <div className="fixed inset-0 z-30 flex items-end sm:items-center justify-center p-0 sm:p-6 overflow-hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedDayModal(null)} />
          <div className="relative w-full sm:max-w-[640px] max-h-[85vh] h-[85vh] rounded-t-[28px] sm:rounded-[28px] border overflow-hidden flex flex-col anim-in" style={{ background: cardBg, borderColor }}>
            <div className="p-5 border-b flex items-start justify-between shrink-0" style={{ borderColor }}>
              <div>
                <div className="text-[12px] font-bold tracking-widest" style={{ color: textMuted }}>
                  KUN {selectedDayModal}
                </div>
                <div className="text-[20px] font-bold mt-1">
                  {getDayWords(selectedDayModal).length} ta so'z • 5 bosqich
                </div>
              </div>
              <button onClick={() => setSelectedDayModal(null)} className="w-9 h-9 rounded-full border flex items-center justify-center">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {STAGES.map((s, idx) => {
                const stageProg = progress[selectedDayModal]?.[s.id];
                const pct = stageProg?.pct || 0;
                const isPassed = pct >= 80;
                const locked = isStageLocked(selectedDayModal, idx);
                const xpPerWord = STAGE_XP[s.id];
                const isCurrent = !locked && !isPassed;

                return (
                  <div
                    key={s.id}
                    className={`rounded-2xl border p-4 flex items-center justify-between gap-3 transition-all ${
                      isCurrent ? "ring-2 ring-black dark:ring-white shadow-sm" : ""
                    }`}
                    style={{
                      borderColor: isCurrent ? (isDark ? "#fff" : "#000") : borderColor,
                      background: locked ? (isDark ? "#222" : "#faf8f3") : cardBg
                    }}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center text-[18px] border shrink-0 ${
                          isPassed
                            ? "bg-green-600 text-white border-green-600"
                            : locked
                            ? "bg-gray-100 dark:bg-neutral-800 text-gray-400 border-gray-200 dark:border-neutral-700"
                            : "bg-black text-white border-black"
                        }`}
                      >
                        {locked ? "🔒" : isPassed ? "✓" : s.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-[14px]">{idx + 1}. {s.name}</span>
                          {isCurrent && (
                            <span className="text-[10px] px-2 py-[2px] rounded-full bg-amber-500 text-white font-bold">
                              Joriy bosqich
                            </span>
                          )}
                          <span className="text-[10px] px-2 py-[2px] rounded-full border font-semibold" style={{ borderColor }}>
                            {locked ? "🔒 Qulflangan" : isPassed ? `✅ ${pct}%` : `${pct}%`}
                          </span>
                        </div>
                        <div className="text-[12px] mt-0.5 truncate" style={{ color: textMuted }}>
                          {locked ? `Avval ${STAGES[idx - 1]?.name || ""} bosqichini 80% dan oshiring` : `${s.desc} • +${xpPerWord} XP/so'z`}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (locked) {
                          showToast(`Avval ${STAGES[idx - 1].name} bosqichini 80% dan oshiring`);
                          return;
                        }
                        setSelectedDayModal(null);
                        setActiveStudyStage({ day: selectedDayModal, stageId: s.id, words: getDayWords(selectedDayModal), review: false, noXp: false });
                      }}
                      className={`h-10 px-4 rounded-xl text-[13px] font-bold shrink-0 transition-colors ${
                        locked
                          ? "bg-gray-200 dark:bg-neutral-800 text-gray-500 cursor-not-allowed"
                          : isPassed
                          ? "bg-transparent border hover:bg-black/5"
                          : "bg-black text-white hover:bg-[#222] shadow-sm"
                      }`}
                      style={isPassed ? { borderColor, color: textMain } : {}}
                    >
                      {locked ? "🔒" : isPassed ? "Qayta 🔄" : "Boshlash →"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: 5 BOSQICHLI O'QISH DARCHASI */}
      {activeStudyStage && (
        <StudyModalView
          key={`${activeStudyStage.day}-${activeStudyStage.stageId}`}
          day={activeStudyStage.day}
          stageId={activeStudyStage.stageId}
          words={activeStudyStage.words || getDayWords(activeStudyStage.day)}
          review={activeStudyStage.review}
          noXp={activeStudyStage.noXp}
          isDark={isDark}
          cardBg={cardBg}
          borderColor={borderColor}
          textMain={textMain}
          textMuted={textMuted}
          onClose={() => setActiveStudyStage(null)}
          onAddXp={addXp}
          onMarkStudied={() => markStudied(activeStudyStage.day)}
          onWrong={handleWrongAnswer}
          onNextStage={(nextId) => setActiveStudyStage({ ...activeStudyStage, stageId: nextId })}
          onCompleteStage={(pct, correct, total) => {
            if (activeStudyStage.day !== "mistakes") {
              setProgress((prev) => {
                const updated = { ...prev };
                if (!updated[activeStudyStage.day]) updated[activeStudyStage.day] = {};
                updated[activeStudyStage.day][activeStudyStage.stageId] = { pct, correct, total };
                return updated;
              });
              syncProgressWithServer(activeStudyStage.day, activeStudyStage.stageId, xp);
            }
          }}
        />
      )}

      {/* MODAL 3: BARCHA KUNLAR (BITTA TOZA AYLANUVCHI PANEL) */}
      {showAllDaysModal && (
        <div className="fixed inset-0 z-30 flex items-end sm:items-center justify-center p-0 sm:p-6 overflow-hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowAllDaysModal(false)} />
          <div className="relative w-full sm:max-w-[640px] max-h-[85vh] h-[85vh] rounded-t-[28px] sm:rounded-[28px] border overflow-hidden flex flex-col anim-in" style={{ background: cardBg, borderColor }}>
            <div className="p-5 border-b flex items-center justify-between shrink-0" style={{ borderColor }}>
              <div>
                <div className="font-bold text-[16px]">Barcha kunlar</div>
                <div className="text-[12px]" style={{ color: textMuted }}>{totalDays} kunlik to'liq dastur</div>
              </div>
              <button onClick={() => setShowAllDaysModal(false)} className="w-9 h-9 rounded-full border flex items-center justify-center">✕</button>
            </div>
            
            {/* Faqat bitta panelda aylanadigan qulay ro'yxat */}
            <div className="flex-1 overflow-y-auto divide-y" style={{ borderColor }}>
              {Array.from({ length: totalDays }, (_, i) => i + 1).map((d) => {
                const isLocked = isDayLocked(d);
                const isCur = d === currentDay;
                const dProg = getDayProgress(d);
                return (
                  <div
                    key={d}
                    onClick={() => {
                      if (isLocked) {
                        showToast("Bu kun hali qulflangan");
                        return;
                      }
                      setShowAllDaysModal(false);
                      setSelectedDayModal(d);
                    }}
                    className={`flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-white/40 ${isLocked ? "opacity-60" : ""}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold border ${isCur ? "bg-black text-white" : "bg-white text-black"}`}>
                        {d}
                      </div>
                      <div>
                        <div className="font-bold text-[14px]">
                          {schedule[d - 1]?.type === "weekly" ? "📅 Haftalik takrorlash" :
                           schedule[d - 1]?.type === "monthly" ? "🗓️ Oylik takrorlash" :
                           schedule[d - 1]?.type === "general" ? "🌍 Umumiy takrorlash" : `Kun ${d}`}
                        </div>
                        <div className="text-[11px]" style={{ color: textMuted }}>
                          {getDayWords(d).length} ta so'z • {Math.round(dProg.avg)}%
                        </div>
                      </div>
                    </div>
                    <span>{isLocked ? "🔒" : "›"}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: JORIY KUN XATOLARI */}
      {showDayMistakesModal && (
        <MistakesListView
          title={`Kun ${currentDay} xatolari`}
          mistakes={wrongWords.filter((w) => w.day === currentDay)}
          cardBg={cardBg}
          borderColor={borderColor}
          textMuted={textMuted}
          onClose={() => setShowDayMistakesModal(false)}
          onStartPractice={(subset) => {
            setShowDayMistakesModal(false);
            setActiveStudyStage({ day: "mistakes", stageId: "flash", words: subset, review: true, noXp: true });
          }}
        />
      )}

      {/* MODAL 5: UMUMIY XATOLAR */}
      {showAllMistakesModal && (
        <AllMistakesModalView
          mistakes={wrongWords}
          filterDay={mistakesFilterDay}
          onSelectFilterDay={setMistakesFilterDay}
          cardBg={cardBg}
          borderColor={borderColor}
          textMuted={textMuted}
          onClose={() => { setShowAllMistakesModal(false); setMistakesFilterDay(null); }}
          onStartPractice={(subset) => {
            setShowAllMistakesModal(false);
            setMistakesFilterDay(null);
            setActiveStudyStage({ day: "mistakes", stageId: "flash", words: subset, review: true, noXp: true });
          }}
        />
      )}

      {/* MODAL 6: LEVEL UP */}
      {levelUpData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setLevelUpData(null)} />
          <div className="relative w-full max-w-[420px] rounded-[32px] bg-white text-black p-8 text-center levelUp-enter shadow-2xl">
            <div className="w-20 h-20 rounded-3xl mx-auto flex items-center justify-center text-[40px] text-white shadow-lg" style={{ background: levelUpData.levelDef.gradient }}>
              {levelUpData.levelDef.icon}
            </div>
            <div className="mt-4 text-[12px] font-bold uppercase tracking-widest text-gray-400">Level Up!</div>
            <div className="text-[28px] font-black mt-1">Tabriklaymiz! 🎉</div>
            <div className="text-[16px] font-bold mt-1 text-gray-700">Siz Level {levelUpData.level} ga o'tdingiz!</div>
            <div className="mt-3 text-[14px] text-gray-500">{levelUpData.levelDef.desc}</div>
            <button onClick={() => setLevelUpData(null)} className="mt-6 w-full h-[52px] rounded-2xl font-bold text-[15px] text-white" style={{ background: levelUpData.levelDef.gradient }}>
              Davom etish! 🚀
            </button>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toastMessage && (
        <div className="fixed bottom-[88px] left-1/2 -translate-x-1/2 z-50 toast-in">
          <div className="bg-black text-white px-5 py-3 rounded-2xl text-[13px] font-semibold shadow-2xl">
            {toastMessage}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// STUDY MODAL VIEW (5 BOSQICH TO'LIQ ISHLAYDIGAN MOTOR)
// ============================================================
function StudyModalView({ day, stageId, words, review, noXp, isDark, cardBg, borderColor, textMain, textMuted, onClose, onAddXp, onMarkStudied, onWrong, onNextStage, onCompleteStage }) {
  const [index, setIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [answered, setAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [earnedXpTotal, setEarnedXpTotal] = useState(0);

  const total = words.length || 1;
  const currentWord = words[index] || { kr: "", uz: "" };
  const stageXp = noXp ? 0 : (STAGE_XP[stageId] || 5);

  // Variantlarni barqaror yaratish (har bir savol indeksida bitta yangilanadi)
  const options = useMemo(() => {
    if (!currentWord || (stageId !== "test" && stageId !== "listening")) return [];
    const others = words.filter((w) => w.id !== currentWord.id).sort(() => Math.random() - 0.5).slice(0, 3);
    return [{ label: currentWord.uz, isCorrect: true }, ...others.map((w) => ({ label: w.uz, isCorrect: false }))].sort(() => Math.random() - 0.5);
  }, [index, stageId]);

  // Flashcard bildim / bilmadim
  const handleFlashcard = (knew) => {
    if (knew) {
      setCorrectCount((c) => c + 1);
      if (stageXp > 0) {
        onAddXp(stageXp);
        setEarnedXpTotal((x) => x + stageXp);
      }
    } else {
      onWrong({ day, stageId, stageName: "Flashcard", kr: currentWord.kr, uz: currentWord.uz, userAnswer: "(Bilmadim)", correctAnswer: currentWord.uz });
    }

    if (index === total - 1) {
      finishStage(knew ? correctCount + 1 : correctCount);
    } else {
      setShowAnswer(false);
      setIndex((i) => i + 1);
    }
  };

  // Test / Tinglash variant tanlash
  const handleSelectOption = (optIdx) => {
    if (answered) return;
    setAnswered(true);
    setSelectedOption(optIdx);

    const isCorrect = options[optIdx].isCorrect;
    if (isCorrect) {
      setCorrectCount((c) => c + 1);
      if (stageXp > 0) {
        onAddXp(stageXp);
        setEarnedXpTotal((x) => x + stageXp);
      }
    } else {
      onWrong({ day, stageId, stageName: stageId === "test" ? "Test" : "Tinglash", kr: currentWord.kr, uz: currentWord.uz, userAnswer: options[optIdx].label, correctAnswer: currentWord.uz });
    }
  };

  // Yozish va Tarjimani tekshirish (Tezkor tekshiruv + Sun'iy Intellekt AI tekshiruvi)
  const [checkingAi, setCheckingAi] = useState(false);
  const [aiFeedback, setAiFeedback] = useState("");

  // Har qanday apostrof va tinish belgilarini standartlashtirish
  const normalizeText = (str) => {
    if (!str) return "";
    return str
      .toLowerCase()
      .replace(/[\u2018\u2019\u02BB\u02BC\u0060\u0027\u201B\u2032]/g, "'")
      .replace(/o['‘`ʼ’]/g, "o'")
      .replace(/g['‘`ʼ’]/g, "g'")
      .replace(/[?!.,;:~]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  const handleCheckWriting = async () => {
    if (answered || checkingAi || !userInput.trim()) return;
    const target = stageId === "writing" ? currentWord.uz : currentWord.kr;
    const cleanUser = normalizeText(userInput);
    const cleanTarget = normalizeText(target);
    const noAposUser = cleanUser.replace(/['’‘`ʼ]/g, "");
    const noAposTarget = cleanTarget.replace(/['’‘`ʼ]/g, "");

    // Qismlarga ajratish (qavs ichidagi, vergul, slash bilan berilgan muqobil ma'nolar):
    const targetParts = target.split(/[\/,()]/).map(s => normalizeText(s)).filter(Boolean);
    const targetPartsNoApos = targetParts.map(s => s.replace(/['’‘`ʼ]/g, ""));

    // Ko'p ma'noli va sinonim so'zlar lug'ati (Tezkor va 100% ishonchli):
    const SYNONYMS = {
      "이": ["tish", "ikki", "bu"],
      "오": ["besh"],
      "배": ["nok", "qorin", "kema"],
      "차": ["mashina", "choy"],
      "눈": ["ko'z", "qor", "koz"],
      "밤": ["tun", "kashtan"],
      "다리": ["oyoq", "ko'prik", "koprik"],
      "일": ["ish", "bir", "kun"],
      "사과": ["olma", "kechirim", "kechirim so'rash", "kechirish"],
      "말": ["gap", "so'z", "ot", "til"],
      "손": ["qo'l", "qol", "mehmon"],
      "남자": ["erkak", "yigit", "kishi"],
      "안녕하세요": ["salom", "assalomu alaykum", "assalomu alekum", "yaxshimisiz", "salomlashish"],
      "안녕하세요?": ["salom", "assalomu alaykum", "assalomu alekum", "yaxshimisiz", "salomlashish"],
      "안녕": ["salom", "xayr"],
      "읽으세요": ["o'qing", "oqing", "uqisangiz"],
      "TV를 봐요": ["televizor ko'ryapman", "tv ko'ryapman", "televizor ko'raman", "tv koryapman", "televizor koryapman"],
      "TV 를 봐요": ["televizor ko'ryapman", "tv ko'ryapman", "televizor ko'raman", "tv koryapman", "televizor koryapman"]
    };

    const extraSynonyms = (stageId === "writing" && SYNONYMS[currentWord.kr]) || [];
    const extraSynonymsNorm = extraSynonyms.map(s => normalizeText(s));
    const extraSynonymsNoApos = extraSynonyms.map(s => s.replace(/['’‘`ʼ]/g, "").toLowerCase());

    // 1. Tezkor mahalliy tekshiruv (0 millisekundda)
    const isLocalCorrect = 
      cleanUser === cleanTarget ||
      noAposUser === noAposTarget ||
      targetParts.includes(cleanUser) ||
      targetPartsNoApos.includes(noAposUser) ||
      extraSynonymsNorm.includes(cleanUser) ||
      extraSynonymsNoApos.includes(noAposUser);

    if (isLocalCorrect) {
      setAnswered(true);
      setAiFeedback("");
      setCorrectCount((c) => c + 1);
      if (stageXp > 0) {
        onAddXp(stageXp);
        setEarnedXpTotal((x) => x + stageXp);
      }
      return;
    }

    // 2. Agar mahalliy tekshiruvdan o'tmasa — Sun'iy Intellekt (AI) orqali semantik tekshiramiz!
    setCheckingAi(true);
    try {
      const resp = await fetch("https://hanu-bot.onrender.com/api/ai-check-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          korean: currentWord.kr,
          target: target,
          user_answer: userInput.trim(),
          mode: stageId
        })
      });
      if (resp.ok) {
        const data = await resp.json();
        if (data.is_correct) {
          setAnswered(true);
          setAiFeedback(data.feedback || "AI: To'g'ri qabul qilindi!");
          setCorrectCount((c) => c + 1);
          if (stageXp > 0) {
            onAddXp(stageXp);
            setEarnedXpTotal((x) => x + stageXp);
          }
          setCheckingAi(false);
          return;
        } else {
          setAiFeedback(data.feedback || "");
        }
      }
    } catch (e) {
      console.log("AI check error:", e);
    }

    setCheckingAi(false);
    setAnswered(true);
    onWrong({ day, stageId, stageName: stageId === "writing" ? "Yozish" : "Tarjima", kr: currentWord.kr, uz: currentWord.uz, userAnswer: userInput.trim(), correctAnswer: target });
  };

  // Keyingi savolga o'tish
  const handleNextQuestion = () => {
    if (index === total - 1) {
      finishStage(correctCount);
    } else {
      setIndex((i) => i + 1);
      setAnswered(false);
      setSelectedOption(null);
      setUserInput("");
      setShowAnswer(false);
    }
  };

  // Bosqichni yakunlash
  const finishStage = (finalCorrect) => {
    const pct = Math.round((finalCorrect / total) * 100);
    let bonus = 0;
    if (!noXp) {
      if (pct === 100) bonus = BONUS_XP_100;
      else if (pct >= 80) bonus = BONUS_XP_80;
    }

    if (bonus > 0) {
      onAddXp(bonus);
      setEarnedXpTotal((x) => x + bonus);
    }

    onMarkStudied();
    onCompleteStage(pct, finalCorrect, total);
    setIsFinished(true);
  };

  const finalPct = Math.round((correctCount / total) * 100);
  const isPassed = finalPct >= 80;

  return (
    <div className="fixed inset-0 z-40 flex flex-col" style={{ background: isDark ? "#121212" : "#f6f5f1" }}>
      {/* Top bar */}
      <div className="h-[64px] border-b flex items-center justify-between px-4 sm:px-6 shrink-0" style={{ borderColor }}>
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="w-9 h-9 rounded-full border flex items-center justify-center" style={{ borderColor }}>←</button>
          <div>
            <div className="text-[12px] font-bold uppercase tracking-wider" style={{ color: textMuted }}>
              Kun {day} • {stageId} {noXp ? "• XP yo'q (Takrorlash)" : `• ${stageXp} XP/so'z`}
            </div>
            <div className="text-[14px] font-semibold">
              {index + 1} / {total} • ✅ {correctCount}
            </div>
          </div>
        </div>

        <button onClick={() => speakKorean(currentWord?.kr)} className="w-9 h-9 rounded-full border flex items-center justify-center" style={{ borderColor }}>
          🔊
        </button>
      </div>

      {/* Asosiy karta */}
      <div className="flex-1 overflow-auto flex items-center justify-center p-4">
        <div className="w-full max-w-[560px]">
          {!isFinished ? (
            <div className="rounded-[28px] border p-6 sm:p-8 text-center" style={{ background: cardBg, borderColor }}>
              
              {/* STAGE: FLASHCARD */}
              {stageId === "flash" && (
                <div>
                  <div className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-4">FLASHCARD • YODLASH</div>
                  <div className="kr text-[52px] sm:text-[64px] font-bold leading-none">{currentWord.kr}</div>
                  <button onClick={() => speakKorean(currentWord.kr)} className="mt-4 w-12 h-12 rounded-full border inline-flex items-center justify-center text-[20px]" style={{ borderColor }}>
                    🔊
                  </button>

                  {showAnswer && (
                    <div className="mt-6 anim-in">
                      <div className="h-[1px] w-full my-4" style={{ background: borderColor }} />
                      <div className="text-[26px] font-bold">{currentWord.uz}</div>
                      <div className="mt-3 p-3.5 rounded-xl border text-[13px] kr text-left flex items-start gap-2" style={{ borderColor, background: isDark ? "#1a1a1a" : "#faf8f3" }}>
                        <span className="text-[14px]">📖</span>
                        <div className="flex-1">
                          <div className="font-semibold">{currentWord.exKr}</div>
                          <div className="text-gray-500 text-[12px]">{currentWord.exUz}</div>
                        </div>
                        <button onClick={() => speakKorean(currentWord.exKr)} className="w-7 h-7 rounded-full border flex items-center justify-center shrink-0">🔊</button>
                      </div>
                    </div>
                  )}

                  <div className="mt-8">
                    {!showAnswer ? (
                      <button onClick={() => setShowAnswer(true)} className="w-full h-[52px] rounded-2xl bg-black text-white font-bold text-[15px]">
                        👁️ Tarjimani ko'rish
                      </button>
                    ) : (
                      <div className="grid grid-cols-2 gap-3">
                        <button onClick={() => handleFlashcard(false)} className="h-[52px] rounded-2xl border-2 border-red-500 text-red-500 font-bold">
                          ❌ Bilmadim
                        </button>
                        <button onClick={() => handleFlashcard(true)} className="h-[52px] rounded-2xl bg-black text-white font-bold">
                          ✅ Bildim {stageXp > 0 ? `+${stageXp} XP` : ""}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* STAGE: TEST */}
              {stageId === "test" && (
                <div>
                  <div className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-2">TEST • TANLASH</div>
                  <div className="kr text-[44px] font-bold">{currentWord.kr}</div>
                  <button onClick={() => speakKorean(currentWord.kr)} className="mt-2 w-9 h-9 rounded-full border inline-flex items-center justify-center" style={{ borderColor }}>
                    🔊
                  </button>

                  <div className="mt-6 space-y-2.5">
                    {options.map((opt, i) => {
                      const isPicked = selectedOption === i;
                      const isCorrect = opt.isCorrect;
                      let btnBg = cardBg;
                      let btnBorder = borderColor;

                      if (answered) {
                        if (isCorrect) {
                          btnBg = "#dcfce7";
                          btnBorder = "#22c55e";
                        } else if (isPicked) {
                          btnBg = "#fee2e2";
                          btnBorder = "#ef4444";
                        }
                      }

                      return (
                        <button
                          key={i}
                          onClick={() => handleSelectOption(i)}
                          className="w-full h-[52px] rounded-2xl border-2 px-5 text-left font-semibold text-[15px] flex items-center justify-between"
                          style={{ background: btnBg, borderColor: btnBorder }}
                        >
                          <span>{opt.label}</span>
                          {answered && isCorrect && <span>✅</span>}
                          {answered && isPicked && !isCorrect && <span>❌</span>}
                        </button>
                      );
                    })}
                  </div>

                  {answered && (
                    <button onClick={handleNextQuestion} className="mt-6 w-full h-[52px] rounded-2xl bg-black text-white font-bold anim-in">
                      Keyingisi →
                    </button>
                  )}
                </div>
              )}

              {/* STAGE: YOZISH / TARJIMA */}
              {(stageId === "writing" || stageId === "translation") && (
                <div>
                  <div className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                    {stageId === "writing" ? "YOZISH • KR → UZ" : "TARJIMA • UZ → KR"}
                  </div>
                  <div className="text-[40px] font-bold kr">{stageId === "writing" ? currentWord.kr : currentWord.uz}</div>
                  <button onClick={() => speakKorean(currentWord.kr)} className="mt-2 w-9 h-9 rounded-full border inline-flex items-center justify-center" style={{ borderColor }}>
                    🔊
                  </button>

                  <div className="mt-6">
                    <input
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") handleCheckWriting(); }}
                      placeholder={stageId === "writing" ? "O'zbekcha tarjimasini yozing..." : "Koreyscha yozing..."}
                      disabled={answered}
                      className="w-full h-[52px] rounded-2xl border-2 px-5 text-[16px] outline-none text-center font-bold"
                      style={{ background: isDark ? "#1a1a1a" : "#faf8f3", borderColor }}
                    />

                    {!answered ? (
                      <button onClick={handleCheckWriting} disabled={checkingAi} className="mt-4 w-full h-[52px] rounded-2xl bg-black text-white font-bold flex items-center justify-center gap-2">
                        {checkingAi ? (
                          <>
                            <span className="animate-spin text-[18px]">🧠</span>
                            <span>AI tekshirmoqda...</span>
                          </>
                        ) : (
                          <span>Tekshirish {stageXp > 0 ? `+${stageXp} XP` : ""}</span>
                        )}
                      </button>
                    ) : (
                      <div className="mt-4 anim-in">
                        <div className="text-[14px] font-bold mb-3">
                          {aiFeedback && <div className="mb-2 p-2.5 rounded-xl border text-[12px] bg-blue-50 text-blue-800 border-blue-200">🤖 {aiFeedback}</div>}
                          {(() => {
                            const target = stageId === "writing" ? currentWord.uz : currentWord.kr;
                            const cleanUser = userInput.trim().toLowerCase();
                            const cleanTarget = target.trim().toLowerCase();
                            const matches = cleanTarget.split(/[\/,()]/).map(s => s.trim()).filter(Boolean);
                            const POLYSEMOUS = {
                              "이": ["tish", "ikki", "bu"],
                              "오": ["besh"],
                              "배": ["nok", "qorin", "kema"],
                              "차": ["mashina", "choy"],
                              "눈": ["ko'z", "qor"],
                              "밤": ["tun", "kashtan"],
                              "다리": ["oyoq", "ko'prik"],
                              "일": ["ish", "bir", "kun"],
                              "사과": ["olma", "kechirim"],
                              "말": ["gap", "so'z", "ot"],
                              "손": ["qo'l", "mehmon"]
                            };
                            const extra = (stageId === "writing" && POLYSEMOUS[currentWord.kr]) || [];
                            const ok = cleanUser === cleanTarget || matches.includes(cleanUser) || extra.map(s => s.toLowerCase()).includes(cleanUser);
                            return ok ? "✅ To'g'ri!" : `❌ To'g'ri javob: ${target}`;
                          })()}
                        </div>
                        <button onClick={handleNextQuestion} className="w-full h-[52px] rounded-2xl bg-black text-white font-bold">
                          Keyingisi →
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* STAGE: TINGLASH */}
              {stageId === "listening" && (
                <div>
                  <div className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-2">TINGLASH • LISTENING</div>
                  <div className="my-6 text-center">
                    <button
                      onClick={() => speakKorean(currentWord.kr, 0.85)}
                      className="w-24 h-24 rounded-full bg-black text-white flex items-center justify-center text-[40px] mx-auto shadow-lg active:scale-95 transition-transform hover:scale-105"
                      title="Oddiy tezlikda tinglash"
                    >
                      🎧
                    </button>
                    <div className="text-[13px] font-semibold mt-3" style={{ color: textMuted }}>
                      Audioni tinglab, to'g'ri ma'noni tanlang
                    </div>
                    {/* Sekin va ravshan qayta eshitish tugmasi */}
                    <div className="mt-3 flex items-center justify-center gap-2">
                      <button
                        onClick={() => speakKorean(currentWord.kr, 0.85)}
                        className="px-3 py-1.5 rounded-full border text-[12px] font-bold flex items-center gap-1 hover:bg-black/5"
                        style={{ borderColor }}
                      >
                        <span>🔊</span> Qayta eshitish
                      </button>
                      <button
                        onClick={() => speakKorean(currentWord.kr, 0.65)}
                        className="px-3 py-1.5 rounded-full border text-[12px] font-bold flex items-center gap-1 hover:bg-black/5 text-amber-600 border-amber-300 bg-amber-50/50"
                        title="Sekin va tushunarli talaffuz"
                      >
                        <span>🐢</span> Sekin (0.65x)
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {options.map((opt, i) => {
                      const isPicked = selectedOption === i;
                      const isCorrect = opt.isCorrect;
                      let btnBg = cardBg;
                      let btnBorder = borderColor;

                      if (answered) {
                        if (isCorrect) {
                          btnBg = "#dcfce7";
                          btnBorder = "#22c55e";
                        } else if (isPicked) {
                          btnBg = "#fee2e2";
                          btnBorder = "#ef4444";
                        }
                      }

                      return (
                        <button
                          key={i}
                          onClick={() => handleSelectOption(i)}
                          className="w-full h-[52px] rounded-2xl border-2 px-5 text-left font-semibold text-[15px] flex items-center justify-between"
                          style={{ background: btnBg, borderColor: btnBorder }}
                        >
                          <span>{opt.label}</span>
                          {answered && isCorrect && <span>✅</span>}
                        </button>
                      );
                    })}
                  </div>

                  {answered && (
                    <button onClick={handleNextQuestion} className="mt-6 w-full h-[52px] rounded-2xl bg-black text-white font-bold anim-in">
                      Keyingisi →
                    </button>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* FINISH SCREEN */
            <div className="rounded-[28px] border p-8 text-center anim-in" style={{ background: cardBg, borderColor }}>
              <div className="text-[52px] mb-2">{isPassed ? "🏆" : "💪"}</div>
              <h3 className="text-[24px] font-black">{isPassed ? "Ajoyib natija!" : "Mashq yakunlandi!"}</h3>
              <div className="text-[44px] font-black mt-2 leading-none" style={{ color: isPassed ? "#16a34a" : "#f59e0b" }}>
                {finalPct}%
              </div>
              <div className="text-[13px] mt-2" style={{ color: textMuted }}>
                {correctCount} / {total} ta to'g'ri {earnedXpTotal > 0 ? `• +${earnedXpTotal} XP qo'shildi` : ""}
              </div>

              <div className="mt-6 space-y-2.5">
                {isPassed ? (
                  <button
                    onClick={() => {
                      const curIdx = STAGES.findIndex((s) => s.id === stageId);
                      if (curIdx < STAGES.length - 1) {
                        onNextStage(STAGES[curIdx + 1].id);
                      } else {
                        onClose();
                      }
                    }}
                    className="w-full h-[52px] rounded-2xl bg-black text-white font-bold text-[15px]"
                  >
                    Keyingi bosqichga o'tish →
                  </button>
                ) : (
                  <button onClick={() => { setIndex(0); setCorrectCount(0); setIsFinished(false); }} className="w-full h-[52px] rounded-2xl bg-black text-white font-bold text-[15px]">
                    Qayta urinish
                  </button>
                )}
                <button onClick={onClose} className="w-full h-[52px] rounded-2xl border font-bold text-[15px]" style={{ borderColor }}>
                  Yopish
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// GRAMMAR MODULE VIEW (28 TA TO'LIQ MAVZU, QOIDA VA MASHQ)
// ============================================================

function LeaderboardAndRemindersView({ isDark, cardBg, borderColor, textMain, textMuted, userXp, currentDay, showToast }) {
  const [viewMode, setViewMode] = useState("leaderboard"); // "leaderboard" | "reminder"
  const [leaderboardData, setLeaderboardData] = useState({ top_10: [], my_rank: 1, my_xp: userXp, my_day: currentDay, total_users: 1 });
  const [loading, setLoading] = useState(true);
  const [reminderTime, setReminderTime] = useState("20:00");
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [savingReminder, setSavingReminder] = useState(false);

  // Telegram foydalanuvchi ma'lumoti
  const tgUser = useMemo(() => {
    try {
      const tg = window.Telegram && window.Telegram.WebApp;
      return tg?.initDataUnsafe?.user || { id: 0, first_name: "Mehmon" };
    } catch {
      return { id: 0, first_name: "Mehmon" };
    }
  }, []);

  const isTelegramConnected = Boolean(tgUser && tgUser.id && tgUser.id > 0);

  const fetchLeaderboard = useCallback(async () => {
    setLoading(true);
    try {
      const uid = tgUser?.id || 0;
      const res = await fetch(`https://hanu-bot.onrender.com/api/leaderboard?user_id=${uid}`);
      if (res.ok) {
        const data = await res.json();
        if (data.status === "ok") {
          setLeaderboardData(data);
        }
      }
    } catch (err) {
      console.error("Leaderboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [tgUser?.id]);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  useEffect(() => {
    if (!isTelegramConnected) return;
    fetch(`https://hanu-bot.onrender.com/api/get-reminder?user_id=${tgUser.id}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.status === "ok") {
          setReminderTime(d.reminder_time || "20:00");
          setReminderEnabled(Boolean(d.enabled));
        }
      })
      .catch(() => {});
  }, [isTelegramConnected, tgUser?.id]);

  const handleSaveReminder = async (timeToSet, enabledToSet = reminderEnabled) => {
    if (!isTelegramConnected) {
      showToast("Eslatmani faollashtirish uchun ilovani Telegram bot orqali oching");
      return;
    }
    setSavingReminder(true);
    setReminderTime(timeToSet);
    setReminderEnabled(enabledToSet);
    try {
      const offset = -new Date().getTimezoneOffset(); // Foydalanuvchi mintaqasi
      const res = await fetch("https://hanu-bot.onrender.com/api/set-reminder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: tgUser.id,
          reminder_time: timeToSet,
          offset: offset,
          enabled: enabledToSet
        })
      });
      if (res.ok) {
        showToast(enabledToSet ? `⏰ Eslatma har kuni soat ${timeToSet} ga saqlandi!` : "Eslatma o'chirildi.");
      } else {
        showToast("Eslatmani saqlashda xatolik bo'ldi.");
      }
    } catch {
      showToast("Serverga ulanib bo'lmadi.");
    } finally {
      setSavingReminder(false);
    }
  };

  const top10 = leaderboardData.top_10 || [];
  const quickTimes = ["09:00", "14:00", "18:00", "20:00", "21:00", "22:00"];

  // Vaqt mintaqasi hisobi
  const tzOffsetMin = -new Date().getTimezoneOffset();
  const tzHours = Math.floor(Math.abs(tzOffsetMin) / 60);
  const tzSign = tzOffsetMin >= 0 ? "+" : "-";
  const tzLabel = `GMT${tzSign}${tzHours} (${tzOffsetMin === 300 ? "O'zbekiston" : tzOffsetMin === 540 ? "Koreya" : "Mahalliy vaqt"})`;

  return (
    <div className="space-y-4">
      {/* ICHKI TABLAR: TOP REYTING VA KUNLIK ESLATMA */}
      <div className="flex rounded-2xl border p-1" style={{ background: cardBg, borderColor }}>
        <button
          onClick={() => setViewMode("leaderboard")}
          className={`flex-1 py-2.5 rounded-xl font-bold text-[13px] transition-all flex items-center justify-center gap-1.5 ${viewMode === "leaderboard" ? "bg-black text-white shadow-sm" : ""}`}
          style={{ color: viewMode === "leaderboard" ? "#fff" : textMuted }}
        >
          <span>🏆</span>
          <span>TOP Reyting</span>
        </button>
        <button
          onClick={() => setViewMode("reminder")}
          className={`flex-1 py-2.5 rounded-xl font-bold text-[13px] transition-all flex items-center justify-center gap-1.5 ${viewMode === "reminder" ? "bg-black text-white shadow-sm" : ""}`}
          style={{ color: viewMode === "reminder" ? "#fff" : textMuted }}
        >
          <span>⏰</span>
          <span>Kunlik Eslatma</span>
        </button>
      </div>

      {/* 1. TOP REYTING KO'RINISHI */}
      {viewMode === "leaderboard" && (
        <div className="space-y-3 anim-in">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-black text-[17px] leading-tight">🏆 TOP O'quvchilar Reytingi</h3>
              <div className="text-[11px] mt-0.5" style={{ color: textMuted }}>
                Jami {leaderboardData.total_users || 1} ta faol o'quvchi orasida
                {loading && <span className="ml-2 text-amber-500 font-bold animate-pulse">Yangilanmoqda...</span>}
              </div>
            </div>
            <button
              onClick={fetchLeaderboard}
              disabled={loading}
              className="h-9 px-3.5 rounded-xl border text-[12px] font-bold flex items-center gap-1.5 hover:bg-black/5 transition-colors"
              style={{ background: cardBg, borderColor }}
            >
              <span>🔄</span>
              <span>{loading ? "..." : "Yangilash"}</span>
            </button>
          </div>

          {loading && top10.length === 0 ? (
            <div className="rounded-[20px] border p-8 text-center" style={{ background: cardBg, borderColor }}>
              <div className="animate-spin text-[28px] mb-2">⚡</div>
              <div className="text-[13px] font-semibold" style={{ color: textMuted }}>Reyting hisoblanmoqda...</div>
            </div>
          ) : top10.length === 0 ? (
            <div className="rounded-[20px] border p-8 text-center" style={{ background: cardBg, borderColor }}>
              <div className="text-[32px] mb-2">🌟</div>
              <div className="font-bold text-[15px]">Hozircha reyting shakllanmagan</div>
              <div className="text-[12px] mt-1" style={{ color: textMuted }}>Birinchi bo'lib darslarni yakunlang va 1-o'rinni egallang!</div>
            </div>
          ) : (
            <div className="space-y-2.5">
              {/* TOP 3 PODIUM */}
              {top10.slice(0, 3).map((item, index) => {
                const isMe = isTelegramConnected && String(item.user_id) === String(tgUser.id);
                const medals = ["🥇", "🥈", "🥉"];
                const bgGradients = [
                  "linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.05) 100%)",
                  "linear-gradient(135deg, rgba(148, 163, 184, 0.15) 0%, rgba(100, 116, 139, 0.05) 100%)",
                  "linear-gradient(135deg, rgba(217, 119, 6, 0.15) 0%, rgba(180, 83, 9, 0.05) 100%)"
                ];
                const borderColors = ["#f59e0b", "#94a3b8", "#d97706"];

                return (
                  <div
                    key={item.user_id || index}
                    className="rounded-[20px] border p-4 flex items-center justify-between gap-3 shadow-sm transition-transform hover:scale-[1.01]"
                    style={{
                      background: isMe ? (isDark ? "#1a2e1d" : "#f0fdf4") : cardBg,
                      borderColor: isMe ? "#16a34a" : borderColors[index],
                      borderWidth: index === 0 ? "2px" : "1.5px"
                    }}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-[24px] shrink-0 shadow-sm" style={{ background: bgGradients[index] }}>
                        {medals[index]}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <div className="font-bold text-[15px] truncate">{item.first_name || "O'quvchi"}</div>
                          {isMe && <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-600 text-white font-bold">Siz</span>}
                        </div>
                        <div className="text-[11px] mt-0.5" style={{ color: textMuted }}>
                          {item.username && !["0", "yo'q", "@yo'q", "@0"].includes(String(item.username).trim()) ? `@${item.username.replace("@", "")} • ` : ""}Kun {item.current_day}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="font-black text-[16px] leading-tight text-amber-500">
                        ⚡ {(item.xp || 0).toLocaleString()} XP
                      </div>
                      <div className="text-[10px] mt-0.5" style={{ color: textMuted }}>
                        #{index + 1}-o'rin
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* 4-10 O'RINLAR */}
              {top10.slice(3).map((item, idx) => {
                const rank = idx + 4;
                const isMe = isTelegramConnected && String(item.user_id) === String(tgUser.id);
                return (
                  <div
                    key={item.user_id || rank}
                    className="rounded-[18px] border p-3.5 flex items-center justify-between gap-3 transition-colors hover:bg-black/5"
                    style={{
                      background: isMe ? (isDark ? "#1a2e1d" : "#f0fdf4") : cardBg,
                      borderColor: isMe ? "#16a34a" : borderColor,
                      borderWidth: isMe ? "1.5px" : "1px"
                    }}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-full border flex items-center justify-center font-bold text-[12px] shrink-0" style={{ borderColor, color: textMuted }}>
                        #{rank}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[14px] truncate">{item.first_name || "O'quvchi"}</span>
                          {isMe && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-green-600 text-white font-bold">Siz</span>}
                        </div>
                        <div className="text-[11px]" style={{ color: textMuted }}>
                          {item.username && !["0", "yo'q", "@yo'q", "@0"].includes(String(item.username).trim()) ? `@${item.username.replace("@", "")} • ` : ""}Kun {item.current_day}
                        </div>
                      </div>
                    </div>

                    <div className="font-bold text-[14px] text-amber-500 shrink-0">
                      ⚡ {(item.xp || 0).toLocaleString()} XP
                    </div>
                  </div>
                );
              })}

              {/* O'ZINGIZNING O'RNINGIZ (agar TOP 10 da bo'lmasangiz) */}
              {isTelegramConnected && leaderboardData.my_rank > 10 && (
                <div className="mt-4 rounded-[20px] border-2 border-dashed p-4 flex items-center justify-between" style={{ borderColor: "#16a34a", background: isDark ? "#142617" : "#f0fdf4" }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-600 text-white flex items-center justify-center font-bold text-[14px]">
                      #{leaderboardData.my_rank}
                    </div>
                    <div>
                      <div className="font-bold text-[14px]">Sizning natijangiz: #{leaderboardData.my_rank}-o'rin</div>
                      <div className="text-[11px]" style={{ color: textMuted }}>Kun {currentDay} • TOP-10 ga kirishga oz qoldi!</div>
                    </div>
                  </div>
                  <div className="font-black text-[15px] text-green-600">
                    ⚡ {userXp.toLocaleString()} XP
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 2. KUNLIK ESLATMA KO'RINISHI */}
      {viewMode === "reminder" && (
        <div className="space-y-4 anim-in">
          <div className="rounded-[24px] border p-5 sm:p-6" style={{ background: cardBg, borderColor, borderWidth: "1px" }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center text-[22px]">
                  ⏰
                </div>
                <div>
                  <div className="font-bold text-[16px] leading-tight">Kunlik Dars Eslatmasi</div>
                  <div className="text-[12px] mt-0.5" style={{ color: textMuted }}>
                    {isTelegramConnected ? "Telegram botingiz har kuni shu vaqtda xabar jo'natadi" : "Telegram bot bilan sinxronlash"}
                  </div>
                </div>
              </div>
              {isTelegramConnected && (
                <button
                  onClick={() => handleSaveReminder(reminderTime, !reminderEnabled)}
                  className={`px-3.5 py-1.5 rounded-full text-[12px] font-bold transition-colors ${reminderEnabled ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700 dark:bg-neutral-800 dark:text-gray-300"}`}
                >
                  {reminderEnabled ? "Faol ✓" : "O'chiq"}
                </button>
              )}
            </div>

            {!isTelegramConnected ? (
              <div className="mt-4 pt-4 border-t space-y-3" style={{ borderColor }}>
                <div className="p-3.5 rounded-xl border bg-amber-500/10 border-amber-400 text-[13px] space-y-2">
                  <div className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                    <span>⚠️</span>
                    <span>Telegram profil ulanmagan</span>
                  </div>
                  <p className="text-[12px] leading-relaxed text-amber-900 dark:text-amber-200">
                    Siz ilovadan to'g'ridan-to'g'ri brauzerda foydalanmoqdasiz. Kunlik dars eslatmalarini Telegram xabari sifatida olish uchun ilovani Telegram bot orqali oching.
                  </p>
                </div>
                <a
                  href="https://t.me/kor_uzbot"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full h-11 rounded-xl bg-black text-white font-bold text-[13px] flex items-center justify-center gap-2 hover:bg-[#222] transition-colors"
                >
                  <span>✈️</span>
                  <span>Telegram botni ochish (@kor_uzbot)</span>
                </a>
              </div>
            ) : (
              <div className="mt-4 pt-4 border-t space-y-4" style={{ borderColor }}>
                <div className="flex items-center justify-between text-[12px]">
                  <span className="font-semibold" style={{ color: textMuted }}>Holat:</span>
                  <span className={`font-bold ${reminderEnabled ? "text-green-600" : "text-gray-500"}`}>
                    {reminderEnabled ? `Har kuni soat ${reminderTime} da` : "O'chirilgan"}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[12px]">
                  <span className="font-semibold" style={{ color: textMuted }}>Vaqt mintaqasi:</span>
                  <span className="font-bold">{tzLabel}</span>
                </div>

                {reminderEnabled && (
                  <div>
                    <div className="text-[12px] font-semibold mb-2.5" style={{ color: textMuted }}>
                      Qulay vaqtni tanlang:
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {quickTimes.map((t) => {
                        const isSelected = reminderTime === t;
                        return (
                          <button
                            key={t}
                            disabled={savingReminder}
                            onClick={() => handleSaveReminder(t, true)}
                            className={`h-11 rounded-xl font-bold text-[13px] border transition-all ${isSelected ? "bg-black text-white border-black shadow-sm" : "hover:bg-black/5"}`}
                            style={{ borderColor: isSelected ? "#000" : borderColor, color: isSelected ? "#fff" : textMain }}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function GrammarModuleView({ isDark, cardBg, borderColor, textMain, textMuted, grammarProgress, onUpdateGrammarProgress }) {
  const [activeTopic, setActiveTopic] = useState(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [grammarFilter, setGrammarFilter] = useState("all"); // "all" | "unlearned" | "completed"

  // Yangi mavzu ochilganda test holatini tozalash
  const handleOpenTopic = (tp) => {
    setActiveTopic(tp);
    setQuizIndex(0);
    setSelectedOpt(null);
    setQuizScore(0);
    setQuizFinished(false);
  };

  const masteredCount = GRAMMAR_TOPICS.filter((tp) => (grammarProgress[tp.id] || 0) >= 80).length;
  const unlearnedCount = GRAMMAR_TOPICS.length - masteredCount;

  const filteredTopics = GRAMMAR_TOPICS.filter((tp) => {
    const isCompleted = (grammarProgress[tp.id] || 0) >= 80;
    if (grammarFilter === "completed") return isCompleted;
    if (grammarFilter === "unlearned") return !isCompleted;
    return true;
  });

  if (activeTopic === null) {
    return (
      <div className="space-y-4 max-w-[560px] anim-in">
        <div>
          <h2 className="text-[22px] font-bold">Grammatika</h2>
          <div className="text-[13px] font-semibold mt-0.5 text-green-600">
            28 ta mavzu · {masteredCount} tasi o'zlashtirilgan
          </div>
          <p className="text-[12px] mt-1" style={{ color: textMuted }}>
            Koreys tili grammatika qoidalari, ovozli namunaviy gaplar va mustahkamlovchi test mashqlari.
          </p>
        </div>

        {/* Filtrlar: Barchasi | O'rganilmagan | O'zlashtirilgan */}
        <div className="flex gap-2 rounded-2xl border p-1" style={{ background: cardBg, borderColor }}>
          <button
            onClick={() => setGrammarFilter("all")}
            className={`flex-1 py-2 rounded-xl text-[12px] font-bold transition-all ${grammarFilter === "all" ? "bg-black text-white shadow-sm" : ""}`}
            style={{ color: grammarFilter === "all" ? "#fff" : textMuted }}
          >
            Barchasi ({GRAMMAR_TOPICS.length})
          </button>
          <button
            onClick={() => setGrammarFilter("unlearned")}
            className={`flex-1 py-2 rounded-xl text-[12px] font-bold transition-all ${grammarFilter === "unlearned" ? "bg-black text-white shadow-sm" : ""}`}
            style={{ color: grammarFilter === "unlearned" ? "#fff" : textMuted }}
          >
            O'rganilmagan ({unlearnedCount})
          </button>
          <button
            onClick={() => setGrammarFilter("completed")}
            className={`flex-1 py-2 rounded-xl text-[12px] font-bold transition-all ${grammarFilter === "completed" ? "bg-black text-white shadow-sm" : ""}`}
            style={{ color: grammarFilter === "completed" ? "#fff" : textMuted }}
          >
            O'zlashtirildi ({masteredCount})
          </button>
        </div>

        {filteredTopics.length === 0 ? (
          <div className="rounded-2xl border p-8 text-center" style={{ background: cardBg, borderColor }}>
            <div className="text-[28px] mb-1">🎉</div>
            <div className="font-bold text-[14px]">Hech qanday mavzu topilmadi</div>
            <div className="text-[12px] mt-1" style={{ color: textMuted }}>Boshqa filtrni tanlab ko'ring</div>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredTopics.map((tp) => {
              const isCompleted = (grammarProgress[tp.id] || 0) >= 80;
              return (
                <button
                  key={tp.id}
                  onClick={() => handleOpenTopic(tp)}
                  className="w-full text-left rounded-2xl border p-4 flex items-center gap-3 transition-all hover:bg-black/5"
                  style={{ background: cardBg, borderColor }}
                >
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-[20px] shrink-0 bg-black/5">
                    {tp.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: textMuted }}>Mavzu {tp.id}</div>
                    <div className="text-[15px] font-semibold truncate">{tp.title}</div>
                  </div>
                  <span className={`text-[12px] font-bold px-2.5 py-1 rounded-full ${isCompleted ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300" : ""}`} style={{ color: isCompleted ? undefined : textMuted }}>
                    {isCompleted ? "✅ O'zlashtirildi" : "Boshlash ›"}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  const curQuiz = activeTopic.quiz?.[quizIndex];
  const totalQuiz = activeTopic.quiz?.length || 0;

  return (
    <div className="space-y-4 max-w-[560px] anim-in">
      {/* Yuqori panel: orqaga va 1/4 test progressi */}
      <div className="flex items-center justify-between pb-2 border-b" style={{ borderColor }}>
        <button onClick={() => setActiveTopic(null)} className="flex items-center gap-2 text-[16px] font-bold hover:opacity-80">
          <span className="text-[18px]">←</span>
          <span>{activeTopic.title}</span>
        </button>
        {totalQuiz > 0 && !quizFinished && (
          <div className="text-[12px] font-bold px-2.5 py-1 rounded-full border bg-black/5" style={{ borderColor, color: textMain }}>
            Savol {quizIndex + 1} / {totalQuiz}
          </div>
        )}
      </div>

      {/* 1. Qoida kartasi */}
      <div className="rounded-2xl border p-5 space-y-3" style={{ background: cardBg, borderColor }}>
        <div className="text-[12px] font-bold uppercase tracking-wider text-amber-500">📖 QOIDA VA MAZMUNI</div>
        <div className="text-[14px] leading-[1.6]">{activeTopic.rule}</div>
        
        {activeTopic.formula && (
          <div className="p-3 rounded-xl border text-[13px] font-bold" style={{ borderColor, background: isDark ? "#1a1a1a" : "#faf8f3" }}>
            📌 Formula: <span className="text-amber-500">{activeTopic.formula}</span>
          </div>
        )}
      </div>

      {/* 2. Namunaviy gaplar (Ovoz bilan) */}
      <div className="rounded-2xl border p-5 space-y-3" style={{ background: cardBg, borderColor }}>
        <div className="text-[12px] font-bold uppercase tracking-wider text-green-600">💬 NAMUNAVIY GAPLAR</div>
        <div className="space-y-2">
          {activeTopic.examples?.map((ex, i) => (
            <div key={i} className="p-3 rounded-xl border text-[13px] kr flex items-center justify-between" style={{ borderColor, background: isDark ? "#1a1a1a" : "#faf8f3" }}>
              <div>
                <div className="font-bold">{ex.kr}</div>
                <div className="text-gray-500 text-[12px]">{ex.uz}</div>
              </div>
              <button onClick={() => speakKorean(ex.kr)} className="w-8 h-8 rounded-full border flex items-center justify-center shrink-0 hover:bg-black/5">🔊</button>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Interaktiv test / mashq */}
      {totalQuiz > 0 && (
        <div className="rounded-2xl border p-5" style={{ background: cardBg, borderColor }}>
          <div className="flex items-center justify-between text-[12px] font-bold uppercase tracking-wider text-blue-500 mb-3">
            <span>✍️ MUSTAHKAMLASH TESTI</span>
            <span>{quizIndex + 1} / {totalQuiz}</span>
          </div>

          {!quizFinished ? (
            <div>
              <div className="text-[16px] font-bold mb-4 leading-snug">{curQuiz.prompt}</div>

              {/* Bir xil o'lchamdagi qulay katta javob tugmalari */}
              <div className="space-y-2.5">
                {curQuiz.options.map((opt, oi) => {
                  const isPicked = selectedOpt === oi;
                  const isCorrect = oi === curQuiz.correctIndex;
                  let bg = cardBg;
                  let bd = borderColor;

                  if (selectedOpt !== null) {
                    if (isCorrect) {
                      bg = "#dcfce7";
                      bd = "#22c55e";
                    } else if (isPicked) {
                      bg = "#fee2e2";
                      bd = "#ef4444";
                    }
                  }

                  return (
                    <button
                      key={oi}
                      onClick={() => {
                        if (selectedOpt !== null) return;
                        setSelectedOpt(oi);
                        if (isCorrect) setQuizScore((s) => s + 1);
                      }}
                      className="w-full min-h-[52px] p-3.5 rounded-xl border text-left font-semibold text-[14px] flex items-center justify-between transition-colors"
                      style={{ background: bg, borderColor: bd }}
                    >
                      <span className="flex-1">{opt}</span>
                      {selectedOpt !== null && isCorrect && <span className="text-[16px] shrink-0 ml-2">✅</span>}
                      {selectedOpt !== null && isPicked && !isCorrect && <span className="text-[16px] shrink-0 ml-2">❌</span>}
                    </button>
                  );
                })}
              </div>

              {selectedOpt !== null && (
                <div className="mt-4 anim-in space-y-3">
                  <div className="p-3.5 rounded-xl border text-[13px] leading-relaxed" style={{ borderColor, background: isDark ? "#1a1a1a" : "#faf8f3" }}>
                    💡 <strong className="font-bold">Izoh:</strong> {curQuiz.explain}
                  </div>
                  <button
                    onClick={() => {
                      if (quizIndex < totalQuiz - 1) {
                        setQuizIndex((i) => i + 1);
                        setSelectedOpt(null);
                      } else {
                        const finalPct = Math.round(((quizScore + (selectedOpt === curQuiz.correctIndex ? 0 : 0)) / totalQuiz) * 100);
                        onUpdateGrammarProgress(activeTopic.id, finalPct);
                        setQuizFinished(true);
                      }
                    }}
                    className="w-full h-12 rounded-xl bg-black text-white font-bold text-[14px] hover:bg-[#222] transition-colors shadow-sm"
                  >
                    {quizIndex < totalQuiz - 1 ? "Keyingi savol →" : "Natijani ko'rish 🏁"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-4 anim-in">
              <div className="text-[36px]">🎉</div>
              <div className="font-bold text-[17px] mt-1">Mashq yakunlandi!</div>
              <div className="text-[13px] text-gray-500 mt-1">{quizScore} / {totalQuiz} ta to'g'ri javob ({Math.round((quizScore / totalQuiz) * 100)}%)</div>
              <div className="mt-2 text-[12px] font-semibold text-green-600">
                {quizScore >= Math.ceil(totalQuiz * 0.8) ? "✅ Mavzu muvaffaqiyatli o'zlashtirildi!" : "Yana bir bor takrorlash tavsiya etiladi."}
              </div>
              <button
                onClick={() => {
                  setQuizIndex(0);
                  setSelectedOpt(null);
                  setQuizScore(0);
                  setQuizFinished(false);
                }}
                className="mt-4 px-6 h-11 rounded-xl bg-black text-white text-[13px] font-bold hover:bg-[#222]"
              >
                Qayta ishlash 🔄
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// MISTAKES LIST VIEW (JORIY KUN XATOLARI)
// ============================================================
function MistakesListView({ title, mistakes, cardBg, borderColor, textMuted, onClose, onStartPractice }) {
  return (
    <div className="fixed inset-0 z-30 flex items-end sm:items-center justify-center p-0 sm:p-6 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full sm:max-w-[640px] max-h-[85vh] h-[85vh] rounded-t-[28px] sm:rounded-[28px] border overflow-hidden flex flex-col anim-in" style={{ background: cardBg, borderColor }}>
        <div className="p-5 border-b flex items-center justify-between shrink-0" style={{ borderColor }}>
          <div>
            <div className="font-bold text-[16px]">❌ {title}</div>
            <div className="text-[12px] mt-1" style={{ color: textMuted }}>{mistakes.length} ta xato</div>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full border flex items-center justify-center">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {mistakes.length === 0 ? (
            <div className="py-12 text-center">
              <div className="text-[40px]">✅</div>
              <div className="mt-2 font-bold">Xato yo'q!</div>
              <div className="text-[12px] text-gray-400">Bu kunda hali xato qilmadingiz</div>
            </div>
          ) : (
            mistakes.map((m) => (
              <div key={m.id} className="rounded-2xl border p-4" style={{ borderColor }}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="kr font-bold text-[16px]">{m.kr}</span>
                      <span className="text-[13px]" style={{ color: textMuted }}>→ {m.uz}</span>
                    </div>
                    <div className="mt-1 text-[12px]">
                      <div>To'g'ri javob: <span className="font-bold kr">{m.correctAnswer}</span></div>
                      <div>Sizning javobingiz: <span className="text-red-500 font-bold">{m.userAnswer || "(bo'sh)"}</span></div>
                    </div>
                  </div>
                  <button onClick={() => speakKorean(m.kr)} className="w-8 h-8 rounded-full border flex items-center justify-center shrink-0">🔊</button>
                </div>
              </div>
            ))
          )}
        </div>

        {mistakes.length > 0 && (
          <div className="p-4 border-t shrink-0" style={{ borderColor }}>
            <button
              onClick={() => onStartPractice(mistakes.map(m => ({ id: m.id, kr: m.kr, uz: m.uz, ...gEx99(m.kr, m.uz) })))}
              className="w-full h-11 rounded-xl bg-black text-white text-[13px] font-bold"
            >
              🔁 Xatolarni 5 bosqichda takrorlash ({mistakes.length})
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// ALL MISTAKES MODAL VIEW (UMUMIY XATOLAR GURUHLANGAN)
// ============================================================
function AllMistakesModalView({ mistakes, filterDay, onSelectFilterDay, cardBg, borderColor, textMuted, onClose, onStartPractice }) {
  const displayed = filterDay ? mistakes.filter((m) => m.day === filterDay) : mistakes;

  const dayCounts = useMemo(() => {
    const map = {};
    mistakes.forEach((m) => {
      map[m.day] = (map[m.day] || 0) + 1;
    });
    return Object.entries(map).map(([d, c]) => ({ day: Number(d), count: c })).sort((a, b) => a.day - b.day);
  }, [mistakes]);

  return (
    <div className="fixed inset-0 z-30 flex items-end sm:items-center justify-center p-0 sm:p-6 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full sm:max-w-[640px] max-h-[85vh] h-[85vh] rounded-t-[28px] sm:rounded-[28px] border overflow-hidden flex flex-col anim-in" style={{ background: cardBg, borderColor }}>
        <div className="p-5 border-b flex items-center justify-between shrink-0" style={{ borderColor }}>
          <div className="flex items-center gap-2">
            {filterDay && (
              <button onClick={() => onSelectFilterDay(null)} className="w-7 h-7 rounded-full border flex items-center justify-center text-[12px]">←</button>
            )}
            <div>
              <div className="font-bold text-[16px]">{filterDay ? `Kun ${filterDay} xatolari` : "Umumiy xatolar"}</div>
              <div className="text-[12px]" style={{ color: textMuted }}>{displayed.length} ta xato</div>
            </div>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full border flex items-center justify-center">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {mistakes.length === 0 ? (
            <div className="py-12 text-center">
              <div className="text-[40px]">✅</div>
              <div className="mt-2 font-bold">Xato yo'q!</div>
              <div className="text-[12px] text-gray-400">Barcha kunlar bo'yicha xatolar ro'yxati bo'sh</div>
            </div>
          ) : filterDay === null ? (
            <div className="space-y-2">
              <button
                onClick={() => onSelectFilterDay("all")}
                className="w-full rounded-2xl border p-4 text-left flex items-center justify-between hover:bg-black/5"
                style={{ borderColor }}
              >
                <div>
                  <div className="font-bold text-[14px]">Barcha xatolar</div>
                  <div className="text-[11px]" style={{ color: textMuted }}>{mistakes.length} ta xato</div>
                </div>
                <span>›</span>
              </button>

              {dayCounts.map((dc) => (
                <button
                  key={dc.day}
                  onClick={() => onSelectFilterDay(dc.day)}
                  className="w-full rounded-2xl border p-4 text-left flex items-center justify-between hover:bg-black/5"
                  style={{ borderColor }}
                >
                  <div>
                    <div className="font-bold text-[14px]">Kun {dc.day}</div>
                    <div className="text-[11px]" style={{ color: textMuted }}>{dc.count} ta xato</div>
                  </div>
                  <span>›</span>
                </button>
              ))}
            </div>
          ) : (
            displayed.map((m) => (
              <div key={m.id} className="rounded-2xl border p-4" style={{ borderColor }}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="kr font-bold text-[16px]">{m.kr}</span>
                      <span className="text-[13px]" style={{ color: textMuted }}>→ {m.uz}</span>
                    </div>
                    <div className="mt-1 text-[12px]">
                      <div>To'g'ri javob: <span className="font-bold kr">{m.correctAnswer}</span></div>
                      <div>Sizning javobingiz: <span className="text-red-500 font-bold">{m.userAnswer || "(bo'sh)"}</span></div>
                    </div>
                  </div>
                  <button onClick={() => speakKorean(m.kr)} className="w-8 h-8 rounded-full border flex items-center justify-center shrink-0">🔊</button>
                </div>
              </div>
            ))
          )}
        </div>

        {displayed.length > 0 && (
          <div className="p-4 border-t shrink-0" style={{ borderColor }}>
            <button
              onClick={() => onStartPractice(displayed.slice(0, 30).map(m => ({ id: m.id, kr: m.kr, uz: m.uz, ...gEx99(m.kr, m.uz) })))}
              className="w-full h-11 rounded-xl bg-black text-white text-[13px] font-bold"
            >
              🔁 30 tadan takrorlash ({Math.min(30, displayed.length)}, XP yo'q)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
