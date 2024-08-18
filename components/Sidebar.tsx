import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Sidebar = ({ firstName, lastName }: User) => {
  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="mb-12 cursor-pointer items-center gap-2">
          <Image
            src="/next.svg"
            alt="menu icon"
            width={34}
            height={34}
            className="flex size-[24px] max-xl:size-14"
          />
          <h1 className="sidebar-logo">Caremates</h1>
        </Link>
        <Link href="/" className="sidebar-link">
          <Image src="logo.svg" alt="My Tasks logo" width={24} height={24} />
          <h2 className="sidebar-label">My Tasks</h2>
        </Link>
      </nav>
      <h2 className="text-slate-900">
        {firstName}, {lastName}
      </h2>
    </section>
  );
};

export default Sidebar;
