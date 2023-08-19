import { NextRequest, NextResponse } from "next/server";
import { getRecipesByUserId, postNewRecipe, prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const recipe: RecipeDB = await request.json();
  
  if (recipe) {
    try {
      const newRecipe = await postNewRecipe(recipe);  
      console.log(`Created recipe with ID: ${newRecipe.id}`);
      return NextResponse.json(newRecipe);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error:  "Error saving recipe."}, { status: 500 });
    } finally {
    
      await prisma.$disconnect();
    }
  } else {
    return NextResponse.json({ error: 'Bad request: No recipe.' }, { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("id");
  
  if (userId) {    
    try {
        const recipes = await getRecipesByUserId(parseInt(userId));
        return NextResponse.json(recipes);
      } catch (error) {
        return NextResponse.json({ error:  "Error getting recipes."}, { status: 500 })
      } finally {
        await prisma.$disconnect();
        console.log("Disconnected from Prisma.");
      }
  } else {
    return NextResponse.json({ error: 'Bad request: No user id.' }, { status: 400 })
  }
}
