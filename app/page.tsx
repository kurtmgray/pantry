import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { LoginButton } from "./components/AuthButtons";
import { CustomSession } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import Hero from "./assets/hero1.jpg";

export default async function Home() {
  const session: CustomSession | null = await getServerSession(authOptions);
  const user = session?.user;
  return (
    <main className="landing-page">
      <Image className="background-image" src={Hero} alt="image" />
      <h1 className="main-title">Pantry</h1>
      <h1 className="subheading">
        Welcome to Pantry - Your Personal Recipe Assistant!
      </h1>
      <p className="paragraph">
        Explore a world of mouthwatering possibilities with Pantry, your trusted
        companion in the kitchen! Discover a world of delicious possibilities as
        we help you unlock the full potential of your pantry ingredients.
        Whether you`&apos;`re a seasoned culinary enthusiast or a passionate
        home cook, let Pantry inspire your culinary creations
      </p>
      <div className="landing-buttons">{!user && <LoginButton />}</div>
      <Link href="/register">Register</Link>
    </main>
  );
}
