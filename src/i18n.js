// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "welcome": "Welcome",
      "description": "This is an example."
    }
  },
  fr: {
    translation: {
      "welcome": "Bienvenue",
      "description": "Ceci est un exemple."
    }
  }
  // Add more languages here
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // Default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
