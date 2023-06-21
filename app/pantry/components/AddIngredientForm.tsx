"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import getIngredientsByCategory from "@/lib/getIngredientsByCategory";
import { categories } from "@/lib/getIngredientsByCategory";

export default function AddIngredientForm() {
  const [ingredient, setIngredient] = useState({
    category: "",
    name: "",
    quantity: "",
    unit: "",
  });
  const [ingredients, setIngredients] = useState<string[]>([]);

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
    // Reset the form
    setIngredient({
      category: "",
      name: "",
      quantity: "",
      unit: "",
    });
  };

  const hasEmptyValues = Object.values(ingredients).some(
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
      <button type="submit" disabled={!hasEmptyValues}>
        Add Ingredient
      </button>
    </form>
  );
}
