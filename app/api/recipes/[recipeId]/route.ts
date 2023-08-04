import { NextRequest, NextResponse } from "next/server";
import { getRecipeById, prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const id = request.url.slice(request.url.lastIndexOf("/") + 1);
  console.log("recipeId",id)
  if (id) { 
    try {
      const recipe = await getRecipeById(parseInt(id));
      return NextResponse.json(recipe);
    } catch (err) {
      console.error(err);
      return NextResponse.error();
    } finally {
      prisma.$disconnect();
      console.log("Disconnected from Prisma.")
    }
  } else {
    console.error("No recipe ID provided.");
  }
}
