interface CreateCompletionResponseData {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: string[];
}

type CreateCompletionResponse = AxiosResponse<CreateCompletionResponseData>;

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
  [key: string]: any;
};

enum CheckboxNames {
  "selectedIngredients",
  "cuisines",
  "dietaryPreferences",
}

type MenuOptions = {
  cuisines: string[];
  dietaryPreferences: string[];
  maxPrepTimeOptions: number[];
  difficulty: string[];
};

type ParsedRecipe = {
  id: string;
  title: string;
  summary: string;
  instructions: string[];
  preptime: string;
  cooktime: string;
} & Record<string, string | string[]>;

type APIResponse = {
  statusCode: number;
  body: any;
};
