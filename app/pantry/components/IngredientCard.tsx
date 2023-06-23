import React, { MouseEvent } from "react";
type Props = {
  ingredient: EdamamIngredient;
  onCreatePantryItem: (e: MouseEvent<HTMLButtonElement>) => void;
};
export default function IngredientCard({
  ingredient,
  onCreatePantryItem,
}: Props) {
  return (
    <div>
      <h2>{ingredient.food.label}</h2>
      <h4>Nutrients per 100g</h4>
      <p>Calories: {ingredient.food.nutrients.ENERC_KCAL}kcal</p>
      <p>Protein: {ingredient.food.nutrients.PROCNT}g</p>
      <p>Carbs: {ingredient.food.nutrients.CHOCDF}g</p>
      <p>Fat: {ingredient.food.nutrients.FAT}g</p>
      <img
        src={ingredient.food.image}
        alt={`image of ${ingredient.food.knownAs}`}
      />
      <button onClick={(e) => onCreatePantryItem(e)}>Add to Pantry</button>
    </div>
  );
}
