import Link from 'next/link'
import React from 'react'
import NavMenu from '../navbar/NavMenu'
import BrandLogo from '../navbar/BrandLogo'
import { Input } from '../ui/input'

export default function SearchNavbar() {
    return (
        <div className="flex justify-between items-center">
            <div className="hidden md:block">
                <BrandLogo />
            </div>
            <Input
                placeholder="Search by country.."
                className="w-full md:w-1/3 rounded-3xl p-5"

            />
            <div className="hidden md:flex justify-center items-center space-x-4">
                <Link href="/add-home" className="text-sm font-semibold">
                    Add you home
                </Link>
            </div>
            <div className='hidden md:block'>
            <NavMenu />

            </div>
        </div>
    )
}
