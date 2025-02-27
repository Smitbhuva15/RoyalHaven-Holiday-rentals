import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {

    try {
        const allHomes = await prisma.home.findMany({
            include: {
                user:true
            }
        });

        return NextResponse.json({ 
            message: "All houses retrieved successfully", 
            homes: allHomes 
        }, { status: 200 });

    } catch (error) {
        console.error("Error fetching homes:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
