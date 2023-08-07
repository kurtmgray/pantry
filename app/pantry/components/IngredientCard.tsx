import React from "react";
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
  const {
    food: { brand, label, image, knownAs, nutrients, foodId },
  } = ingredient;
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <h2>{label}</h2>
          {brand ? <p>{brand}</p> : <p>Generic</p>}
        </div>
      </div>
      <div className={styles.cardBody}>
        {ingredient.food.image ? (
          <Image
            src={image}
            width={100}
            height={100}
            alt={`image of ${knownAs}`}
          />
        ) : (
          <p className={styles.noImage}>No image available</p>
        )}
        <div className={styles.cardNutrients}>
          <h4>Nutrients per 100g</h4>
          <p>Calories: {nutrients.ENERC_KCAL.toFixed(1)} kcal</p>
          <p>Protein: {nutrients.PROCNT.toFixed(1)} g</p>
          <p>Carbs: {nutrients.CHOCDF.toFixed(1)} g</p>
          <p>Fat: {nutrients.FAT.toFixed(1)} g</p>
          <button id={foodId} onClick={() => onCreatePantryItem(ingredient)}>
            Add to Pantry
          </button>
        </div>
      </div>
    </div>
  );
}
