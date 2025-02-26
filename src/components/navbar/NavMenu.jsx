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
  useEffect(() => {
    console.log("Session status:", status);
    console.log("Session data:", session);
  }, [session, status]);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <MenuIcon className="cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="mr-6 ">

        {
          session !== null ?
            (
              <li className="mb-2 hover:bg-gray-200 rounded-md p-2 cursor-pointer" onClick={() => signOut()} >
                Signout
              </li>
            )
            :
            (<>
              <li className="mb-2 hover:bg-gray-200 rounded-md p-2 cursor-pointer" onClick={() => routes.push('/auth/login')} >
                SignIn
              </li>
              <li className="mb-2 hover:bg-gray-200 rounded-md p-2 cursor-pointer" onClick={() => routes.push('/auth/signup')} >
                SignUp
              </li>
            </>
            )
        }

      </PopoverContent>
    </Popover>
  )
}
