import { FolderSearch, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SearchCasesPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-20 text-center">
      <div className="flex justify-center mb-6">
        <Search className="h-12 w-12 text-blue-600" />
      </div>
      <h1 className="text-3xl font-semibold mb-2">Buscar casos</h1>
      <p className="text-muted-foreground mb-6">
        Acá vas a encontrar casos publicados por clientes en busca de abogados.
        Podés ver los detalles, filtrar por categoría y enviar tus propuestas.
      </p>
      <div className="flex flex-col items-center gap-4">
        <FolderSearch className="h-10 w-10 text-gray-400" />
        <p className="text-gray-500">Todavía no hay casos disponibles.</p>
        <Button variant="outline" disabled>
          Próximamente
        </Button>
      </div>
    </section>
  );
}
