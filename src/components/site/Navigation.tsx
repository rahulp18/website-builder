import { UserButton } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/server';
import Image from 'next/image';

import Link from 'next/link';
import React from 'react';
import { ModeToggle } from '../global/mode-toggle';
interface NavigationProps {
  user?: null | User;
}
const Navigation = ({ user }: NavigationProps) => {
  return (
    <div className="p-4 sticky top-0 z-10 items-center justify-between flex  bg-background ">
      <aside className="flex items-center gap-2">
        <Image
          src="/assets/plura-logo.svg"
          alt="logo"
          className=""
          height={40}
          width={40}
        />
        <span className="text-2xl font-bold">Plura</span>
      </aside>
      <nav className="hidden md:block absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">
        <ul className="flex items-center justify-center gap-8">
          <Link href="#">Pricing</Link>
          <Link href="#">Documentation</Link>
          <Link href="#">Contact</Link>
          <Link href="#">Features</Link>
        </ul>
      </nav>
      <aside className="flex gap-2 items-center">
        <Link
          href="/agency"
          className="bg-primary text-white font-semibold p-2 rounded-md px-4 hover:bg-primary/80"
        >
          {user ? 'Start' : 'Login'}
        </Link>
        <UserButton afterSignOutUrl="/agency/sign-in" />
        <ModeToggle />
      </aside>
    </div>
  );
};

export default Navigation;
