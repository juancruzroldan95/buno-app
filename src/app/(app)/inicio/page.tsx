import { redirect } from "next/navigation";
import { getAuthenticatedAppForUser } from "@/firebase/serverApp";
import { getUserByUid } from "@/lib/users-actions";
import ClientHomePage from "./ClientHomePage";
import LawyerHomePage from "./LawyerHomePage";

export default async function HomePage() {
  const { currentUser } = await getAuthenticatedAppForUser();
  const dbUser = await getUserByUid(currentUser?.uid as string);

  if (dbUser.roleId === 2) {
    redirect("/tus-casos");
  }

  return <LawyerHomePage user={dbUser} />;
}
