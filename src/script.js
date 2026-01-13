import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import DOMPurify from "https://cdn.jsdelivr.net/npm/dompurify@2.5.8/dist/purify.es.min.js";
import i18next from "https://cdn.jsdelivr.net/npm/i18next@23.10.0/dist/esm/i18next.js";

const resizeObserver = new ResizeObserver((_entries) => updateNavNameText());
resizeObserver.observe(document.body);

document.addEventListener("DOMContentLoaded", async () => {
  const translations = await loadTranslations();
  
  const browserLang = (navigator.language || navigator.userLanguage || "en").toLowerCase();
  let initialLang = browserLang.startsWith("fr") ? "fr" : "en";

  document.getElementById("work-nav").onclick = () => goToId("work");
  document.getElementById("projects-nav").onclick = () => goToId("projects");
  document.getElementById("personal-nav").onclick = () => goToId("personal");
  const clickableName = document.getElementById("clickable-name");
  clickableName.onclick = () => goToId("main");

  const checkoutButton = document.getElementById("checkout-work");
  if (checkoutButton) {
    checkoutButton.onclick = () => goToId("work");
  }

  const langSwitcher = document.getElementById("lang-switcher");
  let currentLang = initialLang;
  langSwitcher.textContent = currentLang === "fr" ? "EN" : "FR";
  langSwitcher.onclick = async () => {
    currentLang = currentLang === "fr" ? "en" : "fr";
    langSwitcher.textContent = currentLang === "fr" ? "EN" : "FR";
    await i18next.changeLanguage(currentLang);
    updateLabelsFromI18n();
  };

  updateNavNameText();

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

function goToId(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function updateNavNameText() {
  const navName = document.getElementsByClassName("name")[0];
  navName.innerText =
    document.documentElement.clientWidth > 500 ? "Adrien BOUYSSOU" : "A.B.";
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