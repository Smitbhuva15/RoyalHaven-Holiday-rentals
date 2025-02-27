import prisma from '@/lib/db'
import { NextResponse } from 'next/server';
import React from 'react'

export async function GET({params}) {
    const query=params.query
   
   try {
    const home = await prisma.home.findMany({
        where: {
            OR: [
                { country: { equals: query, mode: "insensitive" } }, 
                { categories: { hasSome: [query] } } 
            ]
        }
    });

    return NextResponse.json({ message: "houses retrieved successfully",home:home }, { status: 200 });
    
   } catch (error) {
     console.error("Error fetching homes for query:", error);
     return NextResponse.json({ message: "Internal server error" }, { status: 500 });
   }

  
}
