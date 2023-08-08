import { useState, ChangeEvent, useEffect } from "react";
import { useGlobalState } from "@/app/providers";
import { usePantryItems } from "@/app/hooks/usePantryItems";
import styles from "../Recipes.module.css";

type Props = {
  searchTerm: string;
  promptParams: PromptParams;
  handleCheckboxChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
export default function SearchableIngredientsList({
  searchTerm,
  promptParams,
  handleCheckboxChange,
}: Props) {
  const {
    state: { pantry },
    setState,
  } = useGlobalState();

  const { pantryItems, isLoading, error } = usePantryItems();

  useEffect(() => {
    setState((state: GlobalState) => {
      return { ...state, pantry: pantryItems };
    });
  }, [pantryItems, setState]);
  console.log(searchTerm);

  return (
    <div className={styles.searchableIngredientsList}>
      <h2>Ingredients:</h2>
      <ul>
        {isLoading ? (
          <p>Loading...</p>
        ) : pantry.length === 0 ? (
          <p>No items in the pantry</p>
        ) : (
          pantry
            .filter((ingredient) =>
              ingredient.knownAs
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
            .slice(0, 20)
            .map((ingredient) => (
              <li key={ingredient.id}>
                <input
                  type="checkbox"
                  name="selectedIngredients"
                  value={ingredient.knownAs}
                  checked={promptParams.selectedIngredients.some(
                    (selected) => selected === ingredient.knownAs
                  )}
                  onChange={handleCheckboxChange}
                />
                {ingredient.knownAs}
              </li>
            ))
        )}
      </ul>
    </div>
  );
}
