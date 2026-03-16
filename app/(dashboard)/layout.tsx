import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import isServerAuthenticated from "@/lib/check-server-auth";
import { redirect } from "next/navigation";
import AppSidebar from "./components/app-sidebar";
import DashboardHeader from "./components/sidebar-header";

export const dynamic = 'force-dynamic';

async function AuthLayout({ children }: { children: React.ReactNode }) {
  const { authenticated, user } = await isServerAuthenticated();

  //only authenticated users can access this layout
  if (!authenticated || !user) {
    redirect('/login');
  }
  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset className="min-w-0">
        <DashboardHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

export default AuthLayout;