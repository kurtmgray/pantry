export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/",
    // "/app/:path*", // protects app and all subdirectories
    "/pantry",
    "/recipes",
    "/profile",
  ],
};
