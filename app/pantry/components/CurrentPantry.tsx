"use client";
import React, { useEffect, useState } from "react";
import { fetchPantryItems } from "@/lib/getPantryItems";

// working here
// want this component to re-render when addingredientform is submitted
// how do i want to use global state, and/or do i place more logic into the parent component?

export default function CurrentPantry() {
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
    <div>
      <h2>Pantry List</h2>
      {pantryItems.length === 0 ? (
        <p>No items in the pantry</p>
      ) : (
        <ul>
          {pantryItems.map((item) => (
            <li key={item.id}>
              <p>Title: {item.knownAs}</p>
              <p>Category: {item.category}</p>
              <img src={item.image} height={"100px"}></img>
              {/* Render additional item details as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
