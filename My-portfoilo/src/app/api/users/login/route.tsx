import generateJWT from "@/utils/generateJWT";
import { loginValidate } from "@/utils/validationSchemas";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";

interface User {
  email: string;
  password: string;
  role: string;
}
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as User;

    const validation = loginValidate.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: validation.error.issues[0].message,
        },
        { status: 400 }
      );
    }

    const data = validation.data;

    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user || !user.password) {
      return NextResponse.json(
        {
          message: "User not found or password is missing",
        },
        {
          status: 404,
        }
      );
    }

    const matchedPassword = await bcrypt.compare(data.password, user.password);

    if (!matchedPassword) {
      return NextResponse.json(
        {
          message: "Invalid password",
        },
        {
          status: 401,
        }
      );
    }

    const token = await generateJWT({
      name: user.name,
      email: user.email ?? "",
      id: user.id,
      role: user.role,
      avatar: user.avatar,
    });

    return NextResponse.json(
      {
        message: "Login successful",
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: token,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
