import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  lng: "zh",
  resources: {
    en: {
      common: require("../../public/locales/en/common.json"),
      footer: require("../../public/locales/en/footer.json"),
      header: require("../../public/locales/en/header.json"),
    },
    zh: {
      common: require("../../public/locales/zh/common.json"),
      footer: require("../../public/locales/zh/footer.json"),
      header: require("../../public/locales/zh/header.json"),
    },
  },
  ns: ["common"],
  defaultNS: "common",
  debug: true,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
