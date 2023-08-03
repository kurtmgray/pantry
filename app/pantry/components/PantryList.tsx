"use client";
import React, { useEffect, Dispatch, SetStateAction } from "react";
import PantryItemCard from "./PantryItemCard";
import { useGlobalState } from "@/app/providers";
import { usePantryItems } from "@/lib/usePantryItems";

type Props = {
  listStyles: { [key: string]: string };
};

export default function PantryList({ listStyles }: Props) {
  const { state, setState } = useGlobalState();
  const { pantryItems, isLoading } = usePantryItems(); // fetch pantry items

  useEffect(() => {
    setState((state: GlobalState) => {
      return { ...state, pantry: pantryItems };
    });
  }, [pantryItems, setState]);

  return (
    <div className={listStyles.currentPantry}>
      <h2>Pantry List</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : state.pantry.length === 0 ? (
        <p>No items in the pantry</p>
      ) : (
        <div className={listStyles.pantryItem_container}>
          {[...state.pantry]
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
