"use client";
import RecipeCard from "@/app/components/RecipeCard";
import { AppContext } from "@/app/providers";
import { useContext, useEffect, useState } from "react";

type Props = {
  params: {
    recipeId: string;
  };
};
export default async function RecipePage({ params: { recipeId } }: Props) {
  // const [recipe, setRecipe] = useState<ParsedRecipe>();
  // useEffect(() => {
  //   const getRecipes = async () => {
  //     const recipeData = await fetch(`/api/recipes/${recipeId}`);
  //     console.log(JSON.stringify(recipeData));
  //     const data = await recipeData.json();
  //     if (recipeData) setRecipe(data);
  //   };
  //   getRecipes();
  // }, [recipe]);

  const [globalState, setGlobalState] = useContext(AppContext);
  const [recipe, setRecipe] = useState();
  useEffect(() => {
    if (globalState.recipes.length > 0) {
      const thisRecipe = globalState.recipes.find(
        (recipe: ParsedRecipe) => recipe.id === recipeId
      );
      if (thisRecipe) setRecipe(thisRecipe);
    }
  }, []);
  return (
    <div>
      <h3>This is the page id: {recipeId}</h3>
      <h3>
        Page displaying detailed information about a specific recipe, including
        a list of ingredients and their amounts, detailed instructions, and
        nutritional information
      </h3>

      <pre>sdfsdf{JSON.stringify(recipe)}</pre>
      {/* // {recipe && <RecipeCard key={recipe?.id} recipe={recipe} />} */}
    </div>
  );
}
