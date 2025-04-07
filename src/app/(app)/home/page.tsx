import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  ArrowUpRight,
  Briefcase,
  DollarSign,
  FileCheck,
  AlertCircle,
  CheckCircle,
  Star,
} from "lucide-react";

// Mock data
const activeCases = [
  {
    id: 1,
    client: "TechStart Inc.",
    type: "Revisión de contrato",
    status: "En Progreso",
    deadline: "2024-04-15",
    priority: "Alto",
  },
  {
    id: 2,
    client: "Green Energy Co.",
    type: "Registro de PyME",
    status: "En Revisión",
    deadline: "2024-04-20",
    priority: "Medio",
  },
  {
    id: 3,
    client: "Local Restaurant Chain",
    type: "Contrato Laboral",
    status: "Primer contacto",
    deadline: "2024-04-25",
    priority: "Bajo",
  },
];

const profileCompletion = {
  basic: true,
  contact: true,
  expertise: true,
  documents: false,
  billing: false,
};

const calculateProfileProgress = () => {
  const completed = Object.values(profileCompletion).filter(Boolean).length;
  return (completed / Object.keys(profileCompletion).length) * 100;
};

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Hola, Juan Cruz</h1>
          <p className="text-gray-500">
            Acá encontras un resumen de tus trabajos y tu perfil.
          </p>
        </div>
        <Button>
          <FileCheck className="mr-2 h-4 w-4" />
          Nuevo caso
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-6 pb-2">
            <CardTitle className="text-sm font-medium">Casos Activos</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 desde el mes pasado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-6 pb-2">
            <CardTitle className="text-sm font-medium">
              Ganancia Mensual
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$19,500</div>
            <p className="text-xs text-muted-foreground">
              +15% desde el mes pasado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-6 pb-2">
            <CardTitle className="text-sm font-medium">Calificación</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4,7</div>
            <p className="text-xs text-muted-foreground">
              +2% desde el mes pasado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-12 pb-2">
            <CardTitle className="text-sm font-medium">
              Perfil Completo
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {calculateProfileProgress()}%
            </div>
            <Progress value={calculateProfileProgress()} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Perfil Completo</CardTitle>
            <CardDescription>
              Completá tu perfil para aumentar tu visibilidad
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Información básica</span>
                {profileCompletion.basic ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <Button size="sm">Completar</Button>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span>Detalles de contacto</span>
                {profileCompletion.contact ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <Button size="sm">Completar</Button>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span>Experiencia y trabajos profesionales</span>
                {profileCompletion.expertise ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <Button size="sm">Completar</Button>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span>Documentación obligatoria</span>
                {profileCompletion.documents ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <Button size="sm">Completar</Button>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span>Información de cobros</span>
                {profileCompletion.billing ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <Button size="sm">Completar</Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Casos Activos</CardTitle>
            <Link href="/cases">
              <Button variant="ghost" className="flex items-center">
                Ver Todos
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeCases.map((case_) => (
              <div
                key={case_.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
              >
                <div className="space-y-1">
                  <div className="font-medium">{case_.client}</div>
                  <div className="text-sm text-muted-foreground">
                    {case_.type}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge
                    variant={
                      case_.priority === "Alto"
                        ? "destructive"
                        : case_.priority === "Medio"
                          ? "default"
                          : "secondary"
                    }
                  >
                    {case_.priority}
                  </Badge>
                  <div className="text-sm text-muted-foreground">
                    Due {new Date(case_.deadline).toLocaleDateString()}
                  </div>
                  <Badge variant="outline">{case_.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
