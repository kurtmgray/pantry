export const menuOptions: MenuOptions = {
  cuisines: [
    "American",
    "Italian",
    "Mexican",
    "Japanese",
    "Chinese",
    "Indian",
    "Thai",
    "Mediterranean",
    "French",
    "Greek",
    "Spanish",
    "Korean",
    "Vietnamese",
    "Middle Eastern",
    "Caribbean",
  ],
  dietaryPreferences: [
    "Vegetarian",
    "Vegan",
    "Gluten-free",
    "Dairy-free",
    "Ketogenic",
    "Paleo",
    "Low-Fat",
    "Low-Carb",
    "Pescatarian",
    "Flexitarian",
    "Halal",
    "Kosher",
  ],
  maxPrepTimeOptions: [15, 30, 60, 120],
  difficulty: ["Easy", "Medium", "Hard"],
};

export const formatValue = (value: string) => {
  const lower = value.toLowerCase();
  const array = lower.split("");
  return array
    .map((char) => {
      char === " " && (char = "-");
      return char;
    })
    .join("");
};
