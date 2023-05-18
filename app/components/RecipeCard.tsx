type Props = {
  recipe: Recipe | ParsedRecipe;
};

export default function RecipeCard({ recipe }: Props) {
  const isParsedRecipe = "id" in recipe;
  console.log(recipe);

  const recipeData = isParsedRecipe
    ? (recipe as ParsedRecipe)
    : (recipe as Recipe);

  console.log(recipeData);
  return (
    <div>
      {/* <RecipeImage recipeImagePrompt={recipeData.summary} /> */}
      <h2>{recipeData.title}</h2>
      <h3>{recipeData.summary}</h3>
      <p>Prep Time: {recipeData.preptime}</p>
      <p>Cook Time: {recipeData.cooktime}</p>
      <ul>
        {recipeData.instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
    </div>
  );
}
