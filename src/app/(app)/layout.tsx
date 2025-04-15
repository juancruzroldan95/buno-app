import { redirect } from "next/navigation";
import { getAuthenticatedAppForUser } from "@/firebase/serverApp";
import { getUserByUid } from "@/lib/users-actions";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import AppSidebar from "./components/AppSidebar";

// Force next.js to treat this route as server-side rendered
// Without this line, during the build process, next.js will treat this route as static and build a static HTML file for it
export const dynamic = "force-dynamic";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser } = await getAuthenticatedAppForUser();
  if (!currentUser) {
    redirect("/");
  }

  const dbUser = await getUserByUid(currentUser?.uid as string);
  if (!dbUser.roleId) {
    redirect("/elegir-rol");
  }

  return (
    <SidebarProvider>
      <AppSidebar initialUser={dbUser} />

      <main className="w-full">
        <SidebarTrigger />
        {children}
      </main>
      <Toaster />
    </SidebarProvider>
  );
}
