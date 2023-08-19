"use client";
import { useEffect } from "react";
import { useGlobalState } from "../providers";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Profile() {
  const session = useSession();
  const { state, setState } = useGlobalState();

  const user = session.data?.user; // Assuming your session data contains user information
  const { pantry, recipes } = state;

  return (
    <div>
      <h1>Profile Page</h1>
      <h2>Welcome, {user?.name || "Guest"}</h2>
      <p>Email: {user?.email || "N/A"}</p>
      <h3>Saved Items</h3>
      <p>Saved Pantry Items: {pantry.length}</p>
      <p>Saved Recipes: {recipes.length}</p>

      <h3>Actions</h3>
      <Link href="/profile/edit">Edit Profile</Link>
      <pre>{JSON.stringify(state, null, 4)}</pre>
    </div>
  );
}
