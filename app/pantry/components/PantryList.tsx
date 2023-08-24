"use client";
import React, { useEffect } from "react";
import PantryItemCard from "./PantryItemCard";
import { useGlobalState } from "@/app/providers";

type Props = {
  listStyles: { [key: string]: string };
  initialPantry: PantryItem[];
};

export default function PantryList({ listStyles, initialPantry }: Props) {
  const {
    state: { pantry },
    setState,
  } = useGlobalState();

  useEffect(() => {
    setState((state: GlobalState) => {
      return { ...state, pantry: initialPantry };
    });
  }, [initialPantry, setState]);

  return (
    <div className={listStyles.currentPantry}>
      <h2>Pantry List</h2>
      {pantry.length === 0 ? (
        <p>No items in the pantry</p>
      ) : (
        <div className={listStyles.pantryItem_container}>
          {[...pantry]
            .sort((a, b) => a.label.localeCompare(b.label))
            .map((item) => (
              <PantryItemCard
                key={item.id}
                itemStyles={listStyles}
                pantryItem={item}
              />
            ))}
        </div>
      )}
    </div>
  );
}
