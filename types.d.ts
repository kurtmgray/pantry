interface CreateCompletionResponseData {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: string[];
}

type CreateCompletionResponse = AxiosResponse<CreateCompletionResponseData>;
type CreateImageResponse = AxiosResponse<CreateImageResponse>;

type PantryItem = {
  id: number;
  name: string;
};

type PromptParams = {
  selectedIngredients: string[];
  cuisines: string[];
  dietaryPreferences: string[];
  maxPrepTime: string;
  difficulty: string;
  allergies: string[];
};

type CheckboxNames = "selectedIngredients" | "cuisines" | "dietaryPreferences";

type MenuOptions = {
  cuisines: string[];
  dietaryPreferences: string[];
  maxPrepTimeOptions: number[];
  difficulty: string[];
};

// type ParsedRecipe = {
//   id: string;
//   title: string;
//   summary: string;
//   instructions: string[];
//   preptime: string;
//   cooktime: string;
// };

type AuthCredentials = {
  email: string;
  password: string;
};

type AppContextType = [string, (value: string) => void];

type Ingredient = {
  name: string;
  quantity: string;
  unit: string;
};

interface RecipeData {
  // id: string; // resolve w/ ParsedRecipe
  title: string;
  summary: string;
  instructions: string[];
  ingredients: Ingredient[];
  preptime: string;
  cooktime: string;
  category: string;
}

interface Recipe extends RecipeData {
  addedById: number;
  rating: number | null;
}

interface ParsedRecipe extends RecipeData {
  id: string;
}
