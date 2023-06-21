import React from "react";
type Props = {
  recipe: RecipeDB | RecipeGPT;
};
export default function RecipeSummary({ recipe }: Props) {
  return (
    <div>
      <h2>{recipe.title}</h2>
      <h3>{recipe.summary}</h3>
    </div>
  );
}
