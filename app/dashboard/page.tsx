"use client";

import DashRecipeCard from "./components/DashRecipeCard";
import DashSearchBar from "../components/SearchBar";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
type Props = {
  searchParams: { [key: string]: string[] | string | undefined };
};

export default function Dashboard({ searchParams }: Props) {
  const { status, data } = useSession();
  const [recipes, setRecipes] = useState<(RecipeDB | RecipeGPT)[]>([]);

  useEffect(() => {
    const getRecipes = async () => {
      if (status === "authenticated" && data?.user?.email) {
        const email = data.user?.email;

        const url = new URL("/api/recipes", process.env.NEXT_PUBLIC_API_ORIGIN);
        url.searchParams.set("email", email);

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "force-cache",
        });
        const recipes: (RecipeDB | RecipeGPT)[] = await response.json();
        setRecipes(recipes);
      }
    };
    getRecipes();
  }, [status, data]);
  const searchKeyword = searchParams.searchKeyword?.toString() || "";

  const filteredRecipes = recipes.filter((recipe) => {
    const { category, summary, title } = recipe;
    const lowerKeyword =
      typeof searchKeyword === "string" ? searchKeyword.toLowerCase() : "";
    return (
      category.toLowerCase().includes(lowerKeyword) ||
      summary.toLowerCase().includes(lowerKeyword) ||
      title.toLowerCase().includes(lowerKeyword)
    );
  });

  return (
    <div className="dashboard">
      <DashSearchBar />

      {filteredRecipes.length > 0 ? (
        filteredRecipes.map((recipe) => (
          <DashRecipeCard key={recipe.id} recipe={recipe} />
        ))
      ) : (
        <p>No recipes found.</p>
      )}
    </div>
  );
}
