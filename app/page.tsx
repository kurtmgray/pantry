import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { LoginButton, LogoutButton } from "./components/AuthButtons";
import { CustomSession } from "@/lib/types";

export default async function Home() {
  const session: CustomSession | null = await getServerSession(authOptions);
  const user = JSON.stringify(session?.user, null, 4);
  return (
    <main>
      <LoginButton />
      <LogoutButton />
      {user ? <pre>{user}</pre> : <p>No user found.</p>}
    </main>
  );
}
