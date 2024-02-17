import Navigation from '@/components/site/Navigation';
import { ClerkProvider, currentUser } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import React, { ReactNode } from 'react';

interface SiteLayoutProps {
  children: ReactNode;
}

const SiteLayout = async ({ children }: SiteLayoutProps) => {
  const user = await currentUser();
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <main className="h-full">
        <Navigation user={user} />
        {children}
      </main>
    </ClerkProvider>
  );
};

export default SiteLayout;
