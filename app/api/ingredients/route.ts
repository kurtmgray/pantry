import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { CustomSession } from "@/lib/types";

//GET request to search for an ingredient to add
//POST request to add the ingredient to Postgres

export async function GET(request: NextRequest) {
  const ingredient = request.nextUrl.searchParams.get("ingr");
  const brand = request.nextUrl.searchParams.get("brand");
  if (ingredient) {
    try {
      const url = "https://api.edamam.com/api/food-database/v2/parser"
      const queryString = `?app_id=${process.env.NEXT_PUBLIC_EDAMAM_APP_ID}&app_key=${process.env.NEXT_PUBLIC_EDAMAM_API_KEY}&ingr=${ingredient}$${brand !== null ? `&brand=${brand}` : ""}`
      const data = await fetch(url + queryString);
      const json = await data.json();
      console.log("json: ", json);
      return NextResponse.json(json);
    } catch (error) {
      console.log("err:", error);
      return NextResponse.error();
    } finally {
      await prisma.$disconnect();
      console.log("Disconnected from Prisma.");
    }
  } else {
    console.error("No ingredient provided.");
  }
}

export async function POST(request: NextRequest) {
  const data: EdamamIngredient = await request.json();
  const session: CustomSession | null = await getServerSession(authOptions);
  
  if (data.food.foodId !== undefined) {
    const {
      food: {
        brand,
        category,
        categoryLabel,
        label,
        knownAs,
        image,
        nutrients: { ENERC_KCAL, PROCNT, FAT, CHOCDF },
      },
    } = data;

    if (session) {
      try {
        const pantryItem = await prisma.pantryItem.create({
          data: {
            brand: brand ? brand : undefined,
            label: label,
            userId: parseInt(session.user.id),
            knownAs: knownAs,
            category: category,
            categoryLabel: categoryLabel,
            image: image,
            nutrients: {
              create: {
                enerc_kcal: ENERC_KCAL,
                procnt: PROCNT,
                fat: FAT,
                chocdf: CHOCDF,
              },
            },
          },
        });
        console.log("Created PantryItem:", pantryItem);
        return NextResponse.json(pantryItem);
      } catch (error) {
        console.error("Error creating PantryItem:", error);
        return NextResponse.error()
      } finally {
        await prisma.$disconnect();
      }
    } else {
      return new Response(null, { status: 401, statusText: "Unauthorized" });
    }
  } else {
    console.error("Error creating PantryItem: foodId is undefined");
  }
}

export async function DELETE(request: NextRequest) {
  const ingredientId = request.nextUrl.searchParams.get("id");
  const session: CustomSession | null = await getServerSession(authOptions);

  if (session) {
    try {
      if (ingredientId){
        const deletedPantryItem = await prisma.pantryItem.delete({
          where: { id: parseInt(ingredientId) },
        });
  
        console.log("Deleted PantryItem:", deletedPantryItem);
        return NextResponse.json({ message: "Ingredient deleted successfully" });
      }

    } catch (error) {
      console.error("Error deleting PantryItem:", error);
      return NextResponse.error();
    } finally {
      await prisma.$disconnect();
    }
  } else {
    return new Response(null, { status: 401, statusText: "Unauthorized" });
  }
}