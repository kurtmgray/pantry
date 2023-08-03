import styles from "./Dashboard.module.css";
import SearchableList from "./components/SearchableList";
import { fetchRecipes } from "@/lib/fetchRecipes";

export default async function Dashboard() {
  const recipeData = fetchRecipes();
  const recipes = await recipeData;

  return (
    <div className={styles.dashboard}>
      <SearchableList recipes={recipes} />
    </div>
  );
}
