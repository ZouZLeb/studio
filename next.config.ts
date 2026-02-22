
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [
    '6000-firebase-studio-1769926578928.cluster-dndfhnsjmzfcouv57ryymn7ttg.cloudworkstations.dev',
    '*.cloudworkstations.dev',
    '192.168.56.1',
    '192.168.1.68',
    'localhost:9002'
  ],
  serverExternalPackages: ['express', 'genkit', '@genkit-ai/google-genai', '@genkit-ai/next', '@genkit-ai/core'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
