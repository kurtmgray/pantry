import Link from "next/link";
export default function Links() {
  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      <Link href="/">Home</Link>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="pantry">Pantry</Link>
      <Link href="/recipes">Recipes</Link>
      <Link href="/profile">Profile</Link>
    </div>
  );
}
