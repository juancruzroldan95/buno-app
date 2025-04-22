import {
  BadgeCheck,
  Briefcase,
  ScrollText,
  UserCheck,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ClientHowItWorksPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">¿Cómo funciona?</h1>
        <p className="text-gray-500">
          Seguí estos pasos para obtener asistencia legal de forma simple.
        </p>
      </div>

      <div className="w-full space-y-3">
        <Card className="hover:ring-1 ring-primary transition">
          <CardContent className="p-4 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <ScrollText className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-semibold">Paso 1: Publicá tu caso</h3>
            </div>
            <p className="text-muted-foreground">
              Desde <strong>Menú {">"} Tus casos</strong>, vas a poder contarnos
              sobre tu necesidad legal con tus propias palabras. No te preocupes
              por escribir una descripción técnica o detallada. La IA de Buno te
              ayudará a transformar lo que escribas en una descripción adecuada
              para tu caso. Solo te lleva un minuto y tu información es
              estrictamente confidencial. Una vez publicado, tu caso será
              visible para los abogados calificados.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:ring-1 ring-primary transition">
          <CardContent className="p-4 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Users className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-semibold">
                Paso 2: Recibí propuestas
              </h3>
            </div>
            <p className="text-muted-foreground">
              Recibirás propuestas de abogados que estén interesados en tu caso.
              Podrás consultarles de manera gratuita antes de decidirte. Desde{" "}
              <strong>Menú {">"} Tus Casos</strong>, vas a poder ver todos tus
              casos creados y darle seguimiento. Además, podrás ver cuántas
              propuestas tiene cada uno de tus casos. Para ver más detalles
              sobre una propuesta, solo tenés que hacer clic en el caso
              correspondiente.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:ring-1 ring-primary transition">
          <CardContent className="p-4 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <BadgeCheck className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-semibold">
                Paso 3: Elegí a tu abogado
              </h3>
            </div>
            <p className="text-muted-foreground">
              Cuando estés listo, seleccioná la propuesta que más te convenga y
              contratá al abogado adecuado para tu caso. Estarás en contacto
              directo con el profesional.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:ring-1 ring-primary transition">
          <CardContent className="p-4 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Briefcase className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-semibold">
                Paso 4: Colaborá con tu abogado
              </h3>
            </div>
            <p className="text-muted-foreground">
              A través de la plataforma podrás colaborar con tu abogado y
              asegurarte de que tu información esté siempre segura y bien
              gestionada.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
