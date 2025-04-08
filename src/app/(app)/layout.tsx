import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./components/AppSidebar";
import { Toaster } from "@/components/ui/toaster";
import { getAuthenticatedAppForUser } from "@/firebase/serverApp";
// Force next.js to treat this route as server-side rendered
// Without this line, during the build process, next.js will treat this route as static and build a static HTML file for it
export const dynamic = "force-dynamic";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser } = await getAuthenticatedAppForUser();

  return (
    <SidebarProvider>
      <AppSidebar initialUser={currentUser?.toJSON()} />

      <main className="w-full">
        <SidebarTrigger />
        {children}
      </main>
      <Toaster />
    </SidebarProvider>
  );
}
