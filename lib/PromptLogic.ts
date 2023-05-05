import { Configuration, OpenAIApi } from "openai";

// const configuration = new Configuration({
//   apiKey: getApiKey(),
// });

// const openai = new OpenAIApi(configuration);
// console.log(openai);
type APIResponse = {
  statusCode: number;
  body?: Partial<CreateCompletionResponse>[];
  message?: string;
};

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
    const prompt: string = `Act as a professional chef who has been featured on many cooking shows and publications. Recommend a recipe that contains ${selectedIngredients}, in as many of the following stles as possible: ${cuisines}. Be sensitive to all of the following dietary preferences: ${dietaryPreferences} and allergies: ${allergies}. Please only return recipes of a Michelin Star rated quality. Choose recipes whose combined prep and cook time are at or under ${maxPrepTime} minutes, and a difficulty of ${difficulty} or easier. Please send your recipes back in paragraph form, with new lines for each of the following keys and recipe steps. Provide a response with a randomly generated ID (key:_ID), title (key:_TITLE), summary (key:_SUMMARY), instructions (key:_INSTRUCTIONS) with each step preceded by the character "@", prep time (key:_PREPTIME), and cook time (key:_COOKTIME).`;
    const response: CreateCompletionResponse = await generateRecipe(
      prompt,
      numChoices
    );
    console.log(response.choices[0].text);
    return {
      statusCode: 200,
      body: response.choices,
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

// async
function getApiKey() {
  // API key stored at AWS Systems Manager endpoint
  // console.log(await ssm.getParameter({ Name: "/openai/api_key" }));
  // const ssmParam = await ssm.getParameter({ Name: "/openai/api_key" });
  // return ssmParam.Parameter.Value;
  return process.env.NEXT_PUBLIC_OPENAI_API_KEY;
}

async function generateRecipe(prompt: string, numChoices: number) {
  //   const response: CreateCompletionResponse = await openai.createCompletion({
  //     model: "text-davinci-003",
  //     prompt: prompt,
  //     temperature: 0,
  //     max_tokens: 1024,
  //     n: 1,
  //   });
  //   console.log(response);

  const data = JSON.stringify({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 1024,
    temperature: 0.7,
    n: numChoices,
  });

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getApiKey()}`,
    },
    body: data,
  };

  return new Promise((resolve, reject) => {
    fetch("https://api.openai.com/v1/completions", options)
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.choices && data.choices.length > 0) {
          console.log(data);
          resolve(data);
        } else {
          console.log(data);
          reject("Error generating lesson plan");
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
