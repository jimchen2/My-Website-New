"use client";

import React from "react";
import { useTranslation } from "react-i18next";

const ServiceGuide: React.FC = () => {
  const { t } = useTranslation("hosted");

  const services = [
    {
      name: t("services.lobeChat.name"),
      description: t("services.lobeChat.description"),
      link: "https://lobe.jimchen.me",
      repo: "https://github.com/lobehub/lobe-chat",
    },
    {
      name: t("services.chatGPTNextWeb.name"),
      description: t("services.chatGPTNextWeb.description"),
      link: "https://chat.jimchen.me",
      repo: "https://github.com/ChatGPTNextWeb/ChatGPT-Next-Web",
    },
    {
      name: t("services.publicS3Bucket.name"),
      description: t("services.publicS3Bucket.description"),
      link: "https://public.jimchen.me",
    },
    {
      name: t("services.vaultwarden.name"),
      description: t("services.vaultwarden.description"),
      link: "https://vault.jimchen.me",
      repo: "https://github.com/dani-garcia/vaultwarden",
    },
    {
      name: t("services.uptimeKuma.name"),
      description: t("services.uptimeKuma.description"),
      link: "https://status.jimchen.me/status/jc",
      repo: "https://github.com/louislam/uptime-kuma",
    },
    {
      name: t("services.immich.name"),
      description: t("services.immich.description"),
      link: "https://immich.jimchen.me",
      repo: "https://github.com/immich-app/immich",
    },
    {
      name: t("services.portainer.name"),
      description: t("services.portainer.description"),
      link: "https://portainer.jimchen.me",
      repo: "https://github.com/portainer/portainer",
    },
    {
      name: t("services.grafana.name"),
      description: t("services.grafana.description"),
      link: "https://grafana.jimchen.me",
      repo: "https://github.com/grafana/grafana",
    },
    {
      name: t("services.prometheus.name"),
      description: t("services.prometheus.description"),
      link: "https://prometheus.jimchen.me",
      repo: "https://github.com/prometheus/prometheus",
    },
    {
      name: t("services.stash.name"),
      description: t("services.stash.description"),
      link: "https://stash.jimchen.me",
      repo: "https://github.com/stashapp/stash",
    },
  ];

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
              className="rounded-lg p-6 hover:shadow-lg transition duration-300"
            >
              <a href={service.link} target="_blank" rel="noopener noreferrer">
                <h2 className="text-2xl text-gray-800 underline font-semibold mb-2">
                  {service.name}
                </h2>
              </a>
              <p>{service.description}</p>
              {service.repo && (
                <p className="text-sm text-gray-500 mt-2">
                  Source code available at{" "}
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
