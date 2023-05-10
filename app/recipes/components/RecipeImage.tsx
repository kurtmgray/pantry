import { generateImage } from "@/lib/getRecipe";
import { useState } from "react";

type Props = {
  recipeImagePrompt: string;
};
export default function RecipeImage({ recipeImagePrompt }: Props) {
  const [imageUrl, setImageUrl] = useState("");

  generateImage(recipeImagePrompt).then((response: CreateImageResponse) => {
    setImageUrl(response.url);
  });
  console.log("imageUrl: ", imageUrl);
  console.log("prompt: ", recipeImagePrompt);

  if (!imageUrl) return null;

  return <img src={imageUrl} alt="AI recipe image" />;
}
