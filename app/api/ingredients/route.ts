import { NextRequest, NextResponse } from "next/server";


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
      console.log("Done with Edamam.");
    }
  } else {
    console.error("No ingredient provided.");
  }
}

