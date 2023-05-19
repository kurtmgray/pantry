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

export const getRecipe = async (
  promptParams: PromptParams,
  numChoices: number
): Promise<APIResponse> => {
  const {
    selectedIngredients,
    allergies,
    cuisines,
    dietaryPreferences,
    maxPrepTime,
    difficulty,
  } = promptParams;
  try {
    const prompt: string = `Act as a professional chef who has been featured on many cooking shows and publications. 
    Recommend a recipe that contains ${selectedIngredients}, in as many of the following stles as possible: ${cuisines}. 
    Be sensitive to all of the following dietary preferences: ${dietaryPreferences} and allergies: ${allergies}. 
    Please only return recipes of a Michelin Star rated quality. 
    Choose recipes whose combined prep and cook time are at or under ${maxPrepTime} minutes, and a difficulty of ${difficulty} or easier. 
    Please send your recipes back in paragraph form, with new lines for each of the following keys and recipe steps. 
    Provide a response with a randomly generated ID (key:_ID), title (key:_TITLE), summary (key:_SUMMARY), ingredients (key: _INGREDIENTS) each ingredient preceded by the character "%" in this format: name: ingredient name, quantity: number string only, unit: unit of measure, instructions (key:_INSTRUCTIONS) with each step preceded by the character "@" including any prep on ingredients listed, prep time (key:_PREPTIME), cook time (key:_COOKTIME).
    Choose a recipe category (key:_CATEGORY) from the following: APPETIZER, BREAKFAST, LUNCH, DINNER, DESSERT, SNACK, DRINK`;
    // probably make category a user option
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

export async function generateImage(
  prompt: string
): Partial<CreateImageResponse> {
  configuration.baseOptions.headers["Access-Control-Allow-Origin"] = "*";
  console.log(configuration);
  const response = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: "256x256",
  });
  // const data = JSON.stringify({
  //   prompt: prompt,
  //   n: 1,
  //   size: "256x256",
  // });

  // const options = {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${getApiKey()}`,
  //     "Access-Control-Allow-Origin": "*",
  //   },
  //   body: data,
  // };
  return response.data;
  // new Promise((resolve, reject) => {
  //   fetch("https://api.openai.com/v1/images/generations", options)
  //     .then((response) => {
  //       console.log(response);
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       if (data.data && data.data.length > 0) {
  //         console.log(data);
  //         resolve(data);
  //       } else {
  //         console.log(data);
  //         reject("Error generating lesson plan");
  //       }
  //     })
  //     .catch((error) => {
  //       reject(error);
  //     });
  // });
  // response.data;
}

async function generateRecipe(
  prompt: string,
  numChoices: number
): CreateCompletionResponse {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 1024,
    temperature: 0.7,
    n: numChoices,
  });
  console.log(response);
  // const data = JSON.stringify({
  //   model: "text-davinci-003",
  //   prompt: prompt,
  //   max_tokens: 1024,
  //   temperature: 0.7,
  //   n: numChoices,
  // });

  // const options = {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${getApiKey()}`,
  //   },
  //   body: data,
  // };
  return response.data;
  // new Promise((resolve, reject) => {
  //   fetch("https://api.openai.com/v1/completions", options)
  //     .then((response) => {
  //       console.log(response);
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       if (data.choices && data.choices.length > 0) {
  //         console.log(data);
  //         resolve(data);
  //       } else {
  //         console.log(data);
  //         reject("Error generating lesson plan");
  //       }
  //     })
  //     .catch((error) => {
  //       reject(error);
  //     });
  // });
}
