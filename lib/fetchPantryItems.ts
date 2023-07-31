export const fetchPantryItems = async (callback: PantryItemsCallback) => {
  try {
    const response = await fetch("/api/pantry");
    if (response.ok) {
      const data = await response.json();
      
      //TODO: unify this approach
      callback(data);
    } else {
      throw new Error("Failed to fetch pantry items");
    }
  } catch (error) {
    console.error("Error fetching pantry items:", error);
    callback([]);
  }
};
