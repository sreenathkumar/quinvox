import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { LayoutDashboard, ScrollText, UsersRound } from "lucide-react"
import Link from "next/link"

const itmes = [
    { title: "Dashboard", icon: LayoutDashboard, link: "/dashboard" },
    { title: "Invoices", icon: ScrollText, link: "/dashboard/invoices" },
    { title: "Clients", icon: UsersRound, link: "/dashboard/clients" },
]

function SidebarNavMenu() {
    return (
        <SidebarMenu>
            {itmes.map((item) => (
                <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                        <Link href={item.link} className="flex items-center gap-2">
                            <item.icon />
                            <span>{item.title}</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    )
}

export default SidebarNavMenu