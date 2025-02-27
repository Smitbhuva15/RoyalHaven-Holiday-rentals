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

export async function GET(req,{params}) {
   const homeId=params.homeId;

    try {
     
        const home=await prisma.home.findUnique({
            where:{
                id:homeId
            },
            include:{
                user:true
            }
        })

   

     if(!home){
        return NextResponse.json({ message: "Home not getting SuccessFully!!" ,
        }, { status: 400 });
     }

     return NextResponse.json({ message: "Home getting SuccessFully!!" ,
        home:home 
    }, { status: 200 });


    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}


