import { getAuthenticatedAppForUser } from "@/firebase/serverApp";
import { getUserByUid } from "@/lib/users-actions";
import ClientHowItWorksPage from "./ClientHowItWorksPage";
import LawyerHowItWorksPage from "./LawyerHowItWorksPage";

export default async function HowItWorksPage() {
  const { currentUser } = await getAuthenticatedAppForUser();
  const dbUser = await getUserByUid(currentUser?.uid as string);

  return (
    <>
      {dbUser.roleId === 1 ? (
        <LawyerHowItWorksPage />
      ) : (
        <ClientHowItWorksPage />
      )}
    </>
  );
}
