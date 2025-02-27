import prisma from '@/lib/db';
import { NextResponse } from 'next/server';
import React from 'react'

export async function POST(req) {

    try {
        const { title, country, state, city, price, image_url, description, categories, userId } = await req.json();
        // console.log(title, country, state, city, price, image_url, description, categories, userId)
   const newprice=Number(price)
        const newhome = await prisma.home.create({
            data: {
                title,
                country,
                state,
                city,
                price:newprice,
                image_url,
                description,
                categories,
                userId
            }
        })

        if(!newhome){
        return NextResponse.json({ message: "Home is not added!!" }, { status: 400 });

        }
        return NextResponse.json({ message: "Home added successFully!!" }, { status: 200 });


    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }

}
