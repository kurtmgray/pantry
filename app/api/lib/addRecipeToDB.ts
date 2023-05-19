import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { RecipeCategory } from "@prisma/client";

export async function addRecipeToDB(recipe: Recipe) {
  console.log(recipe);

  try {
    const newRecipe = await prisma.recipe.create({
      data: {
        addedBy: { connect: { id: recipe.addedById } }, // adds User, connecting by recipe.addedById
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
    return {
      status: 200,
      body: newRecipe,
    };
  } catch (error) {
    console.error(error);
  }
}
