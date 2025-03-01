import React from 'react'
import BrandLogo from './BrandLogo'
import Link from 'next/link'
import NavMenu from './NavMenu'
import { Search } from 'lucide-react'
import MoblieMenu from './MoblieMenu'
import SearchSheet from '../searchnav/SearchSheet'
import Image from 'next/image'
import { Button } from '../ui/button'


export default function NavBar() {
    return (
        <div>
            <nav className="justify-between items-center md:px-12 py-2 border-b-[1px] flex">
                <div className='md:block hidden'>
                    <BrandLogo />
                </div>
                <div className='w-full md:w-auto'>
                    <div>
                        <div className='ml-3  md:hidden flex justify-between w-[90%]'>
                            <Link href='/'>
                                <Image src="/images/royal-logo4.png"
                                    alt='logo'
                                    width={80}
                                    height={60}
                                    className='sm:ml-5 sm:w-28 w-20'
                                />
                            </Link>
                            <div className='mt-5 flex'>
                                <Link href="/add-home " className="text-sm font-semibold mr-3">
                                    <Button className='bg-brand '>
                                        Add your home
                                    </Button>

                                </Link>
                                < NavMenu />
                            </div>

                        </div>

                        <SearchSheet />
                    </div>
                </div>

                <div className="hidden md:flex justify-center items-center space-x-4">
                    <Link href="/add-home" className="text-sm font-semibold">
                    <Button className='bg-brand lg:px-16 px-10'>
                                        Add your home
                                    </Button>
                    </Link>
                    <NavMenu />
                </div>
            </nav>
        </div>
    )
}
