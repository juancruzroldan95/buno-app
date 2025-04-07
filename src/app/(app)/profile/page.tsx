import LawyerProfilePage from "./components/LawyerProfilePage";
import ClientProfilePage from "./components/ClientProfilePage";

export default async function ProfilePage() {
  const loggedUser = {
    id: "4f40a187-4539-435a-92a4-0f13aea10cc3",
    username: "shadcn",
    email: "m@example.com",
    role: 1,
    avatar: "/avatars/shadcn.jpg",
  };

  return (
    <>{loggedUser.role === 1 ? <LawyerProfilePage /> : <ClientProfilePage />}</>
  );
}
