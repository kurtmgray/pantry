"use client";
import DashRecipeCard from "./components/DashRecipeCard";
import { useEffect, useContext, useState, ChangeEvent } from "react";
import { AppContext } from "../providers";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const [globalState, setGlobalState] = useContext(AppContext);
  const [searchKeyword, setSearchKeyword] = useState("");

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

  const filteredRecipes = globalState.recipes.filter((recipe) => {
    const { category, summary, title } = recipe;
    const lowerKeyword = searchKeyword.toLowerCase();
    return (
      category.toLowerCase().includes(lowerKeyword) ||
      summary.toLowerCase().includes(lowerKeyword) ||
      title.toLowerCase().includes(lowerKeyword)
    );
  });

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  return (
    <div className="dashboard">
      <div className="search-bar-container">
        <h1>Dashboard</h1>
        <input
          className="dashboard__search-bar"
          type="text"
          value={searchKeyword}
          onChange={handleSearchChange}
          placeholder="Search recipes..."
        />
      </div>
      {filteredRecipes.length > 0 ? (
        filteredRecipes.map((recipe) => (
          <DashRecipeCard key={recipe.id} recipe={recipe} />
        ))
      ) : (
        <p>No recipes found.</p>
      )}
    </div>
  );
}
//
