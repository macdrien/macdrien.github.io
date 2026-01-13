import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import DOMPurify from "https://cdn.jsdelivr.net/npm/dompurify@2.5.8/dist/purify.es.min.js";
import i18next from "https://cdn.jsdelivr.net/npm/i18next@23.10.0/dist/esm/i18next.js";

document.addEventListener("DOMContentLoaded", async () => {
  const translations = await loadTranslations();
  
  const browserLang = (navigator.language || navigator.userLanguage || "en").toLowerCase();
  let initialLang = browserLang.startsWith("fr") ? "fr" : "en";

  const langSwitcher = document.getElementById("lang-switcher");
  let currentLang = initialLang;
  langSwitcher.textContent = currentLang === "fr" ? "EN" : "FR";
  langSwitcher.onclick = async () => {
    currentLang = currentLang === "fr" ? "en" : "fr";
    langSwitcher.textContent = currentLang === "fr" ? "EN" : "FR";
    await i18next.changeLanguage(currentLang);
    updateLabelsFromI18n();
  };

  await loadLabels(translations, initialLang);
});

async function loadTranslations() {
  const [frResponse, enResponse] = await Promise.all([
    fetch('./resources/fr.json'),
    fetch('./resources/en.json')
  ]);
  const fr = await frResponse.json();
  const en = await enResponse.json();
  return { fr: { translation: fr }, en: { translation: en } };
}

function updateLabelsFromI18n() {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    const translation = i18next.t(key);
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return;
    }
    const sanitizedHtml = DOMPurify.sanitize(marked.parse(translation));
    // Remove the <p> and </p> tags
    element.innerHTML = sanitizedHtml.substring(3, sanitizedHtml.length - 5);
  });
}

async function loadLabels(translations, initialLang) {
  await i18next.init({
    lng: initialLang,
    resources: translations,
  });
  updateLabelsFromI18n();
}