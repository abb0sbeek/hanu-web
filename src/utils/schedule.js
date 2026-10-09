// ============================================================
// HANU — KUNLIK VA TAKRORLASH JADVALI (src/utils/schedule.js)
// ============================================================
import { gEx99 } from './koreanHelper.js';

// 1051 ta so'zdan 30 tadan dars va haftalik/oylik takrorlashlar tuzuvchi
export function buildSchedule(totalWords = 1051, wordsPerDay = 30) {
  const CD = Math.ceil(totalWords / wordsPerDay);
  const sch = [];
  let ci = 1, sp = 1, lc = 0;
  while (ci <= CD) {
    if (sp === 30) {
      sch.push({ type: "monthly", rs: 1, re: ci - 1 });
    } else if (sp % 7 === 0) {
      sch.push({ type: "weekly", rs: lc + 1, re: ci - 1 });
      lc = ci - 1;
    } else {
      sch.push({ type: "content", cd: ci });
      ci++;
    }
    sp++;
  }
  sch.push({ type: "general", rs: 1, re: CD });
  return sch;
}

export function buildContentToSeq(schedule) {
  const map = {};
  schedule.forEach((s, idx) => {
    if (s.type === "content") {
      map[s.cd] = idx + 1;
    }
  });
  return map;
}

export function prepareWordsWithExamples(rawWords, wordsPerDay = 30) {
  return rawWords.map((p, idx) => {
    const day = Math.floor(idx / wordsPerDay) + 1;
    const examples = gEx99(p.kr, p.uz);
    return {
      id: idx + 1,
      kr: p.kr,
      uz: p.uz,
      day: day,
      ...examples
    };
  });
}