import {
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle,
  FileText,
  Medal,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const LAWYER_STEPS = [
  {
    icon: CheckCircle,
    title: "Paso 1: Completa tu perfil",
    description: (
      <>
        Desde el <strong>Menú {">"} Mi Perfil</strong>, completá tu información
        personal y profesional. Cargá tus matrículas para que el equipo de Buno
        pueda verificar tus documentos y así empezar a enviar propuestas.
        También te recomendamos cargar tus experiencias y educación para hacer
        tu perfil más completo y generar confianza.
      </>
    ),
  },
  {
    icon: FileText,
    title: "Paso 2: Buscar casos",
    description: (
      <>
        Una vez verificado tu perfil vas a tener un check de verificación{" "}
        <BadgeCheck className="inline align-middle size-4 mb-2" /> en tu perfil.
        Desde <strong>Menú {">"} Buscar Casos</strong> vas a poder ver un
        directorio de casos filtrables por ubicación, área del derecho, o
        palabra clave. Hacé clic en uno para ver los detalles del caso y enviar
        tu propuesta personalizada al cliente.
      </>
    ),
  },
  {
    icon: Medal,
    title: "Paso 3: Propuesta seleccionada",
    description: (
      <>
        Cuando un cliente elige tu propuesta, te notificamos por email. A partir
        de ahí, vas a poder empezar a trabajar directamente con el cliente en el
        caso.
      </>
    ),
  },
  {
    icon: BriefcaseBusiness,
    title: "Paso 4: Seguimiento de propuestas",
    description: (
      <>
        Desde <strong>Menú {">"} Mis Propuestas</strong> vas a poder hacer
        seguimiento de todas tus propuestas enviadas, ver tus trabajos actuales
        o activos, y asegurarte de no perder el rastro de tus casos activos.
      </>
    ),
  },
];

export default function LawyerHowItWorksPage() {
  return (
    <div className="max-w-7xl mx-auto px-3 py-6 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">¿Cómo funciona?</h1>
        <p className="text-gray-500">
          Seguí estos pasos para empezar a trabajar con Buno.
        </p>
      </div>

      <div className="w-full space-y-3">
        {LAWYER_STEPS.map((step, index) => (
          <Card key={index} className="hover:ring-1 ring-primary transition">
            <CardContent className="p-4 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <step.icon className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-semibold">{step.title}</h3>
              </div>
              <p className="text-muted-foreground">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
