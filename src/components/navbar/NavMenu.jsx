"use client";

import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { MenuIcon } from 'lucide-react'
import Login from '../Auth/Login'
import Signup from '../Auth/Signup'
   

export default function NavMenu() {
  return (
    <Popover>
    <PopoverTrigger asChild>
    <MenuIcon className="cursor-pointer" />
    </PopoverTrigger>
    <PopoverContent className="mr-6 ">
    <ui>
        <Login />
        <Signup />
    </ui>
    </PopoverContent>
  </Popover>
  )
}
