import Link from "next/link";
export default function Links() {
  return (
    <div className="navbar__links" style={{ display: "flex", gap: "2rem" }}>
      <Link href="/" className="navbar__link">
        Home
      </Link>
      <Link href="/dashboard" className="navbar__link">
        Dashboard
      </Link>
      <Link href="pantry" className="navbar__link">
        Pantry
      </Link>
      <Link href="/recipes" className="navbar__link">
        Recipes
      </Link>
      <Link href="/profile" className="navbar__link">
        Profile
      </Link>
    </div>
  );
}
