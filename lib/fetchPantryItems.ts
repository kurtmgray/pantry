import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { CustomSession } from "./types";

export const fetchPantryItems = async () => {
  const session: CustomSession | null = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (userId) {
    try {
      const url = new URL("/api/pantry", process.env.NEXT_PUBLIC_API_ORIGIN);
      url.searchParams.set("id", userId);
  
      const response = await fetch(url,{
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
        throw new Error();
      }
    } catch (error) {
      console.error("Error fetching pantry items:", error);
    }

  } else {
    console.error("No userId found in session");
    return NextResponse.error();  
  }
  
} 
