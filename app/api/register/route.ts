import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();
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
}
