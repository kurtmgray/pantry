import { fetchRecipes } from "../services/api/fetchRecipes";
import styles from "./Dashboard.module.css";
import SearchableList from "./components/SearchableList";

export default async function Dashboard() {
  const recipeData = fetchRecipes();
  // const pantryItemsData = fetchPantryItems();
  // const [pantryItems, recipes] = await Promise.all([ pantryItemsData, recipeData ]);
  const recipes = await recipeData;
  return (
    <div className={styles.dashboard}>
      <SearchableList initialRecipes={recipes} />
    </div>
  );
}
