"use client"
import NavBar from '@/components/navbar/NavBar'
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React from 'react'
import useSWR from 'swr';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button';


export default function page() {
  const params = useParams()
  const id = params.id


  const fetcher = (...args) => fetch(...args).then(res => res.json())

  const { data, error, isLoading } = useSWR(`/api/home/${id}`, fetcher)
  console.log(data?.home)

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
                <div className='mt-5'>
                  <Table>
                    <TableCaption>Final Pricing for Your Booking</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead colSpan={3}>Cost Breakdown</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>

                      <TableRow >
                        <TableCell className="font-medium" colSpan={3}>Base Price (Per Night)</TableCell>
                        <TableCell className="text-right">invoice.totalAmount</TableCell>
                      </TableRow>

                      <TableRow >
                        <TableCell className="font-medium" colSpan={3}>Stay Duration</TableCell>
                        <TableCell className="text-right">5 Nights</TableCell>
                      </TableRow>

                      <TableRow >
                        <TableCell className="font-medium" colSpan={3}>Total Before Discount</TableCell>
                        <TableCell className="text-right">$500.00</TableCell>
                      </TableRow>

                      <TableRow >
                        <TableCell className=" font-medium" colSpan={3}>Discount</TableCell>
                        <TableCell className="text-right">-$50.00</TableCell>
                      </TableRow>

                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={3} className='font-bold'>Final Payment</TableCell>
                        <TableCell className="text-right font-bold">$2,500.00</TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </div>

                <div className='flex justify-center pt-4'>
                  <Button className='bg-brand px-16'>
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
