import { BriefcaseBusiness, Hourglass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MyCasesPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-20 text-center">
      <div className="flex justify-center mb-6">
        <BriefcaseBusiness className="h-12 w-12 text-blue-600" />
      </div>
      <h1 className="text-3xl font-semibold mb-2">Mis casos</h1>
      <p className="text-muted-foreground mb-6">
        En esta sección vas a poder ver todos los casos en los que estás
        trabajando como abogado, revisar propuestas enviadas y hacer seguimiento
        del estado de cada una.
      </p>
      <div className="flex flex-col items-center gap-4">
        <Hourglass className="h-10 w-10 text-gray-400" />
        <p className="text-gray-500">Todavía no tenés casos en curso.</p>
        <Button variant="outline" disabled>
          Esta sección estará disponible pronto
        </Button>
      </div>
    </section>
  );
}
