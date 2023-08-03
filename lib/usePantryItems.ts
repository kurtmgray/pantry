import { useState, useEffect } from "react";
import { fetchPantryItems } from "@/lib/fetchPantryItems";

export function usePantryItems() {
  const [pantryItems, setPantryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPantryItems().then(data => {
      setPantryItems(data);
      setIsLoading(false);
    }).catch(error => {
      console.error("Failed to fetch pantry items from hook:", error);
      setIsLoading(false);
    });
  }, []);

  return { pantryItems, isLoading };
}

//TODO: do this in recipes, too
