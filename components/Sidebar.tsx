import { User } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Sidebar = ({ firstName, lastName }: User) => {
  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="mb-12 cursor-pointer items-center gap-2">
          <Image
            src="/CareMatesLogo.svg"
            alt="menu icon"
            width={200}
            height={200}
            className="flex"
          />
        </Link>
        <Link href="/" className="sidebar-link">
          <Image src="tasks.svg" alt="My Tasks logo" width={32} height={32} />
          <h2 className="sidebar-label">My Tasks</h2>
        </Link>
      </nav>
      <div className="flex gap-3 items-center md:px-2 2xl:px-3 rounded-lg">
        <Image src="/profile.svg" alt="Profile" width={32} height={32} />
        <h2 className="text-slate-900 font-semibold ">
          {firstName}, {lastName}
        </h2>
      </div>
    </section>
  );
};

export default Sidebar;
