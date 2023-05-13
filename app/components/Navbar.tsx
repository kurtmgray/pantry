"use client";

import { LoginButton, LogoutButton } from "./AuthButtons";
import { useSession } from "next-auth/react";
export default function Navbar() {
  const { data: session, status } = useSession();
  console.log(status);
  return (
    <>
      {status === "loading" ? (
        <div>loading</div>
      ) : (
        <nav>
          <p>{JSON.stringify(session, null, 4)}</p>
          <h1>App Navbar</h1>
          {!session ? <LoginButton /> : <LogoutButton />}
        </nav>
      )}
    </>
  );
}
