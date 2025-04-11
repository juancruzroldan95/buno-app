import { redirect } from "next/navigation";
import { getAuthenticatedAppForUser } from "@/firebase/serverApp";
import { getUserByUid } from "@/lib/users-actions";
import { SelectRoleCards } from "./SelectRoleCards";

export default async function SelectRolePage() {
  const { currentUser } = await getAuthenticatedAppForUser();
  if (!currentUser) {
    redirect("/");
  }

  const dbUser = await getUserByUid(currentUser?.uid as string);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl md:text-5xl font-semibold mb-6 text-center">
        ¡Bienvenido a Buno!
      </h1>
      <p className="text-2xl md:text-3xl text-muted-foreground text-center mb-8">
        Elegí tu rol para continuar
      </p>

      <SelectRoleCards user={dbUser} />
    </div>
  );
}
