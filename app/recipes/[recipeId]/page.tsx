import RecipePage from "./components/RecipePage";
import { fetchSingleRecipe } from "@/app/services/api/fetchSingleRecipe";

import type { Metadata } from "next";
type Props = {
  params: { recipeId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.recipeId;
  const recipe: RecipeDB = await fetchSingleRecipe(id);
  return {
    title: recipe.title,
    description: recipe.summary,
  };
}

export default function Page({ params: { recipeId } }: Props) {
  return (
    <div className="recipe__card">
      <RecipePage recipeId={recipeId} />
    </div>
  );
}
