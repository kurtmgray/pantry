import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { LoginButton, LogoutButton } from "./components/AuthButtons";
import { addRecipesToDB, recipes } from "@/lib/mockData";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = JSON.stringify(session?.user, null, 4);
  addRecipesToDB(recipes);
  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "70vh",
      }}
    >
      <LoginButton />
      <LogoutButton />
      {user ? <pre>{user}</pre> : <p>No user found.</p>}
    </main>
  );
}
