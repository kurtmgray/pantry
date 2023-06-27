import styles from "./Pantry.module.css";

import AddIngredientForm from "./components/AddIngredientForm";
import CurrentPantry from "./components/CurrentPantry";
export default function Pantry() {
  return (
    <div className={styles.pantryPage}>
      <AddIngredientForm formStyles={styles} />
      <CurrentPantry />
    </div>
  );
}
