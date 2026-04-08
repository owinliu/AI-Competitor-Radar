/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] || "AI-Competitor-Radar";
const basePath = isGithubActions ? `/${repo}` : "";

const nextConfig = {
  output: isGithubActions ? "export" : "standalone",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
};

export default nextConfig;
