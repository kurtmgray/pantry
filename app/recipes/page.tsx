"use client";

import RecipeSearch from "./components/RecipeSearch";
import { menuOptions } from "@/config/menuOptions";
import { useEffect, useState } from "react";
import { fetchPantryItems } from "@/lib/fetchPantryItems";

export default function Recipes() {
  // TODO: make a server component or break up RecipeSearch and lift?
  // read up on de-duping, caching

  const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);

  useEffect(() => {
    const updatePantryItems = (data: PantryItem[]) => {
      console.log("data from Update: ", data);
      setPantryItems(data);
    };

    // TODO unify approach for fetching
    // see Dashboard/page.tsx
    fetchPantryItems(updatePantryItems);
  }, []);

  return (
    <div>
      <RecipeSearch ingredients={pantryItems} options={menuOptions} />
    </div>
  );
}
