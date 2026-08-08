import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://codeorigin.ai'),
  title: {
    default: 'Code Origin.AI — Engineering Intelligence for a Digital World',
    template: '%s | Code Origin.AI',
  },
  description: 'Code Origin.AI is an AI-first global technology company building intelligent software, digital platforms, cloud solutions, cybersecurity systems, and enterprise applications.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Code Origin.AI',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
