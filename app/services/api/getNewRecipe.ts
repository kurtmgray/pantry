import { Configuration, OpenAIApi } from "openai";
import getApiKey from "./getApiKey";

type APIResponse = {
  statusCode: number;
  body?: Partial<CreateCompletionResponse>[];
  message?: string;
};

const configuration = new Configuration({
  apiKey: getApiKey(),
});
delete configuration.baseOptions.headers["User-Agent"];

const openai = new OpenAIApi(configuration);

export const getNewRecipe = async (
  promptParams: PromptParams,
  numChoices: number
): Promise<APIResponse> => {
  const {
    ingredients,
    allergies,
    cuisines,
    dietaryPreferences,
    maxPrepTime,
    difficulty,
    keywords,
    category,
  } = promptParams;
  try {
    const prompt: string = `Act as a professional chef who has been featured on many cooking shows and publications. 
    Recommend a recipe that contains a tasteful blend of SOME (not necessarily all) of the following: ${ingredients}, in the following styles: ${cuisines}. 
    Be sensitive to all of the following dietary preferences, if any: ${dietaryPreferences} and allergies, if any: ${allergies}. 
    Only return recipes of a Michelin Star rated quality. 
    Choose recipes whose combined prep and cook time are at or under ${maxPrepTime} minutes, and a difficulty of ${difficulty} or easier. 
    Consider the following keywords: ${keywords}.
    Return a recipe in this category: ${category}.
    Send your recipes back in paragraph form, with new lines for each of the following keys and recipe steps. 
    Provide a response with a randomly generated ID (key:_ID), title (key:_TITLE), summary (key:_SUMMARY), ingredients (key: _INGREDIENTS) each ingredient preceded by the character "%" in this format: name: ingredient name, unit: unit of measure, quantity: quantity of units (a number only, do not include the unit), instructions (key:_INSTRUCTIONS) with each step preceded by the character "@" including any prep on ingredients listed, prep time (key:_PREPTIME), cook time (key:_COOKTIME).
    If the category isn't specified above, choose an appropriate one (key:_CATEGORY) from the following: SIDE, APPETIZER, BREAKFAST, LUNCH, DINNER, DESSERT, SNACK, DRINK`;
    const textResponse: CreateCompletionResponse = await generateRecipe(
      prompt,
      numChoices
    );

    // append the url in a parsed textResponse as property image. return that in body? refactor?
    console.log(textResponse.choices[0].text);
    return {
      statusCode: 200,
      body: textResponse.choices,
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: [],
      message: "Error generating recipe.",
    };
  }
};

export async function generateRecipeImage(description: string) {
  const configuration = new Configuration({
      apiKey: getApiKey(),
    });
  delete configuration.baseOptions.headers["User-Agent"];
  
  const openai = new OpenAIApi(configuration);
  const response = await openai.createImage({
      prompt: description,
      n: 1,
      size: "256x256",
    });
    const image_url = response.data.data[0].url;
  return image_url
}


async function generateRecipe(
  prompt: string,
  numChoices: number
): CreateCompletionResponse {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 1024,
      temperature: 0.7,
      n: numChoices,
    });
    if (response)return response.data;
    else {
      throw new Error("Error generating recipe.")
    }
  } catch (err) {
    console.log("Error generating recipe: ", err)
  }
 
}
