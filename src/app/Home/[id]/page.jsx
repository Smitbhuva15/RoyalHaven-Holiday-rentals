"use client"
import NavBar from '@/components/navbar/NavBar';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useState } from 'react'
import useSWR from 'swr';



export default function Home() {

  const { id } = useParams()

  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, error, isLoading } = useSWR(`/api/home/${id}`, fetcher)


  return (
    <div className="mb-10">
      <NavBar />
      {
        isLoading ?
          (
            <div className="fixed inset-0 flex justify-center items-center  z-50">
              <Loader2 className="h-9 w-9 animate-spin text-gray-500" />
            </div>

          )
          : (
            <div className="container mt-5">
              <div>
                <h1 className="text-2xl font-bold capitalize">{data?.home?.title}</h1>
                <p className='capitalize'>
                  {data?.home?.city}, {data?.home?.state}, {data?.home?.country}
                </p>
              </div>

              <Image
                src={data?.home?.image_url}
                width={100}
                height={100}
                alt="home_img"
                className="w-full rounded-lg h-[500px] object-cover object-center my-5"
                unoptimized
              />
              <h1 className="text-2xl font-bold text-brand capitalize">
                Hosted By {data?.home?.user?.userName}
              </h1>

              <h1 className="text-xl font-semibold capitalize">
                {data?.home?.title} in {data?.home?.city}, {data?.home?.state}, {data?.home?.country}
              </h1>

              <div
                className="mt-5 "
                dangerouslySetInnerHTML={{
                  __html: data?.home?.description,
                }}
              ></div>

            </div>
          )
      }
    </div>
  )
}

// royal refuge