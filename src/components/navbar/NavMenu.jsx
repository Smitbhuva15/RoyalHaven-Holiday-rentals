"use client";

import React from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { MenuIcon } from 'lucide-react'
import { useRouter } from 'next/navigation';


export default function NavMenu() {
  const routes = useRouter()
  return (
    <Popover>
      <PopoverTrigger asChild>
        <MenuIcon className="cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="mr-6 ">
        <li className="mb-2 hover:bg-gray-200 rounded-md p-2 cursor-pointer" onClick={() => routes.push('/auth/login')} >
          Login
        </li>
        <li className="mb-2 hover:bg-gray-200 rounded-md p-2 cursor-pointer" onClick={() => routes.push('/auth/singup')} >
          SignUp
        </li>
      </PopoverContent>
    </Popover>
  )
}
