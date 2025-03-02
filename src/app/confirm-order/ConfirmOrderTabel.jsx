"use client"
import React, { useEffect } from 'react'
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
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';


export default function ConfirmOrderTabel() {

  const { data: session, status } = useSession();
  const userId = session?.user?.id


  const fetcher = (...args) => fetch(...args).then(res => res.json())

  const { data, error, isLoading } = useSWR(`/api/user/${userId}`, fetcher)
  const routes=useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      routes.push('/auth/login')
    }

  }, [status, routes])


  if (status === "loading")
    { return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <Loader2 className="h-9 w-9 animate-spin text-gray-500" />
    </div>
  )}

  if (status === 'unauthenticated') return null


  return (

    isLoading ?
      (
        <div className="fixed inset-0 flex justify-center items-center  z-50">
          <Loader2 className="h-9 w-9 animate-spin text-gray-500" />
        </div>
      )
      :
      (<div className='mt-4'>
        <h1 className='text-center text-3xl text-brand font-bold sm:text-5xl'>Confirmed Booking </h1>
        <div className='mt-5 w-[85%] mx-auto'>
          <Table>
            <TableCaption className='mb-4'>Your Confirmed Bookings</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead >Reservation ID</TableHead>
                <TableHead >Check-in Date</TableHead>
                <TableHead >Check-out Date</TableHead>
                <TableHead >Paid Amount</TableHead>
                <TableHead >Location Image</TableHead>
                <TableHead className="text-right">Booking Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>

              {
                data?.user?.orders?.map((item) => {
                  const date1 = new Date(item?.starting_date);
                  const starting_date = date1.toISOString().split("T")[0]
                  const date2 = new Date(item?.ending_date);
                  const ending_date = date2.toISOString().split("T")[0]
                  return (
                    <TableRow key={item?.id}>
                      <TableCell >{item?.orderId}</TableCell>
                      <TableCell >{starting_date}</TableCell>
                      <TableCell >{ending_date}</TableCell>
                      <TableCell >₹{item?.amount}</TableCell>
                      <TableCell >
                        <Image
                          src={item?.place}
                          width={40}
                          height={40}
                          alt="Home_img"
                          className="rounded-full w-10 h-10"
                        />
                      </TableCell>

                      <TableCell className="text-right text-green-600">Success</TableCell>
                    </TableRow>
                  )
                })
              }

            </TableBody>
          </Table>
        </div>
      </div>)
  )
}
