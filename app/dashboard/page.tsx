"use client";
// import RecipeCard from "../components/RecipeCard";
import RecipeSummary from "./components/RecipeSummary";
import { useState, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { AppContext } from "../providers";

export default function Dashboard() {
  // const [userRecipes, setUserRecipes] = useState<ParsedRecipe[]>([]);
  const [globalState, setGlobalState] = useContext(AppContext);
  const { data: session, status } = useSession();
  const email = session?.user?.email;

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    const getRecipes = async (e: string) => {
      const response = await fetch(`/api/recipes?email=${e}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);
      if (response.ok) {
        const recipes: ParsedRecipe[] = await response.json();
        setGlobalState({
          ...globalState,
          recipes: recipes,
        });
      }
    };
    if (email) {
      getRecipes(email);
    }
  }, [email, status]);

  if (!email) return <div>No user, should implement redirect.</div>;

  return (
    <div>
      <h3>
        {status === "loading"
          ? "loading..."
          : `This is the dashboard and the user is ${session?.user?.name}`}
      </h3>
      <p>Here's a recipe title:</p>
      {globalState.recipes.length > 0 &&
        globalState.recipes.map((recipe) => (
          <Link href={`/recipes/${recipe.id}`} key={recipe.id}>
            <RecipeSummary key={recipe.id} recipe={recipe} />
            {/* <RecipeCard key={recipe.id} recipe={recipe} /> */}
          </Link>
        ))}

      <h3>
        Main page after logging in, displaying a summary of the user&apos;s
        pantry, favorite recipes, and meal planner
      </h3>
    </div>
  );
}
//
