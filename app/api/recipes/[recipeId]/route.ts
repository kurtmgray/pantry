import { NextRequest, NextResponse } from "next/server";
import { getRecipeById, prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const id = request.url.slice(request.url.lastIndexOf("/") + 1);

  if (id) { 
    try {
      const recipe = await getRecipeById(parseInt(id));
      return NextResponse.json(recipe);
    } catch (error) {
      console.error("Error getting recipe:", error);
      return NextResponse.json({ error:  "Error getting recipe."}, { status: 500 });
    } finally {
      prisma.$disconnect();
    }
  } else {
    return NextResponse.json({ error: 'Bad request: No recipe id.' }, { status: 400 });
  }
}
