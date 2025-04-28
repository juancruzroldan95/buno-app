import Link from "next/link";
import { getRelativeTime } from "@/utils/utils";
import { ArrowLeft, Calendar, MapPin, Scale, User2 } from "lucide-react";
import { getCaseById } from "@/lib/cases-actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

const caseStatusLabels: Record<string, string> = {
  open: "Abierto",
  in_progress: "En Progreso",
  closed: "Cerrado",
  cancelled: "Cancelado",
};

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ caseId: string }>;
}) {
  const { caseId } = await params;
  const caseData = await getCaseById(caseId);

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 lg:px-8">
      <div className="mb-8 space-y-2">
        <div className="flex items-center gap-2 mb-4">
          <Link href="/tus-casos">
            <ArrowLeft className="size-5" />
          </Link>
          <h1 className="text-3xl font-bold">Detalle del caso</h1>
        </div>
        <p className="text-gray-500">
          Acá podés ver toda la información de tu caso y las propuestas
          recibidas.
        </p>
      </div>

      {/* Información del caso */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col-reverse md:flex-row items-start md:justify-between md:items-center">
              <CardTitle className="text-2xl">{caseData.title}</CardTitle>
              <Badge variant="default">
                {caseStatusLabels[caseData.status]}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Scale className="size-4" />
                {caseData.lawAreaLabel}
              </span>
              <span className="hidden md:block">•</span>
              <span className="flex items-center gap-1">
                <MapPin className="size-4" />
                {caseData.provinceLabel}
              </span>
              <span className="hidden md:block">•</span>
              <span className="flex items-center gap-1">
                <Calendar className="size-4" />
                {getRelativeTime(new Date(caseData.createdAt))}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <div>
            <h2 className="text-lg font-semibold text-primary mb-2">
              Descripción del caso
            </h2>
            <p>{caseData.description}</p>
          </div>
        </CardContent>
      </Card>

      {/* Propuestas recibidas */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Propuestas recibidas</h2>
        <div className="text-muted-foreground mb-4">
          Estas son las propuestas que los abogados enviaron a tu caso. Podés
          hacer clic en cada propuesta para ver más detalles.
        </div>

        {/* Lista de propuestas simulada */}
        <div className="space-y-4">
          {[1, 2, 3].map((proposal) => (
            <Card
              key={proposal}
              className="hover:ring-1 ring-primary transition cursor-pointer"
            >
              <CardContent className="p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-medium">
                    <User2 className="size-5 text-primary" />
                    Nombre del abogado {proposal}
                  </div>
                  <Button size="sm" variant="outline">
                    Ver propuesta
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Breve resumen de la propuesta o comentario inicial del
                  abogado. Al hacer clic podés ver la propuesta completa.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
