import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import { Toaster } from "@/components/ui/toaster";
import { getAuthenticatedAppForUser } from "@/firebase/serverApp";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser } = await getAuthenticatedAppForUser();

  return (
    <SidebarProvider>
      <AppSidebar initialUser={currentUser?.toJSON()} />
      <main>
        <SidebarTrigger />
        {children}
      </main>
      <Toaster />
    </SidebarProvider>
  );
}
