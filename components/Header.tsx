import Link from 'next/link';
import NavMenu from './NavMenu';
import Image from 'next/image';

function Header() {

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center mx-auto">
        <div className="flex justify-between flex-1 px-4 md:px-0">
          <Link href="/" className="mr-6 flex items-end space-x-1">
            <Image
              src="/logo_quinvox.svg"
              alt="QuInvox Logo"
              width={32}
              height={32}
              className="rounded-sm"
            />
            <span className="font-bold">
              uInvox
            </span>
          </Link>
          <NavMenu />
        </div>
      </div>
    </header>
  );
}

export default Header;