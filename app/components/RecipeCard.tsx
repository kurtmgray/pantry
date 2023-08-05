"use client";
// import { getServerSession } from "next-auth";
import { MouseEvent, useEffect } from "react";
// import { authOptions } from "../api/auth/[...nextauth]/route";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { CustomSession } from "@/lib/types";
import { generateRecipeImage } from "@/lib/getNewRecipe";
import Image from "next/image";

type Props = {
  recipe: RecipeDB | RecipeGPT;
};

enum Status {
  NOT_SAVED,
  SAVING,
  SAVED,
}

export default function RecipeCard({
  recipe: { id, title, summary, image, ...recipe },
}: Props) {
  const [recipeStatus, setRecipeStatus] = useState<Status | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const session = useSession();
  const { user } = session.data as CustomSession;

  let recipeData: RecipeDB | RecipeGPT;
  const isDBRecipe = "addedById" in recipe;

  isDBRecipe
    ? (recipeData = recipe as RecipeDB)
    : (recipeData = recipe as RecipeGPT);

  useEffect(() => {
    console.log(recipe);
    if (isDBRecipe) {
      setRecipeStatus(null);
    } else {
      async function generateImage() {
        try {
          const generatedImgUrl = await generateRecipeImage(recipeData.summary);
          generatedImgUrl && setImageUrl(generatedImgUrl);
        } catch (error) {
          console.log(error);
        }
      }
      generateImage();
      setRecipeStatus(Status.NOT_SAVED);
    }
  }, [recipe, isDBRecipe, recipeData.summary]);

  const handleSaveRecipe = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setRecipeStatus(Status.SAVING);

    if (!isDBRecipe) {
      recipeData = {
        ...recipeData,
        addedById: parseInt(user.id),
        image: image!,
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

      console.log(response);
      if (response.ok) {
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

    setRecipeStatus(Status.SAVED);
  };

  return (
    <div className="recipe">
      {/* <RecipeImage recipeImagePrompt={recipeData.summary} /> */}
      <h2 className="recipe__title">{recipeData.title}</h2>
      <h3 className="recipe__description">{recipeData.summary}</h3>
      <p className="recipe__time">Prep Time: {recipeData.preptime}</p>
      <p className="recipe__time">Cook Time: {recipeData.cooktime}</p>
      <p className="recipe__ingredients-heading">Ingredients:</p>
      <ul className="recipe__ingredients">
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
      <p className="recipe__instructions-heading">Instructions:</p>
      <ul className="recipe__instructions">
        {recipeData.instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
      {image && (
        <Image src={image} alt="recipe image" width={256} height={256} />
      )}
      {recipeStatus === Status.NOT_SAVED && (
        <button onClick={(e) => handleSaveRecipe(e)}>Save Recipe</button>
      )}
      {recipeStatus === Status.SAVING && <p>Saving Recipe...</p>}
      {recipeStatus === Status.SAVED && <p>Recipe Saved!</p>}
    </div>
  );
}
