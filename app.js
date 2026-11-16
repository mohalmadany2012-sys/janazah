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

// أحجام النصوص المخصصة لكل عنصر على حدة
let customTextScales = JSON.parse(localStorage.getItem("customTextScales")) || {
  active: false,
  arabic: 1.55,
  translit: 0.88,
  trans: 0.98
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
  y: 78,
  scale: 1.0,
  opacity: 0.9,
  prevX: 28,
  prevY: 78,
  nextX: 72,
  nextY: 78
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

// حالة جلسة الصلاة والمستشعرات
let isPrayerActive = false;
let speechRecognizer = null;
let lastShakeTime = 0;
let shakeSensorBound = false;
let shakeMotionThreshold = parseInt(localStorage.getItem("nav_shakeThreshold")) || 12;
let shakeCoolDownActive = false;
let isTouchingScreen = false;

// التقليب باللمس
let swipeStartX = null;
let swipeStartY = null;
let extraSwipeCount = 0;

// التعرف الصوتي (Debounce 1.5 ثانية)
let lastVoiceCommandTime = 0;
const VOICE_DEBOUNCE_DELAY = 1500;

// مستويات قسم الإضافات والسبحة الإلكترونية المبتكرة
let extrasLevel = 1;
let selectedCategory = null;
let tasbeehCount = parseInt(localStorage.getItem("tasbeeh_count")) || 0;
let tasbeehTarget = parseInt(localStorage.getItem("tasbeeh_target")) || 0; // 0 = حر افتراضياً
let tasbeehMode = localStorage.getItem("tasbeeh_mode") || (tasbeehTarget > 0 ? "custom" : "free");
let tasbeehActiveDhikr = localStorage.getItem("tasbeeh_active_dhikr") || "";
let tasbeehMyGoals = JSON.parse(localStorage.getItem("tasbeeh_my_goals")) || [];
let tasbeehGoalCompletedFlag = false;
let tasbeehHaptic = localStorage.getItem("tasbeeh_haptic") !== "false";
let tasbeehRingSize = parseInt(localStorage.getItem("tasbeeh_ring_size")) || 200;
let isPipActive = false;

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

  if (isPipActive) renderTasbeehPipCanvas();
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

  // إذا لم يكن المستخدم قد خصص أحجاماً يدوية، نحدث القيم من الدرجة المختارة
  if (!customTextScales.active) {
    const presetMap = {
      small: { arabic: 1.25, translit: 0.78, trans: 0.85 },
      medium: { arabic: 1.55, translit: 0.88, trans: 0.98 },
      large: { arabic: 1.95, translit: 1.05, trans: 1.15 },
      huge: { arabic: 2.45, translit: 1.2, trans: 1.3 }
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
  if (isPipActive) renderTasbeehPipCanvas();
}

function updateDirection() {
  const langObj = languages.find(l => l.code === currentLang);
  const dir = langObj ? langObj.dir : "rtl";
  document.documentElement.setAttribute("dir", dir);
  document.documentElement.setAttribute("lang", currentLang === "العربية" ? "ar" : "en");
}

/* ==========================================================================
   2. إلزامية وسيلة تقليب واحدة على الأقل
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
   3. بناء بطاقات الدليل وإدارة ظهور النصوص وأحجامها الحية
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
  updateTrackPosition();
  updateProgressBar();
  renderOnScreenControls();

  if (isLiveCustomizing) {
    updateLiveCustomizerBadge();
    updateLiveCustomizerSliders();
  }
}

/* التخصيص الحي لأحجام النصوص (Live Text Size Customizer) */
function openLiveTextSizeCustomizer() {
  if (isLiveCustomizing) {
    isLiveCustomizing = false;
    document.getElementById("liveCustomizerToolbar").style.display = "none";
  }

  switchTab("guide");
  if (!isPrayerActive) {
    startPrayerSession();
  }

  isLiveTextCustomizing = true;
  const toolbar = document.getElementById("liveTextCustomizerToolbar");
  if (toolbar) toolbar.style.display = "block";

  const isArabic = currentLang === "العربية";
  const rowTranslit = document.getElementById("rowCustTranslitSize");
  const rowTrans = document.getElementById("rowCustTransSize");
  if (rowTranslit) rowTranslit.style.display = isArabic ? "none" : "flex";
  if (rowTrans) rowTrans.style.display = isArabic ? "none" : "flex";

  syncTextCustomizerSliders();
}

function syncTextCustomizerSliders() {
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
  syncTextCustomizerSliders();
}

function resetLiveTextSizes() {
  customTextScales = {
    active: false,
    arabic: 1.55,
    translit: 0.88,
    trans: 0.98
  };
  localStorage.removeItem("customTextScales");
  applyFontScale();
  syncTextCustomizerSliders();
}

function saveAndExitTextCustomizer() {
  isLiveTextCustomizing = false;
  const toolbar = document.getElementById("liveTextCustomizerToolbar");
  if (toolbar) toolbar.style.display = "none";

  localStorage.setItem("customTextScales", JSON.stringify(customTextScales));
  exitPrayerSession(false);
  switchTab("settings");
}

/* ==========================================================================
   4. عزل مستشعر الحركة والتعرف الصوتي والتقليب باللمس
   ========================================================================== */
function handleDeviceMotion(event) {
  if (!isPrayerActive || !navConfig.shake || isLiveCustomizing || isLiveTextCustomizing) return;
  if (shakeCoolDownActive || isTouchingScreen) return;

  const current = Date.now();
  if (current - lastShakeTime < 1400) return;

  const acc = event.accelerationIncludingGravity || event.acceleration;
  if (!acc) return;

  const delta = Math.sqrt(acc.x * acc.x + acc.y * acc.y + acc.z * acc.z);

  if (delta > shakeMotionThreshold) {
    lastShakeTime = current;
    if (currentStep < 3) {
      goToStep(currentStep + 1);
    } else if (navConfig.autoEndTasleem) {
      exitPrayerSession(true);
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
    speechRecognizer.interimResults = true;
    speechRecognizer.lang = "ar-SA";

    speechRecognizer.onresult = event => {
      if (!isPrayerActive || isLiveCustomizing || isLiveTextCustomizing) return;
      const currentTime = Date.now();

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript.trim().toLowerCase();

        if (currentTime - lastVoiceCommandTime < VOICE_DEBOUNCE_DELAY) continue;

        if (
          transcript.includes("الله أكبر") ||
          transcript.includes("الله اكبر") ||
          transcript.includes("اكبر")
        ) {
          if (currentStep < 3) {
            lastVoiceCommandTime = currentTime;
            goToStep(currentStep + 1);
          }
        }

        if (currentStep === 3 && navConfig.autoEndTasleem) {
          if (
            transcript.includes("السلام عليكم") ||
            transcript.includes("سلام عليكم") ||
            transcript.includes("ورحمة الله")
          ) {
            lastVoiceCommandTime = currentTime;
            exitPrayerSession(true);
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

function handleTouchEnd(e) {
  setTimeout(() => {
    isTouchingScreen = false;
  }, 150);
  if (!navConfig.swipe || !isPrayerActive || swipeStartX === null || isLiveCustomizing) return;

  const diffX = e.changedTouches[0].clientX - swipeStartX;
  const diffY = e.changedTouches[0].clientY - swipeStartY;

  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
    const isForward = diffX < 0;
    const isBackward = diffX > 0;

    if (isForward) {
      if (currentStep < 3) {
        goToStep(currentStep + 1);
      } else {
        extraSwipeCount++;
        if (extraSwipeCount >= 1 && !isLiveTextCustomizing) {
          exitPrayerSession(true);
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
   5. التخصيص الحي لأزرار الشاشة (إصلاح القفل والانتقال الفوري وحدود الحركة)
   ========================================================================== */
function openLiveCustomizer() {
  if (isLiveTextCustomizing) {
    isLiveTextCustomizing = false;
    document.getElementById("liveTextCustomizerToolbar").style.display = "none";
  }

  // تأكيد تفعيل الأزرار والانتقال الفوري إلى شاشة الدليل الحقيقية
  if (!navConfig.buttons) {
    navConfig.buttons = true;
    localStorage.setItem("nav_buttons", "true");
  }

  switchTab("guide");
  if (!isPrayerActive) {
    startPrayerSession();
  }

  isLiveCustomizing = true;
  document.getElementById("liveCustomizerToolbar").style.display = "block";
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
    // عند فك القفل لأول مرة، نفصل إحداثيات الزرين حول المركز الحالي لئلا يقفزا بعيداً
    cfg.prevX = Math.max(10, Math.min(90, (cfg.x || 50) - 14));
    cfg.prevY = cfg.y || 78;
    cfg.nextX = Math.max(10, Math.min(90, (cfg.x || 50) + 14));
    cfg.nextY = cfg.y || 78;
  } else if (checked && !navConfig.lockDualButtons) {
    // عند إعادة القفل، نجمع الزرين في منتصف المسافة بينهما
    cfg.x = Math.round(((cfg.prevX || 30) + (cfg.nextX || 70)) / 2);
    cfg.y = Math.round(((cfg.prevY || 78) + (cfg.nextY || 78)) / 2);
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

  exitPrayerSession(false);
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

/* عرض أزرار الشاشة (مع دعم التحريك المنفصل عند فك القفل في المعاينة وأثناء الصلاة) */
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
        if (!isLiveCustomizing) exitPrayerSession(true);
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
    // نمط الزرين (dual): إذا كان القفل مفعلاً يتحركان ككتلة واحدة، وإذا فُك القفل يستقل كل زر بموضعه
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
          if (!isLiveCustomizing) exitPrayerSession(true);
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
      // القفل مفتوح: كل زر في عنصر مستقل تماماً بسحبه وإحداثياته الخاصة
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
          if (!isLiveCustomizing) exitPrayerSession(true);
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

function initDragHandler(element, onPositionUpdate) {
  let isDragging = false;

  function updatePos(clientX, clientY) {
    const vw = window.innerWidth || document.documentElement.clientWidth;
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const rect = element.getBoundingClientRect();

    // قيد أفقي صارم يمنع خروج الأزرار يميناً أو يساراً، وحرية كاملة من أعلى الشاشة لأسفلها
    const halfWPercent = Math.ceil(((rect.width || 64) / 2 / vw) * 100) + 2;
    const halfHPercent = Math.ceil(((rect.height || 56) / 2 / vh) * 100) + 1;

    let x = (clientX / vw) * 100;
    let y = (clientY / vh) * 100;

    x = Math.max(halfWPercent, Math.min(100 - halfWPercent, Math.round(x * 10) / 10));
    y = Math.max(halfHPercent, Math.min(100 - halfHPercent, Math.round(y * 10) / 10));

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
   6. إدارة جلسة الصلاة
   ========================================================================== */
function startPrayerSession() {
  isPrayerActive = true;
  currentStep = 0;
  extraSwipeCount = 0;

  shakeCoolDownActive = true;
  setTimeout(() => {
    shakeCoolDownActive = false;
  }, 5000);

  document.getElementById("startPrayerScreen").style.display = "none";
  document.getElementById("prayerSessionTopBar").style.display = "block";
  document.getElementById("swipeContainer").style.display = "flex";

  updateTrackPosition();
  updateProgressBar();
  renderOnScreenControls();

  if (navConfig.voice && !isLiveCustomizing && !isLiveTextCustomizing) startVoiceRecognition();
  if (navConfig.shake && !isLiveCustomizing && !isLiveTextCustomizing) initShakeSensor();
}

function exitPrayerSession(isCompleted = false) {
  isPrayerActive = false;
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
   7. السبحة الإلكترونية المبتكرة (Mini-Widget التفاعلي + PiP + الأهداف المخصصة)
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
  if (mode === "free") {
    tasbeehTarget = 0;
    tasbeehActiveDhikr = "";
    localStorage.setItem("tasbeeh_target", 0);
    localStorage.setItem("tasbeeh_active_dhikr", "");
    if (customForm) customForm.style.display = "none";
  } else {
    if (customForm) customForm.style.display = "flex";
  }

  updateTasbeehUI();
}

function sanitizeDhikrText(raw) {
  // إزالة أي نقطتين رأسيتين يكتبهما المستخدم لأن الواجهة تضيفهما بشكل آمن
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

  tasbeehActiveDhikr = cleanDhikr;
  tasbeehTarget = targetNum;
  tasbeehCount = 0;
  tasbeehMode = "custom";
  tasbeehGoalCompletedFlag = false;

  localStorage.setItem("tasbeeh_active_dhikr", tasbeehActiveDhikr);
  localStorage.setItem("tasbeeh_target", tasbeehTarget);
  localStorage.setItem("tasbeeh_count", tasbeehCount);
  localStorage.setItem("tasbeeh_mode", "custom");

  hideGoalSuccessBanner();
  updateTasbeehUI();
  triggerHaptic(40);
}

function saveCompletedGoalToHistory(dhikr, target) {
  const cleanName = sanitizeDhikrText(dhikr) || t("tasbeehOfficialTitle", "السبحة الإلكترونية");
  const existingIdx = tasbeehMyGoals.findIndex(
    g => g.dhikr === cleanName && Number(g.target) === Number(target)
  );

  if (existingIdx !== -1) {
    tasbeehMyGoals[existingIdx].completedAt = Date.now();
  } else {
    tasbeehMyGoals.unshift({
      id: Date.now() + Math.random().toString(36).slice(2, 6),
      dhikr: cleanName,
      target: Number(target),
      completedAt: Date.now()
    });
  }

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

  localStorage.setItem("tasbeeh_mode", "custom");
  localStorage.setItem("tasbeeh_active_dhikr", tasbeehActiveDhikr);
  localStorage.setItem("tasbeeh_target", tasbeehTarget);
  localStorage.setItem("tasbeeh_count", 0);

  const dhikrInput = document.getElementById("inputCustomDhikr");
  const numInput = document.getElementById("inputCustomTargetNum");
  if (dhikrInput) dhikrInput.value = tasbeehActiveDhikr;
  if (numInput) numInput.value = tasbeehTarget;

  hideGoalSuccessBanner();
  updateTasbeehUI();
  triggerHaptic(40);
}

function deleteSavedGoal(goalId) {
  tasbeehMyGoals = tasbeehMyGoals.filter(g => String(g.id) !== String(goalId));
  localStorage.setItem("tasbeeh_my_goals", JSON.stringify(tasbeehMyGoals));
  renderMyGoalsList();
}

function renderMyGoalsList() {
  const listEl = document.getElementById("myGoalsListContainer");
  const badgeEl = document.getElementById("myGoalsCountBadge");
  if (!listEl) return;

  if (badgeEl) badgeEl.innerText = tasbeehMyGoals.length;

  if (tasbeehMyGoals.length === 0) {
    listEl.innerHTML = `<div class="my-goals-empty">${t("noSavedGoalsYet", "لا توجد أهداف مكتملة بعد. حدد هدفاً وأكمله ليُحفظ هنا.")}</div>`;
    return;
  }

  listEl.innerHTML = "";
  tasbeehMyGoals.forEach(item => {
    const row = document.createElement("div");
    row.className = "my-goal-item";
    row.innerHTML = `
      <div class="my-goal-info">
        <span class="bidi-safe">${item.dhikr}</span><span class="colon-sep">:</span>
        <span class="my-goal-target-num">${item.target}</span>
        <span style="color:#10b981; margin-inline-start:6px;">✓</span>
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
      saveCompletedGoalToHistory(tasbeehActiveDhikr, tasbeehTarget);
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
      targetLabel.innerText = `${t("freeGoalMode", "الهدف الحر")} ∞`;
    }
    if (activeBanner) activeBanner.style.display = "none";
  }

  const btnFree = document.getElementById("btnModeFreeTasbeeh");
  const btnCustom = document.getElementById("btnModeCustomGoal");
  const customForm = document.getElementById("customGoalFormBox");

  if (tasbeehMode === "custom") {
    btnCustom?.classList.add("active");
    btnFree?.classList.remove("active");
    if (customForm) customForm.style.display = "flex";
  } else {
    btnFree?.classList.add("active");
    btnCustom?.classList.remove("active");
    if (customForm) customForm.style.display = "none";
  }

  const circle = document.getElementById("tasbeehCircleProg");
  if (circle) {
    const perimeter = 603;
    if (tasbeehMode === "custom" && tasbeehTarget > 0) {
      const ratio = Math.min(1, tasbeehCount / tasbeehTarget);
      const offset = perimeter - ratio * perimeter;
      circle.style.strokeDashoffset = offset;
    } else {
      const freeProgress = (tasbeehCount % 33) / 33;
      const offset = perimeter - freeProgress * perimeter;
      circle.style.strokeDashoffset = tasbeehCount > 0 && freeProgress === 0 ? 0 : offset;
    }
  }

  const ring = document.getElementById("tasbeehTouchRing");
  if (ring) {
    ring.style.width = `${tasbeehRingSize}px`;
    ring.style.height = `${tasbeehRingSize}px`;
  }
  const chkHaptic = document.getElementById("chkTasbeehHaptic");
  if (chkHaptic) chkHaptic.checked = tasbeehHaptic;

  if (isPipActive) renderTasbeehPipCanvas();
}

/* دعم Picture-in-Picture (PiP) عبر Canvas & Video للعمل فوق التطبيقات الأخرى */
function renderTasbeehPipCanvas() {
  const canvas = document.getElementById("tasbeehPipCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);

  // خلفية دائرية داكنة أنيقة
  ctx.fillStyle = "#070A0F";
  ctx.fillRect(0, 0, w, h);

  // حلقة التقدم
  const cx = w / 2;
  const cy = h / 2;
  const radius = 118;

  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(148, 163, 184, 0.2)";
  ctx.lineWidth = 14;
  ctx.stroke();

  let ratio = (tasbeehCount % 33) / 33;
  if (tasbeehMode === "custom" && tasbeehTarget > 0) {
    ratio = Math.min(1, tasbeehCount / tasbeehTarget);
  }

  ctx.beginPath();
  ctx.arc(cx, cy, radius, -Math.PI / 2, -Math.PI / 2 + ratio * Math.PI * 2);
  ctx.strokeStyle = userAccent || "#0284C7";
  ctx.lineWidth = 14;
  ctx.lineCap = "round";
  ctx.stroke();

  // اسم الذكر في الأعلى
  ctx.fillStyle = "#94a3b8";
  ctx.font = "bold 20px 'Noto Sans Arabic', sans-serif";
  ctx.textAlign = "center";
  const topLabel =
    tasbeehMode === "custom" && tasbeehActiveDhikr
      ? tasbeehActiveDhikr
      : t("tasbeehOfficialTitle", "السبحة الإلكترونية");
  ctx.fillText(topLabel, cx, cy - 48);

  // العدد الرئيسي
  ctx.fillStyle = "#f8fafc";
  ctx.font = "800 68px 'Inter', sans-serif";
  ctx.fillText(String(tasbeehCount), cx, cy + 20);

  // الهدف في الأسفل
  ctx.fillStyle = userAccent || "#0284C7";
  ctx.font = "bold 20px 'Noto Sans Arabic', sans-serif";
  const bottomLabel =
    tasbeehMode === "custom" && tasbeehTarget > 0
      ? `${tasbeehCount} / ${tasbeehTarget}`
      : "∞";
  ctx.fillText(bottomLabel, cx, cy + 68);
}

async function toggleTasbeehPiP() {
  const video = document.getElementById("tasbeehPipVideo");
  const canvas = document.getElementById("tasbeehPipCanvas");

  if (!video || !canvas || !document.pictureInPictureEnabled) {
    minimizeTasbeehToFloating();
    return;
  }

  try {
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture();
      isPipActive = false;
      return;
    }

    renderTasbeehPipCanvas();
    if (!video.srcObject) {
      const stream = canvas.captureStream(15);
      video.srcObject = stream;
    }
    await video.play();
    await video.requestPictureInPicture();
    isPipActive = true;

    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: tasbeehActiveDhikr || t("tasbeehOfficialTitle", "السبحة الإلكترونية"),
        artist: t("splashAppTitle", "دليل الجنازة")
      });
      navigator.mediaSession.setActionHandler("play", () => {
        handleTasbeehClick();
      });
      navigator.mediaSession.setActionHandler("pause", () => {
        handleTasbeehClick();
      });
      navigator.mediaSession.setActionHandler("nexttrack", () => {
        handleTasbeehClick();
      });
    }

    video.onleavepictureinpicture = () => {
      isPipActive = false;
    };
  } catch (err) {
    // في حال عدم دعم المتصفح للـ PiP نتحول فوراً للـ Mini-Widget التفاعلي العائم
    minimizeTasbeehToFloating();
  }
}

/* ==========================================================================
   8. فتح الـ 200 لون إضافي وشبكة التمرير
   ========================================================================== */
function openCustomColor(fromOnboarding = false) {
  const palette = document.getElementById("premiumColorPalette");
  if (!palette) return;
  palette.innerHTML = "";

  const countBadge = document.getElementById("customColorCountBadge");
  if (countBadge) countBadge.innerText = t("twoHundredColorsBadge", "200 لون");

  if (typeof allTwoHundredColors !== "undefined") {
    allTwoHundredColors.forEach(color => {
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
  }
  document.getElementById("customColorModal").classList.add("active");
}

function closeModal() {
  document.getElementById("customColorModal").classList.remove("active");
}

/* ==========================================================================
   9. التحكم في ظهور نصوص الدليل ولوحة الإعدادات الشاملة
   ========================================================================== */
function toggleTextVisibility(key) {
  textVisibility[key] = !textVisibility[key];
  localStorage.setItem(`vis_${key}`, textVisibility[key]);
  buildSlides();
  populateSettingsPanel();
}

function getShakeSensitivityDesc(val) {
  const v = parseInt(val, 10);
  if (v <= 9) return t("shakeVeryEasy", "أسهل / فائق الحساسية");
  if (v <= 15) return t("shakeModerate", "معتدل");
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

    <!-- 3. إعدادات حجم الخط + زر التخصيص الحي لأحجام النصوص -->
    <div class="setting-group">
      <div class="setting-title">${t("fontSize", "حجم الخط")}</div>
      <div class="pill-button-group">
        <button type="button" data-font="small" class="pill-btn font-btn ${currentFont === "small" ? "active" : ""}">${t("small", "صغير")}</button>
        <button type="button" data-font="medium" class="pill-btn font-btn ${currentFont === "medium" ? "active" : ""}">${t("medium", "متوسط")}</button>
        <button type="button" data-font="large" class="pill-btn font-btn ${currentFont === "large" ? "active" : ""}">${t("large", "كبير")}</button>
        <button type="button" data-font="huge" class="pill-btn font-btn ${currentFont === "huge" ? "active" : ""}">${t("huge", "ضخم")}</button>
      </div>
      <button type="button" class="styled-action-btn" onclick="openLiveTextSizeCustomizer()" style="border-color: rgba(var(--accent-rgb), 0.4); color: var(--accent);">
        🔠 ${t("customizeTextSizesBtn", "تخصيص أحجام النصوص")}
      </button>
      <div class="font-sub-notice">
        ${t("fontNotice", "يتغير حجم الخط بوضوح داخل الأدعية والدليل، ويبقى متزناً في الواجهة للحفاظ على الشاشة")}
      </div>
    </div>

    <!-- 4. تخصيص ظهور نصوص الدليل (يظهر فقط في اللغات غير العربية) -->
    ${
      !isArabicLang
        ? `
    <div class="setting-group">
      <div class="setting-title">${t("textDisplayOptions", "ظهور نصوص الدليل")}</div>
      <div class="text-display-toggle-group">
        <button type="button" class="text-display-toggle-btn ${textVisibility.arabic ? "active" : ""}" onclick="toggleTextVisibility('arabic')">
          ${textVisibility.arabic ? "✓ " : ""}${t("arabicScript", "النص العربي")}
        </button>
        <button type="button" class="text-display-toggle-btn ${textVisibility.translit ? "active" : ""}" onclick="toggleTextVisibility('translit')">
          ${textVisibility.translit ? "✓ " : ""}${t("translitScript", "النطق اللاتيني")}
        </button>
        <button type="button" class="text-display-toggle-btn ${textVisibility.translation ? "active" : ""}" onclick="toggleTextVisibility('translation')">
          ${textVisibility.translation ? "✓ " : ""}${t("meaningTrans", "الترجمة")}
        </button>
      </div>
      <button type="button" class="styled-action-btn" onclick="openLiveTextSizeCustomizer()" style="margin-top: 10px; border-color: rgba(var(--accent-rgb), 0.35); color: var(--accent);">
        🔠 ${t("customizeTextSizesBtn", "تخصيص أحجام النصوص")}
      </button>
    </div>
    `
        : ""
    }

    <!-- 5. طرق التقليب والتنقل -->
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
      <!-- شريط حساسية الاهتزاز المترجم بالكامل مع فصل النقطتين -->
      <div id="shakeSensitivityRow" style="display: ${navConfig.shake ? "block" : "none"}; padding: 0 12px 14px; border-bottom: 1px solid rgba(128,128,128,0.08);">
         <div style="font-size: 0.78rem; color: var(--text-secondary); margin-bottom: 6px; display: flex; justify-content: space-between; align-items: center;">
           <div><span class="bidi-safe">${t("shakeForceRequired", "قوة الاهتزاز المطلوبة")}</span><span class="colon-sep">:</span></div>
           <span id="shakeThresholdVal" class="bidi-safe">${shakeMotionThreshold} (${getShakeSensitivityDesc(shakeMotionThreshold)})</span>
         </div>
         <input type="range" min="7" max="25" value="${shakeMotionThreshold}" oninput="updateShakeThreshold(this.value)" style="width: 100%; accent-color: var(--accent);">
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
  shakeMotionThreshold = parseInt(val, 10);
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
   10. قوائم قسم الإضافات (الأدعية والسبحة)
   ========================================================================== */
function renderExtrasView() {
  const container = document.getElementById("extrasPanel");
  if (!container) return;
  container.innerHTML = "";

  if (extrasLevel === 1) {
    container.innerHTML = `
      <div class="extras-menu-card" onclick="openTasbeehFullScreen()" style="border-color: var(--accent); background: linear-gradient(135deg, rgba(var(--accent-rgb), 0.15), rgba(var(--accent-rgb), 0.05));">
        <div class="extras-menu-left">
          <div class="extras-card-icon">📿</div>
          <div style="min-width:0;">
            <div class="extras-item-title">${t("tasbeehOfficialTitle", "السبحة الإلكترونية")}</div>
            <div class="extras-item-sub">${t("tasbeehOfficialSub", "شاشة كاملة منفصلة، عداد ذكي، وحفظ تلقائي للأرقام")}</div>
          </div>
        </div>
        <div style="font-size:1.2rem; color:var(--accent);">❯</div>
      </div>
      
      <div class="extras-menu-card" onclick="openExtrasLevel2()">
        <div class="extras-menu-left">
          <div class="extras-card-icon">🤲</div>
          <div style="min-width:0;">
            <div class="extras-item-title">${t("adhkarAndDuas", "الأذكار والأدعية")}</div>
            <div class="extras-item-sub">${t("adhkarSub", "أدعية المتوفى، سنن وآداب الجنائز، أذكار عامة مأثورة")}</div>
          </div>
        </div>
        <div style="font-size:1.2rem; color:var(--text-secondary);">❯</div>
      </div>
    `;
  } else if (extrasLevel === 2) {
    let html = `
      <div class="extras-nav-header">
        <button type="button" class="extras-back-btn" onclick="extrasGoBack()">
          ${t("backBtn", "❮ عودة")}
        </button>
        <div class="extras-view-title">${t("adhkarAndDuas", "الأذكار والأدعية")}</div>
      </div>
    `;

    if (typeof duasData !== "undefined") {
      duasData.forEach(cat => {
        const catTitle = cat.title[currentLang] || cat.title["العربية"];
        const catDesc = cat.desc[currentLang] || cat.desc["العربية"];
        html += `
          <div class="extras-menu-card" onclick="openExtrasLevel3('${cat.id}')">
            <div class="extras-menu-left">
              <div class="extras-card-icon">${cat.icon}</div>
              <div style="min-width:0;">
                <div class="extras-item-title">${catTitle}</div>
                <div class="extras-item-sub">${catDesc}</div>
              </div>
            </div>
            <div style="font-size:1.15rem; color:var(--text-secondary);">❯</div>
          </div>
        `;
      });
    }

    container.innerHTML = html;
  } else if (extrasLevel === 3 && selectedCategory) {
    const catTitle = selectedCategory.title[currentLang] || selectedCategory.title["العربية"];
    let html = `
      <div class="extras-nav-header">
        <button type="button" class="extras-back-btn" onclick="extrasGoBack()">
          ${t("backBtn", "❮ عودة")}
        </button>
        <div class="extras-view-title">${catTitle}</div>
      </div>
    `;

    selectedCategory.items.forEach(item => {
      const itemTitle = item.title[currentLang] || item.title["العربية"];
      const itemMeaning = item.meaning[currentLang] || item.meaning["العربية"] || "";
      html += `
        <div class="dua-entry-card">
          <div class="dua-entry-title">
            <span>🔹</span>
            <span style="flex:1;">${itemTitle}</span>
          </div>
          <div class="dua-entry-arabic">${item.arabic}</div>
          ${itemMeaning ? `<div class="dua-entry-meaning">${itemMeaning}</div>` : ""}
        </div>
      `;
    });

    container.innerHTML = html;
  }
}

function openExtrasLevel2() {
  extrasLevel = 2;
  renderExtrasView();
}
function openExtrasLevel3(catId) {
  if (typeof duasData !== "undefined") {
    selectedCategory = duasData.find(c => c.id === catId);
    if (!selectedCategory) return;
    extrasLevel = 3;
    renderExtrasView();
  }
}
function extrasGoBack() {
  if (extrasLevel === 3) extrasLevel = 2;
  else if (extrasLevel === 2) extrasLevel = 1;
  renderExtrasView();
}

/* ==========================================================================
   11. نافذة التلميحات، اللغات، وتحديث نصوص الواجهة بالكامل
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
  if (countBadge) countBadge.innerText = t("twoHundredColorsBadge", "200 لون");
  const closeColorModalBtn = document.getElementById("closeColorModalBtn");
  if (closeColorModalBtn) closeColorModalBtn.innerText = t("close", "إغلاق");

  // ترجمة شريط التخصيص الحي للأزرار
  const liveBtnCustTitle = document.getElementById("liveBtnCustTitle");
  if (liveBtnCustTitle) liveBtnCustTitle.innerText = `⚙️ ${t("customizeButtons", "المعاينة والتخصيص الحي للأزرار")}`;
  const lblBtnStyleChoice = document.getElementById("lblBtnStyleChoice");
  if (lblBtnStyleChoice) lblBtnStyleChoice.innerText = t("buttonStyleLabel", "نمط ظهور الأزرار");
  const liveBtnStyleSingle = document.getElementById("liveBtnStyleSingle");
  if (liveBtnStyleSingle) liveBtnStyleSingle.innerText = t("singleForwardBtn", "زر تقدم واحد");
  const liveBtnStyleDual = document.getElementById("liveBtnStyleDual");
  if (liveBtnStyleDual) liveBtnStyleDual.innerText = t("dualPrevNextBtn", "زرين (سابق / تالي)");
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

  // ترجمة شريط التخصيص الحي لأحجام النصوص
  const liveTextCustTitle = document.getElementById("liveTextCustTitle");
  if (liveTextCustTitle) liveTextCustTitle.innerText = `🔠 ${t("customizeTextSizesBtn", "تخصيص أحجام النصوص")}`;
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
  if (tasbeehFsTitle) tasbeehFsTitle.innerText = t("tasbeehOfficialTitle", "السبحة الإلكترونية");
  const btnMinimizeTasbeehText = document.getElementById("btnMinimizeTasbeehText");
  if (btnMinimizeTasbeehText) btnMinimizeTasbeehText.innerText = t("minimizeBtn", "تصغير");
  const btnPipTasbeehText = document.getElementById("btnPipTasbeehText");
  if (btnPipTasbeehText) btnPipTasbeehText.innerText = t("pipBtnLabel", "عائم خارجي");
  const btnCloseTasbeehText = document.getElementById("btnCloseTasbeehText");
  if (btnCloseTasbeehText) btnCloseTasbeehText.innerText = t("close", "إغلاق");
  const tasbeehNotice = document.getElementById("tasbeehAutoSaveNotice");
  if (tasbeehNotice) tasbeehNotice.innerText = `💾 ${t("tasbeehNotice", "يقوم العداد بحفظ أرقام التسبيح والأهداف تلقائياً حتى عند إغلاق التطبيق")}`;
  const btnModeFreeTasbeeh = document.getElementById("btnModeFreeTasbeeh");
  if (btnModeFreeTasbeeh) btnModeFreeTasbeeh.innerText = `${t("freeGoalMode", "الهدف الحر")} ∞`;
  const btnModeCustomGoal = document.getElementById("btnModeCustomGoal");
  if (btnModeCustomGoal) btnModeCustomGoal.innerText = `${t("setCustomGoalMode", "تحديد هدف")} 🎯`;
  const inputCustomDhikr = document.getElementById("inputCustomDhikr");
  if (inputCustomDhikr) inputCustomDhikr.placeholder = t("dhikrInputPlaceholder", "اكتب الذكر (مثل: سبحان الله)");
  const inputCustomTargetNum = document.getElementById("inputCustomTargetNum");
  if (inputCustomTargetNum) inputCustomTargetNum.placeholder = t("targetCountPlaceholder", "العدد (مثل: 110)");
  const btnStartCustomGoal = document.getElementById("btnStartCustomGoal");
  if (btnStartCustomGoal) btnStartCustomGoal.innerText = t("startCustomGoalBtn", "بدء الهدف المخصص");
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
   12. شاشة التهيئة الأولى (Onboarding) والتبديل بين التبويبات
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

function switchTab(tab) {
  if (isLiveCustomizing && tab !== "guide") {
    isLiveCustomizing = false;
    document.getElementById("liveCustomizerToolbar").style.display = "none";
    exitPrayerSession(false);
  }
  if (isLiveTextCustomizing && tab !== "guide") {
    isLiveTextCustomizing = false;
    document.getElementById("liveTextCustomizerToolbar").style.display = "none";
    exitPrayerSession(false);
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
      extrasLevel = 1;
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
window.openLiveTextSizeCustomizer = openLiveTextSizeCustomizer;
window.updateLiveTextScale = updateLiveTextScale;
window.resetLiveTextSizes = resetLiveTextSizes;
window.saveAndExitTextCustomizer = saveAndExitTextCustomizer;
window.toggleNavOption = toggleNavOption;
window.toggleAutoEndTasleem = toggleAutoEndTasleem;
window.updateShakeThreshold = updateShakeThreshold;
window.openExtrasLevel2 = openExtrasLevel2;
window.openExtrasLevel3 = openExtrasLevel3;
window.extrasGoBack = extrasGoBack;
window.openTasbeehFullScreen = openTasbeehFullScreen;
window.closeTasbeehFullScreen = closeTasbeehFullScreen;
window.minimizeTasbeehToFloating = minimizeTasbeehToFloating;
window.expandTasbeehFromFloating = expandTasbeehFromFloating;
window.closeMiniTasbeehWidget = closeMiniTasbeehWidget;
window.switchTasbeehMode = switchTasbeehMode;
window.applyCustomTasbeehGoal = applyCustomTasbeehGoal;
window.repeatSavedGoal = repeatSavedGoal;
window.deleteSavedGoal = deleteSavedGoal;
window.toggleTasbeehPiP = toggleTasbeehPiP;
window.resetTasbeehCounter = resetTasbeehCounter;
window.toggleTasbeehHaptic = toggleTasbeehHaptic;
window.adjustTasbeehRingSize = adjustTasbeehRingSize;
window.handleTasbeehClick = handleTasbeehClick;
window.openCustomColor = openCustomColor;
window.closeModal = closeModal;
window.toggleTextVisibility = toggleTextVisibility;

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
  container.addEventListener("touchend", handleTouchEnd, { passive: true });

  document.getElementById("navGuide").onclick = () => switchTab("guide");
  document.getElementById("navExtras").onclick = () => switchTab("extras");
  document.getElementById("navSettings").onclick = () => switchTab("settings");
  document.getElementById("navLanguage").onclick = () => switchTab("language");

  if (typeof initAlwaysOnSplash === "function") {
    initAlwaysOnSplash();
  }
})();