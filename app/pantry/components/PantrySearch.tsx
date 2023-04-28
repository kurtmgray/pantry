"use client";
import React, {
  ChangeEvent,
  FormEvent,
  useLayoutEffect,
  useState,
} from "react";

type Props = {
  ingredients: PantryItem[];
  options: MenuOptions;
};

const PantrySearch = ({ ingredients, options }: Props) => {
  const { cuisines, dietaryPreferences } = options;
  const initPromptParamsState: PromptParams = {
    selectedIngredients: [],
    allergies: [],
    cuisines: [],
    dietaryPreferences: [],
    maxPrepTimeOptions: "",
    difficulty: "",
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [promptParams, setPromptParams] = useState<PromptParams>(
    initPromptParamsState
  );
  const [newAllergy, setNewAllergy] = useState("");

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked, name } = event.target;
    switch (name) {
      case "ingredients":
        if (checked) {
          // const checkedIngredient = ingredients.find(
          //   (ingredient) => ingredient.name === value
          // );
          // checkedIngredient &&
          setPromptParams({
            ...promptParams,
            selectedIngredients: [...promptParams.selectedIngredients, value],
          });
        } else {
          setPromptParams({
            ...promptParams,
            selectedIngredients: promptParams.selectedIngredients.filter(
              (ingredient) => ingredient !== value
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

  const handleAddAllergies = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { allergies } = event.currentTarget
      .elements as typeof event.currentTarget.elements & {
      allergies: { value: string };
    };

    setPromptParams({
      ...promptParams,
      allergies: [...promptParams.allergies, allergies.value],
    });

    setNewAllergy("");
  };

  const handleDifficultyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedDifficulty = event.target.value;
    setPromptParams({
      ...promptParams,
      difficulty: selectedDifficulty,
    });
  };

  return (
    <div>
      <h2>Pantry</h2>
      <h3>Selected Ingredients:</h3>
      <ul>
        {promptParams.selectedIngredients.map((ingredient) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>
      <h3>Selected Cuisines:</h3>

      <ul>
        {promptParams.cuisines.map((cuisine) => (
          <li key={cuisine}>{cuisine}</li>
        ))}
      </ul>

      <h3>Selected Dietary Preferences:</h3>
      <ul>
        {promptParams.dietaryPreferences.map((dietaryPreference) => (
          <li key={dietaryPreference}>{dietaryPreference}</li>
        ))}
      </ul>
      <h3>Allergies:</h3>
      <ul>
        {promptParams.allergies.map((allergy) => (
          <li key={allergy}>{allergy}</li>
        ))}
      </ul>
      <h3>Difficulty:</h3>

      {promptParams.difficulty === "" ? null : (
        <ul>
          {" "}
          <li>{promptParams.difficulty}</li>{" "}
        </ul>
      )}

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

      <select value={promptParams.difficulty} onChange={handleDifficultyChange}>
        <option value="">Select Difficulty</option>
        {options.difficulty.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

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
                  (selected) => selected === ingredient.name
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
