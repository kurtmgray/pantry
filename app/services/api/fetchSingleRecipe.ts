import { NextResponse } from "next/server";

export const fetchSingleRecipe = async (id: string) => {
    try {
        const url = new URL(`/api/recipes/${id}`, process.env.NEXT_PUBLIC_API_ORIGIN);
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
};
  