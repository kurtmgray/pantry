import {
  useState,
  MouseEvent,
  ChangeEvent,
  FormEvent,
  useEffect,
  SetStateAction,
} from "react";
import getIngredientsByCategory from "@/lib/getIngredientsByCategory";
import { categories } from "@/lib/getIngredientsByCategory";
import IngredientCard from "./IngredientCard";

type FormComponentProps = {
  formStyles: { [key: string]: string };
  addPantryItem: (ingredientsFromEdamam: EdamamIngredient[]) => void;
};

export default function AddIngredientForm({
  formStyles,
  addPantryItem,
}: FormComponentProps) {
  const [ingredient, setIngredient] = useState({
    category: "",
    name: "",
  });
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [ingredientsFromEdamam, setIngredientsFromEdamam] = useState<
    EdamamIngredient[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(ingredient);
  }, [ingredient]);

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    setIngredient((prevIngredient) => ({
      ...prevIngredient,
      category: selectedCategory,
    }));
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // TODO: Handle saving the ingredient to the database
    setIsLoading(true);
    console.log("Looking for ingredient:", ingredient);
    const getIngredientToAdd = async (ingredientName: string) => {
      try {
        const response = await fetch(
          `/api/ingredients/?ingr=${ingredientName}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log(response);
        if (response.ok) {
          const data = await response.json();
          console.log(data.parsed);
          setIngredientsFromEdamam(data.parsed);
        }
      } catch (error) {
        console.error("Error fetching ingredient: ", error);
      }
    };
    await getIngredientToAdd(ingredient.name);
    setIngredient({
      category: "",
      name: "",
    });
    setIsLoading(false);
  };

  const handleCreatePantryItem = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addPantryItem(ingredientsFromEdamam);
    setIngredientsFromEdamam([]);
  };

  const hasEmptyValues = Object.values(ingredient).some(
    (value) => value === ""
  );

  return (
    <div>
      {isLoading ? (
        <h1 className={formStyles.loading}> Loading... </h1>
      ) : (
        <form className={formStyles.form} onSubmit={handleSubmit}>
          <h1>Add an ingredient:</h1>
          <div className={formStyles.group}>
            <label className={formStyles.label} htmlFor="category">
              Category:
            </label>
            <select
              className={formStyles.select}
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
          </div>
          {ingredient.category != "" && (
            <div className={formStyles.group}>
              <label className={formStyles.label} htmlFor="ingredient">
                Ingredient:
              </label>
              <select
                className={formStyles.select}
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
          <button
            className={formStyles.button}
            type="submit"
            disabled={hasEmptyValues}
          >
            Find Ingredient
          </button>
        </form>
      )}

      {ingredientsFromEdamam &&
        ingredientsFromEdamam.map((ingredient, idx) => (
          <IngredientCard
            key={idx}
            ingredient={ingredient}
            onCreatePantryItem={handleCreatePantryItem}
          />
        ))}
    </div>
  );
}
