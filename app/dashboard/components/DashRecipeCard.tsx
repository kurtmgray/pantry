import React from "react";
import Link from "next/link";
import Image from "next/image";
type Props = {
  recipe: RecipeDB | RecipeGPT;
};

// for placeholder images
function generateRandomNumber() {
  return Math.floor(Math.random() * 500) + 100;
}

export default function DashRecipeCard({ recipe }: Props) {
  return (
    <div className="dash__recipe_card-container">
      <Link href={`/recipes/${recipe.id}`} className="dash__recipe__card-link">
        <div className="dash__recipe__card">
          <Image
            src={
              recipe.image ||
              `https://picsum.photos/id/${generateRandomNumber()}/150`
            }
            width={150}
            height={150}
            alt={`${recipe.title} image`}
          />
          <div className="dash__recipe_card-text">
            <h2>{recipe.title}</h2>
            <h3>{recipe.summary}</h3>
          </div>
        </div>
      </Link>
    </div>
  );
}
