"use client";
import { MouseEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { CustomSession } from "@/lib/types";
import { generateRecipeImage } from "@/app/services/api/getNewRecipe";
import Image from "next/image";
import RecipeStatusComponent from "./RecipeStatusComponent";
import { postNewRecipe } from "../services/api/postNewRecipe";
import { Status } from "@/lib/types";

type Props = {
  recipe: RecipeDB | RecipeGPT;
};

export default function RecipeCard({ recipe }: Props) {
  // TODO: status in parent?

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
        // image: image!,
      };
    }
    const response = await postNewRecipe(recipeData);
    response ? setRecipeStatus(Status.SAVED) : setRecipeStatus(Status.FAILED);
  };

  return (
    <div className="recipe">
      {/* <RecipeImage recipeImagePrompt={recipeData.summary} /> */}
      <h2 className="recipe__title">{recipeData.title}</h2>
      <br />

      <h3 className="recipe__description">{recipeData.summary}</h3>
      <br />
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
      {/* {image && (
        <Image src={image} alt="recipe image" width={256} height={256} />
      )} */}
      <RecipeStatusComponent
        status={recipeStatus}
        handleSaveRecipe={handleSaveRecipe}
      />
    </div>
  );
}
