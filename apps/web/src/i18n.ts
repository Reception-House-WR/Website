// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector) // Detects user's browser language
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    fallbackLng: 'en', // Default language
    resources: {
      en: {
        translation: {
          // Add your UI text here
          "home": "Home",
          "about": "About Us",
        }
      },
      fr: {
        translation: {
          "home": "Accueil",
          "about": "À propos de nous",
        }
      },
      // ... add other languages here
    },
    interpolation: {
      escapeValue: false, // React already protects from XSS
    },
  });

export default i18n;