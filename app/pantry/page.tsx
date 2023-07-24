"use client";
import styles from "./Pantry.module.css";
import AddIngredientForm from "./components/AddIngredientForm";
import PantryList from "./components/PantryList";
import { useState } from "react";

export default function Pantry() {
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);

  const addPantryItem = async (ingredientFromEdamam: EdamamIngredient) => {
    const response = await fetch(`/api/ingredients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ingredientFromEdamam),
    });
    const addedItem = await response.json();
    setPantryItems((prevPantryItems) => [...prevPantryItems, addedItem]);
  };

  return (
    <div className={styles.pantryPage}>
      <AddIngredientForm formStyles={styles} addPantryItem={addPantryItem} />
      <PantryList
        listStyles={styles}
        pantryItems={pantryItems}
        setPantryItems={setPantryItems}
      />
    </div>
  );
}
