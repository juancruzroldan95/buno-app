import { format } from "date-fns";
import { es } from "date-fns/locale";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProfileAvatar from "@/components/ProfileAvatar";

import { getClientById } from "@/lib/clients-actions";

import PersonalClientForm from "./PersonalClientForm";

export default async function ClientProfile() {
  const clientId = "3c3bb38c-89e2-479c-b10d-4e613a650e61";
  const clientData = await getClientById(clientId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Mi Perfil</h1>
        <p className="text-gray-500">
          Acá podés actualizar tu información personal
        </p>
      </div>

      <div className="flex items-center justify-between">
        <Card>
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
            <CardDescription>Actualizá tu información personal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex items-center">
              <ProfileAvatar
                profilePicture={clientData.profilePicture ?? ""}
                firstName={clientData.firstName ?? ""}
                lastName={clientData.lastName ?? ""}
                clientId={clientId}
              />

              <div className="ml-4">
                <h3 className="text-lg font-semibold">Foto de perfil</h3>
                <p className="text-gray-500">
                  Esta es tu foto de perfil. Hacé clic en la imagen para subir
                  una nueva foto.
                </p>
              </div>
            </div>

            <PersonalClientForm initialData={clientData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
