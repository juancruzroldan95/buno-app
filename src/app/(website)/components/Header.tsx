"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import HamburgerBtn from "./HamburgerBtn";
import { CreateCaseModal } from "@/components/CreateCaseModal";
import MobileMenu from "./MobileMenu";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
              <Link href="/our-lawyers" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Nuestros abogados
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/for-lawyers" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Para abogados
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/about-us" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  ¿Quiénes somos?
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden md:flex space-x-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default" className="text-lg">
                Publicá tu caso
              </Button>
            </DialogTrigger>
            <CreateCaseModal />
          </Dialog>
          <Link href="/login">
            <Button variant="ghost">Iniciar sesión</Button>
          </Link>
        </div>
      </section>
      {isMobileMenuOpen && <MobileMenu onClick={toggleMobileMenu} />}
    </header>
  );
}
