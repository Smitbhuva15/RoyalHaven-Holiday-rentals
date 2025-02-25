import React from 'react'
import BrandLogo from './BrandLogo'
import Link from 'next/link'
import NavMenu from './NavMenu'


export default function NavBar() {
    return (
        <div>
            <nav className="justify-between items-center md:px-12 py-2 border-b-[1px] flex">
                <BrandLogo />


                <div className="hidden md:flex justify-center items-center space-x-4">
                    <Link href="/add-home" className="text-sm font-semibold">
                        Add you home
                    </Link>
                    <NavMenu />
                </div>
            </nav>
        </div>
    )
}
