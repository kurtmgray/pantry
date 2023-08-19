export const getIngredientToAdd = async (
    ingredientName: string,
    ingredientBrand: string
  ) => {
    const url = "/api/ingredients/";
    const params = `?ingr=${ingredientName}${
      ingredientBrand !== "" ? `&brand=${ingredientBrand}` : ""
    }`;
    try {
      const response = await fetch(url + params, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        const ingredientsWithImg: EdamamIngredient[] = data.hints.filter(
          (ingr: EdamamIngredient) => ingr.food.image
        );
        const firstFiveIngredientsWithImg: EdamamIngredient[] = ingredientsWithImg.slice(0, 5);
        if (firstFiveIngredientsWithImg.length > 4) {
          return ingredientsWithImg.slice(0, 5)
        } else {
          return ingredientsWithImg;
        }
      } else {
        console.error("Error fetching ingredient: ", response);
      }
    } catch (error) {
      console.error("Error fetching ingredient: ", error);
    }
  };