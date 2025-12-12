import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader
} from "@/components/ui/sidebar"
import SidebarNavMenu from "./sidebar-menu"
import SidebarNavUser from "./sidebar-nav-user"
import Link from "next/link"
import { User } from "@/lib/auth"


interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
    user: User | undefined
}

function AppSidebar({ user, ...props }: AppSidebarProps) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4" >
                <Link href="/" className="flex items-center space-x-2 h-10">
                    <span className="font-bold">QuInvox</span>
                </Link>
            </SidebarHeader>
            <SidebarContent className="px-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <SidebarNavMenu user={user} />
            </SidebarContent>
            <SidebarFooter>
                <SidebarNavUser />
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar