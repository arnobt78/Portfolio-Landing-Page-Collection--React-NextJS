/** @type {import('next').NextConfig} */
/** Server: canvas externalized for Three/globe. Webpack: .mjs in node_modules as js. */
const nextConfig = {
  images: {
    // Current image sources are local; do not expose arbitrary remote fetches.
    remotePatterns: [],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...(config.externals || []), { canvas: "canvas" }];
    }
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    });
    return config;
  },
};

export default nextConfig;
