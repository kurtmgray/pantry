import parseRecipeString from "@/lib/parseResponseString";
type Props = {
  recipe: CreateCompletionResponse;
};
export default function RecipeCard({ recipe: { text } }: Props) {
  const obj: ParsedRecipe = parseRecipeString(text);
  // const obj: ParsedRecipe = JSON.parse(`${text}`);
  return (
    <div key={obj.id}>
      <h2>{obj.title}</h2>
      <h3>{obj.summary}</h3>
      <p>Prep Time: {obj.preptime}</p>
      <p>Cook Time: {obj.cooktime}</p>
      <ul>
        {obj.instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
      {/* <pre>{obj, null, 4)}</pre> */}
    </div>
  );
}
