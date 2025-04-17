"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { deleteCookie, setCookie } from "cookies-next";
import {
  BadgeCheck,
  Bell,
  Calendar,
  ChevronUp,
  CreditCard,
  Home,
  Inbox,
  LogOut,
  ScrollText,
  Search,
  Settings,
  Sparkles,
  User2,
  UserPen,
} from "lucide-react";
import { onIdTokenChanged, signOut } from "@/firebase/auth";
import { SelectUser } from "@/db/schemas/users-schema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const lawyerItems = [
  {
    title: "Inicio",
    url: "/inicio",
    icon: Home,
  },
  {
    title: "Buscar casos",
    url: "/casos",
    icon: Search,
  },
  {
    title: "Mis trabajos",
    url: "/mis-casos",
    icon: Inbox,
  },
  {
    title: "Mi perfil",
    url: "/perfil",
    icon: UserPen,
  },
  // {
  //   title: "Calendario",
  //   url: "#",
  //   icon: Calendar,
  // },
  // {
  //   title: "Ajustes",
  //   url: "#",
  //   icon: Settings,
  // },
];

const clientItems = [
  // {
  //   title: "Inicio",
  //   url: "/inicio",
  //   icon: Home,
  // },
  {
    title: "Tus casos",
    url: "/tus-casos",
    icon: ScrollText,
  },
  {
    title: "Mi perfil",
    url: "/perfil",
    icon: UserPen,
  },
];

function useUserSession(initialUser: SelectUser) {
  useEffect(() => {
    return onIdTokenChanged(async (user) => {
      if (user) {
        const idToken = await user.getIdToken();
        await setCookie("__session", idToken);
      } else {
        await deleteCookie("__session");
      }
      if (initialUser?.uid === user?.uid) {
        return;
      }
      window.location.reload();
    });
  }, [initialUser]);

  return initialUser;
}

export default function AppSidebar({
  initialUser,
}: {
  initialUser: SelectUser;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const user = useUserSession(initialUser);

  function handleSignOut(event: { preventDefault: () => void }) {
    try {
      event.preventDefault();
      signOut();
      router.push("/");
    } catch (error) {
      console.error("Error signing out", error);
    }
  }

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader className="ml-1">
        <Image
          src="/buno-coffee-bar-transparent-2.png"
          alt="Logo"
          width={140}
          height={40}
        />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Plataforma</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {(user?.roleId === 1 ? lawyerItems : clientItems).map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={(user?.photoURL as string) || undefined}
                      alt={(user?.displayName as string) || undefined}
                    />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user?.displayName}
                    </span>
                    <span className="truncate text-xs">{user?.email}</span>
                  </div>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <BadgeCheck className="w-4 h-4 mr-1.5" />
                    Mi cuenta
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard className="w-4 h-4 mr-1.5" />
                    Facturación
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell className="w-4 h-4 mr-1.5" />
                    Notificaciones
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-1.5" />
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
