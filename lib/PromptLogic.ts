import { Configuration, OpenAIApi } from "openai";

// const configuration = new Configuration({
//   apiKey: getApiKey(),
// });

// const openai = new OpenAIApi(configuration);
// console.log(openai);

export const handler = async (promptParams: PromptParams) => {
  const {
    selectedIngredients,
    allergies,
    cuisines,
    dietaryPreferences,
    maxPrepTimeOptions,
    difficulty,
  } = promptParams;
  try {
    const prompt: string = `Act as a professional chef who has been featured on many cooking shows and publications. Recommend ${5} recipes that contains ${[
      ...selectedIngredients,
    ]}, in as many of the following stles as possible: ${cuisines}. Be sensitive to all of the following dietary preferences: ${[
      ...dietaryPreferences,
    ]}. Choose recipes whose combined prep and cook time are at or under ${30} minutes, and a difficulty of up to ${difficulty}`;
    const response: CreateCompletionResponse = await generateRecipe(prompt);
    return {
      statusCode: 200,
      body: response.choices[0].text,
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: "Error generating recipes.",
    };
  }
};

// async
console.log(process.env.OPENAI_API_KEY);
function getApiKey() {
  const key = process.env.OPENAI_API_KEY;
  // API key stored at AWS Systems Manager endpoint
  // console.log(await ssm.getParameter({ Name: "/openai/api_key" }));
  // const ssmParam = await ssm.getParameter({ Name: "/openai/api_key" });
  // return ssmParam.Parameter.Value;
  return key;
}

async function generateRecipe(prompt: string) {
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
    n: 1,
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
