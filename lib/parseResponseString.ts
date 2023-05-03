const getInstructions = (lines: string[]): string[] => {
  const instructions = [];
  for (const line of lines) {
    if (line.startsWith("@")) instructions.push(line.slice(1).trim());
  }
  return instructions;
};
const getValue = (lines: string[], key: string): string => {
  const targetLine = lines.find((line) => line.startsWith(key));
  return targetLine ? targetLine.split(": ")[1] : "";
};
export default function parseRecipeString(recipeString: string): ParsedRecipe {
  const lines = recipeString.trim().split("\n");
  const recipe: ParsedRecipe = {
    id: getValue(lines, "_ID"),
    title: getValue(lines, "_TITLE"),
    summary: getValue(lines, "_SUMMARY"),
    instructions: getInstructions(lines),
    preptime: getValue(lines, "_PREPTIME"),
    cooktime: getValue(lines, "_COOKTIME"),
  };
  return recipe;
}
