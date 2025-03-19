import Image from "next/image";

// Components
import { CreateCaseModal } from "@/components/CreateCaseModal";

// UI
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import {
  Search,
  Users,
  Scale,
  Shield,
  Building,
  BaggageClaim,
  Briefcase,
  Home,
  TreeDeciduous,
  Handshake,
} from "lucide-react";

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

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc.",
    content:
      "UpCounsel Clone has been a game-changer for our startup. We got top-notch legal advice at a fraction of the cost of a traditional law firm.",
    avatar: "SJ",
  },
  {
    name: "Michael Chen",
    role: "Founder, GreenEats",
    content:
      "The quality of attorneys on this platform is outstanding. They helped us navigate complex regulatory issues with ease.",
    avatar: "MC",
  },
  {
    name: "Emily Rodriguez",
    role: "COO, FitTech Solutions",
    content:
      "I'm impressed by how quickly we were matched with a skilled attorney. Our contracts are now rock-solid thanks to their expertise.",
    avatar: "ER",
  },
];

export default function HomePage() {
  return (
    <div className="bg-gray-50 mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 bg-gray-50 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-gray-50 transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>

            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="text-center lg:text-left">
                <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 md:text-4xl lg:text-5xl">
                  <span className="block xl:inline">Encontrá a tu abogado</span>{" "}
                  <span className="block text-primary xl:inline">
                    de confianza
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Ya sea que necesites una consulta única o un departamento
                  legal independiente completo, la red de abogados
                  experimentados de Buno lo tiene cubierto.
                </p>
                <div className="mt-4 lg:flex lg:flex-row items-center">
                  <p className="text-2xl">¿De dónde sos?</p>
                  <div className="flex justify-center mt-2 lg:m-0">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="lg"
                          variant="outline"
                          className="text-xl font-bold mx-2"
                        >
                          CABA
                        </Button>
                      </DialogTrigger>
                      <CreateCaseModal selectedLocation="CABA" />
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="lg"
                          variant="outline"
                          className="text-xl font-bold mx-2"
                        >
                          Provincia
                        </Button>
                      </DialogTrigger>
                      <CreateCaseModal selectedLocation="Provincia" />
                    </Dialog>
                  </div>
                </div>
              </div>
            </main>
          </div>
          <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <Image
              className="h-56 max-w-xl object-cover sm:h-72 md:h-96 lg:w-full"
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf"
              alt="An attorney tying his jacket."
              width={500}
              height={500}
            />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-12 bg-slate-100">
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

      {/* How It Works */}
      <section className="py-12">
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

      {/* Testimonials */}
      {/* <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Testimonials</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Trusted by businesses of all sizes
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Don't just take our word for it. Here's what our clients have to say about our services.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.name}>
                  <CardHeader>
                    <div className="flex items-center">
                      <Avatar>
                        <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${testimonial.avatar}`} />
                        <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4">
                        <CardTitle className="text-lg font-medium text-gray-900">{testimonial.name}</CardTitle>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 italic">"{testimonial.content}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}
