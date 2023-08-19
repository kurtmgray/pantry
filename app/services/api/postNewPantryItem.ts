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
      } else if (response.status === 401) {
        throw new Error("Unauthorized. Please log in.");
      } else if (response.status === 400) {
        throw new Error("Bad Request. Please check your input.");
      } else if (response.status === 500) {
        throw new Error("Internal Server Error. Try again later.");
      } else {
        throw new Error("Error adding ingredient to pantry");
      }
    } catch (error) {
      console.error(error);
      throw error
    }
  };