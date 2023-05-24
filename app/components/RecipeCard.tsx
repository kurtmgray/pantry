"use client";
import { getServerSession } from "next-auth";
import { MouseEvent } from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { CustomSession } from "@/lib/types";

type Props = {
  recipe: RecipeDB | RecipeGPT;
};

export default function RecipeCard({ recipe }: Props) {
  const [savingRecipe, setSavingRecipe] = useState(false);
  const session = useSession();
  const { user } = session.data as CustomSession;

  const isDBRecipe = "addedById" in recipe;
  let recipeData = isDBRecipe ? (recipe as RecipeDB) : (recipe as RecipeGPT);

  const handleSaveRecipe = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSavingRecipe(true);

    if (!isDBRecipe) {
      recipeData = {
        ...recipeData,
        addedById: parseInt(user.id),
      };
    }

    try {
      const response = await fetch(`/api/recipes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      });

      if (response.ok) {
        console.log(response);
        const data = await response.json();
        console.log(data);
        // logic or feedback after success
      } else {
        console.error("Error saving recipe:", response.statusText);
        // error handling
      }
    } catch (error) {
      console.error("Error saving recipe:", error);
      // additional error handling
    }

    setSavingRecipe(false);
  };

  return (
    <div>
      {/* <RecipeImage recipeImagePrompt={recipeData.summary} /> */}
      <h2>{recipeData.title}</h2>
      <h3>{recipeData.summary}</h3>
      <p>Prep Time: {recipeData.preptime}</p>
      <p>Cook Time: {recipeData.cooktime}</p>
      <p>Ingredients:</p>
      <ul>
        {recipeData.ingredients.map(({ name, quantity, unit }, index) => {
          if (quantity === "to taste")
            return (
              <li key={index}>
                {name} {quantity} {unit}
              </li>
            );
          return (
            <li key={index}>
              {quantity} {unit} {name}
            </li>
          );
        })}
      </ul>
      <p>Instructions:</p>
      <ul>
        {recipeData.instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
      <button onClick={(e) => handleSaveRecipe(e)}>Save Recipe</button>
    </div>
  );
}
