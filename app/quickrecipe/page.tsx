"use client";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { LoginButton } from "../components/AuthButtons";
// import { redirect } from "next/navigation";

export default async function QuickRecipe() {
  const session = await getServerSession(authOptions);
  return (
    <h3>
      {!session && <LoginButton />}
      This page will run a check on a session and display a login button if no
      session(?) but allow for a quick search given a set of basic inngredients.
    </h3>
  );
}
