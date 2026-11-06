import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `next build` writes plain HTML/CSS/JS to /out for S3 + CloudFront
  output: "export",
  // /about -> /about/index.html, so S3 serves folder-style URLs without rewrites
  trailingSlash: true,
  images: {
    // The Next image optimizer needs a server; static hosting can't run it
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
