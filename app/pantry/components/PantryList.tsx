import React, { useEffect, useState } from "react";
import { fetchPantryItems } from "@/lib/getPantryItems";
import PantryItemCard from "./PantryItemCard";

// working here
// want this component to re-render when addingredientform is submitted
// how do i want to use global state, and/or do i place more logic into the parent component?

type Props = {
  listStyles: { [key: string]: string };
  pantryItems: PantryItem[];
  setPantryItems: React.Dispatch<React.SetStateAction<PantryItem[]>>;
};

export default function PantryList({
  listStyles,
  pantryItems,
  setPantryItems,
}: Props) {
  useEffect(() => {
    const updatePantryItems: PantryItemsCallback = (data) => {
      setPantryItems(data);
    };
    fetchPantryItems(updatePantryItems);
  }, []);

  return (
    <div className={listStyles.currentPantry}>
      <h2>Pantry List</h2>
      {pantryItems.length === 0 ? (
        <p>No items in the pantry</p>
      ) : (
        <div className={listStyles.pantryItem_container}>
          {pantryItems.map((item) => (
            <PantryItemCard itemStyles={listStyles} pantryItem={item} />
          ))}
        </div>
      )}
    </div>
  );
}
