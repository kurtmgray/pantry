import { prisma } from "@/lib/prisma";
import { RecipeCategory } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const recipe: RecipeDB = await request.json();
  try {
    const newRecipe = await prisma.recipe.create({
      data: {
        addedBy: { connect: { id: recipe.addedById } }, // adds User, connecting by email in param
        title: recipe.title,
        summary: recipe.summary,
        category: recipe.category as RecipeCategory,
        ingredients: { set: recipe.ingredients },
        instructions: { set: recipe.instructions },
        preptime: recipe.preptime,
        cooktime: recipe.cooktime,
        rating: recipe.rating || null,
      },
    });

    console.log(`Created recipe with ID: ${newRecipe.id}`);
    return NextResponse.json(newRecipe);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  } finally {
    async () => {
      await prisma.$disconnect();
    };
  }
}

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get("email");
  if (email) {
    try {
      const recipes = await prisma.recipe.findMany({
        where: {
          addedBy: { email },
        },
      });
      return NextResponse.json(recipes);
    } catch (error) {
      return NextResponse.error();
    } finally {
      await prisma.$disconnect();
      console.log("Disconnected from Prisma.");
    }
  }
}
