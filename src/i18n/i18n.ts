import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import de from "./resources/de";
import en from "./resources/en";

const detectedLanguage =
  typeof navigator !== "undefined" && navigator.language.toLowerCase().startsWith("de")
    ? "de"
    : "en";

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    de: { translation: de },
  },
  lng: detectedLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
