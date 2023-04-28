"use client";
import React, { ChangeEvent, useState } from "react";

type Props = {
  ingredients: PantryItem[];
  options: MenuOptions;
};

const PantrySearch = ({ ingredients, options }: Props) => {
  const { cuisines, dietaryPreferences } = options;
  const initPromptParamsState: PromptParams = {
    selectedIngredients: [],
    allergies: "",
    cuisines: [],
    dietaryPreferences: [],
    maxPrepTimeOptions: "",
    difficulty: "",
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [promptParams, setPromptParams] = useState<PromptParams>(
    initPromptParamsState
  );

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked, name } = event.target;
    switch (name) {
      case "ingredients":
        if (checked) {
          console.log("hi");
          const checkedIngredient = ingredients.find(
            (ingredient) => ingredient.name === value
          );
          checkedIngredient &&
            setPromptParams({
              ...promptParams,
              selectedIngredients: [
                ...promptParams.selectedIngredients,
                checkedIngredient,
              ],
            });
        } else {
          setPromptParams({
            ...promptParams,
            selectedIngredients: promptParams.selectedIngredients.filter(
              (ingredient) => ingredient.name !== value
            ),
          });
        }
        break;
      case "cuisines":
        if (checked) {
          setPromptParams({
            ...promptParams,
            cuisines: [...promptParams.cuisines, value],
          });
        } else {
          setPromptParams({
            ...promptParams,
            cuisines: promptParams.cuisines.filter(
              (cuisine) => cuisine !== value
            ),
          });
        }
        break;
      case "dietaryPreferences":
        if (checked) {
          setPromptParams({
            ...promptParams,
            dietaryPreferences: [...promptParams.dietaryPreferences, value],
          });
        } else {
          setPromptParams({
            ...promptParams,
            dietaryPreferences: promptParams.dietaryPreferences.filter(
              (preference) => preference !== value
            ),
          });
        }
        break;
      case "maxPrepTimeOptions":
        setPromptParams({
          ...promptParams,
          maxPrepTimeOptions: value,
        });
        break;
      case "difficulty":
        setPromptParams({
          ...promptParams,
          difficulty: value,
        });
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h2>Pantry</h2>
      <h3>Selected Options:</h3>
      <ul>
        {promptParams.selectedIngredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.name}</li>
        ))}
        {promptParams.cuisines.map((cuisine) => (
          <li key={cuisine}>{cuisine}</li>
        ))}
        {promptParams.dietaryPreferences.map((dietaryPreferences) => (
          <li key={dietaryPreferences}>{dietaryPreferences}</li>
        ))}
      </ul>

      <input
        type="text"
        placeholder="Search pantry"
        value={searchTerm}
        onChange={handleSearch}
      />

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
                name="ingredients"
                value={ingredient.name}
                checked={promptParams.selectedIngredients.some(
                  (selected) => selected.name === ingredient.name
                )}
                onChange={handleCheckboxChange}
              />
              {ingredient.name}
            </li>
          ))}
      </ul>
      <div>
        <h2>Cuisine</h2>
        <ul>
          {cuisines.map((cuisine) => (
            <li key={cuisine}>
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
          {dietaryPreferences.map((preference) => (
            <li key={preference}>
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
  );
};

export default PantrySearch;
