import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import bcrypt from "bcryptjs";

interface User {
  name?: string;
  email?: string;
  password?: string;
  role?: "user" | "admin";
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ data: user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "500 Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);
  try {
    await prisma.user.delete({
      where: { id },
    });
    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { message: "500 Internal Server Error", error: error },
      { status: 500 }
    );
  }
}

interface User {
  name?: string;
  email?: string;
  password?: string;
  role?: "user" | "admin";
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);
  const body = (await request.json()) as User;

  let hashedPassword: string | undefined;
  if (body.password) {
    hashedPassword = await bcrypt.hash(body.password, 10);
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...(body.name && { name: body.name }),
        ...(body.email && { email: body.email }),
        ...(body.password && { password: hashedPassword }),
        ...(body.role && { role: body.role }),
      },
    });

    return NextResponse.json({ data: updatedUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "500 Internal Server Error" },
      { status: 500 }
    );
  }
}
