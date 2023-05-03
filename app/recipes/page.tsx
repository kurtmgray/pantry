import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import RecipeSearch from "./components/RecipeSearch";
import { pantryIngredients } from "@/config/mockUserData";
import { menuOptions } from "@/config/menuOptions";

export default async function Recipes() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/quickrecipe");
  }

  const sampleRecipe = {
    name: "cheetos",
    id: "45",
  };
  //   route is currently protected in /middleware.ts
  //   const session = await getServerSession(authOptions);

  //   if (!session) {
  //     redirect("/api/auth/signin");
  //   }
  return (
    <div>
      <div>
        <RecipeSearch ingredients={pantryIngredients} options={menuOptions} />
      </div>
      <Link href={`/recipes/${sampleRecipe.id}`}>
        Testing route: click for the {sampleRecipe.name} recipe.
      </Link>
      <h3>
        Page where users can search for recipes based on specific criteria such
        as required or excluded ingredients, allergies, dietary preferences, and
        cuisine styles. Users can save their favorite recipes to a list and view
        recipe details including ingredients, instructions, and a brief summary.
      </h3>
    </div>
  );
}
