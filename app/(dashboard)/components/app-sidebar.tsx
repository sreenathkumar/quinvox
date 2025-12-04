import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader
} from "@/components/ui/sidebar"
import SidebarNavMenu from "./sidebar-menu"
import SidebarNavUser from "./sidebar-nav-user"


function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" />
            <SidebarContent className="px-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <SidebarNavMenu />
            </SidebarContent>
            <SidebarFooter>
                <SidebarNavUser />
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar