"use client";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import RecipeSearch from "./components/RecipeSearch";
import { pantryIngredients } from "@/config/mockUserData";
import { menuOptions } from "@/config/menuOptions";
import { useEffect, useState } from "react";
import { fetchPantryItems } from "@/lib/getPantryItems";

type Ingredient = {
  id: number;
  name: string;
};
type Props = {
  ingredients: PantryItem[];
};

export default function Recipes() {
  // {ingredients}:Props
  // const session = await getServerSession(authOptions);
  // const ingredients = pantryIngredients; // placeholder
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);
  // if (!session) {
  //   redirect("/quickrecipe");
  // }
  useEffect(() => {
    const updatePantryItems: PantryItemsCallback = (data) => {
      console.log("data from Update: ", data);
      setPantryItems(data);
    };
    fetchPantryItems(updatePantryItems);
  }, []);
  // useEffect(() => {
  //   console.log(pantryItems);
  // }, [pantryItems]);

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
