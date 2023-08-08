export const postNewPantryItem = async (ingredientFromEdamam: EdamamIngredient) => {
    try {
      const response = await fetch(`/api/pantry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ingredientFromEdamam),
      });
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error("Error adding ingredient to pantry");
      }
    } catch (error) {
      console.error(error);
    }
  };