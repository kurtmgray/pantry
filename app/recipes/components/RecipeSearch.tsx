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

type InputName = "allergies" | "keywords";

const isInputName = (name: string): name is InputName => {
  return name === "allergies" || name === "keywords";
};

const initPromptParamsState: PromptParams = {
  ingredients: [],
  allergies: [],
  cuisines: [],
  dietaryPreferences: [],
  maxPrepTime: [],
  difficulty: [],
  keywords: [],
  category: [],
};

export default function RecipeSearch({ options }: Props) {
  const { cuisines, dietaryPreferences } = options;
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newAllergy, setNewAllergy] = useState("");
  const [newKeyword, setNewKeyword] = useState("");

  const [promptParams, setPromptParams] = useState<PromptParams>(
    initPromptParamsState
  );
  const [recipeResponse, setRecipeResponse] = useState<
    CreateCompletionResponse[]
  >([]);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    // TODO: standardize type guards (see Notion page)
    const name = event.target.name as CheckboxNames;
    console.log(name, value, checked);

    setPromptParams((prev) => {
      return {
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter((item: string) => item !== value),
      };
    });
  };

  const handleAddParam = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, value } = e.currentTarget.elements[0] as HTMLInputElement;

    // TODO: standardize type guards (see Notion page)
    if (isInputName(name)) {
      setPromptParams((prev) => ({
        ...prev,
        [name]: [...prev[name], value],
      }));

      name === "allergies" && setNewAllergy("");
      name === "keywords" && setNewKeyword("");
    }
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    console.log(name, value);
    setPromptParams((prev) => ({
      ...prev,
      [name]: [value],
    }));
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
          .map((key, index) => {
            if (promptParams[key as keyof typeof promptParams].length === 0) {
              return null;
            }
            return (
              <PromptParamsDisplay
                key={index}
                title={key}
                formatTitle={camelCaseToWords}
                selectedOptions={promptParams[key as keyof typeof promptParams]}
              />
            );
          })}
      </div>
      <div className={styles.miscInputs}>
        <SelectInput
          options={options.category}
          value={promptParams.category[0]}
          onChange={handleSelectChange}
          name="category"
          placeholder="Select a category"
        />

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
          placeholder="Select Prep Time"
        />
      </div>

      <div>
        <div className={styles.inputDiv}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search pantry"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <form onSubmit={handleAddParam}>
            <input
              className={styles.searchInput}
              name="keywords"
              type="text"
              placeholder="Keywords"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
          <form onSubmit={handleAddParam}>
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
        </div>

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
