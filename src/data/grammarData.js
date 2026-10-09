// ============================================================
// HANU — 28 TA TO'LIQ GRAMMATIKA MAVZULARI VA TESTLARI (grammarData.js)
// ============================================================

export const GRAMMAR_TOPICS = [
  {
    "id": 1,
    "title": "Kirish",
    "icon": "📖",
    "rule": "Hangul — 1443-yilda Joseon sulolasining qiroli Sejong tomonidan yaratilgan koreys alifbosi. U 14 ta asosiy undosh va 10 ta asosiy unlidan iborat. Koreys tilida gap tuzilishi O'zbek tili kabi SOV (Ega — To'ldiruvchi — Kesim) tartibida bo'lib, fe'l har doim gapning oxirida keladi.",
    "formula": "Ega + To'ldiruvchi + Kesim (Fe'l oxirida)",
    "examples": [
      {
        "kr": "저는 한국어를 배워요.",
        "uz": "Men koreys tilini o'rganyapman."
      },
      {
        "kr": "안녕하세요?",
        "uz": "Yaxshimisiz? (Assalomu alaykum)"
      }
    ],
    "quiz": [
      {
        "prompt": "Koreys alifbosining rasmiy nomi nima?",
        "options": [
          "Hanja",
          "Hangul",
          "Pinyin",
          "Romaji"
        ],
        "correctIndex": 1,
        "explain": "Koreys yozuvi Hangul (한글) deb ataladi."
      },
      {
        "prompt": "Koreys tilida fe'l gapning qaysi qismida keladi?",
        "options": [
          "Gap boshida",
          "Gap o'rtasida",
          "Gap oxirida"
        ],
        "correctIndex": 2,
        "explain": "SOV qoidasiga ko'ra fe'l har doim gap oxirida keladi."
      },
      {
        "prompt": "Hangul alifbosini kim yaratgan?",
        "options": [
          "Qirol Sejong",
          "Qirol Gojong",
          "Amir Temur"
        ],
        "correctIndex": 0,
        "explain": "1443-yilda buyuk qirol Sejong tomonidan yaratilgan."
      }
    ]
  },
  {
    "id": 2,
    "title": "Unli",
    "icon": "🔤",
    "rule": "Hangulda 10 ta asosiy unli mavjud: Vertikal (tik) unlilar: ㅏ, ㅑ, ㅓ, ㅕ, ㅣ (5 ta); Gorizontal (yotiq) unlilar: ㅗ, ㅛ, ㅜ, ㅠ, ㅡ (5 ta). Bo'g'in faqat unli tovush bilan boshlansa, uning oldiga ovozsiz 'ㅇ' harfi qo'yiladi (masalan: 아, 야, 어, 여, 오, 요, 우, 유, 으, 이).",
    "formula": "Vertikal: ㅏ, ㅑ, ㅓ, ㅕ, ㅣ | Gorizontal: ㅗ, ㅛ, ㅜ, ㅠ, ㅡ",
    "examples": [
      {
        "kr": "아이",
        "uz": "Bola"
      },
      {
        "kr": "우유를 마셔요.",
        "uz": "Sut ichyapman."
      }
    ],
    "quiz": [
      {
        "prompt": "Hangulda nechta asosiy unli harf bor?",
        "options": [
          "6 ta",
          "8 ta",
          "10 ta",
          "14 ta"
        ],
        "correctIndex": 2,
        "explain": "Hangulda 10 ta asosiy unli mavjud."
      },
      {
        "prompt": "'ㅇ' harfi bo'g'in boshida kelsa qanday o'qiladi?",
        "options": [
          "Ovozsiz (faqat unli o'qiladi)",
          "'ng' deb o'qiladi",
          "'h' deb o'qiladi"
        ],
        "correctIndex": 0,
        "explain": "Bo'g'in boshida 'ㅇ' hech qanday tovush bermaydi, faqat shakl to'ldiradi."
      },
      {
        "prompt": "'우유' (sut) so'zida qaysi unlilar qatnashgan?",
        "options": [
          "ㅏ va ㅣ",
          "ㅜ va ㅠ",
          "ㅗ va ㅛ"
        ],
        "correctIndex": 1,
        "explain": "우 (ㅜ) va 유 (ㅠ) unlilaridan tashkil topgan."
      }
    ]
  },
  {
    "id": 3,
    "title": "Undosh",
    "icon": "🔡",
    "rule": "Hangulda 14 ta asosiy undosh (ㄱ, ㄴ, ㄷ, ㄹ, ㅁ, ㅂ, ㅅ, ㅇ, ㅈ, ㅊ, ㅋ, ㅌ, ㅍ, ㅎ) va 5 ta kuchli (tarang: ㄲ, ㄸ, ㅃ, ㅆ, ㅉ) undosh mavjud. Undosh harflar inson talaffuz a'zolari (til, tanglay, lab) shakliga qarab chizilgan.",
    "formula": "Undosh + Unli = Bo'g'in (masalan: ㄱ + ㅏ = 가)",
    "examples": [
      {
        "kr": "가수",
        "uz": "Qo'shiqchi"
      },
      {
        "kr": "빵을 먹어요.",
        "uz": "Non yeyapman (ㅃ — kuchli undosh)."
      }
    ],
    "quiz": [
      {
        "prompt": "Hangulda nechta asosiy undosh bor?",
        "options": [
          "10 ta",
          "14 ta",
          "19 ta"
        ],
        "correctIndex": 1,
        "explain": "14 ta asosiy va 5 ta kuchli (jami 19 ta) undosh bor."
      },
      {
        "prompt": "Quyidagilardan qaysi biri kuchli (tarang) undosh?",
        "options": [
          "ㄱ",
          "ㄴ",
          "ㄲ",
          "ㅁ"
        ],
        "correctIndex": 2,
        "explain": "ㄲ — kuchli (된소리) undosh hisoblanadi."
      },
      {
        "prompt": "'나무' (daraxt) so'zining bosh undoshi qaysi?",
        "options": [
          "ㄱ",
          "ㄴ",
          "ㄷ",
          "ㅁ"
        ],
        "correctIndex": 1,
        "explain": "나무 so'zi 'ㄴ' (n) undoshi bilan boshlanadi."
      }
    ]
  },
  {
    "id": 4,
    "title": "Diftong",
    "icon": "🔠",
    "rule": "Diftong — ikkita unli tovushning birikishidan hosil bo'lgan murakkab unli. Hangulda 11 ta diftong bor: ㅐ, ㅒ, ㅔ, ㅖ, ㅘ, ㅙ, ㅚ, ㅝ, ㅞ, ㅟ, ㅢ. Zamonaviy koreys tilida ㅐ va ㅔ deyarli bir xil ('e' kabi) eshitiladi.",
    "formula": "Unli + Unli = Diftong (masalan: ㅗ + ㅏ = ㅘ)",
    "examples": [
      {
        "kr": "사과가 맛있어요.",
        "uz": "Olma mazali (ㅘ diftongi)."
      },
      {
        "kr": "의사 선생님이에요.",
        "uz": "Shifokor (bo'lib ishlaydilar)."
      }
    ],
    "quiz": [
      {
        "prompt": "Hangulda nechta diftong mavjud?",
        "options": [
          "7 ta",
          "9 ta",
          "11 ta",
          "14 ta"
        ],
        "correctIndex": 2,
        "explain": "11 ta diftong mavjud: ㅐ,ㅒ,ㅔ,ㅖ,ㅘ,ㅙ,ㅚ,ㅝ,ㅞ,ㅟ,ㅢ."
      },
      {
        "prompt": "'사과' (olma) so'zida qaysi diftong bor?",
        "options": [
          "ㅐ",
          "ㅘ",
          "ㅝ",
          "ㅢ"
        ],
        "correctIndex": 1,
        "explain": "과 bo'g'inida 'ㅘ' (wa) diftongi qatnashgan."
      },
      {
        "prompt": "Zamonaviy talaffuzda deyarli bir xil eshitiladigan diftong juftligi qaysi?",
        "options": [
          "ㅐ va ㅔ",
          "ㅘ va ㅝ",
          "ㅟ va ㅢ"
        ],
        "correctIndex": 0,
        "explain": "ㅐ va ㅔ ikkalasi ham o'zbekcha 'e' tovushiga juda yaqin."
      }
    ]
  },
  {
    "id": 5,
    "title": "Patchim",
    "icon": "🧩",
    "rule": "Patchim (받침) — koreys bo'g'inining tagida keladigan oxirgi undosh harf. Yozuvda jami 27 ta patchim shakli ishlatiladi: 16 ta oddiy patchim (ㄱ, ㄴ, ㄷ, ㄹ, ㅁ, ㅂ, ㅅ, ㅇ, ㅈ, ㅊ, ㅋ, ㅌ, ㅍ, ㅎ, ㄲ, ㅆ) va 11 ta qo'shma patchim (ㄳ, ㄵ, ㄶ, ㄺ, ㄻ, ㄼ, ㄽ, ㄾ, ㄿ, ㅀ, ㅄ). Ammo talaffuzda ularning barchasi atigi 7 ta asosiy tovushga (ㄱ, ㄴ, ㄷ, ㄹ, ㅁ, ㅂ, ㅇ) aylanadi. Masalan: 옷 [옫], 꽃 [꼳], 닭 [닥].",
    "formula": "Yozuvda 27 ta shakl (16 oddiy + 11 qo'shma) -> Talaffuzda 7 ta tovush (ㄱ,ㄴ,ㄷ,ㄹ,ㅁ,ㅂ,ㅇ)",
    "examples": [
      {
        "kr": "책 [chaek]",
        "uz": "Kitob (patchim: ㄱ)"
      },
      {
        "kr": "옷 [ot]",
        "uz": "Kiyim (ㅅ patchimi [ㄷ] deb o'qiladi)"
      }
    ],
    "quiz": [
      {
        "prompt": "Patchimda yozuvda nechta shakl ishlatiladi va talaffuzda nechta tovushga tushadi?",
        "options": [
          "16 ta yozuv, 7 ta tovush",
          "27 ta yozuv (16 oddiy + 11 qo'shma), 7 ta tovush",
          "14 ta yozuv, 5 ta tovush"
        ],
        "correctIndex": 1,
        "explain": "Yozuvda 16 ta oddiy va 11 ta qo'shma patchim (jami 27 ta) yoziladi, lekin talaffuzda 7 ta tovushga qisqaradi."
      },
      {
        "prompt": "'옷' (kiyim) so'zidagi 'ㅅ' patchimi qanday o'qiladi?",
        "options": [
          "[ㅅ]",
          "[ㄷ]",
          "[ㅂ]",
          "[ㅇ]"
        ],
        "correctIndex": 1,
        "explain": "ㅅ harfi patchimda har doim [ㄷ] deb talaffuz qilinadi."
      },
      {
        "prompt": "Qaysi so'zda patchim YO'Q?",
        "options": [
          "물",
          "밥",
          "차",
          "집"
        ],
        "correctIndex": 2,
        "explain": "차 (ch-a) so'zi ostida patchim yo'q, unli bilan tugagan."
      }
    ]
  },
  {
    "id": 6,
    "title": "Qo'shib o'qish",
    "icon": "🔊",
    "rule": "Qo'shib o'qish (연음 qoidasi): Patchimli bo'g'indan keyin unli bilan boshlanuvchi bo'g'in (ya'ni ovozsiz 'ㅇ') kelsa, patchimdagi undosh keyingi bo'g'inning boshiga ko'chib talaffuz qilinadi. Eslatma: Yozuv o'zgarmaydi, faqat talaffuz o'zgaradi!",
    "formula": "Patchim + ㅇ = Undosh keyingi bo'g'inga o'tadi",
    "examples": [
      {
        "kr": "한국어 -> [한구거]",
        "uz": "Koreys tili (ㄱ harfi keyingi bo'g'inga o'tadi)"
      },
      {
        "kr": "집에 -> [지베]",
        "uz": "Uyga (ㅂ harfi keyingi bo'g'inga o'tadi)"
      }
    ],
    "quiz": [
      {
        "prompt": "'음악' (musiqa) so'zi qanday talaffuz qilinadi?",
        "options": [
          "[음악]",
          "[으막]",
          "[음막]"
        ],
        "correctIndex": 1,
        "explain": "ㅁ patchimi ㅇ o'rniga o'tib, [으막] deb o'qiladi."
      },
      {
        "prompt": "'한국어' qanday o'qiladi?",
        "options": [
          "[한국어]",
          "[한구거]",
          "[하구고]"
        ],
        "correctIndex": 1,
        "explain": "ㄱ patchimi keyingi bo'g'inga o'tib [한구거] deb talaffuz qilinadi."
      },
      {
        "prompt": "Qo'shib o'qish qoidasida yozuv o'zgaradimi?",
        "options": [
          "Ha, yozuv ham o'zgaradi",
          "Yo'q, faqat talaffuz o'zgaradi"
        ],
        "correctIndex": 1,
        "explain": "Faqat talaffuz o'zgaradi, yozuv doimo grammatik qoida bo'yicha qoladi."
      }
    ]
  },
  {
    "id": 7,
    "title": "Ot kesim",
    "icon": "🏷️",
    "rule": "Ot kesim qo'shimchalari o'zbek tilidagi '...man, ...dir' ma'nosini beradi. Kundalik hurmatli (요) uslubda: Patchim bor otlarga -이에요, Patchim yo'q otlarga esa -예요 qo'shiladi. Rasmiy uslubda esa har doim -입니다 ishlatiladi.",
    "formula": "Patchim BOR + 이에요 | Patchim YO'Q + 예요",
    "examples": [
      {
        "kr": "저는 학생이에요.",
        "uz": "Men o'quvchiman (학생 — patchim bor)."
      },
      {
        "kr": "이 사람은 의사예요.",
        "uz": "Bu kishi shifokor (의사 — patchim yo'q)."
      }
    ],
    "quiz": [
      {
        "prompt": "'선생님' (o'qituvchi) so'ziga qaysi qo'shimcha to'g'ri keladi?",
        "options": [
          "선생님이에요",
          "선생님예요",
          "선생님해요"
        ],
        "correctIndex": 0,
        "explain": "선생님 so'zi 'ㅁ' patchim bilan tugagani uchun -이에요 qo'shiladi."
      },
      {
        "prompt": "'친구' (do'st) so'ziga qaysi biri qo'shiladi?",
        "options": [
          "친구이에요",
          "친구예요",
          "친구입니다만"
        ],
        "correctIndex": 1,
        "explain": "친구 unli bilan tugagan (patchim yo'q), shuning uchun -예요 qo'shiladi."
      },
      {
        "prompt": "Rasmiy uslubdagi ot kesim qo'shimchasi qaysi?",
        "options": [
          "이에요",
          "예요",
          "입니다",
          "합니다"
        ],
        "correctIndex": 2,
        "explain": "Rasmiy nutqda patchimdan qat'i nazar -입니다 ishlatiladi."
      }
    ]
  },
  {
    "id": 8,
    "title": "Fe'l kesim",
    "icon": "🏃",
    "rule": "Koreys tilida fe'llarning lug'at shakli har doim '-다' bilan tugaydi. Gapda hozirgi zamon (요) shaklini yasash uchun: Fe'l ildizidagi oxirgi unli ㅏ yoki ㅗ bo'lsa -> -아요 qo'shiladi. Boshqa barcha unlilarga -> -어요 qo'shiladi. '하다' bilan tugaydigan fe'llarga esa -> -해요 qo'shiladi.",
    "formula": "ㅏ, ㅗ -> -아요 | Boshqalar -> -어요 | 하다 -> -해요",
    "examples": [
      {
        "kr": "학교에 가요.",
        "uz": "Maktabga boryapman (가다 + 아요 -> 가요)."
      },
      {
        "kr": "밥을 먹어요.",
        "uz": "Ovqat yeyapman (먹다 + 어요 -> 먹어요)."
      },
      {
        "kr": "한국어를 공부해요.",
        "uz": "Koreys tilini o'rganyapman (공부하다 -> 공부해요)."
      }
    ],
    "quiz": [
      {
        "prompt": "'보다' (ko'rmoq) fe'lining to'g'ri -요 shakli qaysi?",
        "options": [
          "보아요",
          "봐요",
          "보어요"
        ],
        "correctIndex": 1,
        "explain": "ㅗ + 아 birlashib qisqaradi: 봐요."
      },
      {
        "prompt": "'읽다' (o'qimoq) fe'lining to'g'ri -요 shakli qaysi?",
        "options": [
          "읽아요",
          "읽어요",
          "읽해요"
        ],
        "correctIndex": 1,
        "explain": "Ildizda 'ㅣ' unlisi bo'lgani uchun -어요 qo'shiladi: 읽어요."
      },
      {
        "prompt": "'운동하다' fe'lining -요 shakli qanday bo'ladi?",
        "options": [
          "운동하요",
          "운동해요",
          "운동했어요"
        ],
        "correctIndex": 1,
        "explain": "Barcha 하다 fe'llari hozirgi zamonda 해요 ga aylanadi."
      }
    ]
  },
  {
    "id": 9,
    "title": "Kelishik",
    "icon": "🔗",
    "rule": "Koreys tilidagi eng asosiy 3 ta kelishik: 1) Mavzu qo'shimchasi: 은/는 (gap mavzusini ta'kidlaydi). 2) Ega qo'shimchasi: 이/가 (harakat bajaruvchisini ko'rsatadi). 3) To'ldiruvchi qo'shimchasi: 을/를 (harakat qaratilgan ob'ektni bildiradi). Patchim bor so'zlarga: 은, 이, 을; Patchim yo'q so'zlarga: 는, 가, 를 qo'shiladi.",
    "formula": "Mavzu: 은/는 | Ega: 이/가 | To'ldiruvchi: 을/를",
    "examples": [
      {
        "kr": "저는 사과를 좋아해요.",
        "uz": "Men (mavzu) olmani (to'ldiruvchi) yaxshi ko'raman."
      },
      {
        "kr": "비가 와요.",
        "uz": "Yomg'ir (ega) yog'yapti."
      }
    ],
    "quiz": [
      {
        "prompt": "'책' (kitob) so'ziga to'ldiruvchi qo'shimchasi (ni) qanday qo'shiladi?",
        "options": [
          "책를",
          "책을",
          "책이"
        ],
        "correctIndex": 1,
        "explain": "책 patchim bilan tugagani uchun -을 qo'shiladi: 책을."
      },
      {
        "prompt": "'사과' (olma) so'ziga to'ldiruvchi qo'shimchasi qanday qo'shiladi?",
        "options": [
          "사과을",
          "사과를",
          "사과가"
        ],
        "correctIndex": 1,
        "explain": "사과 unli bilan tugagani uchun -를 qo'shiladi: 사과를."
      },
      {
        "prompt": "'친구' so'ziga ega qo'shimchasi qanday qo'shiladi?",
        "options": [
          "친구가",
          "친구이",
          "친구는"
        ],
        "correctIndex": 0,
        "explain": "Patchimsiz so'zga -가 qo'shiladi: 친구가."
      }
    ]
  },
  {
    "id": 10,
    "title": "Zamonlar",
    "icon": "⏰",
    "rule": "1) O'tgan zamon: Fe'l ildiziga unliga qarab -았어요 / -었어요 / -했어요 qo'shiladi. 2) Kelasi zamon: Ildiz unli bilan tugasa -(으)ㄹ 거예요, undosh bilan tugasa -을 거예요 qo'shiladi. ⚠️ 'ㄹ' istisnosi: Ildizi 'ㄹ' bilan tugagan fe'llarga '-을 거예요' emas, to'g'ridan-to'g'ri 'ㄹ 거예요' qo'shiladi: 살다 -> 살 거예요 (yashayman), 만들다 -> 만들 거예요 (tayyorlayman).",
    "formula": "O'tgan: -았/었어요 | Kelasi: -(으)ㄹ 거예요 | 'ㄹ' istisnosi: 살다 -> 살 거예요",
    "examples": [
      {
        "kr": "어제 친구를 만났어요.",
        "uz": "Kecha do'stim bilan uchrashdim (o'tgan zamon)."
      },
      {
        "kr": "내일 도서관에 갈 거예요.",
        "uz": "Ertaga kutubxonaga boraman (kelasi zamon)."
      }
    ],
    "quiz": [
      {
        "prompt": "'먹다' fe'lining o'tgan zamon shakli qanday?",
        "options": [
          "먹았어요",
          "먹었어요",
          "먹겠어요"
        ],
        "correctIndex": 1,
        "explain": "Ildizda 'ㅓ' bo'lgani uchun -었어요: 먹었어요."
      },
      {
        "prompt": "'가다' fe'lining o'tgan zamon shakli qanday?",
        "options": [
          "갔어요",
          "가았어요",
          "가었어요"
        ],
        "correctIndex": 0,
        "explain": "가 + 았어요 birlashib 갔어요 bo'ladi."
      },
      {
        "prompt": "'하다' fe'lining o'tgan zamoni qanday bo'ladi?",
        "options": [
          "하았어요",
          "했어요",
          "하었어요"
        ],
        "correctIndex": 1,
        "explain": "하다 ning o'tgan zamoni doimo 했어요 bo'ladi."
      },
      {
        "prompt": "'살다' (yashamoq) fe'lining kelasi zamon shakli qanday bo'ladi?",
        "options": [
          "살을 거예요",
          "살 거예요",
          "살았어요"
        ],
        "correctIndex": 1,
        "explain": "'ㄹ' bilan tugaydigan fe'llarga to'g'ridan-to'g'ri 'ㄹ 거예요' qo'shiladi: 살 거예요."
      }
    ]
  },
  {
    "id": 11,
    "title": "Son",
    "icon": "🔢",
    "rule": "Koreys tilida 2 xil son tizimi bor: 1) Sof koreyscha sonlar (하나, 둘, 셋, 넷...) — yosh, soat va narsalarni donalab sanashda ishlatiladi. Narsa sanaganda 하나->한, 둘->두, 셋->세, 넷->네 ga o'zgaradi. 2) Xitoy-koreyscha sonlar (일, 이, 삼, 사...) — pul, telefon raqami, sana, daqiqa va oylarni aytishda ishlatiladi.",
    "formula": "Yosh, soat -> Sof koreyscha | Pul, sana, daqiqa -> Xitoy-koreyscha",
    "examples": [
      {
        "kr": "스무 살이에요. 한 시예요.",
        "uz": "20 yoshdaman. Soat bir (sof koreyscha)."
      },
      {
        "kr": "오천 원이에요. 삼십 분이에요.",
        "uz": "5000 von. 30 daqiqa (xitoy-koreyscha)."
      }
    ],
    "quiz": [
      {
        "prompt": "Yoshni aytishda qaysi son tizimi ishlatiladi?",
        "options": [
          "Sof koreyscha (하나, 둘...)",
          "Xitoy-koreyscha (일, 이...)"
        ],
        "correctIndex": 0,
        "explain": "Yosh doimo sof koreyscha son + 살 bilan aytiladi."
      },
      {
        "prompt": "Pul miqdorini (von) aytishda qaysi son ishlatiladi?",
        "options": [
          "Sof koreyscha",
          "Xitoy-koreyscha"
        ],
        "correctIndex": 1,
        "explain": "Pul xitoy-koreyscha son bilan aytiladi: 삼천 원 (3000 von)."
      },
      {
        "prompt": "'Dona' qo'shimchasi bilan '2 ta olma' qanday aytiladi?",
        "options": [
          "사과 둘 개",
          "사과 두 개",
          "사과 이 개"
        ],
        "correctIndex": 1,
        "explain": "둘 so'zi sanoq so'z oldida 두 ga qisqaradi: 사과 두 개."
      }
    ]
  },
  {
    "id": 12,
    "title": "Kalendar",
    "icon": "📅",
    "rule": "Kalendar sanalari Xitoy-koreyscha sonlar bilan aytiladi: Yil — 년 (nyon), Oy — 월 (wol), Kun — 일 (il). Hafta kunlari: Dushanba (월요일), Seshanba (화요일), Chorshanba (수요일), Payshanba (목요일), Juma (금요일), Shanba (토요일), Yakshanba (일요일). Eslatma: 6-oy (유월) va 10-oy (시월) talaffuzda qisqaradi!",
    "formula": "[Yil]년 [Oy]월 [Kun]일 [Hafta kuni]요일",
    "examples": [
      {
        "kr": "오늘은 10월 8일이에요.",
        "uz": "Bugun 8-oktabr (시월 팔일)."
      },
      {
        "kr": "일요일에 쉬어요.",
        "uz": "Yakshanba kuni dam olaman."
      }
    ],
    "quiz": [
      {
        "prompt": "10-oy (oktabr) koreys tilida qanday talaffuz qilinadi?",
        "options": [
          "십월",
          "시월",
          "열월"
        ],
        "correctIndex": 1,
        "explain": "10-oy 'ㅂ' patchimi tushib qolib, 시월 (si-wol) deb talaffuz qilinadi."
      },
      {
        "prompt": "Juma kuni koreys tilida nima deyiladi?",
        "options": [
          "화요일",
          "수요일",
          "금요일",
          "토요일"
        ],
        "correctIndex": 2,
        "explain": "Juma — 금요일 (geum-yo-il)."
      },
      {
        "prompt": "6-oy (iyun) qanday aytiladi?",
        "options": [
          "육월",
          "유월",
          "여섯월"
        ],
        "correctIndex": 1,
        "explain": "6-oy 'ㄱ' patchimi tushib qolib, 유월 (yu-wol) deb aytiladi."
      }
    ]
  },
  {
    "id": 13,
    "title": "Buyruq / istak",
    "icon": "❗",
    "rule": "1) Hurmatli buyruq / iltimos: Fe'l ildiziga -(으)세요 qo'shiladi ('qiling, bajaring'). Patchim bo'lsa -으세요, patchim bo'lmasa -세요. ⚠️ 'ㄹ' istisnosi: Ildizi 'ㄹ' bilan tugagan fe'llarda buyruq qo'shimchasi qo'shilganda 'ㄹ' tushib qoladi: 살다 -> 사세요 (yashang), 만들다 -> 만드세요 (tayyorlang). 2) Istak / xohish: Fe'l ildiziga -고 싶다 qo'shiladi ('qilishni xohlayman').",
    "formula": "Buyruq: -(으)세요 | Xohish: -고 싶어요 | 'ㄹ' istisnosi: 만들다 -> 만드세요, 살다 -> 사세요",
    "examples": [
      {
        "kr": "여기에 앉으세요.",
        "uz": "Bu yerga o'tiring (iltimos/buyruq)."
      },
      {
        "kr": "한국에 가고 싶어요.",
        "uz": "Koreyaga bormoqchiman (istak)."
      }
    ],
    "quiz": [
      {
        "prompt": "'읽다' (o'qimoq) fe'liga buyruq qo'shimchasi qanday qo'shiladi?",
        "options": [
          "읽세요",
          "읽으세요",
          "읽고 싶어요"
        ],
        "correctIndex": 1,
        "explain": "Patchimli fe'lga -으세요 qo'shiladi: 읽으세요 (o'qing)."
      },
      {
        "prompt": "'Koreys taomini yeyishni xohlayman' qanday aytiladi?",
        "options": [
          "한국 음식을 먹으세요",
          "한국 음식을 먹고 싶어요",
          "한국 음식을 먹었어요"
        ],
        "correctIndex": 1,
        "explain": "Istak bildirishda -고 싶어요 qo'shiladi: 먹고 싶어요."
      },
      {
        "prompt": "'가다' (bormoq) fe'liga hurmatli buyruq qanday bo'ladi?",
        "options": [
          "가세요",
          "가으세요",
          "가십시오만"
        ],
        "correctIndex": 0,
        "explain": "Patchimsiz fe'lga -세요 qo'shiladi: 가세요 (boring)."
      },
      {
        "prompt": "'만들다' (tayyorlamoq) fe'liga hurmatli buyruq qanday qo'shiladi?",
        "options": [
          "만들으세요",
          "만드세요",
          "만들세요"
        ],
        "correctIndex": 1,
        "explain": "'ㄹ' bilan tugagan fe'llarda 'ㄹ' tushib qolib '만드세요' bo'ladi."
      }
    ]
  },
  {
    "id": 14,
    "title": "안 / -지 않다 (inkor), 못 (qila olmaslik)",
    "icon": "🚫",
    "rule": "Koreys tilida inkor va imkonsizlik quyidagicha ifodalanadi: 1) '안' va '-지 않다' — umumiy inkor bo'lib, xohishga ko'ra biror ishni qilmaslikni ham, oddiy faktik inkor holatini ham bildiradi. Masalan: '오늘 학교에 안 가요' (Bugun maktabga bormayman) yoki '비가 안 와요' (Yomg'ir yog'mayapti — tabiatning xohishi emas, oddiy fakt!). 2) '못' va '-지 못하다' — xohish bo'lsa ham qobiliyat yetmasligi, jismoniy holat yoki tashqi to'sqinlik sababli biror ishni bajara olmaslikni (imkonsizlikni) bildiradi. Masalan: '다리가 아파서 못 가요' (Oyog'im og'riganligi sababli bora olmayman).",
    "formula": "Umumiy inkor: 안 + Fe'l / Fe'l + -지 않다 | Qila olmaslik: 못 + Fe'l / Fe'l + -지 못하다",
    "examples": [
      {
        "kr": "오늘 학교에 안 가요.",
        "uz": "Bugun maktabga bormayman (xohlamayman / bormaslikka qaror qildim)."
      },
      {
        "kr": "다리가 아파서 학교에 못 가요.",
        "uz": "Oyog'im og'riganligi sababli maktabga bora olmayman (imkonsiz)."
      }
    ],
    "quiz": [
      {
        "prompt": "'Vaqtim yo'qligi sababli kinoga bora olmayman' gapida qaysi biri ishlatiladi?",
        "options": [
          "안 가요 (bormayman)",
          "못 가요 (bora olmayman)",
          "가지 않아요"
        ],
        "correctIndex": 1,
        "explain": "Imkoniyat yo'qligi (to'sqinlik) tufayli 못 가요 ishlatiladi."
      },
      {
        "prompt": "'안' va '못' o'rtasidagi asosiy farq nima?",
        "options": [
          "Farqi yo'q, ikkalasi bir xil",
          "안 — xohishga ko'ra qilmaslik, 못 — qila olmaslik (imkonsizlik)",
          "못 faqat o'tgan zamonda keladi"
        ],
        "correctIndex": 1,
        "explain": "안 — ixtiyoriy inkor, 못 esa imkonsizlik yoki qobiliyat yetmasligini bildiradi."
      },
      {
        "prompt": "Quyidagilardan qaysi biri 'ovqat yemayman (xohlamayman)' ma'nosini beradi?",
        "options": [
          "밥을 못 먹어요",
          "밥을 안 먹어요",
          "밥을 먹고 싶어요"
        ],
        "correctIndex": 1,
        "explain": "안 먹어요 — o'z ixtiyori bilan yemayman degani."
      }
    ]
  },
  {
    "id": 15,
    "title": "Hurmat qo'shimchalari",
    "icon": "🙏",
    "rule": "Koreys tilida yoshi katta yoki hurmatli shaxslar harakatini ifodalash uchun fe'l ildiziga '-(으)시-' qo'shimchasi qo'shiladi. ⚠️ 'ㄹ' istisnosi: '-(으)시-' qo'shilganda fe'l ildizidagi 'ㄹ' tushib qoladi: 살다 -> 사시다 (사세요), 만들다 -> 만드시더 (만드세요). Shuningdek, ba'zi kundalik fe'llarning maxsus hurmat shakli bor: 자다 -> 주무시다 (uxlamoq), 먹다/마시다 -> 드시다 / 잡수시다 (yemoq/ichmoq), 있다 -> 계시다 (bo'lmoq/bor bo'lmoq).",
    "formula": "Ildiz + -(으)시- | 'ㄹ' istisnosi: 살다 -> 사세요, 만들다 -> 만드세요 | Maxsus: 주무시다, 드시다, 계시다",
    "examples": [
      {
        "kr": "선생님께서 오세요.",
        "uz": "Ustoz kelyaptilar (오다 + 시 + 어요 -> 오세요)."
      },
      {
        "kr": "할아버지께서 진지를 드세요.",
        "uz": "Bobom ovqatlanyaptilar (드시다)."
      }
    ],
    "quiz": [
      {
        "prompt": "'자다' (uxlamoq) fe'lining hurmatli shakli qaysi?",
        "options": [
          "자세요",
          "주무시다",
          "드시다",
          "계시다"
        ],
        "correctIndex": 1,
        "explain": "Kattalar uxlaganda 주무시다 (jumusida) ishlatiladi."
      },
      {
        "prompt": "Kattalarga nisbatan 'uyda borlar' deganda qaysi fe'l ishlatiladi?",
        "options": [
          "있으세요",
          "계세요",
          "드세요"
        ],
        "correctIndex": 1,
        "explain": "Insonning mavjudligini hurmat bilan aytishda 계시다 (gyesida) ishlatiladi."
      },
      {
        "prompt": "'선생님께서 커피를 ___' bo'sh joyga qaysi biri mos?",
        "options": [
          "마셔요",
          "드세요",
          "자요"
        ],
        "correctIndex": 1,
        "explain": "Ustoz ichayotganlarida hurmat shakli 드시다 (드세요) ishlatiladi."
      }
    ]
  },
  {
    "id": 16,
    "title": "Hurmat qo'shimchalari II",
    "icon": "🎩",
    "rule": "Hurmat darajasining ikkinchi qismi otlarga taalluqlidir: 1) Ega qo'shimchasi 이/가 o'rniga -> 께서 ishlatiladi. 2) Jo'nalish kelishigi (ga) 에게 o'rniga -> 께 ishlatiladi. 3) Maxsus otlar: uy (집 -> 댁), ism (이름 -> 성함), yosh (나이 -> 연세), gap (말 -> 말씀).",
    "formula": "이/가 -> 께서 | 에게 -> 께 | 집 -> 댁 | 이름 -> 성함",
    "examples": [
      {
        "kr": "부모님께 편지를 드려요.",
        "uz": "Ota-onamga xat beryapman (께 qo'shimchasi)."
      },
      {
        "kr": "할머니 댁에 가요.",
        "uz": "Buvimning uylariga boryapman (댁 so'zi)."
      }
    ],
    "quiz": [
      {
        "prompt": "'Ustozga savol berdim' gapida 'ustozga' qanday aytiladi?",
        "options": [
          "선생님에게",
          "선생님께",
          "선생님한테"
        ],
        "correctIndex": 1,
        "explain": "Hurmatli shaxsga nisbatan -께 qo'shiladi: 선생님께."
      },
      {
        "prompt": "Kattalarning yoshi so'ralganda qaysi so'z ishlatiladi?",
        "options": [
          "나이",
          "살",
          "연세"
        ],
        "correctIndex": 2,
        "explain": "Hurmat bilan yosh so'raganda 연세 (yonsae) ishlatiladi."
      },
      {
        "prompt": "Kattalarning uyi qanday ataladi?",
        "options": [
          "집",
          "댁",
          "방"
        ],
        "correctIndex": 1,
        "explain": "Hurmat ma'nosida uy '댁' (daek) deb ataladi: 할머니 댁."
      }
    ]
  },
  {
    "id": 17,
    "title": "Noto'g'ri fe'l",
    "icon": "⚠️",
    "rule": "Koreys tilida ba'zi fe'llar unli bilan boshlanuvchi qo'shimcha (-아/어) qo'shilganda o'zgaradi: 1) ㄷ-noto'g'ri: 듣다 -> 들어요 (d -> r ga aylanadi). 2) ㅂ-noto'g'ri: 덥다 -> 더워요, 춥다 -> 추워요 (b tushib o'rniga w qo'shiladi). 3) 르-noto'g'ri: 모르다 -> 몰라요, 빠르다 -> 빨라요 (ㄹ ikkilanadi).",
    "formula": "듣다 -> 들어요 | 춥다 -> 추워요 | 모르다 -> 몰라요",
    "examples": [
      {
        "kr": "음악을 들어요.",
        "uz": "Musiqa eshityapman (듣다 -> 들어요)."
      },
      {
        "kr": "날씨가 너무 추워요.",
        "uz": "Havo juda sovuq (춥다 -> 추워요)."
      }
    ],
    "quiz": [
      {
        "prompt": "'듣다' (eshitmoq) fe'lining -요 shakli qaysi?",
        "options": [
          "듣어요",
          "들어요",
          "듣아요"
        ],
        "correctIndex": 1,
        "explain": "ㄷ harfi unli oldida ㄹ ga aylanadi: 들어요."
      },
      {
        "prompt": "'어렵다' (qiyin) so'zining -요 shakli qaysi?",
        "options": [
          "어렵어요",
          "어려워요",
          "어려요"
        ],
        "correctIndex": 1,
        "explain": "ㅂ noto'g'ri fe'llarida ㅂ tushib 워요 ga aylanadi: 어려워요."
      },
      {
        "prompt": "'모르다' (bilmaslik) fe'lining -요 shakli qaysi?",
        "options": [
          "모라요",
          "몰라요",
          "모르어요"
        ],
        "correctIndex": 1,
        "explain": "르 noto'g'ri fe'l qoidasiga ko'ra: 몰라요."
      }
    ]
  },
  {
    "id": 18,
    "title": "Joylashuv so'zlari",
    "icon": "📍",
    "rule": "Koreys tilida joy va makon yo'nalishlari ot orqasidan keladi: 위 (ustida), 아래 / 밑 (ostida), 앞 (oldida), 뒤 (orqasida), 옆 (yonida), 안 (ichida), 밖 (tashqarisida), 사이 (orasida). Ular ko'pincha joy kelishigi '-에' bilan birga ishlatiladi (masalan: 위에, 옆에).",
    "formula": "Narsa + [위 / 아래 / 앞 / 뒤 / 옆 / 안 / 밖] + 에",
    "examples": [
      {
        "kr": "책상 위에 책이 있어요.",
        "uz": "Stol ustida kitob bor."
      },
      {
        "kr": "은행 옆에 약국이 있어요.",
        "uz": "Bank yonida dorixona bor."
      }
    ],
    "quiz": [
      {
        "prompt": "'Stol ostida mushuk bor' gapida 'ostida' qaysi so'z?",
        "options": [
          "위",
          "밑 (아래)",
          "앞",
          "뒤"
        ],
        "correctIndex": 1,
        "explain": "Osti — 밑 yoki 아래 deb aytiladi."
      },
      {
        "prompt": "'Uy ichida' qanday bo'ladi?",
        "options": [
          "집 안에",
          "집 밖에",
          "집 옆에"
        ],
        "correctIndex": 0,
        "explain": "Ichida — 안 (an): 집 안에."
      },
      {
        "prompt": "'Kutubxona orqasida' qanday bo'ladi?",
        "options": [
          "도서관 앞에",
          "도서관 뒤에",
          "도서관 위에"
        ],
        "correctIndex": 1,
        "explain": "Orqasida — 뒤 (dwi): 도서관 뒤에."
      }
    ]
  },
  {
    "id": 19,
    "title": "Bog'lovchi",
    "icon": "🔀",
    "rule": "1) -고: Ikkita harakat yoki sifatni 'va, hamda' deb bog'laydi (masalan: 맛보고 좋아요). 2) -지만: 'lekin, ammo' degan zidlik ma'nosini bildiradi. 3) -(으)ㄴ/는데: Gapga kirish qilish, vaziyatni tushuntirish yoki qarama-qarshilik bildirish uchun ishlatiladi.",
    "formula": "-고 (va) | -지만 (lekin) | -(으)ㄴ/는데 (holat/kirish)",
    "examples": [
      {
        "kr": "밥을 먹고 커피를 마셔요.",
        "uz": "Ovqat yeb, kofe ichyapman (-고)."
      },
      {
        "kr": "한국어는 어렵지만 재미있어요.",
        "uz": "Koreys tili qiyin, lekin qiziqarli (-지만)."
      }
    ],
    "quiz": [
      {
        "prompt": "'Kino ko'rdim va do'stim bilan gaplashdim' gapida qaysi bog'lovchi kerak?",
        "options": [
          "-지만",
          "-고",
          "-아서"
        ],
        "correctIndex": 1,
        "explain": "Harakatlarni ketma-ket bog'lashda -고 ishlatiladi: 보고."
      },
      {
        "prompt": "'Bu taom qimmat, lekin juda mazali' qanday yoziladi?",
        "options": [
          "비싸고 맛있어요",
          "비싸지만 맛있어요",
          "비싸서 맛있어요"
        ],
        "correctIndex": 1,
        "explain": "Lekin/ammo ma'nosida -지만 ishlatiladi: 비싸지만."
      },
      {
        "prompt": "-고 qo'shimchasida fe'l ildizidagi patchim ahamiyatlimi?",
        "options": [
          "Ha, patchimga qarab o'zgaradi",
          "Yo'q, har doim to'g'ridan-to'g'ri -고 qo'shiladi"
        ],
        "correctIndex": 1,
        "explain": "Fe'l ildiziga patchim bor-yo'qligidan qat'i nazar to'g'ridan-to'g'ri -고 qo'shiladi."
      }
    ]
  },
  {
    "id": 20,
    "title": "Sabab qo'shimchalari",
    "icon": "💡",
    "rule": "1) -아/어서: Tabiiy sabab-oqibatni bildiradi ('...gani uchun'). MUHIM: Bu qo'shimcha bilan tugagan gaplarda buyruq (-(으)세요) yoki taklif (-ㅂ시다) ishlatib bo'lmaydi! 2) -(으)니까: Sabab orqasidan buyruq yoki taklif kelsa aynan -(으)니까 ishlatiladi. 3) -기 때문에: Rasmiy va kuchli sababni bildiradi.",
    "formula": "-아/어서 (oddiy sabab) | -(으)니까 (buyruq/taklif bilan) | -기 때문에 (rasmiy)",
    "examples": [
      {
        "kr": "비가 와서 집에 있었어요.",
        "uz": "Yomg'ir yoqqani uchun uyda edim (-아/어서)."
      },
      {
        "kr": "날씨가 좋으니까 밖으로 나갑시다.",
        "uz": "Havo yaxshi bo'lgani sababli tashqariga chiqaylik (-(으)니까)."
      }
    ],
    "quiz": [
      {
        "prompt": "Keyingi gapda buyruq (-(으)세요) kelsa, qaysi sabab qo'shimchasi ishlatiladi?",
        "options": [
          "-아/어서",
          "-(으)니까",
          "-고"
        ],
        "correctIndex": 1,
        "explain": "Buyruq va taklif gaplarda faqat -(으)니까 ishlatiladi."
      },
      {
        "prompt": "'Charchaganim uchun erta uxladim' gapiga qaysi biri mos?",
        "options": [
          "피곤해서 일찍 잤어요",
          "피곤하지만 일찍 잤어요",
          "피곤하고 일찍 잤어요"
        ],
        "correctIndex": 0,
        "explain": "Tabiiy sabab: 피곤하다 -> 피곤해서."
      },
      {
        "prompt": "-아/어서 qo'shimchasidan keyin buyruq gap (-(으)세요) ishlatish mumkinmi?",
        "options": [
          "Ha, bemalol",
          "Yo'q, bu qat'iyan man etiladi"
        ],
        "correctIndex": 1,
        "explain": "-아/어서 bilan buyruq va taklif gaplar umuman bog'lanmaydi."
      }
    ]
  },
  {
    "id": 21,
    "title": "려고 / 고 싶다",
    "icon": "💭",
    "rule": "1) -(으)려고 하다: Biror ishni qilish reja yoki niyatida bo'lish ('...moqchi bo'lmoq'). Ildiz unli bilan tugasa -려고 하다, undosh bilan tugasa -으려고 하다. ⚠️ 'ㄹ' istisnosi: Ildizi 'ㄹ' bilan tugagan fe'llarga '-으려고' emas, to'g'ridan-to'g'ri '-려고' qo'shiladi: 살다 -> 살려고 해요 (yashamoqchiman), 만들다 -> 만들려고 해요 (tayyorlamoqchiman). 2) -고 싶다: Shaxsiy xohish va istakni bildirish ('...gim kelyapti').",
    "formula": "Niyat: -(으)려고 하다 | 'ㄹ' istisnosi: 살다 -> 살려고 해요 | Istak: -고 싶다",
    "examples": [
      {
        "kr": "새 차를 사려고 해요.",
        "uz": "Yangi mashina sotib olmoqchiman (niyat)."
      },
      {
        "kr": "제주도에 여행 가고 싶어요.",
        "uz": "Jeju oroliga sayohatga borgim kelyapti (istak)."
      }
    ],
    "quiz": [
      {
        "prompt": "'Koreys tilini o'rganmoqchiman (niyatim bor)' qanday bo'ladi?",
        "options": [
          "한국어를 배우려고 해요",
          "한국어를 배우세요",
          "한국어를 배웠어요"
        ],
        "correctIndex": 0,
        "explain": "Niyat bildirish: 배우다 + 려고 해요 -> 배우려고 해요."
      },
      {
        "prompt": "'Uxlashni xohlayman' qanday aytiladi?",
        "options": [
          "자려고 해요",
          "자고 싶어요",
          "자야 해요"
        ],
        "correctIndex": 1,
        "explain": "Xohish bildirishda -고 싶어요 qo'shiladi: 자고 싶어요."
      },
      {
        "prompt": "'먹다' fe'liga niyat qo'shimchasi qanday qo'shiladi?",
        "options": [
          "먹려고 해요",
          "먹으려고 해요",
          "먹고 싶으세요"
        ],
        "correctIndex": 1,
        "explain": "Patchimli fe'llarga -으려고 해요 qo'shiladi: 먹으려고 해요."
      },
      {
        "prompt": "'살다' (yashamoq) fe'liga niyat qo'shimchasi qanday qo'shiladi?",
        "options": [
          "살으려고 해요",
          "살려고 해요",
          "살고 싶으세요"
        ],
        "correctIndex": 1,
        "explain": "'ㄹ' bilan tugagan fe'llarga to'g'ridan-to'g'ri -려고 해요 qo'shiladi: 살려고 해요."
      }
    ]
  },
  {
    "id": 22,
    "title": "Ruxsat va taqiq",
    "icon": "🚦",
    "rule": "1) Ruxsat berish / so'rash: Fe'l ildiziga -아/어도 되다 qo'shiladi ('...sa ham bo'ladi / ...sam maylimi?'). 2) Taqiq qo'yish: Fe'l ildiziga -(으)면 안 되다 qo'shiladi ('...sa bo'lmaydi / mumkin emas'). ⚠️ 'ㄹ' istisnosi: Shart va taqiqda '-(으)면' qo'shilganda 'ㄹ' bilan tugagan fe'llarga '-으면' emas, to'g'ridan-to'g'ri '-면' qo'shiladi: 살다 -> 살면 (yashasa), 만들다 -> 만들면 (tayyorlasa).",
    "formula": "Ruxsat: -아/어도 되다 | Taqiq: -(으)면 안 되다 | 'ㄹ' istisnosi: 살면, 만들면",
    "examples": [
      {
        "kr": "여기에 앉아도 돼요.",
        "uz": "Bu yerga o'tirsangiz bo'ladi (ruxsat)."
      },
      {
        "kr": "박물관에서 사진을 찍으면 안 돼요.",
        "uz": "Muzeyda rasmga tushish mumkin emas (taqiq)."
      }
    ],
    "quiz": [
      {
        "prompt": "'Kirish mumkin emas / kirsangiz bo'lmaydi' qanday yoziladi?",
        "options": [
          "들어가도 돼요",
          "들어가면 안 돼요",
          "들어가야 해요"
        ],
        "correctIndex": 1,
        "explain": "Taqiq: 들어가다 + 면 안 돼요 -> 들어가면 안 돼요."
      },
      {
        "prompt": "'Ketsam maylimi / ketsam bo'ladimi?' qanday so'raladi?",
        "options": [
          "가도 돼요?",
          "가면 안 돼요?",
          "가야 해요?"
        ],
        "correctIndex": 0,
        "explain": "Ruxsat so'rash: 가다 + 아도 돼요? -> 가도 돼요?"
      },
      {
        "prompt": "'먹다' fe'liga taqiq qo'shimchasi qanday qo'shiladi?",
        "options": [
          "먹면 안 돼요",
          "먹으면 안 돼요",
          "먹어도 안 돼요"
        ],
        "correctIndex": 1,
        "explain": "Patchimli fe'lga -으면 안 돼요 qo'shiladi: 먹으면 안 돼요."
      },
      {
        "prompt": "'살다' fe'liga shart qo'shimchasi qanday qo'shiladi?",
        "options": [
          "살으면",
          "살면",
          "살아면"
        ],
        "correctIndex": 1,
        "explain": "'ㄹ' bilan tugagan fe'llarga to'g'ridan-to'g'ri -면 qo'shiladi: 살면."
      }
    ]
  },
  {
    "id": 23,
    "title": "Kerak, lozim, shart",
    "icon": "✅",
    "rule": "Majburiyat va shartlilik ma'nosi fe'l ildiziga -아/어야 하다 yoki -아/어야 되다 qo'shish orqali yasaladi ('...ishim kerak, ...ish lozim/shart'). Unli qoidasi xuddi hozirgi zamon (아요/어요) kabi ishlaydi: ㅏ/ㅗ bo'lsa -아야 하다, boshqalarga -어야 하다, 하다 fe'llariga -해야 하다.",
    "formula": "Fe'l ildizi + -아/어야 하다 (yoki 되다)",
    "examples": [
      {
        "kr": "내일 시험이 있어서 공부해야 해요.",
        "uz": "Ertaga imtihon bo'lgani uchun o'qishim kerak."
      },
      {
        "kr": "약속 시간을 지켜야 돼요.",
        "uz": "Uchrashuv vaqtiga amal qilish shart."
      }
    ],
    "quiz": [
      {
        "prompt": "'Ertaga erta turishim kerak' qanday yoziladi?",
        "options": [
          "일찍 일어나야 해요",
          "일찍 일어나도 돼요",
          "일찍 일어나고 싶어요"
        ],
        "correctIndex": 0,
        "explain": "Majburiyat: 일어나다 -> 일어나야 해요."
      },
      {
        "prompt": "'하다' fe'lining shart/majburiyat shakli qanday?",
        "options": [
          "하아야 해요",
          "해야 해요",
          "하어야 해요"
        ],
        "correctIndex": 1,
        "explain": "하다 har doim 해야 해요 ga aylanadi."
      },
      {
        "prompt": "-아/어야 하다 va -아/어야 되다 o'rtasida katta farq bormi?",
        "options": [
          "Yo'q, ikkalasi bir xil ma'noda almashib kelaveradi",
          "Ha, butunlay boshqa zamon"
        ],
        "correctIndex": 0,
        "explain": "Ikkalasi ham bir xil majburiyat ma'nosida erkin ishlatiladi."
      }
    ]
  },
  {
    "id": 24,
    "title": "Kelishik olmoshlari",
    "icon": "👥",
    "rule": "Koreys tilida kishilik olmoshlari kelishiklar bilan qo'shilganda qisqaradi va shakli o'zgaradi: 1) Hurmatli: 저 (men) + 가 -> 제가 ('men'), 저 + 의 -> 제 ('mening'). 2) Oddiy (do'stona): 나 (men) + 가 -> 내가 ('men'), 나 + 의 -> 내 ('mening'). 3) Sen: 너 (sen) + 가 -> 네가 [talaffuzda 니가] ('sen'), 너 + 의 -> 네 [talaffuzda 니] ('sening'). 4) Biz: 우리 (biz / bizning).",
    "formula": "저+가 -> 제가 | 나+가 -> 내가 | 저+의 -> 제 | 나+의 -> 내",
    "examples": [
      {
        "kr": "제가 갈게요.",
        "uz": "Men boraman (hurmatli shakl)."
      },
      {
        "kr": "이것은 제 가방이에요.",
        "uz": "Bu mening sumkam (hurmatli: 제)."
      }
    ],
    "quiz": [
      {
        "prompt": "Kattalar bilan gaplashganda 'Men bordim' uchun qaysi biri to'g'ri?",
        "options": [
          "내가 갔어요",
          "제가 갔어요",
          "너가 갔어요"
        ],
        "correctIndex": 1,
        "explain": "Hurmatli shaklda 'men' ega bo'lib kelganda 제가 ishlatiladi."
      },
      {
        "prompt": "'Mening ismim' hurmatli shaklda qanday aytiladi?",
        "options": [
          "내 이름",
          "제 이름",
          "너 이름"
        ],
        "correctIndex": 1,
        "explain": "Hurmat shaklida 'mening' — 제 (je) bo'ladi: 제 이름."
      },
      {
        "prompt": "Koreyslar oila va vatan haqida gapirganda 'mening' o'rniga ko'pincha nima deydi?",
        "options": [
          "우리 (bizning)",
          "내 (mening)",
          "네 (sening)"
        ],
        "correctIndex": 0,
        "explain": "Koreys madaniyatida jamoaviylik kuchli: 우리 가족 (oilamiz), 우리나라 (vatanimiz)."
      }
    ]
  },
  {
    "id": 25,
    "title": "에서/부터~까지",
    "icon": "➡️",
    "rule": "Boshlanish va tugash chegaralarini ifodalash: 1) Makon (joy) uchun: [Joy]에서 [Joy]까지 ('...dan ...gacha'). 2) Zamon (vaqt) uchun: [Vaqt]부터 [Vaqt]까지 ('...dan ...gacha'). Eslatma: '에서' harakat sodir bo'layotgan joyni ham bildiradi (masalan: 학교에서 공부해요).",
    "formula": "Joyda: 에서 ~ 까지 | Vaqtda: 부터 ~ 까지",
    "examples": [
      {
        "kr": "서울에서 부산까지 기차로 가요.",
        "uz": "Seuldan Pusangacha poyezdda boramiz/boraman."
      },
      {
        "kr": "아침 9시부터 오후 6시까지 일해요.",
        "uz": "Ertalab 9 dan kechki 6 gacha ishlayman (vaqt)."
      }
    ],
    "quiz": [
      {
        "prompt": "'Dushanbadan jumagacha' gapida 'dan' qaysi qo'shimcha bilan aytiladi?",
        "options": [
          "에서",
          "부터",
          "까지"
        ],
        "correctIndex": 1,
        "explain": "Vaqtga nisbatan 'dan' qo'shimchasi doim 부터 (buteo) bo'ladi."
      },
      {
        "prompt": "'Uydan maktabgacha' gapida 'uydan' qanday yoziladi?",
        "options": [
          "집부터",
          "집에서",
          "집까지"
        ],
        "correctIndex": 1,
        "explain": "Makon (joy)ga nisbatan 'dan' qo'shimchasi 에서 (eseo) bo'ladi: 집에서."
      },
      {
        "prompt": "'Gacha' ma'nosini qaysi qo'shimcha bildiradi?",
        "options": [
          "에서",
          "부터",
          "까지"
        ],
        "correctIndex": 2,
        "explain": "Ham joy, ham vaqt uchun 'gacha' ma'nosini 까지 (kkaji) bildiradi."
      }
    ]
  },
  {
    "id": 26,
    "title": "Fe'ldan ot yasash",
    "icon": "🏗️",
    "rule": "Fe'llarni gapda otga aylantirish (substantivatsiya): 1) -기: Fe'l ildiziga to'g'ridan-to'g'ri qo'shiladi va qisqa ot yasaydi (masalan: 읽다 -> 읽기 'o'qish', 쓰다 -> 쓰기 'yozish', 듣다 -> 듣기 'eshitish'). 2) -는 것: '...digan narsa / ...ish' ma'nosida gaplarda ot o'rnida ishlatiladi.",
    "formula": "Ildiz + -기 | Ildiz + -는 것",
    "examples": [
      {
        "kr": "제 취미는 음악 듣기예요.",
        "uz": "Mening xobbiyim musiqa tinglash (-기)."
      },
      {
        "kr": "한국 음식을 만드는 것이 재미있어요.",
        "uz": "Koreys taomini tayyorlash qiziqarli (-는 것)."
      }
    ],
    "quiz": [
      {
        "prompt": "'Bormoq' (가다) fe'lini 'borish' otiga aylantiring:",
        "options": [
          "가요",
          "가기",
          "가서"
        ],
        "correctIndex": 1,
        "explain": "Ildizga -기 qo'shiladi: 가기 (borish)."
      },
      {
        "prompt": "'Kino ko'rishni yoqtiraman' gapida 'ko'rishni' qanday bo'ladi?",
        "options": [
          "영화 보는 것을",
          "영화 보고",
          "영화 봐서"
        ],
        "correctIndex": 0,
        "explain": "Fe'ldan ot yasashda: 보는 것을 좋아해요."
      },
      {
        "prompt": "TOPIK imtihonidagi 'O'qish' bo'limi koreyscha nima deyiladi?",
        "options": [
          "읽기",
          "듣기",
          "쓰기"
        ],
        "correctIndex": 0,
        "explain": "읽다 (o'qimoq) -> 읽기 (o'qish bo'limi)."
      }
    ]
  },
  {
    "id": 27,
    "title": "Taqqoslash",
    "icon": "⚖️",
    "rule": "1) Taqqoslash: Biror narsadan ko'ra ustunroq yoki kamroq ekanligini aytishda '-보다' ('...ga qaraganda / ...dan ko'ra') ishlatiladi. Taqqoslanayotgan otga to'g'ridan-to'g'ri qo'shiladi. 2) Eng yuqori daraja: '제일' yoki '가장' so'zlari sifat yoki fe'l oldiga qo'yiladi ('eng').",
    "formula": "Ot + 보다 (더) Sifat | 제일 / 가장 + Sifat",
    "examples": [
      {
        "kr": "비행기가 기차보다 빨라요.",
        "uz": "Samolyot poyezddan ko'ra tezroq (-보다)."
      },
      {
        "kr": "한국에서 서울이 가장 커요.",
        "uz": "Koreyada Seul eng katta (가장)."
      }
    ],
    "quiz": [
      {
        "prompt": "'Olma apelsindan ko'ra shirin' qanday aytiladi?",
        "options": [
          "사과가 오렌지보다 달아요",
          "사과가 오렌지에서 달아요",
          "사과가 오렌지부터 달아요"
        ],
        "correctIndex": 0,
        "explain": "Taqqoslashda -보다 qo'shiladi: 오렌지보다 (apelsindan ko'ra)."
      },
      {
        "prompt": "Koreys tilida 'eng' so'zi qanday aytiladi?",
        "options": [
          "많이",
          "가장 (제일)",
          "아주"
        ],
        "correctIndex": 1,
        "explain": "Eng oliy darajani bildirish uchun 가장 yoki 제일 ishlatiladi."
      },
      {
        "prompt": "'-보다' qo'shimchasida patchim ahamiyatlimi?",
        "options": [
          "Ha, patchimga qarab o'zgaradi",
          "Yo'q, har qanday otga to'g'ridan-to'g'ri qo'shiladi"
        ],
        "correctIndex": 1,
        "explain": "-보다 har doim to'g'ridan-to'g'ri o'zgarmasdan qo'shiladi."
      }
    ]
  },
  {
    "id": 28,
    "title": "-(으)ㄹ 때 / -(으)ㄹ 수 있다/없다",
    "icon": "⏳",
    "rule": "1) -(으)ㄹ 때: '...ganda / ...gan vaqtda' degan payt ma'nosini bildiradi. Patchim bo'lsa -을 때, patchim bo'lmasa -ㄹ 때. ⚠️ 'ㄹ' istisnosi: Ildizi 'ㄹ' bilan tugagan fe'llarga '-을 때' emas, to'g'ridan-to'g'ri 'ㄹ 때' qo'shiladi: 살다 -> 살 때 (yashagan vaqtda), 만들다 -> 만들 때 (tayyorlaganda). 2) -(으)ㄹ 수 있다 / 없다: '...qila olmoq' (qobiliyat yoki imkoniyat bor) yoki '...qila olmaslik'. 'ㄹ' bilan tugagan fe'llarga to'g'ridan-to'g'ri 'ㄹ 수 있다' qo'shiladi: 살 수 있어요, 만들 수 있어요.",
    "formula": "Vaqt: -(으)ㄹ 때 | Imkoniyat: -(으)ㄹ 수 있다/없다 | 'ㄹ' istisnosi: 살 때, 살 수 있어요",
    "examples": [
      {
        "kr": "밥을 먹을 때 전화를 받았어요.",
        "uz": "Ovqat yeyotganimda telefon bo'ldi (-(으)ㄹ 때)."
      },
      {
        "kr": "저는 한국어를 할 수 있어요.",
        "uz": "Men koreyscha gapira olaman (-(으)ㄹ 수 있다)."
      },
      {
        "kr": "매운 음식을 먹을 수 없어요.",
        "uz": "Achchiq ovqat yeya olmayman (-(으)ㄹ 수 없다)."
      }
    ],
    "quiz": [
      {
        "prompt": "'Bo'sh vaqtim bo'lganda musiqa eshitaman' qanday yoziladi?",
        "options": [
          "시간이 있을 때 음악을 들어요",
          "시간이 있어서 음악을 들어요",
          "시간이 있지만 음악을 들어요"
        ],
        "correctIndex": 0,
        "explain": "Payt bildirish: 있다 + 을 때 -> 있을 때."
      },
      {
        "prompt": "'Suzishni bilaman (suza olaman)' qanday aytiladi?",
        "options": [
          "수영할 수 있어요",
          "수영할 수 없어요",
          "수영해야 해요"
        ],
        "correctIndex": 0,
        "explain": "Qobiliyat borligi: 수영하다 + ㄹ 수 있어요 -> 수영할 수 있어요."
      },
      {
        "prompt": "'Haydovchilik guvohnomam yo'qligi sababli mashina hayday olmayman' qaysi biri?",
        "options": [
          "운전할 수 있어요",
          "운전할 수 없어요",
          "운전하려고 해요"
        ],
        "correctIndex": 1,
        "explain": "Imkoniyat yo'qligi: 운전할 수 없어요."
      },
      {
        "prompt": "'살다' (yashamoq) fe'liga 'yashagan vaqtda' qanday aytiladi?",
        "options": [
          "살을 때",
          "살 때",
          "살 때에"
        ],
        "correctIndex": 1,
        "explain": "'ㄹ' bilan tugagan fe'llarga to'g'ridan-to'g'ri 'ㄹ 때' qo'shiladi: 살 때."
      }
    ]
  }
];
