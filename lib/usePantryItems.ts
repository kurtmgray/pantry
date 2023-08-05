import { useState, useEffect } from "react";
import { fetchPantryItemsClient } from "./fetchPantryItemsClientSide";
import { useSession } from "next-auth/react";

export function usePantryItems() {
  const [pantryItems, setPantryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const session = useSession();

  useEffect(() => {    
    const fetchItems = async () => {
      if (session) {
        console.log()
        try {
          // TODO: figure out this id issue
          const userId = session?.data?.user?.id;
          const data = await fetchPantryItemsClient(userId);
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
  }, [session]);

  return { pantryItems, isLoading, error };
}

