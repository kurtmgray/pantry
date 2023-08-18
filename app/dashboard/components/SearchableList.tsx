"use client";

import DashRecipeCard from "@/app/dashboard/components/DashRecipeCard";
import LocalSearchBar from "@/app/components/LocalSearchBar";
import { useState, useEffect } from "react";
import { useGlobalState } from "@/app/providers";
import styles from "@/styles/Dashboard.module.css";

import React from "react";

type Props = {
  initialRecipes: RecipeDB[];
};

export default function SearchableList({ initialRecipes }: Props) {
  const [keyword, setKeyword] = useState("");
  const { state, setState } = useGlobalState();

  useEffect(() => {
    setState((state: GlobalState) => {
      return { ...state, recipes: initialRecipes };
    });
  }, [initialRecipes, setState]);

  const handleInputChange = (newKeyword: string) => {
    setKeyword(newKeyword);
  };

  const filteredRecipes = initialRecipes.filter((recipe) => {
    const { category, summary, title } = recipe;
    const lowerKeyword = keyword.toLowerCase();

    return (
      category.toLowerCase().includes(lowerKeyword) ||
      summary.toLowerCase().includes(lowerKeyword) ||
      title.toLowerCase().includes(lowerKeyword)
    );
  });
  // TODO: working dashboard styles
  return (
    <div className="dash__recipe_card-container">
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
