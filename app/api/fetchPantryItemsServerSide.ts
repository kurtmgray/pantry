import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { CustomSession } from "@/lib/types";

export const fetchPantryItemsServer = async () => {
  
  // user is verified through session
  
  const session: CustomSession | null = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (userId) {
    try {
      const url = new URL("/api/pantry", process.env.NEXT_PUBLIC_API_ORIGIN);
      url.searchParams.set("id", userId);

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
        console.log("Error fetching pantry items");
        throw new Error("Error fetching pantry items");
      }
    } catch (error) {
      console.error("Error fetching pantry items:", error);
      throw error;
    }
  } else {
    throw new Error("No user id.");
  }
}
