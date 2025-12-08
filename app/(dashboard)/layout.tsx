import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import isServerAuthenticated from "@/lib/check-server-auth";
import { redirect } from "next/navigation";
import AppSidebar from "./components/app-sidebar";
import DashboardHeader from "./components/sidebar-header";

async function AuthLayout({ children }: { children: React.ReactNode }) {
  const { authenticated } = await isServerAuthenticated();

  //only authenticated users can access this layout
  if (!authenticated) {
    redirect('/login');
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

export default AuthLayout;