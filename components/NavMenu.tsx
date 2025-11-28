'use client'
import { useIsMobile } from '@/hooks/use-mobile'
import Link from 'next/link';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from './ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import UserAccount from './UserAccount';
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useState } from 'react';
import { Equal } from 'lucide-react';

function NavMenu() {
    const isMobile = useIsMobile();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    //close the menu on link click (for mobile)
    const handleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <div className='flex gap-6'>
            {
                !isMobile ? <Menu layout='horizontal' /> :
                    <Sheet open={isMenuOpen} onOpenChange={handleMenu}>
                        <SheetTrigger >
                            <Equal className='w-6 h-6 cursor-pointer' />
                        </SheetTrigger>
                        <SheetContent className='flex flex-col items-start'>
                            <SheetHeader>
                                <VisuallyHidden>
                                    <SheetTitle>Navigation Menu</SheetTitle>
                                </VisuallyHidden>
                            </SheetHeader>
                            <Menu layout='vertical' closeMenu={handleMenu} />
                        </SheetContent>
                    </Sheet>
            }
        </div>
    )
}

function Menu({ layout = 'horizontal', closeMenu }: { layout?: 'horizontal' | 'vertical', closeMenu?: () => void }) {
    return (
        <>
            <NavigationMenu orientation={layout} className='items-start'>
                <NavigationMenuList className={layout === 'vertical' ? 'flex flex-col space-y-4' : 'flex'}>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className='px-4 py-2 rounded-md hover:bg-accent'>
                            <Link href="/" onClick={closeMenu}>Home</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className='px-4 py-2 rounded-md hover:bg-accent'>
                            <Link href="/pricing" onClick={closeMenu}>Pricing</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className='px-4 py-2 rounded-md hover:bg-accent'>
                            <Link href="/contact" onClick={closeMenu}>Contact</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <UserAccount closeMenu={closeMenu} />
        </>

    )
}



export default NavMenu