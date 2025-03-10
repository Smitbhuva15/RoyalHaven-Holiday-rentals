"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import NavMenu from '../navbar/NavMenu'
import BrandLogo from '../navbar/BrandLogo'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

export default function SearchNavbar({Searchvalue}) {
    const [query,setQuery]=useState("")
        Searchvalue(query)


    return (
        <div className="flex justify-between items-center">
            <div className="hidden md:block">
                <BrandLogo />
            </div>
            <Input
                placeholder="Search by country.."
                className="w-full md:w-1/3 rounded-3xl p-5"
                value={query}
                onChange={(e)=>{setQuery(e.target.value)}}
            />
            <div className="hidden md:flex justify-center items-center space-x-4">
                <Link href="/add-home" className="text-sm font-semibold">
                 <Button className='bg-brand '>
                    Add your home
                    </Button>
                </Link>
            </div>
            <div className='hidden md:block'>
            <NavMenu />

            </div>
        </div>
    )
}
