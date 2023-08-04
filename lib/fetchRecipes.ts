import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { CustomSession } from "./types";

export const fetchRecipes = async () => {
    const session: CustomSession | null = await getServerSession(authOptions);
    const id = session?.user?.id;
    if (id) {
        try {
            const url = new URL("/api/recipes", process.env.NEXT_PUBLIC_API_ORIGIN);
            url.searchParams.set("id", id);
            const response = await fetch(url, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
                cache: "force-cache",
              });
    
          if (response.ok) {
            const data = await response.json();
            return data;
          } else {
            console.error("Failed to fetch recipes: ", response);
          }
        } catch (error) {
          console.error("Error fetching recipes:", error);
        }
    } else {
        console.error("No email found in session"); 
        return NextResponse.error();
    }
  };
  