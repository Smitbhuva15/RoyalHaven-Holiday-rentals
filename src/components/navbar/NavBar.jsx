import React from 'react'
import BrandLogo from './BrandLogo'
import Link from 'next/link'
import NavMenu from './NavMenu'
import { Search } from 'lucide-react'
import MoblieMenu from './MoblieMenu'
import SearchSheet from '../searchnav/SearchSheet'
import Image from 'next/image'


export default function NavBar() {
    return (
        <div>
            <nav className="justify-between items-center md:px-12 py-2 border-b-[1px] flex">
                <div className='md:block hidden'>
                    <BrandLogo />
                </div>
                <div className='w-full md:w-auto'>
                    <div>
                        <div className='ml-3 my-2 md:hidden flex justify-between w-[90%]'>
                            <Link href='/'>
                            <Image src="/images/logo-sm.png" 
                             alt='logo'
                            width={80} 
                            height={60}
                             /> 
                            </Link>
                            <div className='mt-3 flex'>
                                <Link href="/add-home " className="text-sm font-semibold mr-3">
                                    Add your home
                                </Link>
                                < NavMenu />
                            </div>

                        </div>

                        <SearchSheet />
                    </div>
                </div>

                <div className="hidden md:flex justify-center items-center space-x-4">
                    <Link href="/add-home" className="text-sm font-semibold">
                        Add your home
                    </Link>
                    <NavMenu />
                </div>
            </nav>
        </div>
    )
}
