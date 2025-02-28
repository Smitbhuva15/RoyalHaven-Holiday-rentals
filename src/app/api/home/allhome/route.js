import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request) {

   const searchParams = request.nextUrl.searchParams;
   
   const query1=searchParams.get("country") || null;
   const query2 =searchParams.get("categories") || null; 
   
    const whereCondition= query1 && query1 !== "undefined" || query2 && query2 !== "undefined"   ? {
        OR: [
            {  country: { contains: query1, mode: "insensitive" } },
            { categories: { hasSome: [query2] } } 
          ]
    }:{}

    try {
        const allHomes = await prisma.home.findMany({
            where:whereCondition,
            include: {
                user:true
            },
            orderBy:{
                createdAt:'desc'
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
