"use client";

import DashRecipeCard from "@/app/dashboard/components/DashRecipeCard";
import { useEffect } from "react";
import { useGlobalState } from "@/app/providers";

import React from "react";

type Props = {
  recipes: RecipeDB[];
};

export default function List({ recipes }: Props) {
  const { state, setState } = useGlobalState();

  useEffect(() => {
    setState((state: GlobalState) => ({ ...state, recipes }));
  }, [recipes, setState]);

  const filteredRecipes = recipes.filter((recipe) => {
    const { category, summary, title } = recipe;
    const lowerKeyword = state.searchKeyword.toLowerCase();

    return (
      category.toLowerCase().includes(lowerKeyword) ||
      summary.toLowerCase().includes(lowerKeyword) ||
      title.toLowerCase().includes(lowerKeyword)
    );
  });

  return (
    <div>
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
