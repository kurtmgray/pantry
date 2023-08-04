"use client";

import DashRecipeCard from "@/app/dashboard/components/DashRecipeCard";
import LocalSearchBar from "@/app/components/LocalSearchBar";
import { useState } from "react";

import React from "react";

type Props = {
  recipes: RecipeDB[];
};

export default function SearchableList({ recipes }: Props) {
  const [keyword, setKeyword] = useState("");

  const handleInputChange = (newKeyword: string) => {
    setKeyword(newKeyword);
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const { category, summary, title } = recipe;
    const lowerKeyword = keyword.toLowerCase();

    return (
      category.toLowerCase().includes(lowerKeyword) ||
      summary.toLowerCase().includes(lowerKeyword) ||
      title.toLowerCase().includes(lowerKeyword)
    );
  });

  return (
    <div>
      <LocalSearchBar searchArea="recipes" handleChange={handleInputChange} />

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
