
type GlobalState = {
  recipes: RecipeDB[];
  pantry: PantryItem[] | [];
  searchKeyword: string
};

type GlobalContextType = {
  state: GlobalState;
  setState: Dispatch<SetStateAction<GlobalState>>;
};

interface CreateCompletionResponseData {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: string[];
}

type CreateCompletionResponse = AxiosResponse<CreateCompletionResponseData>;
type CreateImageResponse = AxiosResponse<CreateImageResponse>;

type PromptParams = {
  ingredients: string[];
  cuisines: string[];
  dietaryPreferences: string[];
  maxPrepTime: string[];
  difficulty: string[];
  allergies: string[];
  keywords: string[];
  category: RecipeCategory[]; 
};

type RecipeCategory =
  "Side" | "Appetizer" | "Breakfast" | "Lunch" | "Dinner" | "Dessert" | "Snack" | "Drink" | ""

type CheckboxNames = "maxPrepTime" | "allergies" | "ingredients" | "cuisines" | "dietaryPreferences";

type MenuOptions = {
  cuisines: string[];
  dietaryPreferences: string[];
  maxPrepTimeOptions: number[];
  difficulty: string[];
  category: RecipeCategory[];
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
  title: string;
  summary: string;
  instructions: string[];
  ingredients: Ingredient[];
  preptime: string;
  cooktime: string;
  category: string;
  image: string;
}

interface RecipeDB extends RecipeData {
  id: number;
  addedById: number;
  addedAt: string;
  rating: number | null;
}

interface RecipeGPT extends RecipeData {
  id: string;
}

type EdamamIngredient = {
  food: {
    brand: string;
    category: string;
    categoryLabel: string;
    foodId: string;
    image: string;
    knownAs: string;
    label: string;
    nutrients: {
      CHOCDF: number;
      ENERC_KCAL: number;
      FAT: number;
      FIBTG: number;
      PROCNT: number;
    };
  };
};

type PantryItem = EdamamIngredient["food"] & {
  id: number;
  userId: number;
};

type PantryItemsCallback = (items: PantryItem[]) => void;
