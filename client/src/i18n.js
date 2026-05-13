import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'cs', // default czech
    supportedLngs: ['cs', 'sk', 'en', 'de', 'pl'],
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    ns: ['common', 'home', 'contact', 'plans', 'team', 'calculator'], // namespaces
    defaultNS: 'common',
    debug: true, // errors in console
    interpolation: {
      escapeValue: false, 
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // points to public
    }
  });

export default i18n;