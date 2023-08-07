export const getIngredientToAdd = async (
    ingredientName: string,
    ingredientBrand: string
  ) => {
    const url = "/api/ingredients/";
    const params = `?ingr=${ingredientName}${
      ingredientBrand !== "" ? `&brand=${ingredientBrand}` : ""
    }`;
    console.log("params: ", params);
    try {
      const response = await fetch(url + params, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        const ingredientsWithImg: EdamamIngredient[] = data.hints.filter(
          (ingr: EdamamIngredient) => ingr.food.image
        );
        return ingredientsWithImg.length > 0 ?
          // display first 5 ingredients with images
          (ingredientsWithImg.slice(0, 5)): []
      }
    } catch (error) {
      console.error("Error fetching ingredient: ", error);
    }
  };