"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { useGlobalState } from "@/app/providers";
import { getIngredientToAdd } from "@/app/services/api//getIngredientToAdd";
import { postNewPantryItem } from "@/app/services/api/postNewPantryItem";
import IngredientCard from "./IngredientCard";
import { Spin } from "antd";

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
  const [isFetching, setIsFetching] = useState(false);
  const [displayNotFound, setDisplayNotFound] = useState(false);

  const handleAddPantryItem = async (
    ingredientFromEdamam: EdamamIngredient
  ) => {
    const addedItem = await postNewPantryItem(ingredientFromEdamam);

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
    setIsFetching(true);
    console.log("Looking for ingredient:", ingredientSearch);

    const ingredients = await getIngredientToAdd(
      ingredientSearch.name,
      ingredientSearch.brand
    );
    if (ingredients && ingredients.length > 0) {
      setIngredientsFromEdamam(ingredients);
      console.log("Ingredients from Edamam:", ingredients);
    } else {
      setDisplayNotFound(true);
      setTimeout(() => {
        setDisplayNotFound(false);
      }, 5000);
    }

    setIngredientSearch({
      name: "",
      brand: "",
    });
    setIsFetching(false);
  };

  const handleCreatePantryItem = async (ingredient: EdamamIngredient) => {
    console.log(ingredient);
    handleAddPantryItem(ingredient);
    setIngredientsFromEdamam([]);
  };

  return (
    <div>
      <h1>Search for food items:</h1>
      <div className={formStyles.searchBar}>
        {isFetching ? (
          <h1 className={formStyles.loading}> Loading... {<Spin />}</h1>
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
        {displayNotFound && (
          <p className={formStyles.notAvailable}>Ingredient not available.</p>
        )}
        {ingredientsFromEdamam.length > 0 &&
          !displayNotFound &&
          !isFetching && (
            <button onClick={() => setIngredientsFromEdamam([])}>
              Clear Search Results
            </button>
          )}
      </div>
      <div className={formStyles.ingredients}>
        {ingredientsFromEdamam.length > 0 &&
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

// TODO: working on ingredient not available message
