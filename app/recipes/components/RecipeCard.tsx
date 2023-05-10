import { AppContext } from "@/app/providers";
import parseRecipeString from "@/lib/parseResponseString";
import { useContext } from "react";
import RecipeImage from "./RecipeImage";
type Props = {
  recipe: CreateCompletionResponse;
};
export default function RecipeCard({ recipe: { text } }: Props) {
  const [globalState] = useContext(AppContext);
  const obj: ParsedRecipe = parseRecipeString(text);
  return (
    <div key={obj.id}>
      {globalState}
      <RecipeImage recipeImagePrompt={obj.summary} />
      <h2>{obj.title}</h2>
      <h3>{obj.summary}</h3>
      <p>Prep Time: {obj.preptime}</p>
      <p>Cook Time: {obj.cooktime}</p>
      <ul>
        {obj.instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
    </div>
  );
}
