import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthProvider';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { InvoiceProvider } from '@/contexts/InvoiceProvider';

export const metadata: Metadata = {
  title: 'QuInvox - Free Invoice Generator',
  description: 'Instantly create and download professional invoices for free.',
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
        <AuthProvider>
          <InvoiceProvider>
            {children}
          </InvoiceProvider>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
