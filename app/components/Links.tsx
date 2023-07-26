import Link from "next/link";
export default function Links({
  isActiveLink,
}: {
  isActiveLink: (pathname: string) => string;
}) {
  const paths = ["/", "/dashboard", "/pantry", "/recipes", "/profile"];
  const formatPath = (path: string) => {
    return path === "/"
      ? "Home"
      : path.slice(1).charAt(0).toUpperCase() + path.slice(2);
  };

  return (
    <div className="navbar__links" style={{ display: "flex", gap: "2rem" }}>
      {paths.map((path) => {
        return (
          <Link
            key={path}
            href={path}
            className={`navbar__link ${isActiveLink(path)}`}
          >
            {formatPath(path)}
          </Link>
        );
      })}
    </div>
  );
}
