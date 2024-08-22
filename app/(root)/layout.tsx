import MobileNavbar from '@/components/MobileNavbar';
import Sidebar from '@/components/Sidebar';
import Image from 'next/image';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = { firstName: 'Carlos', lastName: 'Velasco' };

  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar firstName={loggedIn.firstName} lastName={loggedIn.lastName} />
      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image src="icons/next.svg" width={30} height={30} alt="menu icon" />
          <div>
            <MobileNavbar />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
