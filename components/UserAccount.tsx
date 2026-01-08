'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useInvoiceStore } from '@/contexts/InvoiceProvider';
import { useIsMobile } from '@/hooks/use-mobile';
import authClient from '@/lib/auth-client';
import usePendingTask from '@/lib/stores/pending-task-store';
import { LayoutDashboard, LogIn, LogOut, UserRound } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


function UserAccount({ closeMenu }: { closeMenu?: () => void }) {
    const isMobile = useIsMobile()
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const { clearInvoices } = useInvoiceStore()
    const { clearTasks } = usePendingTask.getState();
    const router = useRouter();

    const handleLogout = async () => {
        await authClient.signOut();
        //clear the pending tasks on logout
        clearTasks();
        clearInvoices();
        if (closeMenu) {
            closeMenu();
        }

        router.push('/')
    };

    return (
        <div className={`flex flex-1 space-x-2 ${!isMobile ? 'items-center  justify-end' : 'items-end'}`}>
            {user ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={user.image || undefined} alt={user.name || user.email || ''} />
                                <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align={`${isMobile ? 'start' : 'end'}`} forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">{user.name}</p>
                                <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="/dashboard">
                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                Dashboard
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/dashboard/account">
                                <UserRound className="mr-2 h-4 w-4" />
                                Account
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout} >
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <div className={`space-x-2 ${isMobile ? 'mt-auto' : ''}`}>
                    <Button asChild>
                        <Link href="/login">
                            <LogIn className="mr-2 h-4 w-4" />
                            Login
                        </Link>
                    </Button>
                </div>
            )}
        </div>
    )
}

export default UserAccount