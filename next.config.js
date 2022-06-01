/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["ar"],
    defaultLocale: "ar",
  },
  images: {
    domains: ["localhost"],
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
