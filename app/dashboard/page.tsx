"use client";
import DashRecipeCard from "./components/DashRecipeCard";
import { useEffect, useContext } from "react";
import { AppContext } from "../providers";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const [globalState, setGlobalState] = useContext(AppContext);

  // choose how to get session
  const { data: session, status } = useSession();

  useEffect(() => {
    const email = session?.user?.email;

    if (status === "loading") {
      return;
    }

    const getRecipes = async () => {
      const response = await fetch(`/api/recipes?email=${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);
      if (response.ok) {
        const recipes: RecipeDB[] = await response.json();
        setGlobalState({
          ...globalState,
          recipes: recipes,
        });
      }
    };
    if (email) {
      getRecipes();
    }
  }, [status]);

  return (
    <div className="dashboard">
      {globalState.recipes.length > 0 &&
        globalState.recipes.map((recipe) => (
          <DashRecipeCard key={recipe.id} recipe={recipe} />
        ))}
    </div>
  );
}
//
