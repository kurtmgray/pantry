"use client";
import React, { useEffect, useState } from "react";
import { fetchPantryItems } from "@/lib/getPantryItems";
import PantryItemCard from "./PantryItemCard";

// working here
// want this component to re-render when addingredientform is submitted
// how do i want to use global state, and/or do i place more logic into the parent component?

type Props = {
  listStyles: { [key: string]: string };
};

export default function PantryList({ listStyles }: Props) {
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);

  useEffect(() => {
    // const fetchPantryItems = async () => {
    //   try {
    //     const response = await fetch("/api/pantry");
    //     if (response.ok) {
    //       const data = await response.json();
    //       console.log(data);
    //       setPantryItems(data);
    //     } else {
    //       throw new Error("Failed to fetch pantry items");
    //     }
    //   } catch (error) {
    //     console.error("Error fetching pantry items:", error);
    //     return [];
    //   }
    // };
    // fetchPantryItems();
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
