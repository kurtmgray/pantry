import Link from "next/link";
export default function Links({
  isActiveLink,
}: {
  isActiveLink: (pathname: string) => string;
}) {
  return (
    <div className="navbar__links" style={{ display: "flex", gap: "2rem" }}>
      <Link href="/" className={`navbar__link ${isActiveLink("/")}`}>
        Home
      </Link>
      <Link
        href="/dashboard"
        className={`navbar__link ${isActiveLink("/dashboard")}`}
      >
        Dashboard
      </Link>
      <Link
        href="/pantry"
        className={`navbar__link ${isActiveLink("/pantry")}`}
      >
        Pantry
      </Link>
      <Link
        href="/recipes"
        className={`navbar__link ${isActiveLink("/recipes")}`}
      >
        Recipes
      </Link>
      <Link
        href="/profile"
        className={`navbar__link ${isActiveLink("/profile")}`}
      >
        Profile
      </Link>
    </div>
  );
}
