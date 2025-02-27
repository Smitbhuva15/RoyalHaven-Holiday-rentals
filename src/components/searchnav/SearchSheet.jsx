import React from 'react'
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

export default function SearchSheet() {
    return (
        <div>
            <Sheet>
                <SheetTrigger asChild>
                    <div className="w-full md:w-auto">
                        <div
                            className="md:flex space-x-2 shadow-sm rounded-3xl p-2 border items-center hidden cursor-pointer"

                        >
                            <span className="pl-2 text-sm">Anywhere</span>
                            <span>|</span>
                            <span className="text-sm">
                                any week
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
                <SheetContent side="top" className="text-center">
                    <SheetHeader>
                        <div className='mt-7 md:mt-1'>
                            <SearchNavbar />
                        </div>


                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    )
}
