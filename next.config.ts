import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config) => {
    // This is a workaround for a warning in the build logs:
    // "Module not found: Can't resolve '@opentelemetry/exporter-jaeger'"
    // This is an optional dependency of Genkit and is not needed for the app to run.
    config.externals.push('@opentelemetry/exporter-jaeger');
    return config;
  },
};

export default nextConfig;
