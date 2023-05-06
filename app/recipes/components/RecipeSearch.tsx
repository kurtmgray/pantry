"use client";
import React, { ChangeEvent, FormEvent, useState, useContext } from "react";
import { getRecipe } from "@/lib/getRecipe";
import parseRecipeString from "@/lib/parseResponseString";
import RecipeCard from "./RecipeCard";
import { AppContext } from "@/app/providers";

const optionStyles = {
  display: "flex",
  justifyContent: "space-between",
  paddingLeft: "2rem",
};

type Props = {
  ingredients: PantryItem[];
  options: MenuOptions;
};

export default function RecipeSearch({ ingredients, options }: Props) {
  const { cuisines, dietaryPreferences } = options;
  const initPromptParamsState: PromptParams = {
    selectedIngredients: [],
    allergies: [],
    cuisines: [],
    dietaryPreferences: [],
    maxPrepTime: "",
    difficulty: "",
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [newAllergy, setNewAllergy] = useState("");
  const [promptParams, setPromptParams] = useState<PromptParams>(
    initPromptParamsState
  );
  const [recipeResponse, setRecipeResponse] = useState<
    CreateCompletionResponse[]
  >([]);
  const [globalState, setGlobalState] = useContext(AppContext);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    const name = event.target.name as CheckboxNames;
    // if (validCheckBoxNames.includes(name)) {
    setPromptParams({
      ...promptParams,
      [name]: checked
        ? [...promptParams[name], value]
        : promptParams[name].filter((item: string) => item !== value),
    });
    // }
  };

  const handleAddAllergies = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const allergies: string = event.currentTarget.value;

    setPromptParams({
      ...promptParams,
      allergies: [...promptParams.allergies, newAllergy],
    });

    setNewAllergy("");
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    console.log(name, value);
    setPromptParams({
      ...promptParams,
      [name]: value,
    });
  };

  const handleGetRecipe = async () => {
    const data = await getRecipe(promptParams, 1);

    if (data.statusCode === 200) {
      setRecipeResponse(data.body!);
    }

    console.log(parseRecipeString(data.body![0].text));
    console.log(parseRecipeString(data.body![1].text));
    console.log(parseRecipeString(data.body![2].text));

    return;
  };

  return (
    <div>
      <div>
        {recipeResponse.length > 0 &&
          recipeResponse.map((recipe, index) => {
            return <RecipeCard key={index} recipe={recipe} />;
          })}
      </div>
      <h2>Pantry</h2>
      <button onClick={handleGetRecipe}>Get Recipe</button>
      <h2>Selected Items:</h2>
      <div style={optionStyles}>
        <div>
          <h3>Ingredients:</h3>
          <ul>
            {promptParams.selectedIngredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Cuisines:</h3>
          <ul>
            {promptParams.cuisines.map((cuisine, index) => (
              <li key={index}>{cuisine}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Dietary Preferences:</h3>
          <ul>
            {promptParams.dietaryPreferences.map((dietaryPreference, index) => (
              <li key={index}>{dietaryPreference}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Allergies:</h3>
          <ul>
            {promptParams.allergies.map((allergy, index) => (
              <li key={index}>{allergy}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Difficulty:</h3>
          {promptParams.difficulty === "" ? null : (
            <ul>
              {" "}
              <li>{promptParams.difficulty}</li>{" "}
            </ul>
          )}
        </div>
      </div>

      <input
        type="text"
        placeholder="Search pantry"
        value={searchTerm}
        onChange={handleSearch}
      />
      <form onSubmit={handleAddAllergies}>
        <input
          type="text"
          name="allergies"
          placeholder="Allergies"
          value={newAllergy}
          onChange={(e) => setNewAllergy(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <select
        value={promptParams.difficulty}
        name="difficulty"
        onChange={handleSelectChange}
      >
        <option value="">Select Difficulty</option>
        {options.difficulty.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      <select
        value={promptParams.maxPrepTime}
        name="maxPrepTime"
        onChange={handleSelectChange}
      >
        <option value="">Select Max Prep Time</option>
        {options.maxPrepTimeOptions.map((option, index) => (
          <option key={index} value={option}>
            {option} min.
          </option>
        ))}
      </select>
      <div style={optionStyles}>
        <div>
          <h2>Ingredients:</h2>
          <ul>
            {ingredients
              .filter((ingredient) =>
                ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .slice(0, 20)
              .map((ingredient) => (
                <li key={ingredient.id}>
                  <input
                    type="checkbox"
                    name="selectedIngredients"
                    value={ingredient.name}
                    checked={promptParams.selectedIngredients.some(
                      (selected) => selected === ingredient.name
                    )}
                    onChange={handleCheckboxChange}
                  />
                  {ingredient.name}
                </li>
              ))}
          </ul>
        </div>
        <div>
          <h2>Cuisine</h2>
          <ul>
            {cuisines.map((cuisine, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  name="cuisines"
                  value={cuisine}
                  checked={promptParams.cuisines.includes(cuisine)}
                  onChange={handleCheckboxChange}
                />
                {cuisine}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Dietary Preferences</h2>
          <ul>
            {dietaryPreferences.map((preference, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  name="dietaryPreferences"
                  value={preference}
                  checked={promptParams.dietaryPreferences.includes(preference)}
                  onChange={handleCheckboxChange}
                />
                {preference}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <pre>{JSON.stringify(promptParams, null, 4)}</pre>
      {globalState}
    </div>
  );
}
