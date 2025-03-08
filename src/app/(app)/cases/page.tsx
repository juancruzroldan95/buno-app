"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

// Mock data
const mockCases = [
  {
    case_id: "HwbOXgtCpPO0Y2VjtFAt",
    client_id: "Jm1ECAYSRGs62B3TF3Fh",
    description:
      "Una empresa de tecnología emergente debe asegurarse de que todas sus operaciones cumplan con las leyes de protección de datos locales e internacionales, como el Reglamento General de Protección de Datos (GDPR). Requieren asistencia legal para revisar y posiblemente reescribir sus políticas de privacidad, implementar acuerdos de procesamiento de datos seguros y garantizar que todas las prácticas de manejo de datos cumplan con la ley para evitar posibles multas y litigios.",
    location: "CABA",
    category: "Trabajo",
    status: "Abierto",
    created_at: "2024-08-30T16:36:05-03:00",
    updated_at: "2024-08-30T16:36:48-03:00",
    is_deleted: false,
  },
  {
    case_id: "Wn2MG3CFKb9QjSkPLB5a",
    client_id: "Uj2NPSHDvNf7xG2RKN8a",
    description:
      "Una pareja está atravesando un proceso de divorcio complicado y necesita asesoría para resolver la división de bienes y la custodia de sus hijos. Buscan un abogado que pueda mediar y representar sus intereses durante el proceso judicial.",
    location: "Provincia",
    category: "Familia",
    status: "Trabajando",
    created_at: "2024-09-02T09:12:15-03:00",
    updated_at: "2024-09-03T10:45:10-03:00",
    is_deleted: false,
  },
  {
    case_id: "Qw3NT6HZMl6FjV7LXr8B",
    client_id: "Tc9KSFZHvKg3dR7YJm2Z",
    description:
      "Una empresa multinacional necesita asesoría legal para la elaboración de contratos laborales en sus nuevas oficinas regionales en América Latina. Quieren asegurarse de cumplir con las leyes laborales locales mientras protegen los intereses de la empresa.",
    location: "Provincia",
    category: "Corporativo",
    status: "Completado",
    created_at: "2024-09-05T15:45:30-03:00",
    updated_at: "2024-09-05T17:20:15-03:00",
    is_deleted: false,
  },
  {
    case_id: "Lj5RD4EXKn8PjXmV2U9F",
    client_id: "Bb8JKYRHdGj4xF9WNp3T",
    description:
      "Un cliente busca asesoría para registrar una patente sobre una nueva tecnología en el sector agrícola. Necesita ayuda para asegurarse de que la patente sea válida en varios países y esté bien protegida contra posibles infracciones.",
    location: "CABA",
    category: "Propiedad",
    status: "Cancelado",
    created_at: "2024-09-08T11:23:45-03:00",
    updated_at: "2024-09-09T14:50:30-03:00",
    is_deleted: false,
  },
  {
    case_id: "Xr7NG4JHKl1KqLnT3C4E",
    client_id: "Jp3RFZVHqFk6yG1KMq8V",
    description:
      "Una familia de inmigrantes busca asistencia legal para regularizar su situación migratoria. Requieren ayuda para obtener residencia permanente y asegurar la reagrupación familiar.",
    location: "Provincia",
    category: "Migraciones",
    status: "Abierto",
    created_at: "2024-09-10T08:50:20-03:00",
    updated_at: "2024-09-12T11:15:40-03:00",
    is_deleted: false,
  },
  {
    case_id: "Yp8LC5VDJl2KjVkTLc7H",
    client_id: "Fm7JKDZHsNj9xB2RTw5G",
    description:
      "Un trabajador fue despedido de su puesto sin justa causa y busca asesoría legal para presentar una demanda por despido improcedente y reclamar la indemnización correspondiente.",
    location: "CABA",
    category: "Trabajo",
    status: "Abierto",
    created_at: "2024-09-13T17:15:50-03:00",
    updated_at: "2024-09-14T14:30:20-03:00",
    is_deleted: false,
  },
  {
    case_id: "Zl9SB6IHJl3VjZpWKc8K",
    client_id: "Cp4LKFZHvNg8yG3LPk9V",
    description:
      "Una empresa agrícola enfrenta problemas con inquilinos que no han pagado el alquiler durante varios meses. Requieren asistencia legal para iniciar el proceso de desalojo y recuperar la propiedad.",
    location: "CABA",
    category: "Desalojo",
    status: "Abierto",
    created_at: "2024-09-15T12:25:35-03:00",
    updated_at: "2024-09-16T15:40:50-03:00",
    is_deleted: false,
  },
  {
    case_id: "Bl5NC8FJKn6LjVpVLd9C",
    client_id: "Dq2PKTZHvLk3yT8KRn6S",
    description:
      "Una madre soltera necesita asesoría legal para establecer la patria potestad de su hijo y garantizar los derechos de visita del padre. Busca llegar a un acuerdo sin necesidad de llegar a juicio.",
    location: "Provincia",
    category: "Patria potestad",
    status: "Completado",
    created_at: "2024-09-18T09:30:40-03:00",
    updated_at: "2024-09-19T13:10:25-03:00",
    is_deleted: false,
  },
  {
    case_id: "Cr2KB9ZJLn9NjXpVLb1D",
    client_id: "Ep7MKYZHrNm9xG5RTc4Q",
    description:
      "Un empresario enfrenta acusaciones de fraude en la administración de su compañía y necesita una defensa legal especializada para afrontar las investigaciones en curso y evitar cargos criminales.",
    location: "Provincia",
    category: "Penal",
    status: "Trabajando",
    created_at: "2024-09-20T16:50:15-03:00",
    updated_at: "2024-09-21T10:25:45-03:00",
    is_deleted: false,
  },
  {
    case_id: "Dn1KG7JGl4PkVmWXf2M",
    client_id: "Gr9LNZVHqMk2yH6MRj1V",
    description:
      "Un desarrollador de software está siendo demandado por presunta violación de derechos de autor en una de sus aplicaciones. Busca asesoría legal para defenderse y negociar un posible acuerdo extrajudicial.",
    location: "CABA",
    category: "Propiedad",
    status: "Abierto",
    created_at: "2024-09-22T19:45:50-03:00",
    updated_at: "2024-09-23T15:35:25-03:00",
    is_deleted: false,
  },
];

const statusColors = {
  Abierto: "bg-green-500",
  Trabajando: "bg-yellow-500",
  Cancelado: "bg-red-500",
  Completado: "bg-gray-500",
};

export default function CasesPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  const filteredCases = mockCases.filter(
    (case_) =>
      (statusFilter === "all" || case_.status === statusFilter) &&
      (locationFilter === "all" || case_.location === locationFilter)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Casos Legales</h1>

      <div className="flex space-x-4 mb-8">
        <Select onValueChange={(value) => setStatusFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="Abierto">Abierto</SelectItem>
            <SelectItem value="Trabajando">Trabajando</SelectItem>
            <SelectItem value="Cancelado">Cancelado</SelectItem>
            <SelectItem value="Completado">Completado</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => setLocationFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por ubicación" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las ubicaciones</SelectItem>
            <SelectItem value="CABA">CABA</SelectItem>
            <SelectItem value="Provincia">Provincia</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCases.map((case_) => (
          <Link href={`/cases/${case_.case_id}`} key={case_.case_id}>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{case_.category}</span>
                  <Badge
                    variant="outline"
                    className={`${statusColors[case_.status]} text-white`}
                  >
                    {case_.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {case_.description}
                </p>
                <Separator className="my-4" />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{case_.location}</span>
                  <span>{new Date(case_.created_at).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
