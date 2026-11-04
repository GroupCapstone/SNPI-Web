import '@fontsource-variable/google-sans';
import '@fontsource-variable/inter';
import '@fontsource-variable/noto-sans-khmer';
import type { Metadata, Viewport } from 'next';

import { QueryProvider } from '@/components/providers/query-provider';

import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'SNPI-SMS',
    template: '%s · SNPI-SMS',
  },
  description: 'SNPI Integrated Multi-Branch School Management System',
  applicationName: 'SNPI-SMS',
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#023e8a',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="km">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
