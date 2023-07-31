"use client";
import React, { useEffect, Dispatch, SetStateAction } from "react";
import { fetchPantryItems } from "@/lib/fetchPantryItems";
import PantryItemCard from "./PantryItemCard";
import { useGlobalState } from "@/app/providers";

type Props = {
  listStyles: { [key: string]: string };
};

export default function PantryList({ listStyles }: Props) {
  const { state, setState } = useGlobalState();

  useEffect(() => {
    const updatePantryItems: PantryItemsCallback = (data) => {
      setState((state: GlobalState) => {
        return { ...state, pantry: data };
      });
    };
    fetchPantryItems(updatePantryItems);
  }, [setState]);

  return (
    <div className={listStyles.currentPantry}>
      <h2>Pantry List</h2>
      {state.pantry.length === 0 ? (
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
                setState={setState}
              />
            ))}
        </div>
      )}
    </div>
  );
}
