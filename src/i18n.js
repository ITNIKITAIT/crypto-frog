import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import replacementRulesEN from "./locales/en/replacementRules.json";
import replacementRulesUA from "./locales/ua/replacementRules.json";

import translationEN from "./locales/en/translation.json";
import translationUA from "./locales/ua/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEN,
      replacementRules: replacementRulesEN,
    },
    ua: {
      translation: translationUA,
      replacementRules: replacementRulesUA,
    },
  },
  lng: "ua",
  fallbackLng: "ua",
  interpolation: { escapeValue: false },
});

export default i18n;
