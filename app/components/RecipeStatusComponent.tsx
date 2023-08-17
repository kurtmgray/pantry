import React, { MouseEvent } from "react";
import { Status } from "@/lib/types";

type Props = {
  status: Status | null;
  handleSaveRecipe: (event: MouseEvent<HTMLButtonElement>) => void; // This assumes your handler doesn't expect any parameters
};

export default function RecipeStatusComponent({
  status,
  handleSaveRecipe,
}: Props) {
  switch (status) {
    case null:
      return null;
    case Status.NOT_SAVED:
      return <button onClick={handleSaveRecipe}>Save Recipe</button>;
    case Status.SAVING:
      return <p>Saving Recipe...</p>;
    case Status.SAVED:
      return <p>Recipe Saved!</p>;
    case Status.FAILED:
      return <p>Recipe was not saved. :(</p>;
    default:
      return null;
  }
}

// Usage:
// Assuming you're using the component within a function component that has the `recipeStatus` and `handleSaveRecipe` defined.
