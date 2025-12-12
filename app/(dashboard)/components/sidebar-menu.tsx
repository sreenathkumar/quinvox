import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { User } from "@/lib/auth"
import { Gem, House, LayoutDashboard, MessageCircleQuestion, ScrollText, Send, Sidebar, UsersRound } from "lucide-react"
import Link from "next/link"

const itmes = [
    { title: "Dashboard", icon: LayoutDashboard, link: "/dashboard" },
    { title: "Invoices", icon: ScrollText, link: "/dashboard/invoices" },
    { title: "Clients", icon: UsersRound, link: "/dashboard/clients" },
]

function SidebarNavMenu({ user }: { user: User | undefined }) {
    return (
        <>
            <SidebarGroup>
                <SidebarGroupContent>
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
                        {
                            user?.role === 'admin' && (
                                <SidebarMenuItem >
                                    <SidebarMenuButton asChild>
                                        <Link href={'/dashboard/queries'}>
                                            <MessageCircleQuestion />
                                            Queries
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )
                        }
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup className="mt-auto">
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem >
                            <SidebarMenuButton asChild>
                                <Link href='/contact' className="flex items-center gap-2">
                                    <Send />
                                    <span>Contact</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem >
                            <SidebarMenuButton asChild>
                                <Link href='/pricing' className="flex items-center gap-2">
                                    <Gem />
                                    <span>Pricing</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </>

    )
}

export default SidebarNavMenu