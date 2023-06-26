import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { LoginButton, LogoutButton } from "./components/AuthButtons";
import { CustomSession } from "@/lib/types";
import Link from "next/link";

export default async function Home() {
  const session: CustomSession | null = await getServerSession(authOptions);
  const user = session?.user;
  return (
    <main className="landing-page">
      <h1>
        {user ? `Welcome to Pantry, ${user.name}!` : "Welcome to Pantry!"}
      </h1>
      <p>Discover amazing recipes and start cooking today!</p>
      <div className="landing-buttons">{!user && <LoginButton />}</div>
      <Link href="/register">Register</Link>
    </main>
  );
}
