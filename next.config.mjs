import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Self-contained Node server for the Docker image (see Dockerfile).
  output: "standalone",
  images: { unoptimized: true },
};

export default createNextIntlPlugin()(nextConfig);
