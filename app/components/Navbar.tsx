"use client";

import { LoginButton, LogoutButton } from "./AuthButtons";
import { useSession } from "next-auth/react";
import { CustomSession } from "@/lib/types";
import Links from "./Links";

export default function Navbar() {
  const session = useSession();
  const sessionData = session.data as CustomSession;
  return (
    <>
      <nav
        className="navbar"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1>App Navbar</h1>
        {session?.status === "loading" ? (
          <div>loading session...</div>
        ) : (
          <>
            <p>User ID: {JSON.stringify(sessionData.user?.id, null, 4)}</p>
            {session && <Links />}
          </>
        )}
        {!session ? <LoginButton /> : <LogoutButton />}
      </nav>
    </>
  );
}
