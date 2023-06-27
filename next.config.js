/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/id/**/150",
      },
      {
        protocol: "https",
        hostname: "www.edamam.com",
        port: "",
        pathname: "/food-img/**",
      },
    ],
  },
  // fix for bcrypt issue
  webpack: (config) => {
    config.externals = [...config.externals, "bcrypt"];
    return config;
  },
};

module.exports = nextConfig;
