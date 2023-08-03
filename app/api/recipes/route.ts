import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { RecipeCategory } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { CustomSession } from "@/lib/types";

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
        image: recipe.image,
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
  const session: CustomSession | null = await getServerSession(authOptions);

  if (session) {
    try {
      const recipes = await prisma.recipe.findMany({
        where: {
          addedBy: {id: parseInt(session.user.id)} ,
        },
      });
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
