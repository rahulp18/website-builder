import type { Metadata } from "next";
import { DM_Sans } from 'next/font/google';
import './globals.css';

import { ThemeProvider } from '@/providers/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import ModalProvider from '@/providers/modal-provider';

const font = DM_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Plura',
  description: 'All in one Agency Solution',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ThemeProvider attribute="class">
          <ModalProvider>
            <Toaster />
            {children}
          </ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
