import React, { MouseEvent } from "react";
import Image from "next/image";
import styles from "./../Pantry.module.css";

type Props = {
  ingredient: EdamamIngredient;
  onCreatePantryItem: (ingredient: EdamamIngredient) => void;
};
export default function IngredientCard({
  ingredient,
  onCreatePantryItem,
}: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <h2>{ingredient.food.label}</h2>
          {ingredient.food.brand ? (
            <p>{ingredient.food.brand}</p>
          ) : (
            <p>Generic</p>
          )}
        </div>
      </div>
      <div className={styles.cardBody}>
        {ingredient.food.image ? (
          <Image
            src={ingredient.food.image}
            width={100}
            height={100}
            alt={`image of ${ingredient.food.knownAs}`}
          />
        ) : (
          <p className={styles.noImage}>No image available</p>
        )}
        <div className={styles.cardNutrients}>
          <h4>Nutrients per 100g</h4>
          <p>
            Calories: {ingredient.food.nutrients.ENERC_KCAL.toFixed(1)} kcal
          </p>
          <p>Protein: {ingredient.food.nutrients.PROCNT.toFixed(1)} g</p>
          <p>Carbs: {ingredient.food.nutrients.CHOCDF.toFixed(1)} g</p>
          <p>Fat: {ingredient.food.nutrients.FAT.toFixed(1)} g</p>
          <button
            id={ingredient.food.foodId}
            onClick={() => onCreatePantryItem(ingredient)}
          >
            Add to Pantry
          </button>
        </div>
      </div>
    </div>
  );
}
