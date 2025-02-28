"use client"
import React, { useState } from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Search } from 'lucide-react'
import MoblieMenu from '../navbar/MoblieMenu'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import SearchNavbar from './SearchNavbar'
import DatePicker from './DatePicker'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function SearchSheet() {
    const router = useRouter()
    const [open, setOpen] = useState(false);

    const [query, setQuery] = useState("")
    const Searchvalue = (value) => {
        setQuery(value)
    }

    const handleSubmit = () => {
        setOpen(false)
        router.replace(`/?country=${query}`)
    }


    const searchParams = useSearchParams();
    const country = searchParams.get("country");

    return (
        <div>
            <Sheet open={open}>
                <SheetTrigger asChild>
                    <div className="w-full md:w-auto" onClick={() => setOpen(true)}>
                        <div
                            className="md:flex space-x-2 shadow-sm rounded-3xl p-2 border items-center hidden cursor-pointer"

                        >
                            <span className="pl-2 text-sm">{`${country ? country : "Anywhere"}`}</span>
                            <span>|</span>
                            <span className="text-sm">
                                Any week
                            </span>
                            <span>|</span>
                            <span className="text-muted-foreground text-sm">Add Guest</span>
                            <span className="bg-brand text-white p-2 rounded-full pr-2">
                                <Search width={14} height={14} />
                            </span>
                        </div>

                        <MoblieMenu />

                    </div>
                </SheetTrigger>
                <SheetContent side="top" className="text-center" >
                    <SheetHeader>
                    <SheetTitle></SheetTitle>
                        <div className='mt-7 md:mt-1'>
                            <SearchNavbar Searchvalue={Searchvalue} />
                        </div>

                        <SheetDescription asChild>
                            <div className="flex justify-center items-center flex-col">


                                <div className="flex w-1/3 justify-center items-center mt-5 gap-10 lg:-ml-52 md:-ml-36">
                                    <Button className="bg-brand" onClick={handleSubmit}>
                                        Search
                                    </Button>
                                    <Button variant="secondary" onClick={() => setOpen(false)} >
                                        Close
                                    </Button>
                                </div>
                            </div>
                        </SheetDescription>

                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    )
}
