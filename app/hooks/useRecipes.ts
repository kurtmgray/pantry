import { useState, useEffect } from "react";
import { fetchRecipes } from "@/app/services/api/fetchRecipes";

export function useRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchRecipes().then(data => {
      setRecipes(data);
      setIsLoading(false);
    }).catch(error => {
      console.error("Failed to fetch pantry items from hook:", error);
      setError(error)
      setIsLoading(false);
    });
  }, []);

  return { recipes, isLoading, error };
}

//TODO: implement use in /recipes
