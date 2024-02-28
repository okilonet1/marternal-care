/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push("@node-rs/argon2", "@node-rs/bcrypt");
    config.resolve.alias.canvas = false;
    return config;
  },
  images: {
    domains: ["images.unsplash.com"],
  },
};

export default nextConfig;
