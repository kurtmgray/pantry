import { useState, ChangeEvent } from "react";
import { useGlobalState } from "@/app/providers";

type Props = {
  handleCheckboxChange: (event: ChangeEvent<HTMLInputElement>) => void;
  promptParams: PromptParams;
};
export default function IngredientsList({
  handleCheckboxChange,
  promptParams,
}: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  // TODO: does destructuring in this way still consume the whole state?
  const {
    state: { pantry },
  } = useGlobalState();

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
          {pantry
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
            ))}
        </ul>
      </div>
    </div>
  );
}
