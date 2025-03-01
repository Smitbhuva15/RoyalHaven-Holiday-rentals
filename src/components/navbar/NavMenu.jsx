"use client";

import React, { useEffect } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { MenuIcon } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';


export default function NavMenu() {
  const { data: session, status } = useSession();
  const routes = useRouter()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <MenuIcon className="cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="mr-6 ">

        {
          session !== null ?
            (


              <ul className="list-none space-y-2">
                <li
                  className="p-2  pl-4  rounded-md cursor-pointer  bg-gray-100 hover:bg-gray-300 transition duration-200"
                  onClick={() => routes.push('/dashboard')}
                >
                  dashboard
                </li>
                <li
                  className="p-2 pl-4 rounded-md cursor-pointer bg-gray-100 hover:bg-gray-300 transition duration-200"
                  onClick={() => signOut()}
                >
                  Signout
                </li>
                
              </ul>

            )
            :
            (<>
              <ul className="list-none space-y-2">
                <li
                  className="p-2  pl-4  rounded-md cursor-pointer bg-gray-100 hover:bg-gray-300 transition duration-200"
                  onClick={() => routes.push('/auth/login')}
                >
                  Sign In
                </li>
                <li
                  className="p-2  pl-4 rounded-md cursor-pointer bg-gray-100 hover:bg-gray-300 transition duration-200"
                  onClick={() => routes.push('/auth/signup')}
                >
                  Sign Up
                </li>
              </ul>

            </>
            )
        }

      </PopoverContent>
    </Popover>
  )
}
