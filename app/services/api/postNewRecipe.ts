export const postNewRecipe = async (recipeData: RecipeGPT | RecipeDB) => {
try {
      const response = await fetch(`/api/recipes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      });

      console.log(response);
      if (response.ok) {
        const data = await response.json();
        console.log("Recipe saved: ", data);
        return data;
        // logic or feedback after success
      } else {
        console.error("Error saving recipe:", response.statusText);
        throw new Error(response.statusText)        // error handling
      }
    } catch (error) {
      console.error("Error saving recipe:", error);
      throw new Error("Error saving recipe, check server logs.");
      // additional error handling
    }
}