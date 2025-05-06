import Link from "next/link";
import { Users2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutUsPage() {
  return (
    <div className="mt-20 flex flex-col items-center justify-center text-center p-4">
      <Users2 className="w-16 h-16 text-blue-600 mb-4" />
      <h1 className="text-2xl md:text-3xl font-semibold mb-2">
        Sobre nosotros
      </h1>
      <p className="text-gray-600 mb-6 max-w-md">
        Muy pronto vas a poder conocer al equipo fundador detrás de Buno y la
        historia del proyecto. Estamos preparando esta sección con mucho
        cuidado.
      </p>
      <Link href="/">
        <Button variant="outline">Volver al inicio</Button>
      </Link>
    </div>
  );
}
