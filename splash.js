/* ==========================================================================
   إدارة شاشة البداية المستقلة ونظام التحديثات الذكي (splash.js)
   ========================================================================== */

const CURRENT_APP_VERSION = "1.0.0";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.mohalmadany.janaza";
const VERSION_CHECK_URL = "https://raw.githubusercontent.com/mohalmadany2012-sys/janazah-update/refs/heads/main/version.json";

function splashTranslate(key, fallback) {
  const activeLang = (typeof currentLang !== "undefined" && currentLang)
    ? currentLang
    : (localStorage.getItem("userLang") || "العربية");

  if (typeof uiMap !== "undefined" && uiMap[key] && uiMap[key][activeLang]) {
    return uiMap[key][activeLang];
  }
  return fallback;
}

function localizeSplashAndUpdateUI() {
  const titleEl = document.getElementById("splashTitleText");
  const subEl = document.getElementById("splashSubText");
  const statusEl = document.getElementById("splashStatusText");

  if (titleEl) titleEl.innerText = splashTranslate("splashAppTitle", "دليل الجنازة");
  if (subEl) subEl.innerText = splashTranslate("splashAppSubtitle", "صفة صلاة الجنازة وأحكامها");
  if (statusEl) statusEl.innerText = splashTranslate("checkingUpdates", "جاري التحقق من التحديثات...");

  const updTitle = document.getElementById("updateTitle");
  const updDesc = document.getElementById("updateDesc");
  const btnNowText = document.getElementById("btnUpdateNowText");
  const btnLater = document.getElementById("btnUpdateLater");
  const btnStoreLink = document.getElementById("btnUpdateStore");

  if (updTitle) updTitle.innerText = splashTranslate("updateAvailableTitle", "تحديث جديد متوفر");
  if (updDesc) updDesc.innerText = splashTranslate("updateAvailableDesc", "يتوفر إصدار أحدث وأكثر استقراراً من تطبيق دليل الجنازة على متجر Google Play.");
  if (btnNowText) btnNowText.innerText = splashTranslate("updateNowBtn", "تحديث الآن");
  if (btnLater) btnLater.innerText = splashTranslate("updateLaterBtn", "لاحقاً");
  if (btnStoreLink) btnStoreLink.href = PLAY_STORE_URL;
}

function compareVersions(v1, v2) {
  const p1 = String(v1).trim().split(".").map(Number);
  const p2 = String(v2).trim().split(".").map(Number);
  for (let i = 0; i < Math.max(p1.length, p2.length); i++) {
    const num1 = p1[i] || 0;
    const num2 = p2[i] || 0;
    if (num1 > num2) return 1;
    if (num1 < num2) return -1;
  }
  return 0;
}

async function checkForAppUpdates() {
  // في حال عدم وجود إنترنت يتخطى الفحص فوراً دون تأخير
  if (!navigator.onLine) return false;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const response = await fetch(`${VERSION_CHECK_URL}?t=${Date.now()}`, {
      signal: controller.signal,
      cache: "no-store"
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      const latestVersion = data.version || data.latestVersion || CURRENT_APP_VERSION;
      if (compareVersions(latestVersion, CURRENT_APP_VERSION) > 0) {
        showUpdateModal();
        return true;
      }
    }
  } catch (err) {
    // في حال ضعف الشبكة أو تعذر الوصول يتم التخطي بأمان تام
  }
  return false;
}

function showUpdateModal() {
  localizeSplashAndUpdateUI();
  const modal = document.getElementById("updateRequiredModal");
  if (modal) {
    modal.classList.add("active");
  }
}

function dismissUpdateModal() {
  const modal = document.getElementById("updateRequiredModal");
  if (modal) {
    modal.classList.remove("active");
  }
  if (typeof showOnboardingIfNeeded === "function") {
    showOnboardingIfNeeded();
  }
}

function initAlwaysOnSplash() {
  const splash = document.getElementById("alwaysOnSplashScreen");
  const progFill = document.getElementById("splashProgressFill");

  localizeSplashAndUpdateUI();

  if (!splash) {
    if (typeof showOnboardingIfNeeded === "function") showOnboardingIfNeeded();
    checkForAppUpdates();
    return;
  }

  requestAnimationFrame(() => {
    if (progFill) progFill.style.width = "45%";
  });

  setTimeout(() => {
    if (progFill) progFill.style.width = "85%";
  }, 650);

  setTimeout(async () => {
    if (progFill) progFill.style.width = "100%";

    const hasUpdate = await checkForAppUpdates();

splash.classList.add("hide-splash");
    setTimeout(() => {
      splash.style.display = "none";
      if (!hasUpdate && typeof showOnboardingIfNeeded === "function") {
        showOnboardingIfNeeded();
      }
    }, 520);
  }, 3000);
}

// تصدير الدوال للنطاق العام
window.CURRENT_APP_VERSION = CURRENT_APP_VERSION;
window.compareVersions = compareVersions;
window.checkForAppUpdates = checkForAppUpdates;
window.dismissUpdateModal = dismissUpdateModal;
window.localizeSplashAndUpdateUI = localizeSplashAndUpdateUI;
window.initAlwaysOnSplash = initAlwaysOnSplash;
