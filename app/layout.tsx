import { Toaster } from '@/components/ui/toaster';
import { InvoiceProvider } from '@/contexts/InvoiceProvider';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import './globals.css';
import SyncListener from '@/components/SyncListener';

export const metadata: Metadata = {
  title: 'Quinvox | Free Online Invoice Creator | Quick Invoice Tool',
  description: 'Create professional invoices fast with Quinvox — the Quick Invoice tool. Free online invoice creator and PDF maker for businesses and freelancers.',
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
      <body className={cn('font-body antialiased min-h-screen')}>
        <InvoiceProvider>
          <SyncListener />
          {children}
        </InvoiceProvider>
        <Toaster />
      </body>
    </html>
  );
}
