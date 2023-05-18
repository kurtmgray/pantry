import { getRecipesAddedByUser } from "@/lib/getRecipesAddedByUser";
import { getServerSession } from "next-auth";
// import RecipeCardFromDB from "./components/RecipeCardFromDB";
import RecipeCard from "../components/RecipeCard";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  console.log("11", session?.user);
  const email = session?.user?.email;

  if (!email) return <div>No user, should implement redirect.</div>;

  const recipes = await getRecipesAddedByUser(email);
  console.log(recipes);

  return (
    <div>
      <h3>This is the dashboard and the user is {session.user?.name}</h3>
      <p>Here's a recipe title:</p>
      {recipes &&
        recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}

      <h3>
        Main page after logging in, displaying a summary of the user&apos;s
        pantry, favorite recipes, and meal planner
      </h3>
    </div>
  );
}
