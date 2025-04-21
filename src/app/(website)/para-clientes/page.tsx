import Image from "next/image";
import Link from "next/link";
import {
  BaggageClaim,
  Briefcase,
  Building,
  Handshake,
  Home,
  Scale,
  Search,
  Shield,
  TreeDeciduous,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const services = [
  {
    title: "Familia",
    description: "Soluciones legales para divorcios, adopciones y herencias.",
    icon: Users,
  },
  {
    title: "Penal",
    description: "Defensa en delitos menores y situaciones complejas.",
    icon: Scale,
  },
  {
    title: "Corporativo",
    description: "Asesoría para contratos, fusiones y más.",
    icon: Building,
  },
  {
    title: "Propiedad",
    description: "Protegé tus ideas con patentes y derechos de autor.",
    icon: Shield,
  },
  {
    title: "Migraciones",
    description: "Asesoría para trámites de residencia y ciudadanía.",
    icon: BaggageClaim,
  },
  {
    title: "Trabajo",
    description: "Protección de tus derechos laborales y contratos.",
    icon: Briefcase,
  },
  {
    title: "Desalojo",
    description: "Asesoría legal en procesos de desalojo y alquiler.",
    icon: Home,
  },
  {
    title: "Patria potestad",
    description: "Asesoría en custodia, patria potestad y visitas.",
    icon: TreeDeciduous,
  },
];

const steps = [
  {
    title: "Publicá un caso",
    description:
      "Contanos sobre tu necesidad legal. Solo te lleva un minuto y tu información es estrictamente confidencial.",
    icon: Search,
  },
  {
    title: "Recibí propuestas",
    description:
      "Te conectamos con los abogados mejores cualificados para manejar tu trabajo legal. Podés revisar las propuestas y hacer consultas gratuitas.",
    icon: Users,
  },
  {
    title: "Contratá a tu abogado",
    description:
      "Cuando estés listo, contratá al abogado justo para vos. Colaborá de forma online y asegurate que tu información esté siempre segura.",
    icon: Handshake,
  },
];

export default function ForClientsPage() {
  return (
    <div className="bg-gray-50 mx-auto">
      {/* Hero */}
      <section
        id="hero-for-lawyers"
        className="py-12 flex flex-col justify-center items-center"
      >
        <div className="lg:w-1/2 px-4">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-slate-900 text-center md:text-5xl lg:text-6xl dark:text-white">
            Encontrá a tu abogado{" "}
            <span className="text-primary">de confianza</span>
          </h1>
          <p className="text-xl mt-5 text-center text-slate-500">
            Ya sea que necesites una consulta única o un departamento legal
            independiente completo, la red de abogados experimentados de Buno lo
            tiene cubierto.
          </p>
          <div className="mt-5 flex justify-center">
            <Link href="/sign-up">
              <Button className="px-4 py-2 text-xl md:px-6 md:py-4 md:text-2xl font-bold">
                Recibí propuestas gratis
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">
              Cómo funciona
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Asistencia legal de forma simple
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Nuestro proceso simplificado facilita obtener la asistencia legal
              que necesitás.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {steps.map((step, index) => (
                <Card key={step.title}>
                  <CardHeader>
                    <CardTitle className="mt-2">
                      <span className="text-primary mr-2">{index + 1}.</span>
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{step.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h3 className="text-base text-primary font-semibold tracking-wide uppercase">
              Servicios
            </h3>
            <h2 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Nuestras áreas legales
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Nuestra red de abogados cubre cualquier necesidad legal que
              tengas.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => (
                <Card key={service.title}>
                  <CardHeader className="flex flex-row pb-3 gap-x-3">
                    <service.icon className="h-8 w-8 text-primary" />
                    <CardTitle className="mt-2">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <CardDescription>{service.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
