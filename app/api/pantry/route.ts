import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { CustomSession } from "@/lib/types";
import { prisma, getPantryItemsByUserId, deletePantryItem, postNewPantryItem } from "@/lib/prisma";


export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("id");
  console.log(userId)
  if (userId) {
    try {
      // const userId = parseInt(session.user.id);
      console.log("userId", userId);  
      const pantryItems = await getPantryItemsByUserId(parseInt(userId));
      return NextResponse.json(pantryItems);
    } catch (error) {
      return NextResponse.error();
    } finally {
      await prisma.$disconnect();
      console.log("Disconnected from Prisma.");
    }
  } else {
    return new Response(null, { status: 401, statusText: "No user id." });
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
        nutrients,
      },
    } = data;

    if (session) {
      try {
        const userId = parseInt(session.user.id);
        const pantryItem = await postNewPantryItem(brand, category, categoryLabel, label, knownAs, image, nutrients, userId)
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
        const deletedPantryItem = await deletePantryItem(parseInt(ingredientId));
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