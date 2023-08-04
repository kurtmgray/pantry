import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export const fetchPantryItems = async () => {

  try {
    const url = new URL("/api/pantry", process.env.NEXT_PUBLIC_API_ORIGIN);
    // url.searchParams.set("id", id);

    const response = await fetch(url,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "force-cache",
    });
    console.log("response", response);  
    if (response.ok) {
      const data = await response.json();
      
      //TODO: unify this approach
      return data;
    } else {
      throw new Error("Failed to fetch pantry items");
    }
  } catch (error) {
    console.error("Error fetching pantry items:", error);
  }
} 
// else {
//   console.error("No email found in session");
//   return NextResponse.error();  
// }
// };
