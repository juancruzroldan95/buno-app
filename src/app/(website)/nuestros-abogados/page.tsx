import Link from "next/link";
import { Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OurLawyersPage() {
  return (
    <div className="my-16 flex flex-col items-center justify-center text-center p-4">
      <Briefcase className="w-16 h-16 text-blue-600 mb-4" />
      <h1 className="text-2xl md:text-3xl font-semibold mb-2">
        Nuestros abogados
      </h1>
      <p className="text-gray-600 mb-6 max-w-md">
        Esta página estará disponible pronto. Estamos trabajando para
        presentarte a los mejores abogados de la plataforma.
      </p>
      <Link href="/">
        <Button variant="outline">Volver al inicio</Button>
      </Link>
    </div>
  );
}
