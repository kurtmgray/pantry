"use client";
import RecipeCard from "@/app/components/RecipeCard";
import { AppContext } from "@/app/providers";
import { useContext, useEffect, useState } from "react";

type Props = {
  params: {
    recipeId: string;
  };
};
export default function RecipePage({ params: { recipeId } }: Props) {
  const [globalState, setGlobalState] = useContext(AppContext);
  const [recipe, setRecipe] = useState<RecipeDB | undefined>(undefined);

  useEffect(() => {
    const findRecipeById = (id: string) => {
      if (globalState.recipes.length > 0) {
        const thisRecipe = globalState.recipes.find(
          (r) => r.id === parseInt(id)
        );
        if (thisRecipe) {
          setRecipe(thisRecipe);
        }
      }
    };

    findRecipeById(recipeId);
  }, [recipeId, globalState.recipes]);

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
