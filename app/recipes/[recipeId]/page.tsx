"use client";
import RecipeCard from "@/app/components/RecipeCard";
import { useEffect, useState } from "react";
import { useGlobalState } from "@/app/providers";
import { fetchRecipes } from "@/lib/fetchRecipes";

type Props = {
  params: {
    recipeId: string;
  };
};
export default function RecipePage({ params: { recipeId } }: Props) {
  const { state, setState } = useGlobalState();
  const [recipe, setRecipe] = useState<RecipeDB | undefined>(undefined);

  useEffect(() => {
    const findRecipeById = async (id: string) => {
      if (state.recipes.length > 0) {
        const thisRecipe = state.recipes.find((rec) => rec.id === parseInt(id));
        if (thisRecipe) {
          setRecipe(thisRecipe);
        }
      }
    };
    findRecipeById(recipeId);
  }, [recipeId, state.recipes]);

  return (
    <div className="recipe__card">
      <h3>This is the page id: {recipeId}</h3>
      <h3>
        Page displaying detailed information about a specific recipe, including
        a list of ingredients and their amounts, detailed instructions, and
        nutritional information
      </h3>
      {recipe && <RecipeCard key={recipe?.id} recipe={recipe} />}
    </div>
  );
}
