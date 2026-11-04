import type { Metadata } from 'next';
import {
  DocsStickyHeader,
  DocsFooter,
  DocsNavProvider,
} from '@/features/document/components/ui-library';

export const metadata: Metadata = {
  title: {
    default: 'SNPI-SMS API Docs & Design System',
    template: '%s · SNPI-SMS Docs',
  },
  description:
    'Enterprise API documentation, developer guidelines, and UI component standards with Royal Blue & Sora typography.',
};

export default function DocumentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Official Google Fonts Sora Preconnect & Stylesheet Links */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap"
        rel="stylesheet"
      />

      <div className="docs-root min-h-screen bg-white text-slate-900 antialiased selection:bg-[#0056FF] selection:text-white">
        {/* Scoped Sora Font and Scaled Typography for Docs Subdomain */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .docs-root,
              .docs-root * {
                font-family: 'Sora', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
              }

              /* Base Font Scale - Increased for Higher Legibility */
              .docs-root {
                font-size: 16px;
                line-height: 1.6;
                letter-spacing: -0.01em;
              }

              .docs-root h1 {
                font-size: 2.25rem !important;
                line-height: 1.2 !important;
                font-weight: 800 !important;
                letter-spacing: -0.025em !important;
              }

              .docs-root h2 {
                font-size: 1.65rem !important;
                line-height: 1.25 !important;
                font-weight: 800 !important;
                letter-spacing: -0.02em !important;
              }

              .docs-root h3 {
                font-size: 1.35rem !important;
                line-height: 1.3 !important;
                font-weight: 700 !important;
              }

              .docs-root h4 {
                font-size: 1.15rem !important;
                line-height: 1.35 !important;
                font-weight: 700 !important;
              }

              .docs-root p {
                font-size: 0.975rem !important;
                line-height: 1.65 !important;
              }

              .docs-root button,
              .docs-root a.inline-flex {
                font-size: 0.875rem !important;
                font-weight: 700 !important;
                letter-spacing: 0.025em !important;
              }

              .docs-root table th {
                font-size: 0.85rem !important;
                font-weight: 700 !important;
              }

              .docs-root table td {
                font-size: 0.875rem !important;
              }

              /* Zero Gray Scrollbars Across Entire Docs Subdomain */
              .docs-root * {
                scrollbar-width: none !important;
                -ms-overflow-style: none !important;
              }
              .docs-root *::-webkit-scrollbar {
                display: none !important;
                width: 0px !important;
                height: 0px !important;
              }

              /* Mandatory Standard Button & Input Geometry: border: 0 and border-radius: 4px */
              .docs-root button:not([data-dock-pill]):not([data-nav-pill]):not(.rounded-full),
              .docs-root input:not([type="checkbox"]):not([type="radio"]),
              .docs-root select,
              .docs-root textarea {
                border: 0 !important;
                border-radius: 4px !important;
              }
            `,
          }}
        />
        <DocsNavProvider>
          <DocsStickyHeader />
          {children}
          <DocsFooter />
        </DocsNavProvider>
      </div>
    </>
  );
}
