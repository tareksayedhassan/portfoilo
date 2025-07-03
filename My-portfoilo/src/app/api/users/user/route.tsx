import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import bcrypt from "bcryptjs";
import fs from "node:fs/promises";
import generateJWT from "@/utils/generateJWT";
import { Role } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "5");
    const searchQuery = searchParams.get("search") || "";

    const nameFilter =
      searchQuery.trim() !== ""
        ? {
            name: {
              contains: searchQuery,
              mode: "insensitive",
            },
          }
        : {};

    const total = await prisma.user.count({ where: nameFilter });

    const users = await prisma.user.findMany({
      where: nameFilter,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      {
        data: users,
        total,
        totalPages: Math.ceil(total / pageSize),
        currentPage: page,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string | null;
    const email = formData.get("email") as string | null;
    const password = formData.get("password") as string | null;
    const roleInput = formData.get("role") as string | null;
    const avatarFile = formData.get("file") as File | null;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let avatarFileName = "";
    if (avatarFile) {
      const arrayBuffer = await avatarFile.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      const uniqueName = `${Date.now()}-${avatarFile.name}`;
      await fs.writeFile(`./public/uploads/${uniqueName}`, buffer);
      avatarFileName = uniqueName;
    }

    // نتحقق من صلاحية القيمة ونعطي قيمة افتراضية لو مش صحيحة
    const validRoles = [Role.admin, Role.user];
    const role: Role = validRoles.includes(roleInput as Role)
      ? (roleInput as Role)
      : Role.user;

    const user = await prisma.user.create({
      data: {
        name: name ?? "",
        email,
        password: hashedPassword,
        role,
        avatar: avatarFileName,
      },
    });

    const token = await generateJWT({
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    return NextResponse.json({ data: user, token }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
