"use client";
import RecipeCard from "@/app/components/RecipeCard";
import { useEffect, useState } from "react";
import { useGlobalState } from "@/app/providers";

type Props = {
  recipeId: string;
};

export default function RecipePage({ recipeId }: Props) {
  const { state } = useGlobalState();
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
      {recipe && <RecipeCard key={recipe?.id} recipe={recipe} />}
    </div>
  );
}
