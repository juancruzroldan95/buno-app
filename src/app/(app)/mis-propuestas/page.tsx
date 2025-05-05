import { getAuthenticatedAppForUser } from "@/firebase/serverApp";
import { getAllBidsByLawyerId } from "@/lib/bids-actions";
import { getLawyerByUserId } from "@/lib/lawyers-actions";
import { getUserByUid } from "@/lib/users-actions";
import { MyBidsList } from "./components/MyBidsList";

export default async function MyBidsPage() {
  const { currentUser } = await getAuthenticatedAppForUser();
  const dbUser = await getUserByUid(currentUser?.uid as string);
  if (dbUser.roleId !== 1) {
    return <div>Acceso no autorizado</div>;
  }

  const lawyerData = await getLawyerByUserId(dbUser.uid);
  const bidsData = await getAllBidsByLawyerId(lawyerData.lawyerId);

  return (
    <div className="max-w-7xl mx-auto px-3 py-6 sm:px-6 lg:px-8">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Mis propuestas</h1>
          <p className="text-muted-foreground">
            Acá podés ver, editar y gestionar tus propuestas enviadas.
          </p>
        </div>
      </div>

      <MyBidsList bids={bidsData} />
    </div>
  );
}
