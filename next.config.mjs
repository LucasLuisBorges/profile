/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML in out/ — served by nginx on the VPS (see Dockerfile).
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
