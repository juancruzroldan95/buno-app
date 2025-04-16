"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CreateCaseModal } from "@/app/(app)/tus-casos/components/CreateCaseModal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import HamburgerBtn from "./HamburgerBtn";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toggleBtn, setToggleBtn] = useState("");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!toggleBtn) setToggleBtn("toggle-btn");
    else setToggleBtn("");
  };

  return (
    <header className="w-full sticky top-0 z-40 bg-white">
      <section className="xl:max-w-7xl m-auto p-4 flex justify-between items-center">
        <div className="flex items-center w-[258px]">
          <Link href="/">
            <Image
              src="/buno-coffee-bar-transparent-2.png"
              alt="Logo"
              width={140}
              height={40}
            />
          </Link>
        </div>

        <HamburgerBtn onClick={toggleMobileMenu} toggleBtn={toggleBtn} />

        <NavigationMenu className="hidden md:block">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/nuestros-abogados" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Nuestros abogados
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/para-abogados" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Para abogados
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/sobre-nosotros" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  ¿Quiénes somos?
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden md:flex space-x-4">
          <Link href="/sign-up">
            <Button variant="default" className="text-lg">
              Publicá tu caso
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="ghost">Iniciar sesión</Button>
          </Link>
        </div>
      </section>
      {isMobileMenuOpen && <MobileMenu onClick={toggleMobileMenu} />}
    </header>
  );
}
