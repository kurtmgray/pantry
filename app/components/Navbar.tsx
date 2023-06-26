"use client";

import { LoginButton, LogoutButton } from "./AuthButtons";
import { useSession } from "next-auth/react";
import { CustomSession } from "@/lib/types";
import Link from "next/link";
import Links from "./Links";

export default function Navbar() {
  const session = useSession();
  const sessionData = session.data as CustomSession;
  return (
    <nav className="navbar">
      <Link href="/" className="navbar__title">
        <h1>Pantry</h1>
      </Link>
      {session?.status === "loading" ? (
        <div>loading session...</div>
      ) : (
        <>{sessionData && <Links />}</>
      )}
      {!session.data ? <LoginButton /> : <LogoutButton />}
    </nav>
  );
}
