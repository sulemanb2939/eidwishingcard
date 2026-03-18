// =============================================
//  EID CARD GENERATOR — DATA LAYER
// =============================================

const TEMPLATES = [
  // ===== MINIMAL =====
  {
    id: 1, name: "Golden Noor", category: "minimal",
    emoji: "🌙", accent: "#c8941a",
    elements: ["moon","stars"], animation: "fade", font: "serif",
    desc: "Warm gold & white elegance"
  },
  {
    id: 2, name: "Moon Light", category: "minimal",
    emoji: "🌕", accent: "#3456a5",
    elements: ["crescent","glow"], animation: "scale", font: "modern",
    desc: "Soft moonlit serenity"
  },
  {
    id: 3, name: "Elegant Eid", category: "minimal",
    emoji: "🏮", accent: "#7a4a1a",
    elements: ["lantern"], animation: "fade-up", font: "serif",
    desc: "Timeless beige & brown"
  },
  {
    id: 4, name: "Soft Blessings", category: "minimal",
    emoji: "⭐", accent: "#d4a800",
    elements: ["stars"], animation: "fade", font: "calligraphy",
    desc: "Cream & gold softness"
  },
  {
    id: 5, name: "Peaceful Eid", category: "minimal",
    emoji: "☀️", accent: "#b8860b",
    elements: ["moon"], animation: "slow-fade", font: "serif",
    desc: "Gentle light gold warmth"
  },

  // ===== ISLAMIC =====
  {
    id: 6, name: "Masjid Noor", category: "islamic",
    emoji: "🕌", accent: "#ffd700",
    elements: ["mosque","moon"], animation: "glow", font: "urdu",
    desc: "Deep green mosque glow"
  },
  {
    id: 7, name: "Ramzan Lights", category: "islamic",
    emoji: "🪔", accent: "#ffd700",
    elements: ["lantern","stars"], animation: "twinkle", font: "urdu",
    desc: "Blue night lantern magic"
  },
  {
    id: 8, name: "Eid Night Sky", category: "islamic",
    emoji: "🌟", accent: "#ffd700",
    elements: ["crescent","stars"], animation: "floating", font: "modern",
    desc: "Stars fill the dark sky"
  },
  {
    id: 9, name: "Noor-e-Masjid", category: "islamic",
    emoji: "✨", accent: "#ffd700",
    elements: ["mosque","light"], animation: "glow", font: "urdu",
    desc: "Emerald mosque radiance"
  },
  {
    id: 10, name: "Lantern Glow", category: "islamic",
    emoji: "🏮", accent: "#ffd700",
    elements: ["lantern"], animation: "pulse", font: "serif",
    desc: "Deep blue lantern warmth"
  },
  {
    id: 11, name: "Crescent Dreams", category: "islamic",
    emoji: "🌙", accent: "#c0a060",
    elements: ["moon"], animation: "float", font: "modern",
    desc: "Navy blue crescent night"
  },
  {
    id: 12, name: "Blessed Night", category: "islamic",
    emoji: "💫", accent: "#ffd700",
    elements: ["stars"], animation: "sparkle", font: "urdu",
    desc: "Black & gold splendor"
  },
  {
    id: 13, name: "Sacred Eid", category: "islamic",
    emoji: "🕌", accent: "#ffd700",
    elements: ["mosque"], animation: "fade", font: "calligraphy",
    desc: "Green & gold sacred art"
  },

  // ===== DARK PREMIUM =====
  {
    id: 14, name: "Royal Black", category: "dark",
    emoji: "👑", accent: "#ffd700",
    elements: ["moon"], animation: "glow", font: "serif",
    desc: "Opulent black & gold"
  },
  {
    id: 15, name: "Dark Luxury", category: "dark",
    emoji: "💜", accent: "#c8a0ff",
    elements: ["stars"], animation: "fade", font: "modern",
    desc: "Deep purple luxury"
  },
  {
    id: 16, name: "Midnight Eid", category: "dark",
    emoji: "🌌", accent: "#6090ff",
    elements: ["moon"], animation: "float", font: "serif",
    desc: "Midnight blue cosmos"
  },
  {
    id: 17, name: "Premium Gold", category: "dark",
    emoji: "✨", accent: "#ffd700",
    elements: ["gold light"], animation: "pulse", font: "calligraphy",
    desc: "Pure black & gold prestige"
  },
  {
    id: 18, name: "Luxury Night", category: "dark",
    emoji: "🔮", accent: "#d4af37",
    elements: ["stars"], animation: "twinkle", font: "modern",
    desc: "Charcoal & champagne gold"
  },

  // ===== FLORAL =====
  {
    id: 19, name: "Floral Blessings", category: "floral",
    emoji: "🌸", accent: "#c2185b",
    elements: ["flowers"], animation: "fade", font: "soft",
    desc: "Pink petals & white blooms"
  },
  {
    id: 20, name: "Rose Eid", category: "floral",
    emoji: "🌹", accent: "#ffb0c8",
    elements: ["petals"], animation: "fall", font: "calligraphy",
    desc: "Rich rose & warm crimson"
  },
  {
    id: 21, name: "Spring Eid", category: "floral",
    emoji: "🌿", accent: "#2e7d32",
    elements: ["flowers"], animation: "float", font: "modern",
    desc: "Fresh spring garden"
  },

  // ===== KIDS / FUN =====
  {
    id: 22, name: "Kids Fun", category: "kids",
    emoji: "🎈", accent: "#fff",
    elements: ["balloons"], animation: "bounce", font: "fun",
    desc: "Colorful fiesta"
  },
  {
    id: 23, name: "Happy Eid Kids", category: "kids",
    emoji: "⭐", accent: "#3d2c00",
    elements: ["stars"], animation: "jump", font: "comic",
    desc: "Bright yellow sunshine"
  },
  {
    id: 24, name: "Cartoon Eid", category: "kids",
    emoji: "🌤️", accent: "#1a3a6a",
    elements: ["moon"], animation: "bounce", font: "fun",
    desc: "Cartoon sunny sky"
  },
  {
    id: 25, name: "Joyful Eid", category: "kids",
    emoji: "🎉", accent: "#fff",
    elements: ["confetti"], animation: "explode", font: "fun",
    desc: "Rainbow explosion joy"
  }
];

// =============================================
//  SMS MESSAGES — 50 URDU MESSAGES
// =============================================
const SMS_MESSAGES = [
  "آپ کو اور آپ کے اہل خانہ کو دل کی گہرائیوں سے عید مبارک، اللہ آپ کی زندگی کو خوشیوں سے بھر دے۔",
  "اللہ کرے یہ عید آپ کے لیے رحمتوں، برکتوں اور خوشیوں کا پیغام لے کر آئے۔",
  "آپ کی زندگی میں ہمیشہ خوشیوں کا نور قائم رہے، عید مبارک۔",
  "اللہ آپ کی ہر دعا قبول فرمائے اور ہر مشکل آسان کرے۔",
  "عید کا یہ دن آپ کے دل کو سکون اور خوشی سے بھر دے۔",
  "آپ کے گھر میں ہمیشہ خوشیوں کی بہار رہے، عید مبارک۔",
  "اللہ آپ کو صحت، کامیابی اور خوشیاں عطا فرمائے۔",
  "آپ کی زندگی میں کبھی غم نہ آئے، صرف خوشیاں ہی خوشیاں ہوں۔",
  "اللہ آپ کو دنیا اور آخرت دونوں میں کامیابی دے۔",
  "آپ کی ہر خواہش پوری ہو، عید مبارک۔",
  "آپ کو اور آپ کے اہل خانہ کو دل کی گہرائیوں سے عید مبارک، اللہ آپ کی زندگی کو بے شمار خوشیوں سے بھر دے۔ اللہ کرے یہ مبارک دن آپ کے لیے رحمت، سکون اور کامیابیوں کا ذریعہ بنے۔",
  "عید کے اس خوبصورت موقع پر دعا ہے کہ اللہ آپ کی ہر پریشانی دور فرمائے اور دل کو سکون عطا کرے۔ آپ کی زندگی ہمیشہ خوشیوں اور آسانیوں سے بھرپور رہے، عید مبارک۔",
  "اللہ تعالیٰ آپ کو اور آپ کے پیاروں کو اپنی خاص رحمتوں میں جگہ دے اور ہر مشکل کو آسان بنائے۔ یہ عید آپ کے لیے ڈھیروں خوشیاں اور کامیابیاں لے کر آئے۔",
  "عید کا دن خوشیوں کا پیغام لے کر آتا ہے، دعا ہے کہ یہ خوشیاں ہمیشہ آپ کے ساتھ رہیں۔ اللہ آپ کی زندگی کو محبت، سکون اور برکتوں سے بھر دے۔",
  "آپ کی ہر دعا قبول ہو اور ہر خواب حقیقت میں بدل جائے، یہی دعا ہے اس عید پر۔ اللہ آپ کو ہمیشہ خوش رکھے اور کامیاب کرے، عید مبارک۔",
  "اس مبارک دن پر اللہ آپ کے دل کی ہر مراد پوری کرے اور زندگی میں آسانیاں عطا فرمائے۔ آپ کی دنیا ہمیشہ خوشیوں سے روشن رہے۔",
  "عید کی خوشیاں آپ کے دل کو ہمیشہ کے لیے منور کر دیں اور غموں کا خاتمہ ہو جائے۔ اللہ آپ کو صحت، خوشی اور کامیابی عطا فرمائے۔",
  "دعا ہے کہ اللہ آپ کے گھر کو ہمیشہ خوشیوں کا گہوارہ بنائے رکھے۔ یہ عید آپ کے لیے نئی امیدیں اور نئی خوشیاں لے کر آئے۔",
  "اللہ کرے آپ کی زندگی میں کبھی کوئی دکھ نہ آئے اور ہر دن خوشیوں سے بھرپور ہو۔ عید مبارک، اللہ آپ کو ہمیشہ اپنی امان میں رکھے۔",
  "اس عید پر اللہ آپ کی ہر مشکل آسان کرے اور آپ کے دل کو سکون عطا کرے۔ آپ کی زندگی ہمیشہ کامیابیوں سے سجی رہے۔",
  "عید کا دن آپ کے لیے خوشیوں، محبتوں اور برکتوں کا خزانہ لے کر آئے۔ اللہ آپ کو ہر قدم پر کامیابی عطا فرمائے۔",
  "اللہ آپ کی زندگی کے ہر اندھیرے کو روشنی میں بدل دے اور ہر غم کو خوشی میں۔ عید مبارک، ہمیشہ خوش رہیں۔",
  "آپ کے چہرے کی مسکراہٹ ہمیشہ قائم رہے اور دل کبھی اداس نہ ہو۔ اللہ آپ کو دنیا و آخرت کی کامیابیاں عطا فرمائے۔",
  "عید کے اس پرمسرت موقع پر دعا ہے کہ اللہ آپ کو بے پناہ خوشیاں عطا فرمائے۔ آپ کی زندگی سکون اور محبت سے بھر جائے۔",
  "اللہ آپ کے دل کی ہر خواہش پوری کرے اور آپ کو کامیابیوں کی بلندیوں تک پہنچائے۔ عید مبارک، ہمیشہ خوش رہیں۔",
  "دعا ہے کہ یہ عید آپ کے لیے رحمتوں اور برکتوں کا سبب بنے۔ آپ کی زندگی ہمیشہ خوشیوں سے جگمگاتی رہے۔",
  "اللہ آپ کے ہر دکھ کو خوشی میں بدل دے اور ہر پریشانی کو آسانی میں۔ عید مبارک، اللہ آپ کو سلامت رکھے۔",
  "آپ کے گھر میں ہمیشہ خوشیوں کی بہار رہے اور محبتوں کا چراغ جلتا رہے۔ یہ عید آپ کے لیے خاص خوشیاں لے کر آئے۔",
  "اللہ آپ کو صحت، عزت اور کامیابی عطا فرمائے اور ہمیشہ خوش رکھے۔ عید مبارک، آپ کا ہر دن خوشیوں بھرا ہو۔",
  "عید کی خوشیاں آپ کی زندگی کو روشن کر دیں اور ہر غم دور ہو جائے۔ اللہ آپ کو اپنی رحمتوں میں جگہ دے۔",
  "اللہ کرے آپ کی زندگی ہمیشہ کامیابیوں اور خوشیوں سے بھرپور رہے۔ عید مبارک، آپ ہمیشہ مسکراتے رہیں۔",
  "اس عید پر اللہ آپ کو وہ سب کچھ دے جس کی آپ تمنا رکھتے ہیں۔ آپ کی زندگی خوشیوں سے بھر جائے۔",
  "دعا ہے کہ اللہ آپ کے نصیب کو روشن کرے اور ہر راستہ آسان بنائے۔ عید مبارک، ہمیشہ کامیاب رہیں۔",
  "عید کا یہ دن آپ کے لیے خوشیوں کی نئی روشنی لے کر آئے۔ اللہ آپ کو ہر غم سے محفوظ رکھے۔",
  "اللہ آپ کی زندگی کو سکون، محبت اور خوشیوں سے بھر دے۔ عید مبارک، ہمیشہ خوش رہیں۔",
  "آپ کے ہر دن میں خوشیوں کی بہار ہو اور دل ہمیشہ مطمئن رہے۔ یہ عید آپ کے لیے خوشیوں کا پیغام ہو۔",
  "اللہ آپ کی ہر دعا قبول فرمائے اور آپ کو کامیابی عطا کرے۔ عید مبارک، خوشیاں آپ کے قدم چومیں۔",
  "اس عید پر دعا ہے کہ اللہ آپ کو بے شمار خوشیاں عطا فرمائے۔ آپ کی زندگی ہمیشہ خوشیوں سے بھرپور رہے۔",
  "اللہ آپ کے دل کو سکون اور زندگی کو آسانیوں سے بھر دے۔ عید مبارک، ہمیشہ خوش رہیں۔",
  "عید کا یہ دن آپ کے لیے محبتوں اور خوشیوں کا پیغام لائے۔ اللہ آپ کو ہر دکھ سے محفوظ رکھے۔",
  "دعا ہے کہ اللہ آپ کی زندگی کو کامیابیوں سے بھر دے۔ عید مبارک، خوشیاں ہمیشہ ساتھ رہیں۔",
  "اللہ آپ کے گھر کو خوشیوں سے بھر دے اور ہر غم دور کرے۔ عید مبارک، آپ ہمیشہ مسکراتے رہیں۔",
  "عید کے اس موقع پر اللہ آپ کی ہر خواہش پوری کرے۔ آپ کی زندگی خوشیوں سے بھر جائے۔",
  "اللہ آپ کو دنیا اور آخرت کی کامیابیاں عطا فرمائے۔ عید مبارک، ہمیشہ خوش رہیں۔",
  "دعا ہے کہ اللہ آپ کو سکون اور خوشی عطا فرمائے۔ یہ عید آپ کے لیے خاص ہو۔",
  "اللہ آپ کی زندگی کو محبت اور خوشیوں سے بھر دے۔ عید مبارک، خوش رہیں۔",
  "عید کا دن آپ کے لیے رحمتوں کا خزانہ لے کر آئے۔ اللہ آپ کو کامیابی دے۔",
  "اللہ آپ کے ہر دکھ کو خوشی میں بدل دے۔ عید مبارک، ہمیشہ خوش رہیں۔",
  "دعا ہے کہ اللہ آپ کو ہمیشہ اپنی حفاظت میں رکھے۔ عید مبارک، کامیاب رہیں۔",
  "اللہ آپ کی زندگی کو روشن کرے اور ہر مشکل آسان بنائے۔ عید مبارک، خوشیاں نصیب ہوں۔",
  "عید کی خوشیاں آپ کے دل کو سکون دیں۔ اللہ آپ کو ہمیشہ خوش رکھے، عید مبارک! 🌙✨"
];
