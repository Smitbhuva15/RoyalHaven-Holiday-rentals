"use client"
import NavBar from '@/components/navbar/NavBar'
import React, { useEffect } from 'react'
import Counter from '@/components/addhome/Counter'
import Image from 'next/image'
import AddHomeForm from './AddHomeForm'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function page() {

  const {data:session,status}=useSession();

  const routes=useRouter()

   useEffect(()=>{
     if(status==='unauthenticated'){
        routes.push('/auth/login')
     }

   },[status,routes])

   
   if (status === "loading") return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
        <Loader2 className="h-9 w-9 animate-spin text-gray-500" />
    </div>
)

   if(status==='unauthenticated') return null


    return (
        <div>
            <NavBar />
            <div className="container mt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 place-items-center md:gap-2 gap-4">
                    <div>
                        <h1 className="text-brand font-bold sm:text-7xl text-5xl">Royal Haven it</h1>
                        <h1 className="text-black font-semibold sm:text-3xl text-xl mb-3">
                            You could earn
                        </h1>
                        <div className="flex space-x-4 items-center">
                            <Counter />
                            <strong className="sm:text-3xl text-xl">per night</strong>
                        </div>
                        <div className="hidden md:grid grid-cols-2 gap-2 mt-5">
                            <Image
                                src="/images/home_img.jpeg"
                                width={200}
                                height={200}
                                alt="home"
                                className="rounded-2xl object-cover"
                            />
                            <Image
                                src="/images/home_img1.jpeg"
                                width={205}
                                height={205}
                                alt="home"
                                className="rounded-2xl object-cover"
                            />
                        </div>
                    </div>
                    <div className="">
                        <AddHomeForm />
                    </div>
                </div>
            </div>
        </div>
    )
}
