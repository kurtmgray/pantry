"use client";

import { LoginButton, LogoutButton } from "./AuthButtons";
import { useSession } from "next-auth/react";
import { CustomSession } from "@/lib/types";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Links from "./Links";

export default function Navbar() {
  const session = useSession();
  const sessionData = session.data as CustomSession;
  const nextPathname = usePathname();

  const isActiveLink = (pathname: string) => {
    return nextPathname === pathname ||
      (pathname === "/" && nextPathname === "/")
      ? "activeLink"
      : "";
  };

  return (
    <nav className="navbar">
      <Link href="/" className="navbar__title">
        <h1>Pantry</h1>
      </Link>
      {session?.status === "loading" ? (
        <div>loading session...</div>
      ) : (
        <>{sessionData && <Links isActiveLink={isActiveLink} />}</>
      )}
      {!session.data ? <LoginButton /> : <LogoutButton />}
    </nav>
  );
}
