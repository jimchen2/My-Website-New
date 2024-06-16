const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const nextConfig = {
  i18n: {
    locales: ["en", "zh"],
  },
};

module.exports = nextConfig;
