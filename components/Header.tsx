import Link from 'next/link';
import NavMenu from './NavMenu';

function Header() {

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center mx-auto">
        <div className="flex justify-between flex-1 px-4 md:px-0">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">QuInvox</span>
          </Link>
          <NavMenu />
        </div>
      </div>
    </header>
  );
}

export default Header;