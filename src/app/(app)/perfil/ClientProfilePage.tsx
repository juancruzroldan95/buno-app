import ProfileAvatar from "@/app/(app)/components/ProfileAvatar";
import { getClientByUserId } from "@/lib/clients-actions";
import { SelectUser } from "@/db/schemas/users-schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PersonalClientForm from "./components/PersonalClientForm";

export default async function ClientProfilePage({
  user,
}: {
  user: SelectUser;
}) {
  const clientData = await getClientByUserId(user.uid);

  return (
    <div className="max-w-7xl mx-auto px-3 py-6 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Mi Perfil</h1>
        <p className="text-gray-500">
          Acá podés actualizar tu información personal
        </p>
      </div>

      <div className="flex items-center justify-between">
        <Card className="space-y-4 w-full">
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
                clientId={clientData.clientId}
                userId={user.uid}
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
