/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    domains: ["www.codemobiles.com"],
    minimumCacheTTL: 0,
  },
};

export default nextConfig;
