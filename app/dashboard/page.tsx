import DashSearchBar from "../components/SearchBar";
import List from "./components/List";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

// export const dynamic = "force-dynamic";

const getRecipes = async (email: string) => {
  const url = new URL("/api/recipes", process.env.NEXT_PUBLIC_API_ORIGIN);
  url.searchParams.set("email", email);
  console.log("called");
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache",
  });
  const recipes: RecipeDB[] = await response.json();
  return recipes;
};

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const email = session?.user?.email;

  const recipeData = getRecipes(email);
  const recipes = await recipeData;

  return (
    <div className="dashboard">
      <DashSearchBar />
      <List recipes={recipes} />
    </div>
  );
}
