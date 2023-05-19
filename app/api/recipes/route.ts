import { prisma } from "@/lib/prisma";
import { RecipeCategory } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  // im here
  const recipe = await request.json();
  try {
    const newRecipe = await prisma.recipe.create({
      data: {
        addedBy: { connect: { id: 72 } }, // adds User, connecting by recipe.addedById
        // hardcoded user ID but it works
        // get access to session?
        title: recipe.title,
        summary: recipe.summary,
        category: recipe.category as RecipeCategory,
        // look into "objects" vs set?
        ingredients: { set: recipe.ingredients },
        instructions: { set: recipe.instructions },
        preptime: recipe.preptime,
        cooktime: recipe.cooktime,
        rating: recipe.rating || null,
      },
    });

    console.log(`Created recipe with ID: ${newRecipe.id}`);
    return {
      status: 200,
      body: JSON.stringify(newRecipe),
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      body: "internal server error",
    };
  } finally {
    async () => {
      console.log("finally");
      await prisma.$disconnect();
    };
  }
}

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get("email");
  if (typeof email === "string") {
    try {
      const recipes = await prisma.recipe.findMany({
        where: {
          addedBy: { email: email },
        },
      });
      console.log(recipes);
      return NextResponse.json(recipes);
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        body: "internal server error",
      };
    } finally {
      await (async () => {
        console.log("finally");
        await prisma.$disconnect();
      })();
    }
  }
}
