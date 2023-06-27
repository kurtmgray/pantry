import styles from "./Pantry.module.css";
import AddIngredientForm from "./components/AddIngredientForm";
import PantryList from "./components/PantryList";
export default function Pantry() {
  return (
    <div className={styles.pantryPage}>
      <AddIngredientForm formStyles={styles} />
      <PantryList listStyles={styles} />
    </div>
  );
}
