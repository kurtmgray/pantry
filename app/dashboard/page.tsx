import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <div>
      <h3>This is the dashboard and the user is {session.user?.name}</h3>
      <h3>
        Main page after logging in, displaying a summary of the user's pantry,
        favorite recipes, and meal planner
      </h3>
    </div>
  );
}
