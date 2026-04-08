/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === "true";

const nextConfig = {
  output: isGithubActions ? "export" : "standalone",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
