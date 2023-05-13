"use client";
import { useSession } from "next-auth/react";
// import { authOptions } from "../api/auth/[...nextauth]/route";
// import { redirect } from "next/navigation";
import { getRecipesAddedByUser } from "@/lib/getRecipesAddedByUser";
// import { useEffect } from "react";
// import { Session, getServerSession } from "next-auth";
import { useEffect, useState } from "react";
import { Recipe } from "@/lib/mockData";

// interface CustomSession extends Session {
//   user?: {
//     name?: string | null;
//     email?: string | null;
//     image?: string | null;
//     id?: string;
//   };
//   expires: string;
// }

export default function Dashboard() {
  const [usersRecipes, setUsersRecipes] = useState<Recipe[] | []>([]);
  const { data } = useSession();
  const { id } = data?.user;

  useEffect(() => {
    const fetchRecipes = async () => {
      const recipes = await getRecipesAddedByUser(id);
      if (recipes.length > 0) {
        setUsersRecipes(recipes);
      }
    };
    fetchRecipes();
  }, [id]);

  return (
    <div>
      {usersRecipes && usersRecipes.map((recipe) => <div>{recipe.title}</div>)}
      <pre>{JSON.stringify(data?.user, null, 4)}</pre>
      {/* <h3>This is the dashboard and the user is {session.user?.name}</h3> */}
      <h3>
        Main page after logging in, displaying a summary of the user&apos;s
        pantry, favorite recipes, and meal planner
      </h3>
    </div>
  );
}
