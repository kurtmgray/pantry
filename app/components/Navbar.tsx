"use client";

import { LoginButton, LogoutButton } from "./AuthButtons";
import { useSession } from "next-auth/react";
export default function Navbar() {
  const session = useSession();
  return (
    <nav>
      <p>{JSON.stringify(session, null, 4)}</p>
      <h1>App Navbar</h1>
      {!session.data ? <LoginButton /> : <LogoutButton />}
    </nav>
  );
}
