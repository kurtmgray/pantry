"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { getNewRecipe } from "@/lib/getNewRecipe";
import RecipeCard from "@/app/components/RecipeCard";
import PromptParamsDisplay from "./PromptParamsDisplay";
import OptionsList from "./OptionsList";
import SelectInput from "./SelectInput";
import parseRecipeString from "@/lib/parseResponseString";
import SearchableIngredientsList from "./SearchableIngredientList";
import styles from "../Recipes.module.css";

// TODO: styles
const optionStyles = {
  display: "flex",
  justifyContent: "space-between",
  paddingLeft: "2rem",
};

type Props = {
  options: MenuOptions;
};

const initPromptParamsState: PromptParams = {
  selectedIngredients: [],
  allergies: [],
  cuisines: [],
  dietaryPreferences: [],
  maxPrepTime: "",
  difficulty: "",
};

export default function RecipeSearch({ options }: Props) {
  const { cuisines, dietaryPreferences } = options;

  // TODO case for useSearch?
  const [searchTerm, setSearchTerm] = useState("");
  const [newAllergy, setNewAllergy] = useState("");
  const [promptParams, setPromptParams] = useState<PromptParams>(
    initPromptParamsState
  );
  const [recipeResponse, setRecipeResponse] = useState<
    CreateCompletionResponse[]
  >([]);

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
    const data = await getNewRecipe(promptParams, 1);
    if (data.statusCode === 200) {
      setRecipeResponse(data.body!);
    }
  };

  return (
    <div className={styles.recipeSearch}>
      <div>
        {recipeResponse.length > 0 &&
          recipeResponse.map((recipe) => {
            const parsed = parseRecipeString(recipe.text);
            console.log("parsed", parsed);
            return <RecipeCard key={parsed.id} recipe={parsed} />;
          })}
      </div>
      <h2>Pantry</h2>
      <button onClick={handleGetRecipe}>Get Recipe</button>
      <h2>Selected Items:</h2>
      <div style={optionStyles}>
        {Object.keys(promptParams)
          .sort()
          .map((key, index) => (
            <PromptParamsDisplay
              key={index}
              title={key}
              selectedOptions={
                // works, but a bit hacky
                (promptParams as { [key: string]: string | string[] })[key]
              }
            />
          ))}
      </div>

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

      <SelectInput
        options={options.difficulty}
        value={promptParams.difficulty}
        onChange={handleSelectChange}
        name="difficulty"
        placeholder="Select Difficulty"
      />

      <SelectInput
        options={options.maxPrepTimeOptions}
        value={promptParams.difficulty}
        onChange={handleSelectChange}
        name="maxPrepTime"
        placeholder="Set Max Prep Time"
      />

      <div style={optionStyles}>
        <SearchableIngredientsList
          handleCheckboxChange={handleCheckboxChange}
          promptParams={promptParams}
        />
        <OptionsList
          title={"Cuisine"}
          options={cuisines}
          handleCheckboxChange={handleCheckboxChange}
          promptParams={promptParams}
        />
        <OptionsList
          title={"Dietary Preferences"}
          options={dietaryPreferences}
          handleCheckboxChange={handleCheckboxChange}
          promptParams={promptParams}
        />
      </div>
    </div>
  );
}
