"use client";
import { useState, MouseEvent, ChangeEvent, FormEvent, useEffect } from "react";
import getIngredientsByCategory from "@/lib/getIngredientsByCategory";
import { categories } from "@/lib/getIngredientsByCategory";
import IngredientCard from "./IngredientCard";

export default function AddIngredientForm() {
  const [ingredient, setIngredient] = useState({
    category: "",
    name: "",
    quantity: "",
    unit: "",
  });
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [ingredientsFromEdamam, setIngredientsFromEdamam] = useState<
    EdamamIngredient[]
  >([]);

  useEffect(() => {
    console.log(ingredient);
  }, [ingredient]);

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    setIngredient((prevIngredient) => ({
      ...prevIngredient,
      category: selectedCategory,
    }));
    // TODO: Fetch ingredients based on the selected category from the database
    // simulate the data for each category
    const categoryIngredients = getIngredientsByCategory(selectedCategory);
    setIngredients(categoryIngredients);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setIngredient((prevIngredient) => ({
      ...prevIngredient,
      [name]: value,
    }));
  };

  const handleIngredientChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedIngredient = e.target.value;
    // TODO: Handle selected ingredient
    console.log("Selected Ingredient:", selectedIngredient);
    setIngredient((prevIngredient) => ({
      ...prevIngredient,
      name: selectedIngredient,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: Handle saving the ingredient to the database
    console.log("Saving ingredient:", ingredient);
    const getIngredientToAdd = async (ingredientName: string) => {
      const response = await fetch(`/api/ingredients/?ingr=${ingredientName}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        console.log(data.parsed);
        setIngredientsFromEdamam(data.parsed);
      }
    };
    getIngredientToAdd(ingredient.name);
    // Reset the form
    setIngredient({
      category: "",
      name: "",
      quantity: "",
      unit: "",
    });
  };

  const handleCreatePantryItem = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await fetch(`/api/ingredients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ingredientsFromEdamam),
    });
    console.log(response);
    setIngredientsFromEdamam([]);
  };

  const hasEmptyValues = Object.values(ingredient).some(
    (value) => value === ""
  );

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          name="category"
          value={ingredient.category}
          onChange={handleCategoryChange}
        >
          <option value="">-- Select Category --</option>

          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {ingredient.category != "" && (
          <div>
            <label htmlFor="ingredient">Ingredient:</label>
            <select
              id="ingredient"
              name="ingredient"
              onChange={handleIngredientChange}
            >
              <option value="">-- Select Ingredient --</option>
              {ingredients.map((ingredient) => (
                <option key={ingredient} value={ingredient}>
                  {ingredient}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      {ingredient.name.length > 0 && (
        <>
          <div>
            <label htmlFor="quantity">Quantity:</label>
            <select
              id="quantity"
              name="quantity"
              value={ingredient.quantity}
              onChange={handleInputChange}
            >
              <option value="">-- Select Quantity --</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div>
            <label htmlFor="unit">Unit:</label>
            <select
              id="unit"
              name="unit"
              value={ingredient.unit}
              onChange={handleInputChange}
            >
              <option value="">-- Select Unit --</option>
              <option value="grams">grams</option>
              <option value="cups">cups</option>
              <option value="teaspoons">teaspoons</option>
              {/* Add more options as needed */}
            </select>
          </div>
        </>
      )}
      <button type="submit" disabled={hasEmptyValues}>
        Find Ingredient
      </button>

      {ingredientsFromEdamam &&
        ingredientsFromEdamam.map((ingredient, idx) => (
          <IngredientCard
            key={idx}
            ingredient={ingredient}
            onCreatePantryItem={handleCreatePantryItem}
          />
        ))}
    </form>
  );
}
