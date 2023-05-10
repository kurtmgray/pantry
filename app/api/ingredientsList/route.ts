import { pantryIngredients } from "@/config/mockUserData";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  return NextResponse.json(pantryIngredients);
}
