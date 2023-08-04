import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export const fetchRecipes = async () => {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if (email) {
        try {
            const url = new URL("/api/recipes", process.env.NEXT_PUBLIC_API_ORIGIN);
            url.searchParams.set("email", email);
            const response = await fetch(url, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
                cache: "force-cache",
              });
          console.log(response.status, response.statusText); // Add this line
    
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
  