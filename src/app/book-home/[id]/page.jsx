"use client"
import NavBar from '@/components/navbar/NavBar'
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import useSWR from 'swr';

import { Button } from '@/components/ui/button';
import DatePicker from '../DatePicker';
import PaymentTabel from '../PaymentTabel';
import toast from 'react-hot-toast';



export default function page() {
  const params = useParams()
  const id = params.id
  const fetcher = (...args) => fetch(...args).then(res => res.json())

  const { data, error, isLoading } = useSWR(`/api/home/${id}`, fetcher)
  

  const [dateDifference,setDateDifference]=useState()
  const [totalBeforeDiscount,setTotalBeforeDiscount]=useState(data?.home?.price)
  const [discount,setDiscount]=useState(0)
  const [total,setTotal]=useState(0)




  const daydifferencevalue=(value)=>{
     setDateDifference(value+1)
     setTotalBeforeDiscount(data?.home?.price*(value+1))
     setDiscount(Math.floor((data?.home?.price*(value+1))*0.075))
     setTotal((data?.home?.price*(value+1))-(Math.floor((data?.home?.price*(value+1))*0.075)))
    }



    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        if (window.Razorpay) {
          resolve(true);
          return;
        }
    
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => {
          resolve(true);
        };
        script.onerror = () => {
          resolve(false);
        };
        document.body.appendChild(script);
      });
    };

    const handlePayment=async(total)=>{

      const r1 = await loadRazorpayScript();

      if (!r1) {
        toast.error("Failed to load Razorpay. Check your internet connection.");
        return;
      }

     try {
     
      const res=await fetch(`/api/create-order`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({amount:total})
      })

      if(res.ok){

        const data=await res.json();
        const order=data.order;

  

        const options = {
          key: process.env.NEXT_PUBLIC_PAYMENT_KEY_ID, 
          amount: order.amount,
          currency: "INR",
          name: "Airbnb",
          description: "Booking Your House Confirm!!",
          order_id: order.id,
          handler: function (response) {
            toast.success("Payment Successful! Payment ID: " + response.razorpay_payment_id);
          },
          prefill: {
            name: "smit bhuva",
            email: "smitbhuva@gmail.com",
            contact: "9316088896",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();


      }
      else{
        const errmessage=await res.json();
        console.log(errmessage)
      }

     } catch (error) {
       console.log("client side payment internal server error",error)
     }
    }

  return (
    <div>
      <NavBar />
      {
        isLoading ?
          (
            <div className="fixed inset-0 flex justify-center items-center z-50">
              <Loader2 className="h-9 w-9 animate-spin text-gray-500" />
            </div>

          )
          :
          (
            <div className='flex container mt-6 justify-around md:flex-row flex-col'>
              {/* left side */}
              <div className='md:w-1/2 mb-10'>
                <div className='md:text-5xl font-bold text-brand text-center text-3xl'>
                  Select date
                </div>
                <DatePicker daydifferencevalue={daydifferencevalue}/>
              </div>
              {/* right side */}

              <div className='md:w-1/2 mb-10'>
                <div className='flex justify-center'>
                  <Image src={data?.home?.image_url}
                    alt='home photo'
                    width={300}
                    height={100}
                    className='w-3/4 '
                    unoptimized
                  />
                </div>

                <PaymentTabel dateDifference={dateDifference} totalBeforeDiscount={totalBeforeDiscount} discount={discount} total={total} 
                baseprice={data?.home?.price}/>

                <div className='flex justify-center pt-4'>
                  <Button className='bg-brand px-16' onClick={()=>{handlePayment(total)}}>
                    Pay Now
                  </Button>
                </div>


              </div>
            </div>
          )
      }

    </div>
  )
}
