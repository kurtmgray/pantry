import RecipeSearch from "./components/RecipeSearch";
import { menuOptions } from "@/config/menuOptions";

export default function Recipes() {
  return (
    <div>
      <RecipeSearch options={menuOptions} />
    </div>
  );
}
