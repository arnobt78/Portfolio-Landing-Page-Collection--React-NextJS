/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
    localPatterns: [{ pathname: '/images/**', search: '' }],
    qualities: [75],
  },
};

module.exports = nextConfig;
