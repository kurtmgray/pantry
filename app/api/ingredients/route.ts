import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
  const ingredient = request.nextUrl.searchParams.get("ingr");
  const brand = request.nextUrl.searchParams.get("brand");
  if (ingredient) {
    try {
      const url = "https://api.edamam.com/api/food-database/v2/parser"
      const queryString = `?app_id=${process.env.NEXT_PUBLIC_EDAMAM_APP_ID}&app_key=${process.env.NEXT_PUBLIC_EDAMAM_API_KEY}&ingr=${ingredient}${brand !== null ? `&brand=${brand}` : ""}`
      const data = await fetch(url + queryString);
      const results = await data.json();
      return NextResponse.json(results);
    } catch (error) {
      return NextResponse.json({ error:  "Error getting Edamam ingredient list."}, { status: 500 });;
    } 
  } else {
    return NextResponse.json({ error: 'Bad request: No user ingredient.' }, { status: 400 });
  }
}

