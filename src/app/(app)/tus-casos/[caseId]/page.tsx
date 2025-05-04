import Link from "next/link";
import { cn, getRelativeTime } from "@/utils/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ArrowLeft, Calendar, MapPin, Phone, Scale, User2 } from "lucide-react";
import { getCaseById } from "@/lib/cases-actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ContactButton } from "./components/ContactButton";

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

      <Card className="mb-6">
        <CardHeader>
          <div className="flex flex-col-reverse md:flex-col gap-2">
            <span
              className={cn(
                "flex items-center gap-1 px-2 py-0.5 rounded-full font-medium text-sm md:text-base w-fit",
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
            <div>
              <div className="flex flex-col-reverse md:flex-row items-start md:justify-between md:items-center">
                <CardTitle className="text-2xl my-2">
                  {caseData.title}
                </CardTitle>
                <Badge variant="default">
                  {caseStatusLabels[caseData.status]}
                </Badge>
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

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Propuestas recibidas</h2>
        <div className="text-muted-foreground mb-4">
          Estas son las propuestas que los abogados enviaron a tu caso.
        </div>

        {caseData.bids.length === 0 ? (
          <p className="text-muted-foreground text-center">
            Aún no hay propuestas para este caso.
          </p>
        ) : (
          <div className="space-y-4">
            {caseData.bids.map((bid) => (
              <Card
                key={bid.bidId}
                className="hover:ring-1 ring-primary transition"
              >
                <CardContent className="p-4 flex flex-col gap-4">
                  <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center justify-between">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-2 font-medium">
                        <User2 className="size-5 text-primary" />
                        Dr.{" "}
                        {bid.lawyer.firstName +
                          (bid.lawyer.lastName
                            ? " " + bid.lawyer.lastName
                            : "")}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Enviado el{" "}
                        {format(bid.createdAt!, "dd 'de' MMMM 'de' yyyy", {
                          locale: es,
                        })}
                      </span>
                    </div>
                    <ContactButton
                      uid={bid.lawyer.uid}
                      email={bid.lawyer.email}
                      phone={bid.lawyer.phone}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {bid.proposal}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
