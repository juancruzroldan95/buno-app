"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/para-abogados", label: "Para abogados" },
    { href: "/nuestros-abogados", label: "Nuestros abogados" },
    { href: "/sobre-nosotros", label: "¿Quiénes somos?" },
  ];

  return (
    <header className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200">
      <nav className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
          onClick={() => setIsOpen(false)}
        >
          <Image
            src="/buno-coffee-bar-transparent-2.png"
            alt="Buno Logo"
            width={140}
            height={40}
          />
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-4 rtl:space-x-reverse">
          <Link href="/sign-up" onClick={() => setIsOpen(false)}>
            <Button className="md:text-lg">Publicá tu caso</Button>
          </Link>
          <Link
            href="/login"
            className="hidden md:flex py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
          >
            Iniciar sesión
          </Link>
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        <div
          className={`${
            isOpen ? "flex" : "hidden"
          } items-center justify-between w-full md:flex md:w-auto md:order-1`}
        >
          <ul className="flex flex-col w-full p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
            <Link href="/login" onClick={() => setIsOpen(false)}>
              <Button className="w-full md:hidden">Iniciar sesión</Button>
            </Link>
            <div className="mt-4 mb-2 w-full md:hidden h-[1px] bg-gray-200" />
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 px-3 rounded md:p-0 ${
                    pathname === href
                      ? "text-blue-700 md:text-blue-700"
                      : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
