import { generateImage } from "@/lib/getRecipe";
// import { useState } from "react";

type Props = {
  recipeImagePrompt: string;
};
export default async function RecipeImage({ recipeImagePrompt }: Props) {
  // const [imageUrl, setImageUrl] = useState("");

  const url = await generateImage(recipeImagePrompt);
  console.log("imageUrl: ", url);
  console.log("prompt: ", recipeImagePrompt);

  if (!url) return null;

  return <img src={url} alt="AI recipe image" />;
}
