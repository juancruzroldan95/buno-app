import { getAuthenticatedAppForUser } from "@/firebase/serverApp";
import { getAllCasesByClientId } from "@/lib/cases-actions";
import { getClientByUserId } from "@/lib/clients-actions";
import { getAllLawAreas } from "@/lib/law-areas-actions";
import { getAllProvinces } from "@/lib/provinces-actions";
import { getUserByUid } from "@/lib/users-actions";
import { CreateCaseModal } from "./components/CreateCaseModal";
import { YourCasesList } from "./components/YourCasesList";

export default async function YourCasesPage() {
  const { currentUser } = await getAuthenticatedAppForUser();
  const dbUser = await getUserByUid(currentUser?.uid as string);
  if (dbUser.roleId !== 2) {
    return <div>Acceso no autorizado</div>;
  }

  const clientData = await getClientByUserId(dbUser.uid);
  const casesData = await getAllCasesByClientId(clientData.clientId);
  const provincesData = await getAllProvinces();
  const lawAreasData = await getAllLawAreas();

  return (
    <div className="max-w-7xl mx-auto px-3 py-6 sm:px-6 lg:px-8">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Tus casos</h1>
          <p className="text-muted-foreground">
            Acá podés ver y gestionar tus casos publicados.
          </p>
        </div>
        <div className="text-center md:text-right my-4 md:my-0">
          <CreateCaseModal
            clientId={clientData.clientId}
            provinces={provincesData}
            lawAreas={lawAreasData}
          />
        </div>
      </div>

      <YourCasesList cases={casesData} />
    </div>
  );
}
