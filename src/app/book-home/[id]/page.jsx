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



export default function page() {
  const params = useParams()
  const id = params.id
  const fetcher = (...args) => fetch(...args).then(res => res.json())

  const { data, error, isLoading } = useSWR(`/api/home/${id}`, fetcher)
  console.log(data?.home)

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
                  <Button className='bg-brand px-16' onClick={handlePayment}>
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
