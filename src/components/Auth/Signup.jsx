"use client"
import React from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import SocialAuth from './SocialAuth'


export default function SignUp() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <li className="mb-2 hover:bg-gray-200 rounded-md p-2 cursor-pointer"   >
                    SignUp
                </li>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader asChild>
                    <DialogTitle>

                        <div className="flex justify-between items-center">
                            <span>SingUp</span>
                        </div>
                    </DialogTitle>

                </DialogHeader>
                <div>
                    <form >
                        <h1 className="text-lg font-bold">Welcome to Airbnb</h1>
                        <div className="mt-5">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                placeholder="Enter your name"
                                id="name"
                                className="mt-2"
                            />
                            <span className="text-red-400">

                            </span>
                        </div>

                        <div className="mt-5">
                            <Label htmlFor="email" >Email</Label>
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                id="email"
                                className="mt-2"
                            />
                            <span className="text-red-400">

                            </span>
                        </div>
                        <div className="mt-5">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                placeholder="Enter your password"
                                type="password"
                                id="password"
                                className="mt-2"
                            />
                            <span className="text-red-400">

                            </span>
                        </div>
                        <div className="mt-5">
                            <Label htmlFor="password">Confirm Password</Label>
                            <Input
                                placeholder="Enter your cpassword"
                                type="password"
                                id="cpassword"
                                className="mt-2"
                            />
                            <span className="text-red-400">

                            </span>
                        </div>

                        <div className="mt-5">
                            <Button className="w-full bg-brand">Continue</Button>
                        </div>
                        <div className="text-center py-2 text-lg font-bold text-black">
                            -- OR --
                        </div>
                    </form>
                    <SocialAuth />
                </div>
            </DialogContent>
        </Dialog>
    )
}
