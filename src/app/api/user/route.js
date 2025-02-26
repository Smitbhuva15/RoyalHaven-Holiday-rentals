import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";


const userSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  userName: z.string().min(3, { message: "Username must be at least 3 characters" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export async function POST(req) {
  try {

    const body = await req.json();

    const validation = userSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: "Validation error", errors: validation.error },
        { status: 400 }
      );
    }

    const { email, userName, password } = body

    const isEmailExist = await prisma.user.findUnique({
      where: { email },
    });

    if (isEmailExist) {
      return NextResponse.json({ message: "User already exists with this email" }, { status: 400 });
    }

    
    const isUserExist = await prisma.user.findUnique({
      where: { userName },
    });

    if (isUserExist) {
      return NextResponse.json({ message: "User already exists with this username" }, { status: 400 });
    }

 
    const hashPassword = await bcrypt.hash(password, 10);

    
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashPassword,
        userName,
      },
    });

   
    const { password: _, ...rest } = newUser;

    return NextResponse.json(
      { message: "User created successfully", user: rest },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
