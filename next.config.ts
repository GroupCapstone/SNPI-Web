import type { NextConfig } from 'next';

const isDocker = process.env.DOCKER_BUILD === 'true';
const requiresHttpsBackend =
  Boolean(process.env.VERCEL_ENV) || process.env.APP_ENV === 'production';
const defaultBackendUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  (requiresHttpsBackend
    ? 'https://api.kesararamwithdigital.tech/api/v1'
    : 'http://localhost:4000/api/v1');
const configuredBackendUrl = process.env.BACKEND_INTERNAL_URL;
const backendUrl =
  requiresHttpsBackend && configuredBackendUrl?.startsWith('http://')
    ? defaultBackendUrl
    : (configuredBackendUrl ?? defaultBackendUrl);

let backendDestination: string;
try {
  const parsedBackendUrl = new URL(backendUrl);
  const rawPath = parsedBackendUrl.pathname.replace(/\/$/, '');
  const allowedProtocol =
    parsedBackendUrl.protocol === 'https:' ||
    (!requiresHttpsBackend && parsedBackendUrl.protocol === 'http:');

  if (
    !allowedProtocol ||
    parsedBackendUrl.username ||
    parsedBackendUrl.password ||
    parsedBackendUrl.search ||
    parsedBackendUrl.hash
  ) {
    throw new Error('invalid backend URL');
  }

  const backendPath = rawPath === '/api/v1' || rawPath === '' ? '/api/v1' : `${rawPath}/api/v1`;
  backendDestination = `${parsedBackendUrl.origin}${backendPath}`;
} catch {
  throw new Error(
    'BACKEND_INTERNAL_URL must be an HTTPS API base ending in /api/v1 for deployed environments',
  );
}

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    'docs.snpi.edu.kh',
    'snpi.edu.kh',
    'dashboard.snpi.edu.kh',
    'api.snpi.edu.kh',
    '*.snpi.edu.kh',
    'localhost',
    'localhost:3000',
    'localhost:4000',
    '127.0.0.1',
  ],
  ...(isDocker
    ? {
        output: 'standalone',
        outputFileTracingRoot: process.cwd(),
      }
    : {}),
  reactStrictMode: true,
  async headers() {
    if (!requiresHttpsBackend) return [];

    return [
      {
        source: '/:path*',
        headers: [{ key: 'Strict-Transport-Security', value: 'max-age=31536000' }],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/design',
        destination: '/document/design',
        permanent: false,
      },
      {
        source: '/design-system',
        destination: '/document/design',
        permanent: false,
      },
      {
        source: '/components',
        destination: '/document/design-system',
        permanent: false,
      },
      {
        source: '/api-docs',
        destination: '/document',
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: `${backendDestination}/:path*`,
      },
    ];
  },
};

export default nextConfig;
