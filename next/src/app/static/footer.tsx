import React from "react";

const footerSections = [
  {
    title: "Contact",
    links: [
      { href: "mailto:jimchen4214@gmail.com", text: "jimchen4214@gmail.com" },
      { href: "https://jimchen.me/w.JPG", text: "WeChat", external: true }
    ]
  },
  {
    title: "Social",
    links: [
      { href: "https://mastodon.social/@jimchen4214", text: "Mastodon", external: true }
    ]
  },
  {
    title: "Tech",
    links: [
      { href: "https://github.com/jimchen2", text: "GitHub", external: true },
      { href: "https://www.kaggle.com/jc4214", text: "Kaggle", external: true }
    ]
  }
];

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 py-8">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex flex-wrap justify-between">
          {footerSections.map((section, index) => (
            <div key={index} className="w-full md:w-1/3 mb-4 md:mb-0">
              <h3 className="text-lg font-bold mb-2">{section.title}</h3>
              <ul className="text-sm">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="hover:text-gray-600"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 border-t border-gray-300 pt-4 flex justify-between items-center">
          <p className="text-sm text-gray-500">
            © 2024 JC | Powered by Next.js 
          </p>
          <a
            href="https://github.com/jimchen2/My-Website"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 hover:text-gray-600"
          >
            Source Code
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
