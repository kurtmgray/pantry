import DashRecipeCard from "./components/DashRecipeCard";
import DashSearchBar from "./components/DashSearchBar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
// import { useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = {
  recipes: (RecipeDB | RecipeGPT)[];
};

const getRecipes = async (email: string) => {
  // Fetch recipes using the authenticated user's email
  const url = new URL("/api/recipes", "http://localhost:3000");
  url.searchParams.set("email", email);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const recipes: (RecipeDB | RecipeGPT)[] = await response.json();
  return recipes;
};

export default async function Dashboard({
  searchParams,
}: {
  searchParams: { [key: string]: string[] | string | undefined };
}) {
  const session = await getServerSession(authOptions);
  console.log(session);
  // const searchParams = useSearchParams();
  // const searchKeyword = searchParams.get("searchKeyword");

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

  const searchKeyword = searchParams.query?.toString();

  const filteredRecipes = recipes.filter((recipe) => {
    const { category, summary, title } = recipe;
    const lowerKeyword =
      typeof searchKeyword === "string" ? searchKeyword.toLowerCase() : "";
    return (
      category.toLowerCase().includes(lowerKeyword) ||
      summary.toLowerCase().includes(lowerKeyword) ||
      title.toLowerCase().includes(lowerKeyword)
    );
  });

  return (
    <div className="dashboard">
      <DashSearchBar />

      {filteredRecipes.length > 0 ? (
        filteredRecipes.map((recipe) => (
          <DashRecipeCard key={recipe.id} recipe={recipe} />
        ))
      ) : (
        <p>No recipes found.</p>
      )}
    </div>
  );
}
