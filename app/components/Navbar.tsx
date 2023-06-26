"use client";

import { LoginButton, LogoutButton } from "./AuthButtons";
import { useSession } from "next-auth/react";
import { CustomSession } from "@/lib/types";
import Links from "./Links";

export default function Navbar() {
  const session = useSession();
  const sessionData = session.data as CustomSession;
  return (
    <nav className="navbar">
      <h1 className="navbar__title">Pantry</h1>
      {session?.status === "loading" ? (
        <div>loading session...</div>
      ) : (
        <>{sessionData && <Links />}</>
      )}
      {!session.data ? <LoginButton /> : <LogoutButton />}
    </nav>
  );
}
