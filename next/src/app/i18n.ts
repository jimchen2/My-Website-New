import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const lang = process.env.NEXT_PUBLIC_LANG || "en";

i18n.use(initReactI18next).init({
  lng: lang,
  resources: {
    en: {
      common: require("../../public/locales/en/common.json"),
      footer: require("../../public/locales/en/footer.json"),
      header: require("../../public/locales/en/header.json"),
      hosted: require("../../public/locales/en/hosted.json"),
    },
    zh: {
      common: require("../../public/locales/zh/common.json"),
      footer: require("../../public/locales/zh/footer.json"),
      header: require("../../public/locales/zh/header.json"),
      hosted: require("../../public/locales/zh/hosted.json"),
    },
  },
  ns: ["common", "footer", "header"],
  defaultNS: "common",
  debug: true,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
