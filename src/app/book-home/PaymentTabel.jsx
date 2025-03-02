"use client"
import React from 'react'
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

export default function PaymentTabel({dateDifference,totalBeforeDiscount,total,discount,baseprice}) {
  return (
    <div className='mt-5'>
                  <Table>
                    <TableCaption className='mb-4'>Final Pricing for Your Booking</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead colSpan={3}>Cost Breakdown</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>

                      <TableRow >
                        <TableCell className="font-medium" colSpan={3}>Base Price (Per Night)</TableCell>
                        <TableCell className="text-right">₹{baseprice}.00</TableCell>
                      </TableRow>

                      <TableRow >
                        <TableCell className="font-medium" colSpan={3}>Stay Duration</TableCell>
                        <TableCell className="text-right">{dateDifference} Nights</TableCell>
                      </TableRow>

                      <TableRow >
                        <TableCell className="font-medium" colSpan={3}>Total Before Discount</TableCell>
                        <TableCell className="text-right">₹{totalBeforeDiscount}.00</TableCell>
                      </TableRow>

                      <TableRow >
                        <TableCell className=" font-medium" colSpan={3}>Discount</TableCell>
                        <TableCell className="text-right">-₹{discount}.00</TableCell>
                      </TableRow>

                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={3} className='font-bold'>Final Payment</TableCell>
                        <TableCell className="text-right font-bold">₹{total}.00 </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </div>
  )
}
