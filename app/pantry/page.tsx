import { fetchPantryItems } from "@/lib/fetchPantryItems";
import styles from "./Pantry.module.css";
import AddIngredientForm from "./components/AddIngredientForm";
import PantryList from "./components/PantryList";

export default async function Pantry() {
  const pantryData = fetchPantryItems();
  const pantry = await pantryData;

  return (
    <div className={styles.pantryPage}>
      <AddIngredientForm formStyles={styles} />
      <PantryList initialPantry={pantry} listStyles={styles} />
    </div>
  );
}
