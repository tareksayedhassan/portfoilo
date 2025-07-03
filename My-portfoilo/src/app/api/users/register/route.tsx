import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { registervalidate } from "@/utils/validationSchemas";
import bcrypt from "bcryptjs";
import generateJWT from "@/utils/generateJWT";
import { Role } from "@prisma/client";

interface User {
  name: string;
  email: string;
  password: string;
  role: string;
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as User;

  const validation = registervalidate.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      {
        message: validation.error.issues[0],
      },
      { status: 400 }
    );
  }

  const data = validation.data;

  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  if (existingUser) {
    return NextResponse.json(
      { message: "Email already exists" },
      { status: 400 }
    );
  }

  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        role: data.role === "admin" ? Role.admin : Role.user,
        password: hashedPassword,
      },
    });

    const token = await generateJWT({
      name: user.name!,
      email: user.email!,
      role: user.role,
    });

    return NextResponse.json({
      message: "User created successfully",
      data: user,
      token,
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      {
        message: "Failed to create user",
        error: String(error),
      },
      { status: 500 }
    );
  }
}
