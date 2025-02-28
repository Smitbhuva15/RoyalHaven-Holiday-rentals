"use client"
import React, { useEffect, useState } from 'react'
import { categories } from '@/config/categories'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation'



export default function Categories() {

    const router=useRouter()

    const handelLink=(query)=>{
        router.replace(`/?categories=${query}`)
     }
     const [save,setSave]=useState();
    const searchparams=useSearchParams()
    
    useEffect(()=>{
      setSave( searchparams?.get('categories') )
    },[searchparams])

    return (
        <div className="flex items-center space-x-10 px-10 my-3 overflow-x-auto whitespace-nowrap scroll-smooth pb-4">
            {categories.map((item,i) => (
                
                <div
                    className="flex justify-center flex-col items-center cursor-pointer "
                    key={item.name}
                    onClick={()=>{handelLink(item.name)}}
                >
                    <Image src={item.icon} width={25} height={25} alt={item.name} />
                    <span
                        className={`${save===item.name && "inline-block border-b-4 border-brand"} text-sm` }
                    >
                        {item.name}
                    </span>
                </div>
                
            ))}
        </div>
    )
}
