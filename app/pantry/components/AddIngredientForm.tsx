"use client";
import { useState, MouseEvent, ChangeEvent, FormEvent } from "react";
import { useGlobalState } from "@/app/providers";
import { getIngredientToAdd } from "@/lib/getIngredientToAdd";
import { postNewPantryItem } from "@/lib/postNewPantryItem";
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
    setIsLoading(true);
    console.log("Looking for ingredient:", ingredientSearch);

    const ingredient = await getIngredientToAdd(
      ingredientSearch.name,
      ingredientSearch.brand
    );
    ingredient && setIngredientsFromEdamam(ingredient);

    setIngredientSearch({
      name: "",
      brand: "",
    });
    setIsLoading(false);
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
