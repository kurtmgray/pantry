"use client";

import { LoginButton, LogoutButton } from "./AuthButtons";
import { useSession } from "next-auth/react";
import { CustomSession } from "@/lib/types";

export default function Navbar() {
  const session = useSession();
  const sessionData = session.data as CustomSession;
  return (
    <>
      {session?.status === "loading" ? (
        <div>loading</div>
      ) : (
        <nav>
          <p>{JSON.stringify(sessionData.user?.id, null, 4)}</p>
          <h1>App Navbar</h1>
          {!session ? <LoginButton /> : <LogoutButton />}
        </nav>
      )}
    </>
  );
}
