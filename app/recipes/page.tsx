"use client";

import RecipeSearch from "./components/RecipeSearch";
import { menuOptions } from "@/config/menuOptions";
import { useEffect, useState } from "react";
import { fetchPantryItems } from "@/lib/getPantryItems";

export default function Recipes() {
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);

  useEffect(() => {
    const updatePantryItems = (data: PantryItem[]) => {
      console.log("data from Update: ", data);
      setPantryItems(data);
    };
    fetchPantryItems(updatePantryItems);
  }, []);

  return (
    <div>
      <div>
        <RecipeSearch ingredients={pantryItems} options={menuOptions} />
      </div>
      {/* <Link href={`/recipes/${sampleRecipe.id}`}>
        Testing route: click for the {sampleRecipe.name} recipe.
      </Link> */}
      <h3>
        Page where users can search for recipes based on specific criteria such
        as required or excluded ingredients, allergies, dietary preferences, and
        cuisine styles. Users can save their favorite recipes to a list and view
        recipe details including ingredients, instructions, and a brief summary.
      </h3>
    </div>
  );
}
//working here
// export const getStaticProps = async () => {
//   const res = await fetch("http://localhost:3000/api/ingredientsList");
//   const ingredients = await res.json();
//   return { props: { ingredients } };
// };
