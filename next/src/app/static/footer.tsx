"use client";
import React from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation("footer");


  return (
    <footer className="bg-gray-100 text-gray-800 py-8">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <h3 className="text-lg font-bold mb-2">{t("contact")}</h3>
            <ul className="text-sm">
              <li>
                <a
                  href="mailto:jimchen4214@gmail.com"
                  className="hover:text-gray-600"
                >
                  jimchen4214@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://jimchen.me/w.JPG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-600"
                >
                  {t("wechat")}
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <h3 className="text-lg font-bold mb-2">{t("tech")}</h3>
            <ul className="text-sm">
              <li>
                <a
                  href="https://github.com/jimchen2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-600"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.kaggle.com/jc4214"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-600"
                >
                  Kaggle
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-300 pt-4 flex justify-between items-center">
          <p className="text-sm text-gray-500">{t("copyright")}</p>
          <a
            href="https://github.com/jimchen2/My-Website-New"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 hover:text-gray-600"
          >
            {t("sourceCode")}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
