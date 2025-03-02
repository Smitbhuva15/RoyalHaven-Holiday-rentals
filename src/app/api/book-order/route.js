import prisma from '@/lib/db';
import { NextResponse } from 'next/server';
import React from 'react'

export async function POST(req) {

    try {
        const { orderId, userId, starting_date,ending_date, amount,place } = await req.json();    
   
        const order = await prisma.order.create({
            data: {
                place,
                amount: String(amount),
                starting_date: new Date(starting_date), 
                ending_date: new Date(ending_date),
                userId,
                orderId
            }
        });


        if (!order) {
            return NextResponse.json({ message: "Order is not confirmed!!" }, { status: 400 });
        }

        return NextResponse.json({ message: "Order confirmed!!", order }, { status: 200 });


    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }

}


