import Link from "next/link";
import { cn, getRelativeTime } from "@/utils/utils";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  PenTool,
  PlusCircle,
  Scale,
} from "lucide-react";
import { getCaseById } from "@/lib/cases-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

// export async function generateStaticParams() {
//   const cases = await getAllActiveCases();

//   return cases.map((_case) => ({
//     caseId: _case.caseId,
//   }));
// }

export default async function CaseDetailForLawyerPage({
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
          <Link href="/buscar-casos">
            <ArrowLeft className="size-5" />
          </Link>
          <h1 className="text-3xl font-bold">Detalle del caso</h1>
        </div>
        <p className="text-gray-500">
          Leé la información del caso y enviá tu propuesta.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col items-start">
              <span
                className={cn(
                  "flex items-center gap-1 px-2 py-0.5 rounded-full font-medium text-sm md:text-base mb-2 w-fit",
                  {
                    "bg-yellow-100 text-yellow-800": caseData.lawAreaId === 1,
                    "bg-green-100 text-green-800": caseData.lawAreaId === 2,
                    "bg-pink-100 text-pink-800": caseData.lawAreaId === 3,
                    "bg-indigo-100 text-indigo-800": caseData.lawAreaId === 4,
                    "bg-red-100 text-red-800": caseData.lawAreaId === 5,
                    "bg-gray-200 text-gray-900": caseData.lawAreaId === 6,
                    "bg-purple-100 text-purple-800": caseData.lawAreaId === 7,
                    "bg-blue-100 text-blue-800": caseData.lawAreaId === 8,
                    "bg-orange-100 text-orange-800": caseData.lawAreaId === 9,
                    "bg-rose-100 text-rose-800": caseData.lawAreaId === 10,
                  }
                )}
              >
                <Scale className="size-3 md:size-4" />
                {caseData.lawAreaLabel}
              </span>
              <CardTitle className="text-2xl mt-2">{caseData.title}</CardTitle>
            </div>
            <div className="flex flex-wrap gap-2 text-sm md:text-base text-muted-foreground">
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

      {caseData.status === "open" ? (
        <div className="text-center">
          <Button className="w-full md:w-auto">
            <PenTool className="size-4" />
            Escribir propuesta
          </Button>
        </div>
      ) : (
        <p className="text-center text-muted-foreground">
          Este caso ya no está abierto para nuevas propuestas.
        </p>
      )}
    </div>
  );
}
