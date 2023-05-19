const getInstructions = (lines: string[]): string[] => {
  const instructions = [];
  for (const line of lines) {
    if (line.startsWith("@")) instructions.push(line.slice(1).trim());
  }
  return instructions;
};

const getIngredients = (lines: string[]): Ingredient[] => {
  const ingredients: Ingredient[] = [];
  for (const line of lines) {
    if (line.startsWith("%")) {
      const name = getValue(line.split(", "), "name");
      const quantity = getValue(line.split(", "), "quantity");
      const unit = getValue(line.split(", "), "unit");
      ingredients.push({ name, quantity, unit });
    }
  }
  console.log("ingredients", ingredients);
  return ingredients;
};
const getValue = (lines: string[], key: string): string => {
  const targetLine = lines.find((line) => line.includes(key));
  return targetLine ? targetLine.split(": ")[1] : "";
};
export default function parseRecipeString(recipeString: string): ParsedRecipe {
  console.log(recipeString);
  const lines = recipeString.trim().split("\n");
  const recipe: ParsedRecipe = {
    id: getValue(lines, "_ID"),
    title: getValue(lines, "_TITLE"),
    summary: getValue(lines, "_SUMMARY"),
    ingredients: getIngredients(lines),
    instructions: getInstructions(lines),
    preptime: getValue(lines, "_PREPTIME"),
    cooktime: getValue(lines, "_COOKTIME"),
    category: getValue(lines, "_CATEGORY"),
  };
  return recipe;
}
