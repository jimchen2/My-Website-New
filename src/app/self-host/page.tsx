"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { services } from "./service";

const ServiceGuide: React.FC = () => {
  const { t } = useTranslation("hosted");

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <div className="flex justify-center items-center min-h-screen">
        <div className="max-w-3xl mx-auto p-8 space-y-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="rounded-lg p-4 hover:shadow-lg hover:bg-gray-200 transition duration-300"
            >
              <a href={service.link} target="_blank" rel="noopener noreferrer">
                <h2 className="text-2xl text-gray-700 underline font-semibold mb-2">
                  {t(service.name)}
                </h2>
              </a>
              <p className="text-md">{t(service.description)}</p>
              {service.repo && (
                <p className="text-sm text-gray-500 mt-2">
                  {t("Source code available at")}{" "}
                  <a
                    href={service.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 hover:underline"
                  >
                    {service.repo}
                  </a>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceGuide;
