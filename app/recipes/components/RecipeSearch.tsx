"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { getNewRecipe } from "@/app/services/api/getNewRecipe";
import { camelCaseToWords } from "@/app/utils/camelCaseToWords";
import RecipeCard from "@/app/components/RecipeCard";
import PromptParamsDisplay from "./PromptParamsDisplay";
import OptionsList from "./OptionsList";
import SelectInput from "./SelectInput";
import parseRecipeString from "@/app/utils/parseResponseString";
import SearchableIngredientsList from "./SearchableIngredientList";
import { Spin } from "antd";
import styles from "../Recipes.module.css";

type Props = {
  options: MenuOptions;
};

const initPromptParamsState: PromptParams = {
  selectedIngredients: [],
  allergies: [],
  cuisines: [],
  dietaryPreferences: [],
  maxPrepTime: [],
  difficulty: [],
};

export default function RecipeSearch({ options }: Props) {
  const { cuisines, dietaryPreferences } = options;
  const [isLoading, setIsLoading] = useState(false);
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
    console.log(name, value, checked);

    setPromptParams({
      ...promptParams,
      [name]: checked
        ? [...promptParams[name], value]
        : promptParams[name].filter((item: string) => item !== value),
    });
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
      [name]: [value],
    });
  };

  const handleGetRecipe = async () => {
    setIsLoading(true);
    const data = await getNewRecipe(promptParams, 1);
    if (data.statusCode === 200) {
      setRecipeResponse(data.body!);
    }
    setIsLoading(false);
    console.log(data);
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
      {isLoading ? (
        <Spin />
      ) : (
        <button onClick={handleGetRecipe}>Get Recipe</button>
      )}
      <h2>Selected Items:</h2>
      <div>
        {Object.keys(promptParams)
          .sort()
          .map((key, index) => (
            <PromptParamsDisplay
              key={index}
              title={key}
              formatTitle={camelCaseToWords}
              selectedOptions={promptParams[key as keyof typeof promptParams]}
            />
          ))}
      </div>
      <div className={styles.miscInputs}>
        <form onSubmit={handleAddAllergies}>
          <input
            className={styles.searchInput}
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
          value={promptParams.difficulty[0]}
          onChange={handleSelectChange}
          name="difficulty"
          placeholder="Select Difficulty"
        />

        <SelectInput
          options={options.maxPrepTimeOptions}
          value={promptParams.maxPrepTime[0]}
          onChange={handleSelectChange}
          name="maxPrepTime"
          placeholder="Set Max Prep Time"
        />
      </div>

      <div>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search pantry"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className={styles.listContainer}>
          <SearchableIngredientsList
            searchTerm={searchTerm}
            promptParams={promptParams}
            handleCheckboxChange={handleCheckboxChange}
          />
          <OptionsList
            title={"cuisines"}
            options={cuisines}
            promptParams={promptParams}
            formatTitle={camelCaseToWords}
            handleCheckboxChange={handleCheckboxChange}
          />
          <OptionsList
            title={"dietaryPreferences"}
            options={dietaryPreferences}
            promptParams={promptParams}
            formatTitle={camelCaseToWords}
            handleCheckboxChange={handleCheckboxChange}
          />
        </div>
      </div>
    </div>
  );
}
