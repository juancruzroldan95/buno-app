import Link from "next/link";
import {
  BaggageClaim,
  Banknote,
  Building2,
  Flame,
  Handshake,
  HardHat,
  HeartCrack,
  ReceiptText,
  Scale,
  Search,
  Shield,
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
    title: "Despidos y Accidentes",
    description:
      "Asesoría en casos de despido, indemnizaciones, accidentes laborales, y derechos de los trabajadores. Brinda apoyo para resolver conflictos laborales y asegurar el cumplimiento de las normativas laborales vigentes.",
    icon: HardHat,
  },
  {
    title: "Contratos",
    description:
      "Redacción, revisión y negociación de contratos de todo tipo, incluyendo contratos laborales, comerciales y civiles. Asegura que los acuerdos legales sean claros, precisos y que cumplan con la normativa argentina.",
    icon: ReceiptText,
  },
  {
    title: "Divorcios",
    description:
      "Asesoría y representación en casos de divorcio, incluyendo acuerdos de custodia, distribución de bienes, y pensiones alimentarias. Facilita la resolución legal de procesos de separación y garantiza la protección de los derechos de las partes involucradas.",
    icon: HeartCrack,
  },
  {
    title: "Marcas y Patentes",
    description:
      "Apoyo en el registro, protección y gestión de marcas, patentes, y otros activos de propiedad intelectual. Asegura que las innovaciones y la identidad comercial estén protegidas de acuerdo con la ley.",
    icon: Shield,
  },
  {
    title: "Siniestros",
    description:
      "Asesoramiento en reclamos y resolución de conflictos derivados de accidentes de tránsito, incendios y otros eventos con daños personales o materiales. Ayuda en la gestión de indemnizaciones y coberturas de seguros.",
    icon: Flame,
  },
  {
    title: "Penal",
    description:
      "Defensa y representación en casos penales, incluyendo delitos comunes y económicos. Ofrece asesoramiento y apoyo legal en todas las etapas del proceso penal.",
    icon: Scale,
  },
  {
    title: "Familia",
    description:
      "Asesoría en temas de relaciones familiares, incluyendo matrimonio, divorcio, acuerdos de custodia, adopciones y pensiones alimentarias. También incluye la planificación y tramitación de sucesiones y herencias.",
    icon: Users,
  },
  {
    title: "Migratorio",
    description:
      "Asesoría en trámites de residencia, ciudadanía y visados para extranjeros en Argentina. Facilita la regularización de estatus migratorio y el cumplimiento de requisitos legales para vivir y trabajar en el país.",
    icon: BaggageClaim,
  },
  {
    title: "Corporativo",
    description:
      "Asesoría en constitución, gestión y reestructuración de empresas, incluyendo fusiones, adquisiciones, compliance y conflictos societarios.",
    icon: Building2,
  },
  {
    title: "Tributario y Finanzas",
    description:
      "Planificación fiscal, cumplimiento tributario, y defensa en disputas impositivas, ayudando a optimizar la carga impositiva y proteger activos.",
    icon: Banknote,
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
        <div className="md:w-2/3 lg:w-1/2 px-4">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-slate-900 text-center md:text-5xl lg:text-6xl">
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
