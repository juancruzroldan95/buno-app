import Link from "next/link";
import {
  BriefcaseBusiness,
  CheckCircle,
  HandCoins,
  Network,
  Users,
  Watch,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const benefits = [
  {
    title: "Obtené clientes",
    description: "Accedé a empresas y startups de alto perfil.",
    icon: Users,
  },
  {
    title: "Flexibilidad",
    description: "Trabajá según tu propio horario desde cualquier lugar.",
    icon: Watch,
  },
  {
    title: "Mayores ganancias",
    description: "Aumentá tus ingresos con tarifas competitivas.",
    icon: HandCoins,
  },
  {
    title: "Proceso simplificado",
    description: "Gestión eficiente de clientes y facturación.",
    icon: CheckCircle,
  },
  {
    title: "Networking",
    description: "Conectá con otros abogados profesionales.",
    icon: Network,
  },
  {
    title: "Crecimiento Profesional",
    description: "Accedé a recursos para el aprendizaje continuo.",
    icon: BriefcaseBusiness,
  },
];

const steps = [
  {
    title: "Aplicá como abogado",
    description:
      "Completá tu perfil profesional y matrículas para su revisión.",
  },
  {
    title: "Aprobá tu perfil",
    description:
      "Nuestro equipo revisará tu solicitud y aprobará abogados calificados.",
  },
  {
    title: "Empezá a trabajar",
    description:
      "Una vez aprobado, comenzá a recibir solicitudes de clientes y hacé crecer tu práctica.",
  },
];

export default function ForLawyersPage() {
  return (
    <div className="mx-auto">
      {/* Hero */}
      <section
        id="hero-for-lawyers"
        className="py-20 bg-gray-50 flex flex-col justify-center items-center"
      >
        <div className="md:w-2/3 lg:w-1/2 px-4">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-slate-900 text-center md:text-5xl lg:text-6xl">
            Crecé profesionalmente
          </h1>
          <p className="text-xl mt-5 text-center text-slate-500">
            Unite a la mejor comunidad de abogados de Buenos Aires, aumentá tu
            cartera de clientes y generá más ingresos.
          </p>
          <div className="mt-5 flex justify-center">
            <Link href="/sign-up">
              <Button className="px-4 py-2 text-xl md:px-6 md:py-4 md:text-2xl font-bold">
                Aplicá como abogado
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8 lg:text-center">
            ¿Por qué unirse a Buno?
          </h2>
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    {<benefit.icon className="h-6 w-6 text-primary mr-2" />}
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8 lg:text-center">
            ¿Cómo funciona?
          </h2>
          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
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
    </div>
  );
}
