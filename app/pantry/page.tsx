import PantrySearch from "./components/PantrySearch";
import { pantryIngredients } from "@/config/mockUserData";
import { menuOptions } from "@/config/menuOptions";

export default function page() {
  return (
    <div>
      <PantrySearch ingredients={pantryIngredients} options={menuOptions} />
    </div>
  );
}
