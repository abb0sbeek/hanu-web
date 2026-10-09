// ============================================================
// HANU — DARAJALAR VA XP BALLLARI TIZIMI (src/data/levels.js)
// Darslar 5 barobar kamaytirildi, Streak bonuslari asl holicha qoldirildi
// ============================================================

// 1. 5 ta asosiy o'rganish bosqichi (5 barobar kamaytirildi)
export const STAGES = [
  { id: "flash", name: "Flash", label: "1-bosqich", desc: "Yodlash", icon: "🃏" },
  { id: "test", name: "Test", label: "2-bosqich", desc: "Tanlash", icon: "📝" },
  { id: "writing", name: "Yozish", label: "3-bosqich", desc: "KR → UZ", icon: "✍️" },
  { id: "translation", name: "Tarjima", label: "4-bosqich", desc: "UZ → KR", icon: "🔄" },
  { id: "listening", name: "Tinglash", label: "5-bosqich", desc: "Eshitish", icon: "🎧" }
];

// 2. 10 ta Level (Daraja) — 5 barobar mutanosib kamaytirildi
export const LEVELS = [
  { level: 1, total: 5000, need: 5000, name: "Boshlang'ich", icon: "🌱", color: "#22c55e", desc: "Yangi o'rganuvchi", gradient: "linear-gradient(135deg,#22c55e,#16a34a)" },
  { level: 2, total: 15000, need: 10000, name: "O'rganuvchi", icon: "📚", color: "#3b82f6", desc: "Birinchi qadamlar", gradient: "linear-gradient(135deg,#3b82f6,#2563eb)" },
  { level: 3, total: 30000, need: 15000, name: "Harakatchan", icon: "🚀", color: "#8b5cf6", desc: "Tez o'rganuvchi", gradient: "linear-gradient(135deg,#8b5cf6,#7c3aed)" },
  { level: 4, total: 50000, need: 20000, name: "Tirishqoq", icon: "💪", color: "#f59e0b", desc: "Mehnatkash", gradient: "linear-gradient(135deg,#f59e0b,#d97706)" },
  { level: 5, total: 75000, need: 25000, name: "Bilimdon", icon: "🧠", color: "#ec4899", desc: "Bilim egasi", gradient: "linear-gradient(135deg,#ec4899,#db2777)" },
  { level: 6, total: 105000, need: 30000, name: "Ustoz", icon: "🎓", color: "#06b6d4", desc: "Ustozlik sari", gradient: "linear-gradient(135deg,#06b6d4,#0891b2)" },
  { level: 7, total: 140000, need: 35000, name: "Mutaxassis", icon: "⭐", color: "#eab308", desc: "Mutaxassis", gradient: "linear-gradient(135deg,#eab308,#ca8a04)" },
  { level: 8, total: 180000, need: 40000, name: "Ekspert", icon: "🏆", color: "#f97316", desc: "Ekspert", gradient: "linear-gradient(135deg,#f97316,#ea580c)" },
  { level: 9, total: 225000, need: 45000, name: "Chempion", icon: "👑", color: "#a855f7", desc: "Chempion", gradient: "linear-gradient(135deg,#a855f7,#9333ea)" },
  { level: 10, total: 275000, need: 50000, name: "Afsona", icon: "🌟", color: "#FFD700", desc: "Mutlaq g'olib!", gradient: "linear-gradient(135deg,#FFD700,#FFA500)" }
];

// 3. Har bir to'g'ri javob uchun XP ballari (5 barobar kamaytirildi)
export const STAGE_XP = {
  flash: 5,
  test: 8,
  writing: 12,
  translation: 12,
  listening: 8
};

// 4. Yakuniy bonuslar (5 barobar kamaytirildi)
export const BONUS_XP_80 = 10;
export const BONUS_XP_100 = 30;

// 5. STREAK BONUSLARI (SIZNING TALABINGIZ BILAN O'ZGARMASDAN QOLDIRILDI 🔥)
export const STREAK_MILESTONES = [
  { d: 3, xp: 300 },
  { d: 7, xp: 700 },
  { d: 10, xp: 1000 },
  { d: 30, xp: 3000 },
  { d: 45, xp: 10000 }
];

// 6. XP ga qarab darajani aniq hisoblash funksiyasi
export function calculateLevel(xpAmount) {
  let xp = Math.max(0, xpAmount);
  let maxLevel = LEVELS[LEVELS.length - 1];
  let prevMax = LEVELS[LEVELS.length - 2];

  if (xp >= maxLevel.total) {
    return {
      xp: xp,
      level: 10,
      levelDef: maxLevel,
      prevTotal: prevMax.total,
      nextTotal: maxLevel.total,
      inLevelXp: maxLevel.total - prevMax.total,
      needForLevel: maxLevel.total - prevMax.total,
      pct: 100,
      remaining: 0,
      nextLevelDef: null,
      isMax: true,
      achievedCount: LEVELS.length
    };
  }

  let idx = LEVELS.findIndex((l) => xp < l.total);
  if (idx === -1) idx = LEVELS.length - 1;
  let cur = LEVELS[idx];
  let prevTotal = idx > 0 ? LEVELS[idx - 1].total : 0;
  let inLevelXp = xp - prevTotal;
  let need = cur.total - prevTotal;
  let pct = Math.min(100, Math.max(0, Math.round((inLevelXp / need) * 100)));
  let remaining = cur.total - xp;
  let nextDef = idx + 1 < LEVELS.length ? LEVELS[idx + 1] : null;
  let achieved = LEVELS.filter((l) => xp >= l.total).length;

  return {
    xp: xp,
    level: idx + 1,
    levelDef: cur,
    prevTotal: prevTotal,
    nextTotal: cur.total,
    inLevelXp: inLevelXp,
    needForLevel: need,
    pct: pct,
    remaining: remaining,
    nextLevelDef: nextDef,
    isMax: false,
    achievedCount: achieved
  };
}