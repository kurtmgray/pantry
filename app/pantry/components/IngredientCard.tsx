import React, { MouseEvent } from "react";
import Image from "next/image";
import styles from "./../Pantry.module.css";

type Props = {
  ingredient: EdamamIngredient;
  onCreatePantryItem: (e: MouseEvent<HTMLButtonElement>) => void;
};
export default function IngredientCard({
  ingredient,
  onCreatePantryItem,
}: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2>{ingredient.food.label}</h2>
        <Image
          src={ingredient.food.image}
          width={100}
          height={100}
          alt={`image of ${ingredient.food.knownAs}`}
        />
      </div>
      <div className={styles.cardBody}>
        <div>
          <h4>Nutrients per 100g</h4>
          <p>Calories: {ingredient.food.nutrients.ENERC_KCAL}kcal</p>
          <p>Protein: {ingredient.food.nutrients.PROCNT}g</p>
          <p>Carbs: {ingredient.food.nutrients.CHOCDF}g</p>
          <p>Fat: {ingredient.food.nutrients.FAT}g</p>
        </div>
        <button onClick={(e) => onCreatePantryItem(e)}>Add to Pantry</button>
      </div>
    </div>
  );
}
