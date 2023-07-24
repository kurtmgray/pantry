import React, { useEffect, useState } from "react";
import { fetchPantryItems } from "@/lib/getPantryItems";
import PantryItemCard from "./PantryItemCard";

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
  }, [setPantryItems]);

  return (
    <div className={listStyles.currentPantry}>
      <h2>Pantry List</h2>
      {pantryItems.length === 0 ? (
        <p>No items in the pantry</p>
      ) : (
        <div className={listStyles.pantryItem_container}>
          {[...pantryItems].sort((a, b) =>
      a.label.localeCompare(b.label)
    ).map((item) => (
            <PantryItemCard key={item.id} itemStyles={listStyles} pantryItem={item} />
          ))}
        </div>
      )}
    </div>
  );
}
