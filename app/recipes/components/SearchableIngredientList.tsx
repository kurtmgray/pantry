import { useState, ChangeEvent, useEffect } from "react";
import { useGlobalState } from "@/app/providers";
import { usePantryItems } from "@/lib/usePantryItems";

type Props = {
  handleCheckboxChange: (event: ChangeEvent<HTMLInputElement>) => void;
  promptParams: PromptParams;
};
export default function SearchableIngredientsList({
  handleCheckboxChange,
  promptParams,
}: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    state: { pantry },
    setState,
  } = useGlobalState();
  const { pantryItems, isLoading } = usePantryItems();

  useEffect(() => {
    setState((state: GlobalState) => {
      return { ...state, pantry: pantryItems };
    });
  }, [pantryItems, setState]);

  return (
    <div>
      {/* TODO: use searchbar here? */}
      <input
        type="text"
        placeholder="Search pantry"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div>
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
    </div>
  );
}
