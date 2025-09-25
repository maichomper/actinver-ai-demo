/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  serverExternalPackages: [],
  // Allow all hosts for Replit environment
  env: {
    HOSTNAME: '0.0.0.0',
  },
  // Configure for Replit proxy environment
  async rewrites() {
    return [];
  },
}

export default nextConfig