import { useState, useEffect } from "react";
import { fetchRecipes } from "@/lib/fetchRecipes";

export function useRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRecipes().then(data => {
      setRecipes(data);
      setIsLoading(false);
    }).catch(error => {
      console.error("Failed to fetch pantry items from hook:", error);
      setIsLoading(false);
    });
  }, []);

  return { recipes, isLoading };
}

//TODO: implement use in /recipes
