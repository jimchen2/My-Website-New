"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import { FaGithub, FaDocker, FaReddit } from "react-icons/fa";
import { SiKaggle, SiTencentqq } from "react-icons/si";
import { MdEmail } from "react-icons/md";
import { RiWechatFill } from "react-icons/ri";
import Image from "next/image";
import { FaRss } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  const { t } = useTranslation("footer");

  return (
    <footer className="bg-gray-100 text-gray-800 py-8">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <h3 className="text-lg font-bold mb-2">{t("tech")}</h3>
            <ul className="text-sm">
              <li className="flex items-center mb-2">
                <FaGithub className="mr-2" />
                <a
                  href="https://github.com/jimchen2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  GitHub
                </a>
              </li>
              <li className="flex items-center mb-2">
                <SiKaggle className="mr-2" />
                <a
                  href="https://www.kaggle.com/jc4214"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Kaggle
                </a>
              </li>
              <li className="flex items-center mb-2">
                <FaDocker className="mr-2" />
                <a
                  href="https://hub.docker.com/u/jimchen2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Docker Hub
                </a>
              </li>
              <li className="flex items-center grayscale">
                <Image
                  src="/huggingface-2.svg"
                  alt="Hugging Face"
                  width={16}
                  height={16}
                  className="mr-2"
                />
                <a
                  href="https://huggingface.co/jimchen2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Hugging Face
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <h3 className="text-lg font-bold mb-2">{t("social")}</h3>
            <ul className="text-sm">
              <li className="flex items-center mb-2">
                <MdEmail className="mr-2" />
                <a
                  href="mailto:jimchen4214@gmail.com"
                  className="hover:underline"
                >
                  jimchen4214@gmail.com
                </a>
              </li>
              <li className="flex items-center mb-2">
                <RiWechatFill className="mr-2" />
                <a
                  href="https://jimchen.me/w.JPG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {t("wechat")}
                </a>
              </li>
              <li className="flex items-center mb-2">
                <SiTencentqq className="mr-2" />
                <a
                  href="/qq.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  QQ
                </a>
              </li>
              <li className="flex items-center">
                <FaRss className="mr-2" />
                <Link
                  href="/api/rss"
                  passHref
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  RSS Feed
                </Link>
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
            className="text-sm text-gray-500 hover:underline"
          >
            {t("sourceCode")}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
