import React from "react";
import Link from "next/link";
type Props = {
  recipe: RecipeDB | RecipeGPT;
};
export default function DashRecipeCard({ recipe }: Props) {
  return (
    <div className="dash__recipe_card">
      <Link href={`/recipes/${recipe.id}`} className="dash__recipe__card-link">
        <div className="dash__recipe__card-container">
          <h2>{recipe.title}</h2>
          <h3>{recipe.summary}</h3>
        </div>
      </Link>
    </div>
  );
}