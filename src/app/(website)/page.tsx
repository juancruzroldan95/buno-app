import Image from "next/image";
import Link from "next/link";
import { Handshake, Scale, ScrollText, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="bg-gray-50 mx-auto">
      {/* Hero */}
      <section className="relative overflow-hidden py-16">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-5 bg-gray-50 lg:max-w-2xl lg:w-full">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-gray-50 transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 text-center lg:text-left md:text-5xl lg:text-6xl">
                  <span className="block">Conectamos personas</span>
                  <span className="block">
                    con <span className="text-primary">abogados reales</span>
                  </span>
                </h1>
                <p className="mt-4 text-xl text-gray-600 lg:mt-6 md:max-w-xl mx-auto lg:mx-0">
                  Buno es una herramienta que te permite contratar y ser
                  contratado. Una nueva forma de encontrar abogados o conseguir
                  nuevos casos legales.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link href="/para-clientes">
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-lg px-8 py-6"
                    >
                      <Search className="h-10 w-10 mr-2" />
                      Busco abogado
                    </Button>
                  </Link>
                  <Link href="/para-abogados">
                    <Button
                      size="lg"
                      variant="default"
                      className="text-lg px-8 py-6"
                    >
                      <Scale className="h-10 w-10 mr-2" />
                      Soy abogado
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <Image
              className="h-56 max-w-xl object-cover sm:h-72 md:h-96 lg:w-full"
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf"
              alt="Law connection"
              width={500}
              height={500}
            />
          </div>
        </div>
      </section>

      {/* Qué es Buno */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">
              ¿Qué es Buno?
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Una nueva forma de conectar personas y abogados
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-600 lg:mx-auto">
              Buno ayuda a personas a encontrar asistencia legal confiable y a
              abogados a hacer crecer su práctica profesional.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <ScrollText className="h-10 w-10 text-primary" />
                <div>
                  <CardTitle className="text-xl">Para clientes</CardTitle>
                  <CardDescription>
                    Publicá tu caso, recibí propuestas de abogados verificados y
                    contratá con confianza.
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Handshake className="h-10 w-10 text-primary" />
                <div>
                  <CardTitle className="text-xl">Para abogados</CardTitle>
                  <CardDescription>
                    Encontrá nuevos casos, mostrá tu experiencia y generá
                    ingresos con más visibilidad.
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action final */}
      <section className="py-16 bg-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            ¿Qué necesitás hoy?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Ya seas una persona buscando ayuda o un abogado en busca de
            oportunidades, Buno es para vos.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/para-clientes">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                <Search className="h-10 w-10 mr-2" />
                Busco abogado
              </Button>
            </Link>
            <Link href="/para-abogados">
              <Button size="lg" variant="default" className="text-lg px-8 py-6">
                <Scale className="h-10 w-10 mr-2" />
                Soy abogado
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
