"use client";

import Link from "next/link";

export default function MobileMenu({ onClick }: { onClick: () => void }) {
  return (
    <section
      id="mobile-menu"
      className="absolute bg-white z-40 w-full text-xl flex flex-col justify-content-center origin-top animate-open-menu"
    >
      <nav
        onClick={onClick}
        className="flex flex-col min-h-screen items-center"
        aria-label="mobile"
      >
        <Link
          href="/our-lawyer"
          className="w-full py-6 text-center hover:opacity-90 bg-slate-100"
        >
          Nuestros abogados
        </Link>
        <Link
          href="/for-lawyers"
          className="w-full py-6 text-center hover:opacity-90 bg-slate-100"
        >
          Para abogados
        </Link>
        <Link
          href="/about-us"
          className="w-full py-6 text-center hover:opacity-90 bg-slate-100"
        >
          Conocenos
        </Link>
        <Link
          href="/login"
          className="w-full text-center py-6 hover:opacity-90"
        >
          Iniciar sesión
        </Link>
        <Link
          href="/sign-up"
          className="w-full text-center py-6 hover:opacity-90 font-bold"
        >
          Registrate
        </Link>
      </nav>
    </section>
  );
}
