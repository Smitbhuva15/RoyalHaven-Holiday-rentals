"use client"
import NavBar from '@/components/navbar/NavBar'
import { DeleteIcon, Eye, Loader2, Trash } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'
import useSWR from 'swr';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter
} from "@/components/ui/table"
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import DeleteIconBtn from '@/components/dashboard/DeleteIconBtn';

export default function DashBoard() {

    const routes = useRouter()
    const { data: session } = useSession()
    const userId = session?.user?.id

    const fetcher = (...args) => fetch(...args).then(res => res.json())

    const { data, error, isLoading } = useSWR(`/api/user/${userId}`, fetcher)

    return (
        <div>
            <NavBar />
            {
                isLoading ? (
                    <div className="fixed inset-0 flex justify-center items-center  z-50">
                        <Loader2 className="h-9 w-9 animate-spin text-gray-500" />
                    </div>

                )
                    : (
                        data?.user && data?.user?.homes.length > 0 ?
                            (
                                <div className="container mt-5">
                                    <Table >
                                        <TableCaption>Your added Airbnb Homes.</TableCaption>
                                        <TableHeader>
                                            <TableRow>

                                                <TableHead>Title</TableHead>
                                                <TableHead>City</TableHead>
                                                <TableHead>Country</TableHead>
                                                <TableHead>Image</TableHead>
                                                <TableHead>Price</TableHead>
                                                <TableHead>Action</TableHead>
                                            </TableRow>
                                        </TableHeader>

                                        <TableBody>
                                            {data?.user?.homes.map((home) => (
                                                <TableRow key={home?.id}>

                                                    <TableCell>{home?.title}</TableCell>
                                                    <TableCell>{home?.city}</TableCell>
                                                    <TableCell >{home?.country}</TableCell>

                                                    <TableCell>
                                                        <Image
                                                            src={home?.image_url}
                                                            width={40}
                                                            height={40}
                                                            alt="Home_img"
                                                            className="rounded-full w-10 h-10"
                                                        />
                                                    </TableCell>
                                                    <TableCell>{home?.price}</TableCell>
                                                    <TableCell>
                                                        <div className='flex items-center space-x-2 '>
                                                            <DeleteIconBtn id={home?.id} userId={userId} />
                                                            <Link href={`/Home/${home?.id}`}>
                                                                <Button size="icon" className="bg-slate-600 rounded-full ml-2 ">
                                                                    <Eye />
                                                                </Button>
                                                            </Link>
                                                        </div>
                                                    </TableCell>


                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            )
                            :
                            (
                                <h1 className="text-center font-bold text-xl text-red-700">
                                    No Home found. Please add your home
                                </h1>
                            )
                    )
            }
        </div>
    )
}
