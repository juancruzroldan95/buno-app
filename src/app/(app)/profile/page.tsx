import { getAuthenticatedAppForUser } from "@/firebase/serverApp";
import { getUserByUid } from "@/lib/users-actions";
import ClientProfilePage from "./ClientProfilePage";
import LawyerProfilePage from "./LawyerProfilePage";

export default async function ProfilePage() {
  const { currentUser } = await getAuthenticatedAppForUser();
  const dbUser = await getUserByUid(currentUser?.uid as string);

  return (
    <>
      {dbUser.roleId === 1 ? (
        <LawyerProfilePage user={dbUser} />
      ) : (
        <ClientProfilePage user={dbUser} />
      )}
    </>
  );
}
