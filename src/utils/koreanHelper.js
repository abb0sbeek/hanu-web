// ============================================================
// HANU — KOREYS TILI GRAMMATIKASI VA TALAFFUZ (koreanHelper.js)
// ============================================================

export function hI(ch) {
  if (!ch) return null;
  const c = ch.charCodeAt(0) - 0xac00;
  if (c < 0 || c > 11171) return null;
  return { code: c, batchimIndex: c % 28 };
}

export function sB(ch, nb) {
  const i = hI(ch);
  if (!i) return ch;
  const base = i.code - i.batchimIndex;
  return String.fromCharCode(0xac00 + base + nb);
}

// So'zda patchim bor-yo'qligini aniqlash
export function hasBatchim(s) {
  if (!s) return false;
  const clean = s.trim();
  if (!clean) return false;
  const ch = clean.charAt(clean.length - 1);
  const info = hI(ch);
  if (!info) return false;
  return info.batchimIndex !== 0;
}

const BL = 8;
const BB = 17;

// Rasmiy hurmat shakli (-습니다 / -ㅂ니다)
export function formalConjugate(dictForm) {
  const stem = dictForm.slice(0, -1);
  if (stem.length === 0) return dictForm;
  const lastChar = stem[stem.length - 1];
  const i = hI(lastChar);
  if (!i) return stem + '습니다';
  if (i.batchimIndex === BL || i.batchimIndex === 0) {
    const nc = sB(lastChar, BB);
    return stem.slice(0, -1) + nc + '니다';
  } else {
    return stem + '습니다';
  }
}

export function lF(s) {
  return s ? s.charAt(0).toLowerCase() + s.slice(1) : s;
}

export function uF(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

export function mainUzOf(uz) {
  if (!uz) return '';
  return uz.split('/')[0].split(',')[0].split('(')[0].trim();
}

export function uzPresentTense(mainUz) {
  const main = lF(mainUz);
  if (!/moq$/i.test(main)) return main;
  const stem = main.slice(0, -3);
  if (/[aeiouAEIOU]$/.test(stem) || /o'$/i.test(stem)) return stem + 'yman';
  return stem + 'aman';
}

// Ovoz chiqarish (Mobil telefonlar va Telegram WebApp uchun 100% kafolatli Audio Engine)
let currentAudioInstance = null;

export function speakKorean(text, rate = 0.85) {
  if (typeof window === "undefined" || !text) return;
  const cleanText = text.trim();
  if (!cleanText) return;

  // 1. Avvalgi audioni to'xtatamiz
  if (currentAudioInstance) {
    try {
      currentAudioInstance.pause();
      currentAudioInstance.currentTime = 0;
    } catch (e) {}
  }

  // 2. Mobil telefonlar (iOS Safari, Android Chrome va Telegram WebApp) uchun toza MP3 oqimi
  try {
    const ttsUrl = "https://hanu-bot.onrender.com/api/tts?text=" + encodeURIComponent(cleanText);
    const audio = new Audio(ttsUrl);
    audio.playbackRate = rate;
    currentAudioInstance = audio;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(function() {
        playSpeechSynthesisFallback(cleanText, rate);
      });
    }
    return;
  } catch (e) {
    playSpeechSynthesisFallback(cleanText, rate);
  }
}

function playSpeechSynthesisFallback(text, rate) {
  if (!("speechSynthesis" in window)) return;
  try {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ko-KR";
    u.rate = rate;
    const voices = window.speechSynthesis.getVoices();
    const koVoice = voices.find(function(v) {
      return v.lang === "ko-KR" || (v.lang && v.lang.indexOf("ko") === 0);
    });
    if (koVoice) u.voice = koVoice;
    window.speechSynthesis.speak(u);
  } catch (e) {}
}

const DRINKS = ['ichimlik', 'choy', 'kofe', 'suv', 'sharbat', 'sut', 'pivo'];
const FOODS = ['ovqat', 'meva', 'olma', 'non', 'tort', 'guruch', 'sabzi', 'pomidor', 'uzum', 'qulupnay'];
const PLACES = ['shahar', 'davlat', 'maktab', 'bozor', 'bank', 'kasalxona', 'pochta', 'park', 'parij', 'koreya', 'kutubxona'];
const PEOPLE = ['bola', 'ona', 'dada', 'oyi', 'ota', 'uka', 'aka', 'singil', 'talaba', 'shifokor', 'xodim', 'rassom', 'qo\'shiqchi'];
const ITEMS = ['kitob', 'qalam', 'ruchka', 'soyabon', 'soat', 'kiyim', 'shim', 'tufli', 'sumka', 'kompyuter', 'pul'];

function hasWord(text, list) {
  for (let i = 0; i < list.length; i++) {
    if (text.indexOf(list[i]) !== -1) return true;
  }
  return false;
}

// Avtomatik namunaviy gap yasovchi
export function gEx99(kr, uz) {
  const cleanKr = (kr || '').trim();
  const mainUz = mainUzOf(uz);
  const u = (uz || '').toLowerCase();
  const hasB = hasBatchim(cleanKr);

  if (cleanKr.indexOf('?') !== -1 || cleanKr.indexOf(' ') !== -1 || cleanKr.endsWith('세요') || cleanKr.endsWith('요')) {
    return { exKr: cleanKr, exUz: uF(mainUz) };
  }

  if (hasWord(u, DRINKS)) {
    const part = hasB ? '을' : '를';
    return {
      exKr: '저는 ' + cleanKr + part + ' 마셔요.',
      exUz: 'Men ' + lF(mainUz) + ' ichyapman.'
    };
  }

  if (hasWord(u, FOODS)) {
    const part = hasB ? '을' : '를';
    return {
      exKr: '저는 ' + cleanKr + part + ' 먹어요.',
      exUz: 'Men ' + lF(mainUz) + ' yeyapman.'
    };
  }

  if (hasWord(u, PLACES)) {
    return {
      exKr: '저는 ' + cleanKr + '에 가요.',
      exUz: 'Men ' + lF(mainUz) + 'ga boryapman.'
    };
  }

  if (hasWord(u, PEOPLE)) {
    const part = hasB ? '이에요.' : '예요.';
    return {
      exKr: '이 사람은 우리 ' + cleanKr + part,
      exUz: 'Bu kishi bizning ' + lF(mainUz) + 'miz.'
    };
  }

  if (hasWord(u, ITEMS)) {
    const part = hasB ? '이' : '가';
    return {
      exKr: '저에게 ' + cleanKr + part + ' 있어요.',
      exUz: 'Menda ' + lF(mainUz) + ' bor.'
    };
  }

  if (u.endsWith('moq') && cleanKr.endsWith('다')) {
    const conj = formalConjugate(cleanKr);
    return {
      exKr: '저는 매일 ' + conj + '.',
      exUz: 'Men har kuni ' + uzPresentTense(mainUz) + '.'
    };
  }

  const defaultPart = hasB ? '이에요.' : '예요.';
  return {
    exKr: '이것은 ' + cleanKr + defaultPart,
    exUz: 'Bu — ' + lF(mainUz) + '.'
  };
}
