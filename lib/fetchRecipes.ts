export const fetchRecipes = async () => {
    try {
      const response = await fetch("/api/recipes");
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Failed to fetch recipes: ", response);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };
  