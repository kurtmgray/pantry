import { useState, useEffect } from "react";
import { fetchPantryItemsClientSide } from "../services/api/fetchPantryItemsClientSide";
import { useSession } from "next-auth/react";

export function usePantryItems() {
  const [pantryItems, setPantryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const session = useSession();

  useEffect(() => {    
    const fetchItems = async () => {
      if (session.status === "authenticated") {
        try {
          // hacky but works for now
          const userId = (session.data.user as { id: string }).id;
          const data = await fetchPantryItemsClientSide(userId);
          setPantryItems(data);
          setIsLoading(false);
        } catch (error: any) {
          console.error("Failed to fetch pantry items from hook:", error);
          setError(error);
          setIsLoading(false);
        }

      }
    };
    fetchItems();
  }, [session.status]);

  return { pantryItems, isLoading, error };
}

