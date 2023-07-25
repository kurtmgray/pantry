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
      {
        protocol: "https",
        hostname: "oaidalleapiprodscus.blob.core.windows.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https", 
        hostname: "via.placeholder.com", 
        port: "", 
       pathname: "/**"},
    ],
  },
  // fix for bcrypt issue
  webpack: (config) => {
    config.externals = [...config.externals, "bcrypt"];
    return config;
  },
};

module.exports = nextConfig;
