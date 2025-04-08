import LawyerProfilePage from "./components/LawyerProfilePage";
import ClientProfilePage from "./components/ClientProfilePage";
import { getAuthenticatedAppForUser } from "@/firebase/serverApp";

export default async function ProfilePage() {
  const loggedUser = {
    id: "4f40a187-4539-435a-92a4-0f13aea10cc3",
    username: "shadcn",
    email: "m@example.com",
    role: 2,
    avatar: "/avatars/shadcn.jpg",
  };

  const { currentUser } = await getAuthenticatedAppForUser();
  console.log("Current User", currentUser?.toJSON());

  return (
    <>{loggedUser.role === 1 ? <LawyerProfilePage /> : <ClientProfilePage />}</>
  );
}
