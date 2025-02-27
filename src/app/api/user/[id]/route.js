import prisma from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET(req, { params }) {

    const id = params.id

    try {
        const user = await prisma.user.findUnique({
            where: {
                id
            },
            include: {
                homes: true
            }
        })
    

        if (!user) {
            return NextResponse.json({
                 message: "User Not Found"  }, 
                { status: 400 });
        }

        return NextResponse.json({ message: "user get successFully!!", user:user }, { status: 200 });


    } catch (error) {
        console.error("Error getting user:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }

}
