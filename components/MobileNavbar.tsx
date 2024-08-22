'use client';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import Image from 'next/image';
import Link from 'next/link';

const MobileNavbar = () => {
  return (
    <section className="w-fulll max-w-[200px]">
      <Sheet>
        <SheetTrigger>
          <Image
            src="/hamburger.svg"
            width={30}
            height={30}
            alt="menu"
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-white">
          <Link
            href="/"
            className="cursor-pointer flex items-center gap-1 px-4"
          >
            <Image
              src="/CareMatesLogo.svg"
              width={200}
              height={200}
              alt="Caremates logo"
            />
          </Link>
          <div className="mobilenav-sheet">
            <SheetClose asChild>
              <nav className="flex h-full flex-col gap-6 pt-16 text-white">
                <SheetClose asChild>
                  <Link
                    href="/"
                    className="flex mb-12 cursor-pointer items-center gap-1 px-4 justify-start"
                  >
                    <Image
                      src="/tasks.svg"
                      alt="My tasks"
                      width={50}
                      height={50}
                      className="flex"
                    />
                    <p className="text-gray-950 font-semibold text-16">
                      My Tasks
                    </p>
                  </Link>
                </SheetClose>
              </nav>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNavbar;
