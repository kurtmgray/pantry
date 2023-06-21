import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

//GET request to search for an ingredient to add
//POST request to add the ingredient to Postgres

export async function GET(request: NextRequest) {
  const ingredient = request.nextUrl.searchParams.get("ingredient");
  if (ingredient) {
    try {
      const queryString = `?app_id=${process.env.NEXT_PUBLIC_EDAMAM_APP_ID}&app_key=${process.env.NEXT_PUBLIC_EDAMAM_API_KEY}&ingredient=${ingredient}`;
      const data = await fetch(
        `https://api.edamam.com/api/food-database/v2/parser/${queryString}`
      );
      return NextResponse.json(data);
    } catch (error) {
      return NextResponse.error();
    } finally {
      await prisma.$disconnect();
      console.log("Disconnected from Prisma.");
    }
  }
}
