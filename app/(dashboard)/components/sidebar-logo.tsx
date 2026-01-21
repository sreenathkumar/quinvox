'use client'

import { useSidebar } from "@/components/ui/sidebar"
import Image from "next/image"
import Link from "next/link"


function SidebarLogo() {
    const { open } = useSidebar();
    return (
        <Link href="/" className={`flex items-center space-x-1 h-10`}>
            <Image
                src="/logo_quinvox.svg"
                alt="QuInvox Logo"
                width={32}
                height={32}
                className="rounded-sm"
            />
            {open && <span className="font-bold">uInvox</span>}
        </Link>
    )
}

export default SidebarLogo