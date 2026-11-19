/* ==========================================================================
   إدارة الحالة، الكشف التلقائي للغة، والتخزين المحلي (app.js)
   ========================================================================== */

function detectDeviceLanguage() {
  const saved = localStorage.getItem("userLang");
  if (saved) return saved;

  const rawLang = (navigator.languages && navigator.languages[0]) || navigator.language || "ar";
  const prefix = rawLang.toLowerCase().slice(0, 2);

  const langMap = {
    ar: "العربية",
    en: "English",
    ur: "اردو",
    fr: "Français",
    de: "Deutsch",
    ru: "Русский",
    es: "Español",
    hi: "हिन्दी",
    id: "Indonesia",
    in: "Indonesia"
  };

  return langMap[prefix] || "العربية";
}

let currentLang = detectDeviceLanguage();

function t(key, alt) {
  if (typeof uiMap !== "undefined" && uiMap[key] && uiMap[key][currentLang]) {
    return uiMap[key][currentLang];
  }
  return alt || key;
}

let currentStep = 0;
let userAccent = localStorage.getItem("userAccent") || "#0284C7";
let currentThemeMode = localStorage.getItem("themeMode") || "auto";
let currentFont = localStorage.getItem("userFontSize") || "medium";

// أحجام النصوص المخصصة لكل عنصر على حدة (القيم الافتراضية المبدئية المتدرجة)
let customTextScales = JSON.parse(localStorage.getItem("customTextScales")) || {
  active: false,
  arabic: 1.95,
  translit: 1.15,
  trans: 1.45
};

// خيارات إظهار نصوص الدليل
let textVisibility = {
  arabic: localStorage.getItem("vis_arabic") !== "false",
  translit: localStorage.getItem("vis_translit") !== "false",
  translation: localStorage.getItem("vis_translation") !== "false"
};

// إعدادات التنقل ومواضع الأزرار
const DEFAULT_BTN_POS = {
  x: 75,
  y: 74,
  scale: 1.0,
  opacity: 0.9,
  prevX: 28,
  prevY: 74,
  nextX: 72,
  nextY: 74
};

function normalizePosObj(obj) {
  const base = obj || {};
  return {
    x: typeof base.x === "number" ? base.x : DEFAULT_BTN_POS.x,
    y: typeof base.y === "number" ? base.y : DEFAULT_BTN_POS.y,
    scale: typeof base.scale === "number" ? base.scale : DEFAULT_BTN_POS.scale,
    opacity: typeof base.opacity === "number" ? base.opacity : DEFAULT_BTN_POS.opacity,
    prevX: typeof base.prevX === "number" ? base.prevX : DEFAULT_BTN_POS.prevX,
    prevY: typeof base.prevY === "number" ? base.prevY : DEFAULT_BTN_POS.prevY,
    nextX: typeof base.nextX === "number" ? base.nextX : DEFAULT_BTN_POS.nextX,
    nextY: typeof base.nextY === "number" ? base.nextY : DEFAULT_BTN_POS.nextY
  };
}

let savedCustomPositions = JSON.parse(localStorage.getItem("nav_customPositions")) || {};
let savedGlobalPosition = JSON.parse(localStorage.getItem("nav_globalPosition")) || DEFAULT_BTN_POS;

let navConfig = {
  swipe: localStorage.getItem("nav_swipe") !== "false",
  shake: localStorage.getItem("nav_shake") === "true",
  voice: localStorage.getItem("nav_voice") === "true",
  buttons: localStorage.getItem("nav_buttons") === "true",
  autoEndTasleem: localStorage.getItem("nav_autoEndTasleem") !== "false",
  buttonLayout: localStorage.getItem("nav_btnLayout") || "single",
  buttonSize: localStorage.getItem("nav_btnSize") || "medium",
  isPerStepPosActive: localStorage.getItem("nav_isPerStepPosActive") === "true",
  lockDualButtons: localStorage.getItem("nav_lockDualButtons") !== "false",
  customPositions: {
    0: normalizePosObj(savedCustomPositions[0]),
    1: normalizePosObj(savedCustomPositions[1]),
    2: normalizePosObj(savedCustomPositions[2]),
    3: normalizePosObj(savedCustomPositions[3])
  },
  globalPosition: normalizePosObj(savedGlobalPosition),
  isFreePosActive: localStorage.getItem("nav_isFreeActive") === "true"
};

// حالات التخصيص الحي (الأزرار والنصوص)
let isLiveCustomizing = false;
let isLiveTextCustomizing = false;

// حالة جلسة الصلاة، Wake Lock، والحماية من الخروج الخاطئ
let isPrayerActive = false;
let screenWakeLock = null;
let exitConfirmPending = false;
let exitConfirmTimer = null;
let pendingTabAfterExit = null;

// مستشعر الاهتزاز (الحد الأدنى 9 وحتى 25)
let speechRecognizer = null;
let lastShakeTime = 0;
let shakeSensorBound = false;
let shakeMotionThreshold = Math.max(9, Math.min(25, parseInt(localStorage.getItem("nav_shakeThreshold"), 10) || 13));
let shakeCoolDownActive = false;
let isTouchingScreen = false;

// التقليب باللمس
let swipeStartX = null;
let swipeStartY = null;
let extraSwipeCount = 0;

// التعرف الصوتي (Debounce 1.5 ثانية مع مطابقة النتائج النهائية المؤكدة فقط)
let lastVoiceCommandTime = 0;
const VOICE_DEBOUNCE_DELAY = 1500;

// السبحة الإلكترونية المبتكرة وقائمة أهدافي
let tasbeehCount = parseInt(localStorage.getItem("tasbeeh_count"), 10) || 0;
let tasbeehTarget = parseInt(localStorage.getItem("tasbeeh_target"), 10) || 0;
let tasbeehMode = localStorage.getItem("tasbeeh_mode") || (tasbeehTarget > 0 ? "custom" : "free");
let tasbeehActiveDhikr = localStorage.getItem("tasbeeh_active_dhikr") || "";
let tasbeehActiveGoalId = localStorage.getItem("tasbeeh_active_goal_id") || null;
let tasbeehMyGoals = JSON.parse(localStorage.getItem("tasbeeh_my_goals")) || [];
let tasbeehGoalCompletedFlag = false;
let tasbeehHaptic = localStorage.getItem("tasbeeh_haptic") !== "false";
let tasbeehRingSize = parseInt(localStorage.getItem("tasbeeh_ring_size"), 10) || 200;

/* ==========================================================================
   1. المظهر التلقائي الحي والخطوط والألوان (Live Auto-Theme & Scales)
   ========================================================================== */
function applyTheme() {
  let isDark = false;
  if (currentThemeMode === "auto") {
    isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  } else if (currentThemeMode === "dark") {
    isDark = true;
  } else {
    isDark = false;
  }

  if (isDark) {
    document.body.classList.add("dark");
    document.body.classList.remove("light");
  } else {
    document.body.classList.add("light");
    document.body.classList.remove("dark");
  }

  document.querySelectorAll(".theme-btn").forEach(btn => {
    if (btn.dataset.theme === currentThemeMode) btn.classList.add("active");
    else btn.classList.remove("active");
  });
}

function initThemeSystemListener() {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleChange = () => {
    if (currentThemeMode === "auto") {
      applyTheme();
    }
  };

  if (typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", handleChange);
  } else if (typeof mediaQuery.addListener === "function") {
    mediaQuery.addListener(handleChange);
  }
}

function setThemeMode(mode, save = true) {
  currentThemeMode = mode;
  applyTheme();
  if (save) localStorage.setItem("themeMode", mode);
}

function applyFontScale() {
  document.documentElement.setAttribute("data-font", currentFont);

  if (!customTextScales.active) {
    const presetMap = {
      small: { arabic: 1.25, translit: 0.85, trans: 0.90 },
      medium: { arabic: 1.55, translit: 0.95, trans: 1.05 },
      large: { arabic: 1.95, translit: 1.15, trans: 1.45 },
      huge: { arabic: 2.45, translit: 1.35, trans: 1.65 }
    };
    const p = presetMap[currentFont] || presetMap.medium;
    customTextScales.arabic = p.arabic;
    customTextScales.translit = p.translit;
    customTextScales.trans = p.trans;
    document.documentElement.style.removeProperty("--dua-arabic-size");
    document.documentElement.style.removeProperty("--dua-translit-size");
    document.documentElement.style.removeProperty("--dua-trans-size");
  } else {
    applyCustomTextVariables();
  }

  document.querySelectorAll(".font-btn").forEach(btn => {
    if (btn.dataset.font === currentFont) btn.classList.add("active");
    else btn.classList.remove("active");
  });
}

function applyCustomTextVariables() {
  document.documentElement.style.setProperty("--dua-arabic-size", `${customTextScales.arabic}rem`);
  document.documentElement.style.setProperty("--dua-translit-size", `${customTextScales.translit}rem`);
  document.documentElement.style.setProperty("--dua-trans-size", `${customTextScales.trans}rem`);
}

function setAccentColor(hex, save = true) {
  userAccent = hex;
  document.documentElement.style.setProperty("--accent", hex);
  const [r, g, b] = [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16)
  ];
  document.documentElement.style.setProperty("--accent-rgb", `${r}, ${g}, ${b}`);
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) metaTheme.setAttribute("content", hex);
  if (save) localStorage.setItem("userAccent", hex);
  updateUI();
}

function updateDirection() {
  const langObj = languages.find(l => l.code === currentLang);
  const dir = langObj ? langObj.dir : "rtl";
  document.documentElement.setAttribute("dir", dir);
  document.documentElement.setAttribute("lang", currentLang === "العربية" ? "ar" : "en");
}

/* ==========================================================================
   2. منع قفل الشاشة (Screen Wake Lock) والاهتزاز التفاعلي المباشر
   ========================================================================== */
async function requestPrayerWakeLock() {
  if ("wakeLock" in navigator) {
    try {
      screenWakeLock = await navigator.wakeLock.request("screen");
      screenWakeLock.addEventListener("release", () => {
        screenWakeLock = null;
      });
    } catch (err) {
      console.log("WakeLock notice:", err);
    }
  }
}

async function releasePrayerWakeLock() {
  if (screenWakeLock !== null) {
    try {
      await screenWakeLock.release();
      screenWakeLock = null;
    } catch (err) {
      console.log("WakeLock release notice:", err);
    }
  }
}

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && isPrayerActive) {
    requestPrayerWakeLock();
  }
});

function triggerPrayerVibration(pattern) {
  if ("vibrate" in navigator) {
    try {
      navigator.vibrate(pattern);
    } catch (e) {}
  }
}

/* ==========================================================================
   3. إلزامية وسيلة تقليب واحدة على الأقل
   ========================================================================== */
function showToastAlert(msg) {
  const toast = document.getElementById("navAlertToast");
  if (!toast) return;
  toast.innerText = msg;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

function showNavRequirementAlert() {
  showToastAlert(t("mustKeepOneNav", "يجب تفعيل طريقة تقليب واحدة على الأقل لضمان عمل الدليل"));
}

function toggleNavOption(key, checked) {
  if (!checked) {
    const activeCount = ["swipe", "shake", "voice", "buttons"].filter(k => navConfig[k]).length;
    if (activeCount <= 1 && navConfig[key]) {
      const checkbox = document.getElementById(`chk${key.charAt(0).toUpperCase() + key.slice(1)}`);
      if (checkbox) checkbox.checked = true;
      showNavRequirementAlert();
      return;
    }
  }

  navConfig[key] = checked;
  localStorage.setItem(`nav_${key}`, checked);

  if (key === "voice") {
    const row = document.getElementById("autoEndTasleemRow");
    if (row) row.style.display = checked ? "flex" : "none";
    if (!checked && isPrayerActive) stopVoiceRecognition();
    if (checked && isPrayerActive) startVoiceRecognition();
  }

  if (key === "shake") {
    const row = document.getElementById("shakeSensitivityRow");
    if (row) row.style.display = checked ? "block" : "none";
    if (!checked) stopShakeSensor();
    if (checked && isPrayerActive) initShakeSensor();
  }

  if (key === "buttons") {
    const wrapper = document.getElementById("btnCustomizeWrapper");
    if (wrapper) wrapper.style.display = checked ? "block" : "none";
    renderOnScreenControls();
  }
}

/* ==========================================================================
   4. بناء بطاقات الدليل وإدارة ظهور النصوص وأحجامها الحية (الموحدة)
   ========================================================================== */
function buildSlides() {
  const track = document.getElementById("swipeTrack");
  if (!track) return;
  track.innerHTML = "";

  const isArabicLang = currentLang === "العربية";
  const showArabic = isArabicLang ? true : textVisibility.arabic;
  const showTranslit = !isArabicLang && textVisibility.translit;
  const showTrans = !isArabicLang && textVisibility.translation;

  stepsData.forEach((step, idx) => {
    const slide = document.createElement("div");
    slide.className = "swipe-slide";
    const translation = step.translations[currentLang] || step.translations["English"];
    const title = step.title[currentLang] || step.title["العربية"];

    slide.innerHTML = `
      <div class="dua-card">
        <div class="dua-header">
          <div class="dua-header-icon">${step.icon}</div>
          <div style="flex:1; min-width:0;">
            <div class="dua-header-title">${title}</div>
            <div class="dua-header-subtitle">(${idx + 1} / 4)</div>
          </div>
        </div>
        <div class="dua-body">
          ${showArabic ? `<div class="arabic-text" dir="rtl">${step.arabic}</div>` : ""}
          ${showTranslit ? `<div class="transliteration">${step.translit}</div>` : ""}
          ${showTrans ? `<div class="translation">${translation}</div>` : ""}
        </div>
      </div>
    `;
    track.appendChild(slide);
  });
  updateTrackPosition();
}

function updateTrackPosition() {
  const track = document.getElementById("swipeTrack");
  if (track) {
    const isRtl = document.documentElement.getAttribute("dir") === "rtl";
    const multiplier = isRtl ? 1 : -1;
    track.style.transform = `translate3d(${multiplier * currentStep * 100}%, 0, 0)`;
  }
}

function updateProgressBar() {
  const container = document.getElementById("progressContainer");
  if (!container) return;
  container.innerHTML = "";
  stepsData.forEach((_, idx) => {
    const seg = document.createElement("div");
    seg.className = "prog-segment";
    const fill = document.createElement("div");
    fill.className = "prog-fill";
    if (idx <= currentStep) fill.style.width = "100%";
    seg.appendChild(fill);
    container.appendChild(seg);
  });
}

function goToStep(newStep) {
  if (newStep < 0 || newStep >= stepsData.length) return;
  currentStep = newStep;
  extraSwipeCount = 0;

  if (isPrayerActive && !isLiveCustomizing && !isLiveTextCustomizing) {
    triggerPrayerVibration(35);
  }

  updateTrackPosition();
  updateProgressBar();
  renderOnScreenControls();

  if (isLiveCustomizing) {
    updateLiveCustomizerBadge();
    updateLiveCustomizerSliders();
  }
}

/* نافذة التخصيص الموحدة للخطوط ونصوص الدليل في اللغات غير العربية */
function openUnifiedGuideTextCustomizer() {
  if (isLiveCustomizing) {
    isLiveCustomizing = false;
    document.getElementById("liveCustomizerToolbar").style.display = "none";
  }

  if (!customTextScales.active) {
    customTextScales.arabic = 1.95;
    customTextScales.translit = 1.15;
    customTextScales.trans = 1.45;
    applyCustomTextVariables();
  }

  switchTab("guide");
  if (!isPrayerActive) {
    startPrayerSession(true);
  }

  isLiveTextCustomizing = true;
  const toolbar = document.getElementById("liveTextCustomizerToolbar");
  if (toolbar) {
    toolbar.style.display = "block";
    toolbar.style.top = "52px";
    toolbar.style.left = "50%";
    toolbar.style.transform = "translateX(-50%)";
  }

  syncTextCustomizerControls();
}

function toggleGuideTextVisibility(key) {
  const nextVal = !textVisibility[key];
  if (!nextVal) {
    const visibleCount = ["arabic", "translit", "translation"].filter(k => textVisibility[k]).length;
    if (visibleCount <= 1 && textVisibility[key]) {
      showToastAlert(t("mustKeepOneTextAlert", "يجب إبقاء لغة واحدة على الأقل ظاهرة لضمان عمل الدليل"));
      return;
    }
  }

  textVisibility[key] = nextVal;
  localStorage.setItem(`vis_${key}`, nextVal);
  buildSlides();
  syncTextCustomizerControls();
}

function syncTextCustomizerControls() {
  const btnAr = document.getElementById("btnToggleVisArabic");
  const btnTrl = document.getElementById("btnToggleVisTranslit");
  const btnTrn = document.getElementById("btnToggleVisTrans");

  if (btnAr) {
    btnAr.classList.toggle("active", textVisibility.arabic);
    btnAr.innerText = `${textVisibility.arabic ? "✓ " : ""}${t("arabicScript", "النص العربي")}`;
  }
  if (btnTrl) {
    btnTrl.classList.toggle("active", textVisibility.translit);
    btnTrl.innerText = `${textVisibility.translit ? "✓ " : ""}${t("translitScript", "النطق اللاتيني")}`;
  }
  if (btnTrn) {
    btnTrn.classList.toggle("active", textVisibility.translation);
    btnTrn.innerText = `${textVisibility.translation ? "✓ " : ""}${t("meaningTrans", "الترجمة")}`;
  }

  // الإخفاء الشرطي لصفوف منزلقات حجم النصوص عند إغلاق النص الخاص بها
  const rowAr = document.getElementById("rowCustArabicSize");
  const rowTrl = document.getElementById("rowCustTranslitSize");
  const rowTrn = document.getElementById("rowCustTransSize");

  if (rowAr) rowAr.style.display = textVisibility.arabic ? "flex" : "none";
  if (rowTrl) rowTrl.style.display = textVisibility.translit ? "flex" : "none";
  if (rowTrn) rowTrn.style.display = textVisibility.translation ? "flex" : "none";

  const rngAr = document.getElementById("rngCustArabicSize");
  const rngTrl = document.getElementById("rngCustTranslitSize");
  const rngTrn = document.getElementById("rngCustTransSize");

  if (rngAr) rngAr.value = customTextScales.arabic;
  if (rngTrl) rngTrl.value = customTextScales.translit;
  if (rngTrn) rngTrn.value = customTextScales.trans;

  const valAr = document.getElementById("valCustArabicSize");
  const valTrl = document.getElementById("valCustTranslitSize");
  const valTrn = document.getElementById("valCustTransSize");

  if (valAr) valAr.innerText = `${Number(customTextScales.arabic).toFixed(2)}rem`;
  if (valTrl) valTrl.innerText = `${Number(customTextScales.translit).toFixed(2)}rem`;
  if (valTrn) valTrn.innerText = `${Number(customTextScales.trans).toFixed(2)}rem`;
}

function updateLiveTextScale(type, val) {
  const num = parseFloat(val);
  customTextScales.active = true;
  if (type === "arabic") customTextScales.arabic = num;
  if (type === "translit") customTextScales.translit = num;
  if (type === "trans") customTextScales.trans = num;

  applyCustomTextVariables();
  syncTextCustomizerControls();
}

function resetLiveTextSizes() {
  customTextScales = {
    active: false,
    arabic: 1.95,
    translit: 1.15,
    trans: 1.45
  };
  textVisibility = {
    arabic: true,
    translit: true,
    translation: true
  };
  localStorage.removeItem("customTextScales");
  localStorage.setItem("vis_arabic", "true");
  localStorage.setItem("vis_translit", "true");
  localStorage.setItem("vis_translation", "true");

  applyCustomTextVariables();
  buildSlides();
  syncTextCustomizerControls();
}

function saveAndExitTextCustomizer() {
  isLiveTextCustomizing = false;
  const toolbar = document.getElementById("liveTextCustomizerToolbar");
  if (toolbar) toolbar.style.display = "none";

  localStorage.setItem("customTextScales", JSON.stringify(customTextScales));
  exitPrayerSession(false, true);
  switchTab("settings");
}

/* ==========================================================================
   5. مستشعر الحركة (Shake) والتعرف الصوتي الصارم والتقليب باللمس (RTL & LTR)
   ========================================================================== */
function handleDeviceMotion(event) {
  if (!isPrayerActive || !navConfig.shake || isLiveCustomizing || isLiveTextCustomizing) return;
  if (shakeCoolDownActive || isTouchingScreen) return;

  const current = Date.now();
  if (current - lastShakeTime < 1400) return;

  const acc = event.accelerationIncludingGravity || event.acceleration;
  if (!acc) return;

  const x = acc.x || 0;
  const y = acc.y || 0;
  const z = acc.z || 0;

  const magnitude = Math.sqrt(x * x + y * y + z * z);

  if (magnitude > shakeMotionThreshold) {
    lastShakeTime = current;
    if (currentStep < 3) {
      goToStep(currentStep + 1);
    } else if (navConfig.autoEndTasleem) {
      exitPrayerSession(true, true);
    }
  }
}

function initShakeSensor() {
  if (typeof DeviceMotionEvent !== "undefined") {
    if (typeof DeviceMotionEvent.requestPermission === "function") {
      DeviceMotionEvent.requestPermission()
        .then(state => {
          if (state === "granted" && !shakeSensorBound) {
            window.addEventListener("devicemotion", handleDeviceMotion, false);
            shakeSensorBound = true;
          }
        })
        .catch(console.error);
    } else {
      if (!shakeSensorBound) {
        window.addEventListener("devicemotion", handleDeviceMotion, false);
        shakeSensorBound = true;
      }
    }
  }
}

function stopShakeSensor() {
  if (shakeSensorBound) {
    window.removeEventListener("devicemotion", handleDeviceMotion, false);
    shakeSensorBound = false;
  }
}

function startVoiceRecognition() {
  if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) return;
  try {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    speechRecognizer = new SpeechRecognition();
    speechRecognizer.continuous = true;
    speechRecognizer.interimResults = false; // منع الاستجابة للنتائج المؤقتة والضوضاء العابرة
    speechRecognizer.lang = "ar-SA";

    speechRecognizer.onresult = event => {
      if (!isPrayerActive || isLiveCustomizing || isLiveTextCustomizing) return;
      const currentTime = Date.now();

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        // اشتراط أن تكون النتيجة نهائية مؤكدة فقط
        if (!event.results[i].isFinal) continue;

        const transcript = event.results[i][0].transcript
          .trim()
          .replace(/[\u064B-\u065F\u0670]/g, "")
          .replace(/[أإآ]/g, "ا")
          .toLowerCase();

        if (currentTime - lastVoiceCommandTime < VOICE_DEBOUNCE_DELAY) continue;

        // مطابقة صريحة لعبارة "الله أكبر" أو "الله اكبر"
        if (transcript.includes("الله اكبر")) {
          if (currentStep < 3) {
            lastVoiceCommandTime = currentTime;
            goToStep(currentStep + 1);
          }
          break;
        }

        // الإنهاء التلقائي عند التسليم في التكبيرة الرابعة
        if (currentStep === 3 && navConfig.autoEndTasleem) {
          if (
            transcript.includes("السلام عليكم") ||
            transcript.includes("سلام عليكم") ||
            transcript.includes("ورحمة الله")
          ) {
            lastVoiceCommandTime = currentTime;
            exitPrayerSession(true, true);
            break;
          }
        }
      }
    };

    speechRecognizer.onerror = e => {
      console.log("Voice recognizer notice:", e.error);
    };

    speechRecognizer.onend = () => {
      if (isPrayerActive && navConfig.voice && !isLiveCustomizing && !isLiveTextCustomizing) {
        try {
          speechRecognizer.start();
        } catch (err) {}
      }
    };

    speechRecognizer.start();
  } catch (err) {
    console.error("Speech recognition startup notice:", err);
  }
}

function stopVoiceRecognition() {
  if (speechRecognizer) {
    try {
      speechRecognizer.abort();
    } catch (e) {}
    speechRecognizer = null;
  }
}

function handleTouchStart(e) {
  isTouchingScreen = true;
  if (!navConfig.swipe || !isPrayerActive || isLiveCustomizing) return;
  swipeStartX = e.touches[0].clientX;
  swipeStartY = e.touches[0].clientY;
}

function handleTouchMove() {
  isTouchingScreen = true;
}

function handleTouchEnd(e) {
  setTimeout(() => {
    isTouchingScreen = false;
  }, 180);
  if (!navConfig.swipe || !isPrayerActive || swipeStartX === null || isLiveCustomizing) return;

  const diffX = e.changedTouches[0].clientX - swipeStartX;
  const diffY = e.changedTouches[0].clientY - swipeStartY;

  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
    const isRtl = document.documentElement.getAttribute("dir") === "rtl";
    const isForward = isRtl ? diffX > 0 : diffX < 0;
    const isBackward = isRtl ? diffX < 0 : diffX > 0;

    if (isForward) {
      if (currentStep < 3) {
        goToStep(currentStep + 1);
      } else {
        extraSwipeCount++;
        if (extraSwipeCount >= 1 && !isLiveTextCustomizing) {
          exitPrayerSession(true, true);
        }
      }
    } else if (isBackward) {
      if (currentStep > 0) {
        goToStep(currentStep - 1);
      }
    }
  }
  swipeStartX = null;
  swipeStartY = null;
}

/* ==========================================================================
   6. سحب الأشرطة العائمة والتخصيص الحي لأزرار الشاشة ضمن منطقة الأمان
   ========================================================================== */
function initFloatingToolbarDrag(toolbarEl, handleEl) {
  if (!toolbarEl || !handleEl) return;
  let dragging = false;
  let offsetX = 0;
  let offsetY = 0;

  handleEl.onpointerdown = e => {
    e.stopPropagation();
    dragging = true;
    const rect = toolbarEl.getBoundingClientRect();
    toolbarEl.style.transform = "none";
    toolbarEl.style.left = `${rect.left}px`;
    toolbarEl.style.top = `${rect.top}px`;
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    handleEl.setPointerCapture(e.pointerId);
  };

  handleEl.onpointermove = e => {
    if (!dragging) return;
    e.preventDefault();
    const vw = window.innerWidth || document.documentElement.clientWidth;
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const rect = toolbarEl.getBoundingClientRect();

    let nextLeft = e.clientX - offsetX;
    let nextTop = e.clientY - offsetY;

    nextLeft = Math.max(8, Math.min(vw - rect.width - 8, nextLeft));
    nextTop = Math.max(8, Math.min(vh - rect.height - 8, nextTop));

    toolbarEl.style.left = `${nextLeft}px`;
    toolbarEl.style.top = `${nextTop}px`;
  };

  handleEl.onpointerup = e => {
    if (dragging) {
      dragging = false;
      try {
        handleEl.releasePointerCapture(e.pointerId);
      } catch (err) {}
    }
  };
}

function openLiveCustomizer() {
  if (isLiveTextCustomizing) {
    isLiveTextCustomizing = false;
    document.getElementById("liveTextCustomizerToolbar").style.display = "none";
  }

  if (!navConfig.buttons) {
    navConfig.buttons = true;
    localStorage.setItem("nav_buttons", "true");
  }

  switchTab("guide");
  if (!isPrayerActive) {
    startPrayerSession(true);
  }

  isLiveCustomizing = true;
  const toolbar = document.getElementById("liveCustomizerToolbar");
  if (toolbar) {
    toolbar.style.display = "block";
    toolbar.style.top = "52px";
    toolbar.style.left = "50%";
    toolbar.style.transform = "translateX(-50%)";
  }
  document.getElementById("chkPerStepPos").checked = navConfig.isPerStepPosActive;

  const lockChk = document.getElementById("chkLockDualButtons");
  if (lockChk) lockChk.checked = navConfig.lockDualButtons;

  updateLiveCustomizerBadge();
  updateLiveLayoutButtons();

  if (!navConfig.isFreePosActive) {
    navConfig.isFreePosActive = true;
  }

  updateLiveCustomizerSliders();
  renderOnScreenControls();
}

function updateLiveCustomizerBadge() {
  const badge = document.getElementById("customizerStepBadge");
  const btnSave = document.getElementById("btnLiveCustomizerSave");
  if (badge) badge.innerText = `${t("takbeerStepLabel", "التكبيرة")} ${currentStep + 1} / 4`;

  if (btnSave) {
    if (navConfig.isPerStepPosActive && currentStep < 3) {
      btnSave.innerText = t("saveAndNextStepBtn", "حفظ والانتقال للتالية ❯");
    } else {
      btnSave.innerText = t("saveAndExitBtn", "حفظ وخروج ✓");
    }
  }
}

function updateLiveLayoutButtons() {
  const singleBtn = document.getElementById("liveBtnStyleSingle");
  const dualBtn = document.getElementById("liveBtnStyleDual");
  const dualLockRow = document.getElementById("liveDualLockRow");

  if (navConfig.buttonLayout === "single") {
    singleBtn?.classList.add("active");
    dualBtn?.classList.remove("active");
    if (dualLockRow) dualLockRow.style.display = "none";
  } else {
    dualBtn?.classList.add("active");
    singleBtn?.classList.remove("active");
    if (dualLockRow) dualLockRow.style.display = "block";
  }
}

function setLiveButtonLayout(layout) {
  navConfig.buttonLayout = layout;
  localStorage.setItem("nav_btnLayout", layout);
  updateLiveLayoutButtons();
  renderOnScreenControls();
}

function toggleDualButtonsLock(checked) {
  const cfg = getActiveButtonConfig();
  if (!checked && navConfig.lockDualButtons) {
    cfg.prevX = Math.max(12, Math.min(88, (cfg.x || 50) - 14));
    cfg.prevY = cfg.y || 74;
    cfg.nextX = Math.max(12, Math.min(88, (cfg.x || 50) + 14));
    cfg.nextY = cfg.y || 74;
  } else if (checked && !navConfig.lockDualButtons) {
    cfg.x = Math.round(((cfg.prevX || 30) + (cfg.nextX || 70)) / 2);
    cfg.y = Math.round(((cfg.prevY || 74) + (cfg.nextY || 74)) / 2);
  }

  navConfig.lockDualButtons = checked;
  localStorage.setItem("nav_lockDualButtons", checked);
  renderOnScreenControls();
}

function saveAndExitLiveCustomizer() {
  if (navConfig.isPerStepPosActive && currentStep < 3) {
    goToStep(currentStep + 1);
    return;
  }

  isLiveCustomizing = false;
  document.getElementById("liveCustomizerToolbar").style.display = "none";

  localStorage.setItem("nav_customPositions", JSON.stringify(navConfig.customPositions));
  localStorage.setItem("nav_globalPosition", JSON.stringify(navConfig.globalPosition));
  localStorage.setItem("nav_isFreeActive", navConfig.isFreePosActive);
  localStorage.setItem("nav_isPerStepPosActive", navConfig.isPerStepPosActive);
  localStorage.setItem("nav_lockDualButtons", navConfig.lockDualButtons);

  exitPrayerSession(false, true);
  switchTab("settings");
}

function resetLiveButtonCustomizer() {
  navConfig.globalPosition = { ...DEFAULT_BTN_POS };
  navConfig.customPositions = {
    0: { ...DEFAULT_BTN_POS },
    1: { ...DEFAULT_BTN_POS },
    2: { ...DEFAULT_BTN_POS },
    3: { ...DEFAULT_BTN_POS }
  };
  navConfig.isPerStepPosActive = false;
  navConfig.lockDualButtons = true;

  document.getElementById("chkPerStepPos").checked = false;
  const lockChk = document.getElementById("chkLockDualButtons");
  if (lockChk) lockChk.checked = true;

  updateLiveCustomizerBadge();
  updateLiveCustomizerSliders();
  renderOnScreenControls();
}

function togglePerStepPositioning(checked) {
  navConfig.isPerStepPosActive = checked;
  if (checked) {
    navConfig.customPositions[currentStep] = { ...navConfig.globalPosition };
  }
  updateLiveCustomizerBadge();
  updateLiveCustomizerSliders();
  renderOnScreenControls();
}

function getActiveButtonConfig() {
  return navConfig.isPerStepPosActive
    ? navConfig.customPositions[currentStep]
    : navConfig.globalPosition;
}

function updateLiveCustomizerSliders() {
  const cfg = getActiveButtonConfig();
  const scaleSlider = document.getElementById("customScaleSlider");
  const opacitySlider = document.getElementById("customOpacitySlider");

  if (scaleSlider) scaleSlider.value = cfg.scale;
  if (opacitySlider) opacitySlider.value = cfg.opacity;

  document.getElementById("scaleValLabel").innerText = `${cfg.scale}x`;
  document.getElementById("opacityValLabel").innerText = `${Math.round(cfg.opacity * 100)}%`;
}

function updateLiveButtonScale(val) {
  const cfg = getActiveButtonConfig();
  cfg.scale = parseFloat(val);
  document.getElementById("scaleValLabel").innerText = `${cfg.scale}x`;
  renderOnScreenControls();
}

function updateLiveButtonOpacity(val) {
  const cfg = getActiveButtonConfig();
  cfg.opacity = parseFloat(val);
  document.getElementById("opacityValLabel").innerText = `${Math.round(cfg.opacity * 100)}%`;
  renderOnScreenControls();
}

function renderOnScreenControls() {
  const container = document.getElementById("onScreenNavControls");
  if (!container) return;

  if (!isPrayerActive || !navConfig.buttons) {
    container.classList.remove("active");
    container.innerHTML = "";
    return;
  }

  container.innerHTML = "";
  container.className = "on-screen-nav-controls active";

  const cfg = getActiveButtonConfig();

  if (navConfig.buttonLayout === "single") {
    const btnWrapper = document.createElement("div");
    btnWrapper.className = `draggable-live-btn-wrapper ${isLiveCustomizing ? "customizing" : ""}`;
    btnWrapper.style.left = `${cfg.x}%`;
    btnWrapper.style.top = `${cfg.y}%`;
    btnWrapper.style.transform = `translate(-50%, -50%) scale(${cfg.scale})`;
    btnWrapper.style.opacity = cfg.opacity;

    if (currentStep < 3) {
      const btn = document.createElement("button");
      btn.className = "on-screen-btn btn-forward-wide";
      btn.innerHTML = `<span>${t("nextTakbeer", "التكبيرة التالية ❯")}</span>`;
      btn.onclick = e => {
        e.stopPropagation();
        if (!isLiveCustomizing) goToStep(currentStep + 1);
      };
      btnWrapper.appendChild(btn);
    } else {
      const finishBtn = document.createElement("button");
      finishBtn.className = "on-screen-btn btn-forward-wide";
      finishBtn.style.background = "#10b981";
      finishBtn.innerHTML = `<span>✓ ${t("exitPrayer", "إنهاء الصلاة")}</span>`;
      finishBtn.onclick = e => {
        e.stopPropagation();
        if (!isLiveCustomizing) exitPrayerSession(true, true);
      };
      btnWrapper.appendChild(finishBtn);
    }

    if (isLiveCustomizing) {
      initDragHandler(btnWrapper, (x, y) => {
        cfg.x = x;
        cfg.y = y;
      });
    }
    container.appendChild(btnWrapper);
  } else {
    if (navConfig.lockDualButtons) {
      const dualWrapper = document.createElement("div");
      dualWrapper.className = `draggable-live-btn-wrapper ${isLiveCustomizing ? "customizing" : ""}`;
      dualWrapper.style.left = `${cfg.x}%`;
      dualWrapper.style.top = `${cfg.y}%`;
      dualWrapper.style.transform = `translate(-50%, -50%) scale(${cfg.scale})`;
      dualWrapper.style.opacity = cfg.opacity;

      const prevBtn = document.createElement("button");
      prevBtn.className = "on-screen-btn";
      prevBtn.innerHTML = `❮`;
      prevBtn.style.opacity = currentStep === 0 ? "0.35" : "1";
      prevBtn.onclick = e => {
        e.stopPropagation();
        if (!isLiveCustomizing && currentStep > 0) goToStep(currentStep - 1);
      };

      const nextBtn = document.createElement("button");
      nextBtn.className = "on-screen-btn";
      if (currentStep < 3) {
        nextBtn.innerHTML = `❯`;
        nextBtn.onclick = e => {
          e.stopPropagation();
          if (!isLiveCustomizing) goToStep(currentStep + 1);
        };
      } else {
        nextBtn.innerHTML = `✓`;
        nextBtn.style.background = "#10b981";
        nextBtn.onclick = e => {
          e.stopPropagation();
          if (!isLiveCustomizing) exitPrayerSession(true, true);
        };
      }

      dualWrapper.appendChild(prevBtn);
      dualWrapper.appendChild(nextBtn);

      if (isLiveCustomizing) {
        initDragHandler(dualWrapper, (x, y) => {
          cfg.x = x;
          cfg.y = y;
        });
      }
      container.appendChild(dualWrapper);
    } else {
      const prevWrapper = document.createElement("div");
      prevWrapper.className = `draggable-live-btn-wrapper draggable-sub-btn ${isLiveCustomizing ? "customizing" : ""}`;
      prevWrapper.style.left = `${cfg.prevX}%`;
      prevWrapper.style.top = `${cfg.prevY}%`;
      prevWrapper.style.transform = `translate(-50%, -50%) scale(${cfg.scale})`;
      prevWrapper.style.opacity = cfg.opacity;

      const prevBtn = document.createElement("button");
      prevBtn.className = "on-screen-btn";
      prevBtn.innerHTML = `❮`;
      prevBtn.style.opacity = currentStep === 0 ? "0.35" : "1";
      prevBtn.onclick = e => {
        e.stopPropagation();
        if (!isLiveCustomizing && currentStep > 0) goToStep(currentStep - 1);
      };
      prevWrapper.appendChild(prevBtn);

      if (isLiveCustomizing) {
        initDragHandler(prevWrapper, (x, y) => {
          cfg.prevX = x;
          cfg.prevY = y;
        });
      }
      container.appendChild(prevWrapper);

      const nextWrapper = document.createElement("div");
      nextWrapper.className = `draggable-live-btn-wrapper draggable-sub-btn ${isLiveCustomizing ? "customizing" : ""}`;
      nextWrapper.style.left = `${cfg.nextX}%`;
      nextWrapper.style.top = `${cfg.nextY}%`;
      nextWrapper.style.transform = `translate(-50%, -50%) scale(${cfg.scale})`;
      nextWrapper.style.opacity = cfg.opacity;

      const nextBtn = document.createElement("button");
      nextBtn.className = "on-screen-btn";
      if (currentStep < 3) {
        nextBtn.innerHTML = `❯`;
        nextBtn.onclick = e => {
          e.stopPropagation();
          if (!isLiveCustomizing) goToStep(currentStep + 1);
        };
      } else {
        nextBtn.innerHTML = `✓`;
        nextBtn.style.background = "#10b981";
        nextBtn.onclick = e => {
          e.stopPropagation();
          if (!isLiveCustomizing) exitPrayerSession(true, true);
        };
      }
      nextWrapper.appendChild(nextBtn);

      if (isLiveCustomizing) {
        initDragHandler(nextWrapper, (x, y) => {
          cfg.nextX = x;
          cfg.nextY = y;
        });
      }
      container.appendChild(nextWrapper);
    }
  }
}

/* منطقة الأمان لتحريك الأزرار */
function initDragHandler(element, onPositionUpdate) {
  let isDragging = false;

  function updatePos(clientX, clientY) {
    const vw = window.innerWidth || document.documentElement.clientWidth;
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const rect = element.getBoundingClientRect();

    const halfW = (rect.width || 64) / 2;
    const halfH = (rect.height || 56) / 2;

    const topBarEl = document.getElementById("prayerSessionTopBar");
    const bottomNavEl = document.getElementById("bottomNav");

    const topSafePx = (topBarEl ? topBarEl.getBoundingClientRect().bottom : 54) + halfH + 8;
    const bottomSafePx = (bottomNavEl ? bottomNavEl.getBoundingClientRect().top : vh - 84) - halfH - 8;

    const minXPercent = Math.ceil(((halfW + 10) / vw) * 100);
    const maxXPercent = Math.floor(((vw - halfW - 10) / vw) * 100);
    const minYPercent = Math.max(10, Math.ceil((topSafePx / vh) * 100));
    const maxYPercent = Math.min(86, Math.floor((bottomSafePx / vh) * 100));

    let x = (clientX / vw) * 100;
    let y = (clientY / vh) * 100;

    x = Math.max(minXPercent, Math.min(maxXPercent, Math.round(x * 10) / 10));
    y = Math.max(minYPercent, Math.min(maxYPercent, Math.round(y * 10) / 10));

    element.style.left = `${x}%`;
    element.style.top = `${y}%`;
    if (onPositionUpdate) onPositionUpdate(x, y);
  }

  element.onpointerdown = e => {
    e.stopPropagation();
    isDragging = true;
    element.setPointerCapture(e.pointerId);
  };

  element.onpointermove = e => {
    if (!isDragging) return;
    e.preventDefault();
    updatePos(e.clientX, e.clientY);
  };

  element.onpointerup = e => {
    if (isDragging) {
      isDragging = false;
      try {
        element.releasePointerCapture(e.pointerId);
      } catch (err) {}
    }
  };
}

/* ==========================================================================
   7. إدارة جلسة الصلاة والحماية من الخروج الخاطئ (Exit Confirmation Toast)
   ========================================================================== */
function showExitPrayerConfirmationToast(targetTab = null) {
  pendingTabAfterExit = targetTab;
  exitConfirmPending = true;

  const toastEl = document.getElementById("exitPrayerToast");
  const msgEl = document.getElementById("exitToastMsg");
  const yesBtn = document.getElementById("btnExitToastYes");

  if (msgEl) msgEl.innerText = t("exitPrayerConfirmAsk", "هل تريد الخروج من الصلاة؟");
  if (yesBtn) yesBtn.innerText = t("yesBtn", "نعم");
  if (toastEl) toastEl.style.display = "flex";

  clearTimeout(exitConfirmTimer);
  exitConfirmTimer = setTimeout(() => {
    hideExitPrayerConfirmationToast();
  }, 4500);
}

function hideExitPrayerConfirmationToast() {
  exitConfirmPending = false;
  pendingTabAfterExit = null;
  clearTimeout(exitConfirmTimer);
  const toastEl = document.getElementById("exitPrayerToast");
  if (toastEl) toastEl.style.display = "none";
}

function confirmExitFromToast() {
  const nextTab = pendingTabAfterExit;
  hideExitPrayerConfirmationToast();
  exitPrayerSession(false, true);
  if (nextTab && nextTab !== "guide") {
    switchTab(nextTab, true);
  }
}

window.addEventListener("popstate", () => {
  if (isPrayerActive && !isLiveCustomizing && !isLiveTextCustomizing) {
    if (exitConfirmPending) {
      hideExitPrayerConfirmationToast();
      exitPrayerSession(false, true);
    } else {
      history.pushState({ prayerSession: true }, "");
      showExitPrayerConfirmationToast(null);
    }
  }
});

function startPrayerSession(silentMode = false) {
  isPrayerActive = true;
  currentStep = 0;
  extraSwipeCount = 0;
  hideExitPrayerConfirmationToast();

  requestPrayerWakeLock();

  try {
    history.pushState({ prayerSession: true }, "");
  } catch (e) {}

  shakeCoolDownActive = true;
  setTimeout(() => {
    shakeCoolDownActive = false;
  }, 5000);

  if (!silentMode) {
    triggerPrayerVibration([60, 40, 60]);
  }

  document.getElementById("startPrayerScreen").style.display = "none";
  document.getElementById("prayerSessionTopBar").style.display = "block";
  document.getElementById("swipeContainer").style.display = "flex";

  updateTrackPosition();
  updateProgressBar();
  renderOnScreenControls();

  if (navConfig.voice && !isLiveCustomizing && !isLiveTextCustomizing) startVoiceRecognition();
  if (navConfig.shake && !isLiveCustomizing && !isLiveTextCustomizing) initShakeSensor();
}

function exitPrayerSession(isCompleted = false, forceImmediate = false) {
  if (!forceImmediate && !isCompleted && isPrayerActive && !isLiveCustomizing && !isLiveTextCustomizing) {
    showExitPrayerConfirmationToast(null);
    return;
  }

  isPrayerActive = false;
  hideExitPrayerConfirmationToast();
  releasePrayerWakeLock();
  stopVoiceRecognition();
  stopShakeSensor();

  if (isLiveCustomizing) {
    isLiveCustomizing = false;
    document.getElementById("liveCustomizerToolbar").style.display = "none";
  }
  if (isLiveTextCustomizing) {
    isLiveTextCustomizing = false;
    document.getElementById("liveTextCustomizerToolbar").style.display = "none";
  }

  const sessionTopBar = document.getElementById("prayerSessionTopBar");
  const swipeContainer = document.getElementById("swipeContainer");
  const startScreen = document.getElementById("startPrayerScreen");
  const onScreenControls = document.getElementById("onScreenNavControls");

  if (sessionTopBar) sessionTopBar.style.display = "none";
  if (swipeContainer) swipeContainer.style.display = "none";
  if (startScreen) startScreen.style.display = "flex";
  if (onScreenControls) {
    onScreenControls.classList.remove("active");
    onScreenControls.innerHTML = "";
  }

  if (isCompleted) {
    triggerPrayerVibration([80, 50, 120]);
    showCompletionBanner();
  }
}

function showCompletionBanner() {
  const banner = document.getElementById("completionBanner");
  document.getElementById("completionBannerText").innerText = t("prayerCompleted", "تقبل الله - تم إنهاء الصلاة");
  banner.classList.add("show");
  setTimeout(() => {
    banner.classList.remove("show");
  }, 3800);
}

/* ==========================================================================
   8. السبحة الإلكترونية المبتكرة (Mini-Widget + Android Floating Bridge + قائمة أهدافي)
   ========================================================================== */
function openTasbeehFullScreen() {
  const modal = document.getElementById("tasbeehFullScreenModal");
  const floatingWidget = document.getElementById("tasbeehMiniFloatingWidget");
  if (floatingWidget) floatingWidget.style.display = "none";
  if (modal) modal.style.display = "flex";
  updateTasbeehUI();
  renderMyGoalsList();
}

function closeTasbeehFullScreen() {
  const modal = document.getElementById("tasbeehFullScreenModal");
  if (modal) modal.style.display = "none";
}

function minimizeTasbeehToFloating() {
  closeTasbeehFullScreen();
  const floatingWidget = document.getElementById("tasbeehMiniFloatingWidget");
  if (floatingWidget) {
    floatingWidget.style.display = "flex";
    updateTasbeehUI();
  }
}

function expandTasbeehFromFloating() {
  openTasbeehFullScreen();
}

function closeMiniTasbeehWidget() {
  const floatingWidget = document.getElementById("tasbeehMiniFloatingWidget");
  if (floatingWidget) floatingWidget.style.display = "none";
}

function switchTasbeehMode(mode) {
  tasbeehMode = mode;
  localStorage.setItem("tasbeeh_mode", mode);
  tasbeehGoalCompletedFlag = false;
  hideGoalSuccessBanner();

  const customForm = document.getElementById("customGoalFormBox");
  const myGoalsSec = document.getElementById("myGoalsSection");

  if (mode === "free") {
    tasbeehTarget = 0;
    tasbeehActiveDhikr = "";
    tasbeehActiveGoalId = null;
    localStorage.setItem("tasbeeh_target", 0);
    localStorage.setItem("tasbeeh_active_dhikr", "");
    localStorage.removeItem("tasbeeh_active_goal_id");
    if (customForm) customForm.style.display = "none";
    if (myGoalsSec) myGoalsSec.style.display = "none";
  } else {
    if (customForm) customForm.style.display = "flex";
    if (myGoalsSec) myGoalsSec.style.display = "block";
    renderMyGoalsList();
  }

  updateTasbeehUI();
}

function sanitizeDhikrText(raw) {
  return String(raw || "").replace(/[:：]+/g, "").trim();
}

function applyCustomTasbeehGoal() {
  const dhikrInput = document.getElementById("inputCustomDhikr");
  const numInput = document.getElementById("inputCustomTargetNum");

  const cleanDhikr = sanitizeDhikrText(dhikrInput ? dhikrInput.value : "");
  const targetNum = parseInt(numInput ? numInput.value : "0", 10);

  if (!cleanDhikr || isNaN(targetNum) || targetNum <= 0) {
    showToastAlert(t("enterValidGoalAlert", "يرجى كتابة اسم الذكر وتحديد عدد صحيح أكبر من صفر"));
    return;
  }

  const newGoalId = `${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

  tasbeehActiveDhikr = cleanDhikr;
  tasbeehTarget = targetNum;
  tasbeehCount = 0;
  tasbeehMode = "custom";
  tasbeehGoalCompletedFlag = false;
  tasbeehActiveGoalId = newGoalId;

  tasbeehMyGoals.unshift({
    id: newGoalId,
    dhikr: cleanDhikr,
    target: targetNum,
    status: "in_progress",
    createdAt: Date.now()
  });

  localStorage.setItem("tasbeeh_active_dhikr", tasbeehActiveDhikr);
  localStorage.setItem("tasbeeh_target", tasbeehTarget);
  localStorage.setItem("tasbeeh_count", tasbeehCount);
  localStorage.setItem("tasbeeh_mode", "custom");
  localStorage.setItem("tasbeeh_active_goal_id", tasbeehActiveGoalId);
  localStorage.setItem("tasbeeh_my_goals", JSON.stringify(tasbeehMyGoals));

  if (dhikrInput) dhikrInput.value = "";
  if (numInput) numInput.value = "";

  hideGoalSuccessBanner();
  updateTasbeehUI();
  renderMyGoalsList();
  triggerHaptic(40);
}

function markActiveGoalCompleted() {
  if (tasbeehActiveGoalId) {
    const idx = tasbeehMyGoals.findIndex(g => String(g.id) === String(tasbeehActiveGoalId));
    if (idx !== -1) {
      tasbeehMyGoals[idx].status = "completed";
      tasbeehMyGoals[idx].completedAt = Date.now();
      localStorage.setItem("tasbeeh_my_goals", JSON.stringify(tasbeehMyGoals));
      renderMyGoalsList();
      return;
    }
  }

  const cleanName = sanitizeDhikrText(tasbeehActiveDhikr) || t("tasbeehOfficialTitle", "السبحة الإلكترونية");
  tasbeehMyGoals.unshift({
    id: `${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    dhikr: cleanName,
    target: Number(tasbeehTarget),
    status: "completed",
    completedAt: Date.now()
  });
  localStorage.setItem("tasbeeh_my_goals", JSON.stringify(tasbeehMyGoals));
  renderMyGoalsList();
}

function repeatSavedGoal(goalId) {
  const goal = tasbeehMyGoals.find(g => String(g.id) === String(goalId));
  if (!goal) return;

  tasbeehMode = "custom";
  tasbeehActiveDhikr = goal.dhikr;
  tasbeehTarget = Number(goal.target);
  tasbeehCount = 0;
  tasbeehGoalCompletedFlag = false;
  tasbeehActiveGoalId = goal.id;
  goal.status = "in_progress";

  localStorage.setItem("tasbeeh_mode", "custom");
  localStorage.setItem("tasbeeh_active_dhikr", tasbeehActiveDhikr);
  localStorage.setItem("tasbeeh_target", tasbeehTarget);
  localStorage.setItem("tasbeeh_count", 0);
  localStorage.setItem("tasbeeh_active_goal_id", tasbeehActiveGoalId);
  localStorage.setItem("tasbeeh_my_goals", JSON.stringify(tasbeehMyGoals));

  hideGoalSuccessBanner();
  updateTasbeehUI();
  renderMyGoalsList();
  triggerHaptic(40);
}

function deleteSavedGoal(goalId) {
  tasbeehMyGoals = tasbeehMyGoals.filter(g => String(g.id) !== String(goalId));
  if (String(tasbeehActiveGoalId) === String(goalId)) {
    tasbeehActiveGoalId = null;
    localStorage.removeItem("tasbeeh_active_goal_id");
  }
  localStorage.setItem("tasbeeh_my_goals", JSON.stringify(tasbeehMyGoals));
  renderMyGoalsList();
}

function renderMyGoalsList() {
  const sectionEl = document.getElementById("myGoalsSection");
  const listEl = document.getElementById("myGoalsListContainer");
  const badgeEl = document.getElementById("myGoalsCountBadge");

  if (sectionEl) {
    sectionEl.style.display = tasbeehMode === "custom" ? "block" : "none";
  }
  if (!listEl) return;

  if (badgeEl) badgeEl.innerText = tasbeehMyGoals.length;

  if (tasbeehMyGoals.length === 0) {
    listEl.innerHTML = `<div class="my-goals-empty">${t("noSavedGoalsYet", "لا توجد أهداف مخصصة بعد. اكتب الذكر واضغط بدء الهدف.")}</div>`;
    return;
  }

  listEl.innerHTML = "";
  tasbeehMyGoals.forEach(item => {
    const isCompleted = item.status === "completed";
    const isActive = String(item.id) === String(tasbeehActiveGoalId) && !isCompleted;

    const row = document.createElement("div");
    row.className = `my-goal-item ${isCompleted ? "completed-goal-row" : ""} ${isActive ? "active-goal-row" : ""}`;
    row.innerHTML = `
      <div class="my-goal-info">
        <span class="bidi-safe">${item.dhikr}</span><span class="colon-sep">:</span>
        <span class="my-goal-target-num">${item.target}</span>
        ${
          isCompleted
            ? `<span class="goal-status-badge completed">✓ ${t("goalDoneLabel", "مكتمل")}</span>`
            : `<span class="goal-status-badge in-progress">⏳ ${t("goalInProgressLabel", "قيد التنفيذ")}</span>`
        }
      </div>
      <div class="my-goal-actions">
        <button type="button" class="btn-goal-repeat" onclick="repeatSavedGoal('${item.id}')">↻ ${t("repeatGoalBtn", "تكرار")}</button>
        <button type="button" class="btn-goal-delete" onclick="deleteSavedGoal('${item.id}')">🗑️</button>
      </div>
    `;
    listEl.appendChild(row);
  });
}

function showGoalSuccessBanner() {
  const banner = document.getElementById("tasbeehGoalSuccessBanner");
  const textEl = document.getElementById("tasbeehGoalSuccessText");
  if (textEl) textEl.innerText = t("goalCompletedSuccess", "تم إنهاء الهدف بنجاح ✓");
  if (banner) banner.style.display = "block";
}

function hideGoalSuccessBanner() {
  const banner = document.getElementById("tasbeehGoalSuccessBanner");
  if (banner) banner.style.display = "none";
}

function resetTasbeehCounter() {
  tasbeehCount = 0;
  tasbeehGoalCompletedFlag = false;
  localStorage.setItem("tasbeeh_count", tasbeehCount);
  hideGoalSuccessBanner();
  updateTasbeehUI();
  triggerHaptic(50);
}

function toggleTasbeehHaptic(checked) {
  tasbeehHaptic = checked;
  localStorage.setItem("tasbeeh_haptic", checked);
}

function adjustTasbeehRingSize(val) {
  tasbeehRingSize = parseInt(val, 10);
  localStorage.setItem("tasbeeh_ring_size", tasbeehRingSize);
  const ring = document.getElementById("tasbeehTouchRing");
  if (ring) {
    ring.style.width = `${tasbeehRingSize}px`;
    ring.style.height = `${tasbeehRingSize}px`;
  }
}

function triggerHaptic(duration = 30) {
  if (tasbeehHaptic && "vibrate" in navigator) {
    navigator.vibrate(duration);
  }
}

function handleTasbeehClick() {
  tasbeehCount++;
  localStorage.setItem("tasbeeh_count", tasbeehCount);

  const ring = document.getElementById("tasbeehTouchRing");
  if (ring) {
    ring.classList.remove("pulse");
    void ring.offsetWidth;
    ring.classList.add("pulse");
  }

  if (tasbeehMode === "custom" && tasbeehTarget > 0) {
    if (tasbeehCount === tasbeehTarget && !tasbeehGoalCompletedFlag) {
      tasbeehGoalCompletedFlag = true;
      triggerHaptic([70, 60, 140]);
      showGoalSuccessBanner();
      markActiveGoalCompleted();
    } else {
      triggerHaptic(30);
    }
  } else {
    if (tasbeehCount % 100 === 0) {
      triggerHaptic([50, 100, 50]);
    } else {
      triggerHaptic(30);
    }
  }

  updateTasbeehUI();
}

function updateTasbeehUI() {
  const display = document.getElementById("tasbeehCountDisplay");
  const miniDisplay = document.getElementById("tasbeehMiniCount");
  const miniDhikrTag = document.getElementById("tasbeehMiniDhikrLabel");

  if (display) display.innerText = tasbeehCount;
  if (miniDisplay) miniDisplay.innerText = tasbeehCount;
  if (miniDhikrTag) {
    miniDhikrTag.innerText =
      tasbeehMode === "custom" && tasbeehActiveDhikr
        ? `${tasbeehActiveDhikr} (${tasbeehTarget})`
        : "";
  }

  const targetLabel = document.getElementById("tasbeehTargetDisplay");
  const activeBanner = document.getElementById("tasbeehActiveDhikrBanner");
  const activeNameEl = document.getElementById("tasbeehActiveDhikrName");
  const activeGoalEl = document.getElementById("tasbeehActiveGoalBadge");

  if (tasbeehMode === "custom" && tasbeehTarget > 0) {
    if (targetLabel) {
      targetLabel.innerHTML = `<span class="bidi-safe">${t("targetLabel", "الهدف")}</span><span class="colon-sep">:</span><span>${tasbeehTarget}</span>`;
    }
    if (activeBanner && tasbeehActiveDhikr) {
      activeBanner.style.display = "flex";
      if (activeNameEl) activeNameEl.innerText = tasbeehActiveDhikr;
      if (activeGoalEl) activeGoalEl.innerText = `${tasbeehCount} / ${tasbeehTarget}`;
    }
  } else {
    if (targetLabel) {
      targetLabel.innerText = `${t("freeGoalMode", "الوضع الحر")} ∞`;
    }
    if (activeBanner) activeBanner.style.display = "none";
  }

  const btnFree = document.getElementById("btnModeFreeTasbeeh");
  const btnCustom = document.getElementById("btnModeCustomGoal");
  const customForm = document.getElementById("customGoalFormBox");
  const myGoalsSec = document.getElementById("myGoalsSection");

  if (tasbeehMode === "custom") {
    btnCustom?.classList.add("active");
    btnFree?.classList.remove("active");
    if (customForm) customForm.style.display = "flex";
    if (myGoalsSec) myGoalsSec.style.display = "block";
  } else {
    btnFree?.classList.add("active");
    btnCustom?.classList.remove("active");
    if (customForm) customForm.style.display = "none";
    if (myGoalsSec) myGoalsSec.style.display = "none";
  }

  let ratio = (tasbeehCount % 33) / 33;
  if (tasbeehMode === "custom" && tasbeehTarget > 0) {
    ratio = Math.min(1, tasbeehCount / tasbeehTarget);
  } else if (tasbeehCount > 0 && ratio === 0) {
    ratio = 1;
  }

  const circle = document.getElementById("tasbeehCircleProg");
  if (circle) {
    const perimeter = 603;
    circle.style.strokeDashoffset = perimeter - ratio * perimeter;
  }

  const miniCircle = document.getElementById("miniWidgetRingProg");
  if (miniCircle) {
    const miniPerimeter = 276.46;
    miniCircle.style.strokeDashoffset = miniPerimeter - ratio * miniPerimeter;
  }

  const ring = document.getElementById("tasbeehTouchRing");
  if (ring) {
    ring.style.width = `${tasbeehRingSize}px`;
    ring.style.height = `${tasbeehRingSize}px`;
  }
  const chkHaptic = document.getElementById("chkTasbeehHaptic");
  if (chkHaptic) chkHaptic.checked = tasbeehHaptic;
}

/* جسر السبحة العائمة فوق التطبيقات الأخرى (Android Floating Bridge) */
function launchExternalFloatingTasbeeh() {
  const payload = {
    count: tasbeehCount,
    target: tasbeehMode === "custom" ? tasbeehTarget : 0,
    dhikr: tasbeehMode === "custom" ? tasbeehActiveDhikr : "",
    accentColor: userAccent || "#0284C7",
    ringSize: tasbeehRingSize || 200,
    haptic: tasbeehHaptic
  };

  if (window.AndroidBridge && typeof window.AndroidBridge.startFloatingTasbeeh === "function") {
    try {
      window.AndroidBridge.startFloatingTasbeeh(JSON.stringify(payload));
      showToastAlert(t("floatingOverlayActivated", "تم تفعيل النافذة العائمة للسبحة فوق التطبيقات ✓"));
      return;
    } catch (err) {
      console.error("AndroidFloatingBridge error:", err);
    }
  }

  // في حال التشغيل داخل متصفح عادي بدون جسر أندرويد نفعّل التصغير الداخلي مع تنبيه أنيق
  minimizeTasbeehToFloating();
  showToastAlert(t("floatingOverlayActivated", "تم تفعيل السبحة العائمة المصغرة ✓"));
}

/* ==========================================================================
   9. فتح الـ 400 لون إضافي وشبكة التمرير
   ========================================================================== */
function openCustomColor(fromOnboarding = false) {
  const palette = document.getElementById("premiumColorPalette");
  if (!palette) return;
  palette.innerHTML = "";

  const countBadge = document.getElementById("customColorCountBadge");
  if (countBadge) countBadge.innerText = t("fourHundredColorsBadge", "400 لون");

  const colorsList = typeof allFourHundredColors !== "undefined" ? allFourHundredColors : [];
  colorsList.forEach(color => {
    const circle = document.createElement("div");
    circle.className = "color-circle";
    if (color.toUpperCase() === userAccent.toUpperCase()) circle.classList.add("active");
    circle.style.backgroundColor = color;
    circle.onclick = () => {
      setAccentColor(color, true);
      if (fromOnboarding) {
        document.querySelectorAll("#onboardColorPalette .color-circle").forEach(c => c.classList.remove("active"));
      }
      closeModal();
    };
    palette.appendChild(circle);
  });
  document.getElementById("customColorModal").classList.add("active");
}

function closeModal() {
  document.getElementById("customColorModal").classList.remove("active");
}

/* ==========================================================================
   10. لوحة الإعدادات الشاملة (مفرقة بذكاء بين العربية واللغات الأجنبية)
   ========================================================================== */
function getShakeSensitivityDesc(val) {
  const v = parseInt(val, 10);
  if (v <= 14) return t("shakeVeryEasy", "حساس");
  if (v <= 19) return t("shakeModerate", "معتدل");
  return t("shakeFirm", "قوي");
}

function populateSettingsPanel() {
  const panel = document.getElementById("settingsPanel");
  if (!panel) return;

  const isArabicLang = currentLang === "العربية";

  panel.innerHTML = `
    <!-- 1. وضع المظهر (Theme Mode) -->
    <div class="setting-group">
      <div class="setting-title">${t("themeModeTitle", "وضع المظهر")}</div>
      <div class="pill-button-group">
        <button type="button" data-theme="auto" class="pill-btn theme-btn ${currentThemeMode === "auto" ? "active" : ""}">${t("autoTheme", "تلقائي")}</button>
        <button type="button" data-theme="light" class="pill-btn theme-btn ${currentThemeMode === "light" ? "active" : ""}">${t("lightTheme", "فاتح")}</button>
        <button type="button" data-theme="dark" class="pill-btn theme-btn ${currentThemeMode === "dark" ? "active" : ""}">${t("darkTheme", "داكن")}</button>
      </div>
    </div>

    <!-- 2. اللون المميز + زر ألوان إضافية الفاخر -->
    <div class="setting-group">
      <div class="setting-title">
        <span>${t("accentLabel", "اللون المميز")}</span>
      </div>
      <div class="color-palette color-palette-six" id="settingsColorPalette"></div>
      <button type="button" class="btn-extra-colors-luxury" onclick="openCustomColor(false)">
        <span class="extra-colors-spectrum-icon">🎨</span>
        <span class="btn-extra-colors-text">${t("additionalColorsBtn", "ألوان إضافية")}</span>
      </button>
    </div>

    <!-- 3. إعدادات الخطوط (بسيط للعربية، وموحد للغات غير العربية) -->
    ${
      isArabicLang
        ? `
    <div class="setting-group">
      <div class="setting-title">${t("fontSize", "حجم الخط")}</div>
      <div class="pill-button-group">
        <button type="button" data-font="small" class="pill-btn font-btn ${currentFont === "small" ? "active" : ""}">${t("small", "صغير")}</button>
        <button type="button" data-font="medium" class="pill-btn font-btn ${currentFont === "medium" ? "active" : ""}">${t("medium", "متوسط")}</button>
        <button type="button" data-font="large" class="pill-btn font-btn ${currentFont === "large" ? "active" : ""}">${t("large", "كبير")}</button>
        <button type="button" data-font="huge" class="pill-btn font-btn ${currentFont === "huge" ? "active" : ""}">${t("huge", "ضخم")}</button>
      </div>
      <div class="font-sub-notice">
        ${t("fontNotice", "يتغير حجم الخط بوضوح داخل الأدعية والدليل، ويبقى متزناً في الواجهة للحفاظ على الشاشة")}
      </div>
    </div>
    `
        : `
    <div class="setting-group">
      <div class="setting-title">${t("fontSize", "Font Size")}</div>
      <button type="button" class="styled-action-btn" onclick="openUnifiedGuideTextCustomizer()" style="margin-top: 0; border-color: rgba(var(--accent-rgb), 0.45); color: var(--accent);">
        🔠 ${t("fontAndGuideCustomizeBtn", "Font Size & Guide Customization")}
      </button>
      <div class="font-sub-notice">
        ${t("fontNotice", "Font size changes prominently within supplications and guide, staying balanced in UI.")}
      </div>
    </div>
    `
    }

    <!-- 4. طرق التقليب والتنقل -->
    <div class="setting-group">
      <div class="setting-title">
        <span>🎮 ${t("navControlsTitle", "طرق التقليب والتنقل")}</span>
      </div>

      <!-- السحب -->
      <div class="nav-toggle-row">
        <div class="nav-toggle-left">
          <span>👆</span>
          <span>${t("swipeNav", "التقليب بسحب الشاشة")}</span>
        </div>
        <div class="nav-toggle-right">
          <button type="button" class="info-btn" onclick="openHintModal('swipe')">ℹ️</button>
          <input type="checkbox" id="chkSwipe" class="custom-checkbox" ${navConfig.swipe ? "checked" : ""} onchange="toggleNavOption('swipe', this.checked)">
        </div>
      </div>

      <!-- الاهتزاز -->
      <div class="nav-toggle-row">
        <div class="nav-toggle-left">
          <span>📳</span>
          <span>${t("shakeNav", "التقليب باهتزاز الجهاز")}</span>
        </div>
        <div class="nav-toggle-right">
          <button type="button" class="info-btn" onclick="openHintModal('shake')">ℹ️</button>
          <input type="checkbox" id="chkShake" class="custom-checkbox" ${navConfig.shake ? "checked" : ""} onchange="toggleNavOption('shake', this.checked)">
        </div>
      </div>
      <!-- شريط حساسية الاهتزاز من 9 وحتى 25 -->
      <div id="shakeSensitivityRow" style="display: ${navConfig.shake ? "block" : "none"}; padding: 0 12px 14px; border-bottom: 1px solid rgba(128,128,128,0.08);">
         <div style="font-size: 0.78rem; color: var(--text-secondary); margin-bottom: 6px; display: flex; justify-content: space-between; align-items: center;">
           <div><span class="bidi-safe">${t("shakeForceRequired", "قوة الاهتزاز المطلوبة")}</span><span class="colon-sep">:</span></div>
           <span id="shakeThresholdVal" class="bidi-safe">${shakeMotionThreshold} (${getShakeSensitivityDesc(shakeMotionThreshold)})</span>
         </div>
         <input type="range" min="9" max="25" value="${shakeMotionThreshold}" oninput="updateShakeThreshold(this.value)" style="width: 100%; accent-color: var(--accent);">
      </div>

      <!-- الصوت -->
      <div class="nav-toggle-row">
        <div class="nav-toggle-left">
          <span>🎙️</span>
          <span>${t("voiceNav", "التقليب بالصوت")}</span>
        </div>
        <div class="nav-toggle-right">
          <button type="button" class="info-btn" onclick="openHintModal('voice')">ℹ️</button>
          <input type="checkbox" id="chkVoice" class="custom-checkbox" ${navConfig.voice ? "checked" : ""} onchange="toggleNavOption('voice', this.checked)">
        </div>
      </div>

      <!-- مفتاح الإنهاء التلقائي عند التسليم -->
      <div id="autoEndTasleemRow" class="nav-toggle-row" style="display: ${navConfig.voice ? "flex" : "none"}; background: rgba(var(--accent-rgb), 0.06); border-radius: 12px; margin: 6px 0; padding: 10px 12px;">
        <div class="nav-toggle-left" style="font-size:0.86rem;">
          <span>✨</span>
          <span>${t("voiceAutoEnd", "الإنهاء التلقائي عند التسليم")}</span>
        </div>
        <div class="nav-toggle-right">
          <label class="switch-label">
            <input type="checkbox" id="chkAutoEnd" ${navConfig.autoEndTasleem ? "checked" : ""} onchange="toggleAutoEndTasleem(this.checked)">
            <span class="switch-slider"></span>
          </label>
        </div>
      </div>

      <!-- أزرار الشاشة -->
      <div class="nav-toggle-row">
        <div class="nav-toggle-left">
          <span>🎛️</span>
          <span>${t("buttonsNav", "التقليب بأزرار الشاشة")}</span>
        </div>
        <div class="nav-toggle-right">
          <button type="button" class="info-btn" onclick="openHintModal('buttons')">ℹ️</button>
          <input type="checkbox" id="chkButtons" class="custom-checkbox" ${navConfig.buttons ? "checked" : ""} onchange="toggleNavOption('buttons', this.checked)">
        </div>
      </div>

      <!-- زر المعاينة والتخصيص الحي للأزرار -->
      <div id="btnCustomizeWrapper" style="display: ${navConfig.buttons ? "block" : "none"}; margin-top: 10px;">
        <button type="button" class="styled-action-btn" onclick="openLiveCustomizer()" style="border-color: rgba(var(--accent-rgb), 0.4); color: var(--accent);">
          ⚙️ ${t("customizeButtons", "المعاينة والتخصيص الحي للأزرار")}
        </button>
      </div>
    </div>
  `;

  const paletteContainer = document.getElementById("settingsColorPalette");
  if (paletteContainer && typeof primarySixLuxuryColors !== "undefined") {
    primarySixLuxuryColors.forEach(color => {
      const circle = document.createElement("div");
      circle.className = "color-circle";
      if (color.toUpperCase() === userAccent.toUpperCase()) circle.classList.add("active");
      circle.style.backgroundColor = color;
      circle.onclick = () => setAccentColor(color, true);
      paletteContainer.appendChild(circle);
    });
  }

  document.querySelectorAll(".theme-btn").forEach(btn => {
    btn.onclick = () => setThemeMode(btn.dataset.theme, true);
  });

  document.querySelectorAll(".font-btn").forEach(btn => {
    btn.onclick = () => {
      currentFont = btn.dataset.font;
      customTextScales.active = false;
      localStorage.removeItem("customTextScales");
      localStorage.setItem("userFontSize", currentFont);
      applyFontScale();
    };
  });
}

function updateShakeThreshold(val) {
  shakeMotionThreshold = Math.max(9, Math.min(25, parseInt(val, 10)));
  localStorage.setItem("nav_shakeThreshold", shakeMotionThreshold);
  const label = document.getElementById("shakeThresholdVal");
  if (label) {
    label.innerText = `${shakeMotionThreshold} (${getShakeSensitivityDesc(shakeMotionThreshold)})`;
  }
}

function toggleAutoEndTasleem(checked) {
  navConfig.autoEndTasleem = checked;
  localStorage.setItem("nav_autoEndTasleem", checked);
}

/* ==========================================================================
   11. قسم الإضافات (السبحة الإلكترونية كعنصر أساسي نظيف للنشر)
   ========================================================================== */
function renderExtrasView() {
  const container = document.getElementById("extrasPanel");
  if (!container) return;

  container.innerHTML = `
    <div class="extras-menu-card" onclick="openTasbeehFullScreen()" style="border-color: var(--accent); background: linear-gradient(135deg, rgba(var(--accent-rgb), 0.15), rgba(var(--accent-rgb), 0.05));">
      <div class="extras-menu-left">
        <div class="extras-card-icon">📿</div>
        <div style="min-width:0;">
          <div class="extras-item-title">${t("tasbeehOfficialTitle", "السبحة الإلكترونية")}</div>
          <div class="extras-item-sub">${t("tasbeehOfficialSub", "شاشة كاملة منفصلة، عداد ذكي، أهداف مخصصة ونافذة عائمة")}</div>
        </div>
      </div>
      <div style="font-size:1.2rem; color:var(--accent);">❯</div>
    </div>
  `;
}

/* ==========================================================================
   12. نافذة التلميحات، اللغات، وتحديث نصوص الواجهة بالكامل
   ========================================================================== */
function openHintModal(type) {
  if (typeof hintDetails === "undefined") return;
  const data = hintDetails[type];
  if (!data) return;
  document.getElementById("hintModalIcon").innerText = data.icon;
  document.getElementById("hintModalTitle").innerText = data.title[currentLang] || data.title["العربية"];
  document.getElementById("hintModalContent").innerText = data.desc[currentLang] || data.desc["العربية"];
  document.getElementById("hintModalCloseBtn").innerText = t("understood", "فهمت ذلك");
  document.getElementById("hintModal").classList.add("active");
}

function closeHintModal() {
  document.getElementById("hintModal").classList.remove("active");
}

function populateLanguageList() {
  const langPanel = document.getElementById("languagePanel");
  if (!langPanel) return;
  langPanel.innerHTML = `
    <div class="setting-group">
      <div class="setting-title">🌐 ${t("language", "اللغة")}</div>
      <div class="lang-grid-container" id="fullLangList"></div>
    </div>
  `;
  const grid = document.getElementById("fullLangList");
  languages.forEach(lang => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `lang-btn-item ${lang.code === currentLang ? "active" : ""}`;
    btn.innerHTML = `<span style="font-size:1.4rem;">${lang.flag}</span> <span>${lang.name}</span>`;
    btn.onclick = () => {
      currentLang = lang.code;
      localStorage.setItem("userLang", lang.code);
      updateDirection();
      updateUI();
    };
    grid.appendChild(btn);
  });
}

function openQrModal() {
  document.getElementById("qrPopup").classList.add("active");
}

function updateUI() {
  updateDirection();

  if (typeof localizeSplashAndUpdateUI === "function") {
    localizeSplashAndUpdateUI();
  }

  document.getElementById("guideLabel").innerText = t("guide", "الدليل");
  document.getElementById("extrasLabel").innerText = t("extras", "الإضافات");
  document.getElementById("settingsLabel").innerText = t("settings", "الإعدادات");
  document.getElementById("languageLabel").innerText = t("language", "اللغة");

  document.getElementById("startScreenTitle").innerText = t("splashAppTitle", "دليل الجنازة");
  document.getElementById("startScreenDesc").innerText = t(
    "startScreenDesc",
    "دليل تفاعلي متزامن خطوة بخطوة مع أربع تكبيرات، يدعم التبديل اللمسي والصوتي والحركي."
  );
  document.getElementById("btnStartPrayerText").innerText = t("startPrayerBtn", "ابدأ صلاة الجنازة");
  document.getElementById("startScreenShareText").innerText = `${t("shareReward", "شارك الأجر")} (${t("shareLabel", "رمز QR")})`;
  document.getElementById("exitSessionBtnText").innerText = t("exitPrayer", "إنهاء الصلاة");

  document.getElementById("qrLabel").innerText = t("shareReward", "شارك الأجر");
  document.getElementById("qrSubText").innerText = t("qrSubText", "امسح الرمز لنشر تطبيق دليل الجنازة ونيل الأجر");
  document.getElementById("closeQrBtn").innerText = t("close", "إغلاق");

  document.getElementById("onboardLangTitle").innerText = t("selectLangTitle", "اختر اللغة");
  document.getElementById("dontAskLabel").innerText = t("dontAskAgain", "عدم السؤال مرة أخرى");
  document.getElementById("saveLangBtn").innerText = t("continueBtn", "متابعة ←");
  document.getElementById("onboardColorTitle").innerText = t("chooseThemeTitle", "اختر اللون المميز");
  document.getElementById("onboardColorSub").innerText = t("chooseThemeSub", "اختر اللون المفضل لواجهة التطبيق");
  document.getElementById("startAppBtn").innerText = t("startApp", "ابدأ التطبيق");

  document.querySelectorAll(".btn-extra-colors-text").forEach(el => {
    el.innerText = t("additionalColorsBtn", "ألوان إضافية");
  });

  const countBadge = document.getElementById("customColorCountBadge");
  if (countBadge) countBadge.innerText = t("fourHundredColorsBadge", "400 لون");
  const closeColorModalBtn = document.getElementById("closeColorModalBtn");
  if (closeColorModalBtn) closeColorModalBtn.innerText = t("close", "إغلاق");

  // ترجمة شريط التخصيص الحي للأزرار
  const liveBtnCustTitle = document.getElementById("liveBtnCustTitle");
  if (liveBtnCustTitle) liveBtnCustTitle.innerText = `⚙️ ${t("customizeButtons", "تخصيص الأزرار الحي")}`;
  const lblBtnStyleChoice = document.getElementById("lblBtnStyleChoice");
  if (lblBtnStyleChoice) lblBtnStyleChoice.innerText = t("buttonStyleLabel", "نمط ظهور الأزرار");
  const liveBtnStyleSingle = document.getElementById("liveBtnStyleSingle");
  if (liveBtnStyleSingle) liveBtnStyleSingle.innerText = t("singleForwardBtn", "زر تقدم واحد");
  const liveBtnStyleDual = document.getElementById("liveBtnStyleDual");
  if (liveBtnStyleDual) liveBtnStyleDual.innerText = t("dualBtnShort", "زرين");
  const lblLockDualButtons = document.getElementById("lblLockDualButtons");
  if (lblLockDualButtons) lblLockDualButtons.innerText = t("lockDualButtonsLabel", "تحريك الزرين معاً ككتلة واحدة");
  const lblBtnScale = document.getElementById("lblBtnScale");
  if (lblBtnScale) lblBtnScale.innerText = t("scaleLabel", "الحجم");
  const lblBtnOpacity = document.getElementById("lblBtnOpacity");
  if (lblBtnOpacity) lblBtnOpacity.innerText = t("opacityLabel", "الشفافية");
  const lblPerStepPos = document.getElementById("lblPerStepPos");
  if (lblPerStepPos) lblPerStepPos.innerText = t("perStepPosLabel", "تخصيص الموضع لكل تكبيرة على حدة");
  const btnResetBtnCust = document.getElementById("btnResetBtnCust");
  if (btnResetBtnCust) btnResetBtnCust.innerText = t("resetDefaultBtn", "استعادة الافتراضي");

  // ترجمة شريط التخصيص الموحد للخطوط ونصوص الدليل
  const liveTextCustTitle = document.getElementById("liveTextCustTitle");
  if (liveTextCustTitle) liveTextCustTitle.innerText = `🔠 ${t("fontAndGuideCustomizeBtn", "حجم الخط وتخصيص الدليل")}`;
  const btnLiveTextCustSave = document.getElementById("btnLiveTextCustSave");
  if (btnLiveTextCustSave) btnLiveTextCustSave.innerText = t("saveAndExitBtn", "حفظ وخروج ✓");
  const lblCustArabicSize = document.getElementById("lblCustArabicSize");
  if (lblCustArabicSize) lblCustArabicSize.innerText = t("arabicScript", "النص العربي");
  const lblCustTranslitSize = document.getElementById("lblCustTranslitSize");
  if (lblCustTranslitSize) lblCustTranslitSize.innerText = t("translitScript", "النطق اللاتيني");
  const lblCustTransSize = document.getElementById("lblCustTransSize");
  if (lblCustTransSize) lblCustTransSize.innerText = t("meaningTrans", "الترجمة");
  const liveTextCustHint = document.getElementById("liveTextCustHint");
  if (liveTextCustHint) liveTextCustHint.innerText = t("swipeToPreviewHint", "اسحب البطاقة لمعاينة النصوص");
  const btnResetTextSizes = document.getElementById("btnResetTextSizes");
  if (btnResetTextSizes) btnResetTextSizes.innerText = t("resetDefaultBtn", "استعادة الافتراضي");

  // ترجمة جميع عناصر السبحة الإلكترونية
  const tasbeehFsTitle = document.getElementById("tasbeehFsTitle");
  if (tasbeehFsTitle) tasbeehFsTitle.innerText = `📿 ${t("tasbeehOfficialTitle", "السبحة الإلكترونية")}`;
  const btnBackTasbeehText = document.getElementById("btnBackTasbeehText");
  if (btnBackTasbeehText) btnBackTasbeehText.innerText = t("backBtn", "العودة");
  const btnMinimizeTasbeehText = document.getElementById("btnMinimizeTasbeehText");
  if (btnMinimizeTasbeehText) btnMinimizeTasbeehText.innerText = t("minimizeBtn", "تصغير");
  const btnPipTasbeehText = document.getElementById("btnPipTasbeehText");
  if (btnPipTasbeehText) btnPipTasbeehText.innerText = t("pipBtnLabel", "عائم");
  const btnTopResetTasbeehText = document.getElementById("btnTopResetTasbeehText");
  if (btnTopResetTasbeehText) btnTopResetTasbeehText.innerText = t("resetShortBtn", "تصفير");
  const tasbeehNotice = document.getElementById("tasbeehAutoSaveNotice");
  if (tasbeehNotice) tasbeehNotice.innerText = `💾 ${t("tasbeehNotice", "يقوم العداد بحفظ أرقام التسبيح والأهداف تلقائياً حتى عند إغلاق التطبيق")}`;
  const btnModeFreeTasbeeh = document.getElementById("btnModeFreeTasbeeh");
  if (btnModeFreeTasbeeh) btnModeFreeTasbeeh.innerText = `${t("freeGoalMode", "الوضع الحر")} ∞`;
  const btnModeCustomGoal = document.getElementById("btnModeCustomGoal");
  if (btnModeCustomGoal) btnModeCustomGoal.innerText = `${t("setCustomGoalMode", "هدف مخصص")} 🎯`;
  const inputCustomDhikr = document.getElementById("inputCustomDhikr");
  if (inputCustomDhikr) inputCustomDhikr.placeholder = t("dhikrInputPlaceholder", "اكتب الذكر (مثل: سبحان الله)");
  const inputCustomTargetNum = document.getElementById("inputCustomTargetNum");
  if (inputCustomTargetNum) inputCustomTargetNum.placeholder = t("targetCountPlaceholder", "العدد (مثل: 110)");
  const btnStartCustomGoal = document.getElementById("btnStartCustomGoal");
  if (btnStartCustomGoal) btnStartCustomGoal.innerText = t("startCustomGoalBtn", "بدء الهدف");
  const lblTasbeehHaptic = document.getElementById("lblTasbeehHaptic");
  if (lblTasbeehHaptic) lblTasbeehHaptic.innerText = t("hapticFeedbackLabel", "الاهتزاز اللمسي (Haptic)");
  const lblTasbeehRingSize = document.getElementById("lblTasbeehRingSize");
  if (lblTasbeehRingSize) lblTasbeehRingSize.innerText = t("ringSizeLabel", "حجم حلقة التسبيح");
  const btnResetTasbeeh = document.getElementById("btnResetTasbeeh");
  if (btnResetTasbeeh) btnResetTasbeeh.innerText = `↺ ${t("resetCounterBtn", "تصفير العداد")}`;
  const myGoalsTitle = document.getElementById("myGoalsTitle");
  if (myGoalsTitle) myGoalsTitle.innerText = `🏆 ${t("myGoalsTitle", "أهدافي")}`;

  buildSlides();
  populateLanguageList();
  populateSettingsPanel();
  renderExtrasView();
  renderOnScreenControls();
  updateTasbeehUI();
  renderMyGoalsList();
}

/* ==========================================================================
   13. شاشة التهيئة الأولى (Onboarding) والتبديل المحمي بين التبويبات
   ========================================================================== */
function showOnboardingIfNeeded() {
  const skipOnboard = localStorage.getItem("skipOnboarding");
  if (skipOnboard === "true") return;

  document.getElementById("langOnboardingModal").style.display = "flex";
  const grid = document.getElementById("onboardLangGrid");
  grid.innerHTML = "";
  languages.forEach(lang => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `lang-btn-item ${lang.code === currentLang ? "active" : ""}`;
    btn.innerHTML = `<span style="font-size:1.4rem;">${lang.flag}</span> <span>${lang.name}</span>`;
    btn.onclick = () => {
      currentLang = lang.code;
      localStorage.setItem("userLang", lang.code);
      document.querySelectorAll("#onboardLangGrid .lang-btn-item").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      updateUI();
    };
    grid.appendChild(btn);
  });
}

function proceedToColorOnboarding() {
  localStorage.setItem("userLang", currentLang);
  const isChecked = document.getElementById("dontAskCheckbox").checked;
  if (isChecked) {
    localStorage.setItem("skipOnboarding", "true");
  }

  document.getElementById("langOnboardingModal").style.display = "none";
  document.getElementById("colorOnboardingModal").style.display = "flex";

  const palette = document.getElementById("onboardColorPalette");
  palette.innerHTML = "";

  if (typeof primarySixLuxuryColors !== "undefined") {
    primarySixLuxuryColors.forEach(color => {
      const circle = document.createElement("div");
      circle.className = "color-circle";
      if (color.toUpperCase() === userAccent.toUpperCase()) circle.classList.add("active");
      circle.style.backgroundColor = color;
      circle.onclick = () => {
        setAccentColor(color, true);
        document.querySelectorAll("#onboardColorPalette .color-circle").forEach(c => c.classList.remove("active"));
        circle.classList.add("active");
      };
      palette.appendChild(circle);
    });
  }
}

function finishOnboarding() {
  document.getElementById("colorOnboardingModal").style.display = "none";
}

function switchTab(tab, bypassPrayerGuard = false) {
  if (isPrayerActive && !bypassPrayerGuard && !isLiveCustomizing && !isLiveTextCustomizing && tab !== "guide") {
    showExitPrayerConfirmationToast(tab);
    return;
  }

  if (isLiveCustomizing && tab !== "guide") {
    isLiveCustomizing = false;
    document.getElementById("liveCustomizerToolbar").style.display = "none";
    exitPrayerSession(false, true);
  }
  if (isLiveTextCustomizing && tab !== "guide") {
    isLiveTextCustomizing = false;
    document.getElementById("liveTextCustomizerToolbar").style.display = "none";
    exitPrayerSession(false, true);
  }

  document.getElementById("extrasPanel").classList.remove("active");
  document.getElementById("settingsPanel").classList.remove("active");
  document.getElementById("languagePanel").classList.remove("active");

  if (tab === "guide") {
    if (isPrayerActive) {
      document.getElementById("swipeContainer").style.display = "flex";
      document.getElementById("prayerSessionTopBar").style.display = "block";
      document.getElementById("startPrayerScreen").style.display = "none";
      renderOnScreenControls();
    } else {
      document.getElementById("swipeContainer").style.display = "none";
      document.getElementById("prayerSessionTopBar").style.display = "none";
      document.getElementById("startPrayerScreen").style.display = "flex";
    }
  } else {
    document.getElementById("swipeContainer").style.display = "none";
    document.getElementById("prayerSessionTopBar").style.display = "none";
    document.getElementById("startPrayerScreen").style.display = "none";
    const onScreenControls = document.getElementById("onScreenNavControls");
    if (onScreenControls) onScreenControls.classList.remove("active");

    if (tab === "extras") {
      renderExtrasView();
      document.getElementById("extrasPanel").classList.add("active");
    } else if (tab === "settings") {
      populateSettingsPanel();
      document.getElementById("settingsPanel").classList.add("active");
    } else if (tab === "language") {
      populateLanguageList();
      document.getElementById("languagePanel").classList.add("active");
    }
  }

  ["navGuide", "navExtras", "navSettings", "navLanguage"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove("active");
  });

  const activeNav = document.getElementById(`nav${tab.charAt(0).toUpperCase() + tab.slice(1)}`);
  if (activeNav) activeNav.classList.add("active");
}

// تصدير الدوال للنطاق العام
window.switchTab = switchTab;
window.closePopup = id => {
  document.getElementById(id).classList.remove("active");
};
window.showOnboardingIfNeeded = showOnboardingIfNeeded;
window.proceedToColorOnboarding = proceedToColorOnboarding;
window.finishOnboarding = finishOnboarding;
window.openQrModal = openQrModal;
window.goToStep = goToStep;
window.startPrayerSession = startPrayerSession;
window.exitPrayerSession = exitPrayerSession;
window.confirmExitFromToast = confirmExitFromToast;
window.openHintModal = openHintModal;
window.closeHintModal = closeHintModal;
window.openLiveCustomizer = openLiveCustomizer;
window.saveAndExitLiveCustomizer = saveAndExitLiveCustomizer;
window.resetLiveButtonCustomizer = resetLiveButtonCustomizer;
window.togglePerStepPositioning = togglePerStepPositioning;
window.updateLiveButtonScale = updateLiveButtonScale;
window.updateLiveButtonOpacity = updateLiveButtonOpacity;
window.setLiveButtonLayout = setLiveButtonLayout;
window.toggleDualButtonsLock = toggleDualButtonsLock;
window.openUnifiedGuideTextCustomizer = openUnifiedGuideTextCustomizer;
window.toggleGuideTextVisibility = toggleGuideTextVisibility;
window.updateLiveTextScale = updateLiveTextScale;
window.resetLiveTextSizes = resetLiveTextSizes;
window.saveAndExitTextCustomizer = saveAndExitTextCustomizer;
window.toggleNavOption = toggleNavOption;
window.toggleAutoEndTasleem = toggleAutoEndTasleem;
window.updateShakeThreshold = updateShakeThreshold;
window.openTasbeehFullScreen = openTasbeehFullScreen;
window.closeTasbeehFullScreen = closeTasbeehFullScreen;
window.minimizeTasbeehToFloating = minimizeTasbeehToFloating;
window.expandTasbeehFromFloating = expandTasbeehFromFloating;
window.closeMiniTasbeehWidget = closeMiniTasbeehWidget;
window.switchTasbeehMode = switchTasbeehMode;
window.applyCustomTasbeehGoal = applyCustomTasbeehGoal;
window.repeatSavedGoal = repeatSavedGoal;
window.deleteSavedGoal = deleteSavedGoal;
window.launchExternalFloatingTasbeeh = launchExternalFloatingTasbeeh;
window.resetTasbeehCounter = resetTasbeehCounter;
window.toggleTasbeehHaptic = toggleTasbeehHaptic;
window.adjustTasbeehRingSize = adjustTasbeehRingSize;
window.handleTasbeehClick = handleTasbeehClick;
window.openCustomColor = openCustomColor;
window.closeModal = closeModal;

/* ==========================================================================
   التهيئة الأولية عند تشغيل الصفحة
   ========================================================================== */
(function init() {
  updateDirection();
  initThemeSystemListener();
  applyTheme();
  setAccentColor(userAccent, false);
  applyFontScale();
  updateUI();

  const container = document.getElementById("swipeContainer");
  container.addEventListener("touchstart", handleTouchStart, { passive: true });
  container.addEventListener("touchmove", handleTouchMove, { passive: true });
  container.addEventListener("touchend", handleTouchEnd, { passive: true });

  initFloatingToolbarDrag(
    document.getElementById("liveCustomizerToolbar"),
    document.getElementById("btnCustomizerDragHandle")
  );
  initFloatingToolbarDrag(
    document.getElementById("liveTextCustomizerToolbar"),
    document.getElementById("textCustomizerDragHandle")
  );

  document.getElementById("navGuide").onclick = () => switchTab("guide");
  document.getElementById("navExtras").onclick = () => switchTab("extras");
  document.getElementById("navSettings").onclick = () => switchTab("settings");
  document.getElementById("navLanguage").onclick = () => switchTab("language");

  if (typeof initAlwaysOnSplash === "function") {
    initAlwaysOnSplash();
  }
})();
