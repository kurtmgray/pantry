import RecipeSearch from "./components/RecipeSearch";
import { menuOptions } from "@/config/menuOptions";
import styles from "./Recipes.module.css";

export default function Recipes() {
  return (
    <div className={styles.page}>
      <RecipeSearch options={menuOptions} />
    </div>
  );
}
