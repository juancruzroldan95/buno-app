"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

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

import { logout } from "@/firebase/auth";

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
  role: 1,
  avatar: "/avatars/shadcn.jpg",
};

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  async function handleLogout() {
    try {
      const response = await logout();
      console.log(response);
      router.push("/");
    } catch (error) {
      console.error(error);
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
                <DropdownMenuItem onClick={handleLogout}>
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
