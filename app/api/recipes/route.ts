import { NextRequest, NextResponse } from "next/server";
import { getRecipesById, postNewRecipe, prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { CustomSession } from "@/lib/types";

export async function POST(request: NextRequest) {
  const recipe: RecipeDB = await request.json();
  try {
    const newRecipe = await postNewRecipe(recipe);  
    console.log(`Created recipe with ID: ${newRecipe.id}`);
    return NextResponse.json(newRecipe);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  } finally {
    await prisma.$disconnect();
    console.log("Disconnected from Prisma.");
  }
}

export async function GET(request: NextRequest) {
  const session: CustomSession | null = await getServerSession(authOptions);

  if (session) {
    try {
      const userId = parseInt(session.user.id);
      const recipes = await getRecipesById(userId);
      return NextResponse.json(recipes);
    } catch (error) {
      return NextResponse.error();
    } finally {
      await prisma.$disconnect();
      console.log("Disconnected from Prisma.");
    }
  } else {
    return new Response(null, { status: 401, statusText: "Unauthorized" });
  }
}
