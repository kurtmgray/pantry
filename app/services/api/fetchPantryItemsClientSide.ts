
export const fetchPantryItemsClient = async (clientUserId: string) => {
  
  // user is verified through client-side session and passed in as clientUserId
  
  try {
    const url = new URL("/api/pantry", process.env.NEXT_PUBLIC_API_ORIGIN);
    url.searchParams.set("id", clientUserId);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "force-cache",
    });
    console.log("response", response);

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
}
