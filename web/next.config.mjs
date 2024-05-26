/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/airports',
        destination: 'https://nft-rent.vercel.app/api/airports',
      },
      {
        source: '/api/flights',
        destination: 'https://nft-rent.vercel.app/api/flights',
      },
    ];
  },
  pageExtensions: ["mdx", "md", "jsx", "js", "tsx", "ts"],
  images: {
    remotePatterns: [
      // {
      //   protocol: "https",
      //   hostname: "www.okx.com",
      //   port: "",
      //   pathname: "/cdn/**",
      // },
      // {
      //   protocol: "https",
      //   hostname: "static.coinall.ltd",
      //   port: "",
      //   pathname: "/cdn/**",
      // },
      // {
      //   protocol: "https",
      //   hostname: "ipfs.particle.network",
      //   port: "",
      //   pathname: "/**",
      // },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
