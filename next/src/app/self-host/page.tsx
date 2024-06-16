
import React from "react";

const ServiceGuide: React.FC = () => {
  const services = [
    {
      name: "Lobe Chat",
      description:
        "Explore the world of Language Learning Models (LLMs) with Lobe Chat. Access cutting-edge models like GPT-4, Claude Opus, Gemini, Qwen, LLama, and Yi-Large. Use the code '8294' for access.",
      link: "https://lobe.jimchen.me",
      repo: "https://github.com/lobehub/lobe-chat",
    },
    {
      name: "ChatGPT Next Web",
      description:
        "Dive into another LLM playground with ChatGPT Next Web. Experience the capabilities of GPT-4 and Gemini models. Use the code '8294' for access.",
      link: "https://chat.jimchen.me",
      repo: "https://github.com/ChatGPTNextWeb/ChatGPT-Next-Web",
    },
    {
      name: "My Public S3 Bucket",
      description:
        "A publicly accessible S3 bucket containing useful files, including the Clash tool for bypassing UFW restrictions.",
      link: "https://public.jimchen.me",
    },
    {
      name: "Vaultwarden",
      description:
        "Secure your digital life with Vaultwarden, a self-hosted password manager that ensures your sensitive information remains under your control. Fully compatible with the popular KeePass password manager.",
      link: "https://vault.jimchen.me",
      repo: "https://github.com/dani-garcia/vaultwarden",
    },
    {
      name: "Uptime Kuma",
      description:
        "Monitor the availability and performance of your personal website with Uptime Kuma. Stay informed about any issues or downtime, ensuring a seamless online presence.",
      link: "https://status.jimchen.me/status/jc",
      repo: "https://github.com/louislam/uptime-kuma",
    },
    {
      name: "Immich",
      description:
        "Preserve and relive your precious moments with Immich, a personal gallery designed to showcase your photos and videos. Create a beautiful visual timeline of your life.",
      link: "https://immich.jimchen.me",
      repo: "https://github.com/immich-app/immich",
    },
    {
      name: "Portainer",
      description:
        "Simplify your Docker container management with Portainer. Easily deploy, monitor, and control your containerized applications through an intuitive web-based interface.",
      link: "https://portainer.jimchen.me",
      repo: "https://github.com/portainer/portainer",
    },
    {
      name: "Grafana",
      description:
        "Visualize and analyze your personal data with Grafana. Create stunning dashboards and gain valuable insights into various aspects of your life and system metrics.",
      link: "https://grafana.jimchen.me",
      repo: "https://github.com/grafana/grafana",
    },
    {
      name: "Prometheus",
      description:
        "Keep a watchful eye on your system's performance with Prometheus. Monitor key metrics, set up alerts, and ensure the smooth operation of your personal infrastructure.",
      link: "https://prometheus.jimchen.me",
      repo: "https://github.com/prometheus/prometheus",
    },
    {
      name: "Stash (NSFW)",
      description:
        "Organize and manage your digital media collection, including adult content, with ease using Stash. Please note that this service contains material that may not be suitable for all audiences.",
      link: "https://stash.jimchen.me",
      repo: "https://github.com/stashapp/stash",
    },
  ];

  return (
    <div>
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
