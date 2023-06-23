import AddIngredientForm from "./components/AddIngredientForm";
import CurrentPantry from "./components/CurrentPantry";
export default function Pantry() {
  return (
    <div>
      <AddIngredientForm />
      <CurrentPantry />
      Page where users can view, add, edit, and delete ingredients in their
      pantry. Includes options to add ingredients manually or by scanning
      barcodes or using image recognition
    </div>
  );
}
