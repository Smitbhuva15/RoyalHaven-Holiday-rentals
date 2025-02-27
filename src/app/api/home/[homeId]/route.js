import prisma from '@/lib/db';
import { NextResponse } from 'next/server';
import React from 'react'

export async function DELETE(req,{params}) {
    try {
     const homeId=params.homeId;

     const deleteHome= await prisma.home.delete({
        where:{
            id:homeId
        }
     })

     return NextResponse.json({ message: "Home Deleted SuccessFully!!" }, { status: 200 });


    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
