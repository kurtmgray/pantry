"use client";
import { useState, MouseEvent, ChangeEvent, FormEvent } from "react";
import { useGlobalState } from "@/app/providers";
import IngredientCard from "./IngredientCard";

type Props = {
  formStyles: { [key: string]: string };
};

export default function AddIngredientForm({ formStyles }: Props) {
  const { setState } = useGlobalState();

  const [ingredientSearch, setIngredientSearch] = useState({
    name: "",
    brand: "",
  });
  const [ingredientsFromEdamam, setIngredientsFromEdamam] = useState<
    EdamamIngredient[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const addPantryItem = async (ingredientFromEdamam: EdamamIngredient) => {
    const response = await fetch(`/api/ingredients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ingredientFromEdamam),
    });
    const addedItem = await response.json();
    setState((state: GlobalState) => {
      return { ...state, pantry: [...state.pantry, addedItem] };
    });
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setIngredientSearch((prevIngredient) => ({
      ...prevIngredient,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Looking for ingredient:", ingredientSearch);
    const getIngredientToAdd = async (
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
          ingredientsWithImg.length > 0 &&
            setIngredientsFromEdamam(ingredientsWithImg.slice(0, 5));
        }
      } catch (error) {
        console.error("Error fetching ingredient: ", error);
      }
    };
    await getIngredientToAdd(ingredientSearch.name, ingredientSearch.brand);
    setIngredientSearch({
      name: "",
      brand: "",
    });
    setIsLoading(false);
  };

  const handleCreatePantryItem = async (ingredient: EdamamIngredient) => {
    addPantryItem(ingredient);
    setIngredientsFromEdamam([]);
  };

  return (
    <div>
      <h1>Search for food items:</h1>
      <div className={formStyles.searchBar}>
        {isLoading ? (
          <h1 className={formStyles.loading}> Loading... </h1>
        ) : (
          <form className={formStyles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Food"
              value={ingredientSearch.name}
              onChange={(e) => handleInputChange(e)}
            />
            <input
              type="text"
              name="brand"
              placeholder="Brand"
              value={ingredientSearch.brand}
              onChange={(e) => handleInputChange(e)}
            />
            <button type="submit">Submit</button>
          </form>
        )}
        {ingredientsFromEdamam.length > 0 && (
          <button onClick={() => setIngredientsFromEdamam([])}>
            Clear Search Results
          </button>
        )}
      </div>
      <div className={formStyles.ingredients}>
        {ingredientsFromEdamam &&
          ingredientsFromEdamam.map((ingredient, idx) => (
            <IngredientCard
              key={idx}
              ingredient={ingredient}
              onCreatePantryItem={handleCreatePantryItem}
            />
          ))}
      </div>
    </div>
  );
}
