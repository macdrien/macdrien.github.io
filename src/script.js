import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import DOMPurify from "https://cdn.jsdelivr.net/npm/dompurify@2.5.8/dist/purify.es.min.js";
import i18next from "https://cdn.jsdelivr.net/npm/i18next@23.10.0/dist/esm/i18next.js";

const resizeObserver = new ResizeObserver((_entries) => updateNavNameText());
resizeObserver.observe(document.body);

async function loadTranslations() {
  const [frResponse, enResponse] = await Promise.all([
    fetch('./resources/fr.json'),
    fetch('./resources/en.json')
  ]);
  const fr = await frResponse.json();
  const en = await enResponse.json();
  return { fr, en };
}

document.addEventListener("DOMContentLoaded", async () => {
  const translations = await loadTranslations();
  
  const contactLanding = document.getElementById("contact-landing");
  const contactNav = document.getElementById("contact-nav");
  contactLanding.onclick = () => goToId("contact");
  contactNav.onclick = () => goToId("contact");
  
  document.getElementById("work-nav").onclick = () => goToId("work");
  document.getElementById("projects-nav").onclick = () => goToId("projects");
  document.getElementById("personal-nav").onclick = () => goToId("personal");
  const clickableName = document.getElementById("clickable-name");
  clickableName.onclick = () => goToId("main");

  const checkoutButton = document.getElementById("checkout-work");
  if (checkoutButton) {
    checkoutButton.onclick = () => goToId("work");
  }

  // Language switcher logic
  const langSwitcher = document.getElementById("lang-switcher");
  let currentLang = "fr";
  langSwitcher.onclick = async () => {
    currentLang = currentLang === "fr" ? "en" : "fr";
    langSwitcher.textContent = currentLang === "fr" ? "EN" : "FR";
    await i18next.changeLanguage(currentLang);
    updateLabelsFromI18n();
  };

  updateNavNameText();

  await loadLabels(translations);
});

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
    const i18nChildren = Array.from(element.children).filter(child => child.hasAttribute && child.hasAttribute('data-i18n'));
    let result = translation;
    let hasPlaceholder = false;
    for (const i18nChild of i18nChildren) {
      const tag = i18nChild.tagName.toLowerCase();
      const placeholder = `{${tag}}`;
      if (result.includes(placeholder)) {
        hasPlaceholder = true;
        result = result.replace(placeholder, `__PLACEHOLDER_${tag.toUpperCase()}__`);
      }
    }
    if (hasPlaceholder) {
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
      let lastIndex = 0;
      const regex = /__PLACEHOLDER_([A-Z]+)__/g;
      let match = regex.exec(result);
      while (match !== null) {
        const text = result.substring(lastIndex, match.index);
        if (text) {
          element.append(document.createTextNode(text));
        }
        const tag = match[1].toLowerCase();
        const child = i18nChildren.find(c => c.tagName.toLowerCase() === tag);
        if (child) {
          element.append(child);
        }
        lastIndex = match.index + match[0].length;
        match = regex.exec(result);
      }
      if (lastIndex < result.length) {
        element.append(document.createTextNode(result.substring(lastIndex)));
      }
    } else {
      const hasI18nChild = i18nChildren.length > 0;
      if (hasI18nChild) {
        Array.from(element.childNodes).forEach(node => {
          if (node.nodeType === Node.TEXT_NODE) {
            element.removeChild(node);
          }
        });
        element.insertBefore(document.createTextNode(translation), element.firstChild);
      } else {
        if (key.includes('.experience.') && key.endsWith('.text')) {
          element.innerHTML = DOMPurify.sanitize(marked.parse(translation));
        } else {
          element.textContent = translation;
        }
      }
    }
  });
}

async function loadLabels(translations) {
  await i18next.init({
    lng: "fr",
    resources: {
      fr: { translation: translations.fr },
      en: { translation: translations.en },
    },
  });
  updateLabelsFromI18n();
}