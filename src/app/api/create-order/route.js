import React from 'react'
import Razorpay from 'razorpay'
import { NextResponse } from 'next/server';

export async function POST(req) {
 
    const {amount}=await req.json();

    try {

        const razorpay = new Razorpay({
            key_id: process.env.PAYMENT_KEY_ID,
            key_secret: process.env.PAYMENT_KEY_SECRET,
          });

          const options = {
            amount: amount * 100, 
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
          };

          const order = await razorpay.orders.create(options)

           return NextResponse.json({order:order},{status:200})
 
    } catch (error) {
        return NextResponse.json({message:"payment related internal server error !!"},{status:500})
    }
  
}
