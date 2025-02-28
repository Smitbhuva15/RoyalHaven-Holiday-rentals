import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    const { query } = params; 

    if (!query) {
        return NextResponse.json({ message: "Query parameter is required" }, { status: 400 });
    }

    console.log(query, "queryyyyyyyyyyy");

    try {
        const homes = await prisma.home.findMany({
            where: {
                OR: [
                    {  country: { contains: query, mode: "insensitive" } },
                    { categories: { hasSome: [query] } } 
                ]
            }
        });

        return NextResponse.json({ message: "Houses retrieved successfully", homes }, { status: 200 });

    } catch (error) {
        console.error("Error fetching homes for query:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
