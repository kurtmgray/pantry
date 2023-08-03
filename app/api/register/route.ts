import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";

export async function POST(request: NextRequest) {
  const { email, password, name } = await request.json();
  if (email && password && name) {
    try {
      const hashed = await hash(password, 12);
      const user = await prisma.user.create({
        data: {
          email: email,
          password: hashed,
          name: name,
        },
      });
      console.log(user);
      return NextResponse.json({
        user: {
          email: user.email,
          name: name,
        },
      });
    } catch (err: any) {
      return new NextResponse(
        JSON.stringify({
          error: err.message,
        }),
        {
          status: 500,
        }
      );
    }
  } else { 
    console.error("No email, password, or name provided.");
  }
}
