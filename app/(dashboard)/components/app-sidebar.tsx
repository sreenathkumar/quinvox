import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader
} from "@/components/ui/sidebar"
import { User } from "@/lib/auth"
import SidebarLogo from "./sidebar-logo"
import SidebarNavMenu from "./sidebar-menu"
import SidebarNavUser from "./sidebar-nav-user"


interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
    user: User | undefined
}

function AppSidebar({ user, ...props }: AppSidebarProps) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4" >
                <SidebarLogo />
            </SidebarHeader>
            <SidebarContent className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <SidebarNavMenu user={user} />
            </SidebarContent>
            <SidebarFooter>
                <SidebarNavUser />
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar