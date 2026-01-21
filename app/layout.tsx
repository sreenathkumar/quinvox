import SyncListener from '@/components/SyncListener';
import { Toaster } from '@/components/ui/toaster';
import { InvoiceProvider } from '@/contexts/InvoiceProvider';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import './globals.css';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'https://quinvox.app';

export const metadata: Metadata = {
  title: 'Quinvox | Free Invoicing for Builders',
  description: 'Create professional invoices within 60s with Quinvox - the Quick Invoice tool. Free online invoice creator and PDF maker for businesses and freelancers.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Quinvox | Free Invoicing for Builders',
    description: 'Create professional invoices within 60s with Quinvox - the Quick Invoice tool. Free online invoice creator and PDF maker for businesses and freelancers.',
    url: baseURL,
    siteName: 'Quinvox',
    images: [
      { url: `${baseURL}/og-image.webp`, width: 1200, height: 630, alt: 'Quinvox' }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('font-body antialiased min-h-screen bg-background text-foreground flex flex-col')}>
        <InvoiceProvider>
          <SyncListener />
          {children}
        </InvoiceProvider>
        <Toaster />
      </body>
    </html>
  );
}
