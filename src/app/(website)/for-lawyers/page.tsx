import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, FileCheck, Briefcase } from "lucide-react";
import Link from "next/link";

const benefits = [
  {
    title: "Obtené clientes",
    description: "Accedé a empresas y startups de alto perfil.",
    icon: Users,
  },
  {
    title: "Flexibilidad",
    description: "Trabajá según tu propio horario desde cualquier lugar.",
    icon: Briefcase,
  },
  {
    title: "Mayores ganancias",
    description: "Aumentá tus ingresos con tarifas competitivas.",
    icon: FileCheck,
  },
  {
    title: "Proceso simplificado",
    description: "Gestión eficiente de clientes y facturación.",
    icon: CheckCircle,
  },
  {
    title: "Networking",
    description: "Conectá con otros abogados profesionales.",
    icon: Users,
  },
  {
    title: "Crecimiento Profesional",
    description: "Accedé a recursos para el aprendizaje continuo.",
    icon: Briefcase,
  },
];

const steps = [
  {
    title: "Aplicá como abogado",
    description: "Enviá tu solicitud y credenciales para su revisión.",
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
    <div className="bg-gray-50 mx-auto">
      <section
        id="hero-for-lawyers"
        className="py-12 flex flex-col justify-center items-center"
      >
        <div className="lg:w-1/2 px-4">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-slate-900 text-center md:text-5xl lg:text-6xl dark:text-white">
            <strong>Crecé profesionalmente</strong>
          </h1>
          <p className="text-xl mt-5 text-center text-slate-500">
            Unite a la mejor comunidad de abogados de Buenos Aires, aumentá tu
            cartera de clientes y generá más ingresos.
          </p>
          <div className="mt-5 flex justify-center">
            <Link href="/sign-up">
              <Button size="lg" className="text-2xl font-bold">
                Aplicá como abogado
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8">
            ¿Por qué unirse a Buno?
          </h2>
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    {<benefit.icon className="h-6 w-6 text-indigo-500 mr-2" />}
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

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8">
            ¿Cómo funciona?
          </h2>
          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {steps.map((step, index) => (
                <Card key={step.title}>
                  <CardHeader>
                    <CardTitle className="mt-2 text-xl">
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
