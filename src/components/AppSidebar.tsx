"use client";

import React, { useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import { signOut, onAuthStateChanged } from "@/firebase/auth";
import { useRouter, usePathname } from "next/navigation";
import { firebaseConfig } from "@/firebase/config";

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  ChevronUp,
  Home,
  Inbox,
  ScrollText,
  Search,
  Settings,
  User2,
  UserPen,
  CreditCard,
  Sparkles,
  BadgeCheck,
  Bell,
  LogOut,
} from "lucide-react";

// Menu items.
const lawyerItems = [
  {
    title: "Inicio",
    url: "/home",
    icon: Home,
  },
  {
    title: "Buscar casos",
    url: "/search-cases",
    icon: Search,
  },
  {
    title: "Mis casos",
    url: "/my-cases",
    icon: Inbox,
  },
  {
    title: "Mi perfil",
    url: "/profile",
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
  {
    title: "Inicio",
    url: "/home",
    icon: Home,
  },
  {
    title: "Tus casos",
    url: "/your-cases",
    icon: ScrollText,
  },
  {
    title: "Mi perfil",
    url: "/profile",
    icon: UserPen,
  },
];

// Logged user
const loggedUser = {
  id: "4f40a187-4539-435a-92a4-0f13aea10cc3",
  username: "shadcn",
  email: "m@example.com",
  role: 2,
  avatar: "/avatars/shadcn.jpg",
};

function useUserSession(initialUser: any) {
  // The initialUser comes from the server via a server component
  const [user, setUser] = useState(initialUser);
  const router = useRouter();

  // Register the service worker that sends auth state back to server
  // The service worker is built with npm run build-service-worker
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const serializedFirebaseConfig = encodeURIComponent(
        JSON.stringify(firebaseConfig)
      );
      const serviceWorkerUrl = `/auth-service-worker.js?firebaseConfig=${serializedFirebaseConfig}`;

      navigator.serviceWorker
        .register(serviceWorkerUrl)
        .then((registration) => console.log("scope is: ", registration.scope));
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((authUser: any) => {
      setUser(authUser);
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onAuthStateChanged((authUser: any) => {
      if (user === undefined) return;

      // refresh when user changed to ease testing
      if (user?.email !== authUser?.email) {
        router.refresh();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return user;
}

export function AppSidebar({ initialUser }: { initialUser: any }) {
  const router = useRouter();
  const pathname = usePathname();

  const user = useUserSession(initialUser);
  console.log(user);

  const handleSignOut = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    signOut();
  };

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
              {(loggedUser.role === 1 ? lawyerItems : clientItems).map(
                (item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
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
                      src={loggedUser.avatar}
                      alt={loggedUser.username}
                    />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {loggedUser.username}
                    </span>
                    <span className="truncate text-xs">{loggedUser.email}</span>
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
