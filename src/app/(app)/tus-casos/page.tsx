import Link from "next/link";
import {
  ArrowUpRight,
  FolderCheck,
  FolderOpen,
  PlusCircle,
} from "lucide-react";
import { getAuthenticatedAppForUser } from "@/firebase/serverApp";
import { getClientByUserId } from "@/lib/clients-actions";
import { getAllLawAreas } from "@/lib/law-areas-actions";
import { getAllProvinces } from "@/lib/provinces-actions";
import { getUserByUid } from "@/lib/users-actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateCaseModal } from "./components/CreateCaseModal";

// Mock data
const mockCases = [
  {
    id: 1,
    title: "Despido injustificado en empresa Tech",
    status: "abierto",
    createdAt: "2025-04-10",
  },
  {
    id: 2,
    title: "Divorcio sin bienes compartidos",
    status: "cerrado",
    createdAt: "2025-03-05",
  },
  {
    id: 3,
    title: "Contrato de alquiler comercial",
    status: "abierto",
    createdAt: "2025-04-01",
  },
  {
    id: 4,
    title: "Reclamo por accidente de tránsito",
    status: "cerrado",
    createdAt: "2025-02-20",
  },
];

export default async function YourCasesPage() {
  const { currentUser } = await getAuthenticatedAppForUser();
  const dbUser = await getUserByUid(currentUser?.uid as string);
  if (dbUser.roleId !== 2) {
    return <div>Acceso no autorizado</div>;
  }

  const clientData = await getClientByUserId(dbUser.uid);
  const provincesData = await getAllProvinces();
  const lawAreasData = await getAllLawAreas();

  const filter = "abierto";

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Tus casos</h1>
          <p className="text-gray-500">
            Acá podés ver y gestionar tus casos publicados.
          </p>
        </div>
        <CreateCaseModal
          clientId={clientData.clientId}
          provinces={provincesData}
          lawAreas={lawAreasData}
        />
      </div>

      <Tabs defaultValue="abierto" className="mb-6">
        <TabsList>
          <TabsTrigger value="abierto">Abiertos</TabsTrigger>
          <TabsTrigger value="cerrado">Cerrados</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>
              Casos {filter === "abierto" ? "Abiertos" : "Cerrados"}
            </CardTitle>
            <span className="text-sm text-muted-foreground">
              Total: {mockCases.length}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockCases.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">
              {filter === "abierto"
                ? "No tenés casos abiertos en este momento."
                : "No tenés casos cerrados todavía."}
            </div>
          ) : (
            mockCases.map((c) => (
              <Link
                href={`/caso/${c.id}`}
                key={c.id}
                className="flex justify-between items-center p-4 border rounded-lg hover:bg-accent transition-colors"
              >
                <div>
                  <div className="font-medium">{c.title}</div>
                  <div className="text-sm text-muted-foreground">
                    Publicado el {new Date(c.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge
                    variant={filter === "abierto" ? "default" : "secondary"}
                  >
                    {filter === "abierto" ? (
                      <FolderOpen className="w-4 h-4 mr-1" />
                    ) : (
                      <FolderCheck className="w-4 h-4 mr-1" />
                    )}
                    {filter}
                  </Badge>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </Link>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
