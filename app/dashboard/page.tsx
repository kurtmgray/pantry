import { fetchRecipes } from "@/lib/fetchRecipes";
import styles from "./Dashboard.module.css";
import SearchableList from "./components/SearchableList";

export default async function Dashboard() {
  const recipeData = fetchRecipes();
  const recipes = await recipeData;
  return (
    <div className={styles.dashboard}>
      <SearchableList initialRecipes={recipes} />
    </div>
  );
}
