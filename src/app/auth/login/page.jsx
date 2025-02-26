"use client"
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useForm } from "react-hook-form";
import { Button } from '@/components/ui/button'
import SocialAuth from '@/components/Auth/SocialAuth'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { redirect, useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';



export default function Login() {
    const routes = useRouter()
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const onSubmit = async (data) => {
        setLoading(true)
        const signinData = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false
        })


        if (!signinData.ok) {
            toast.error("Invaild Password or Email !!")
            setLoading(false)
        }
        else {
            toast.success("user Login SuccessFully!!")
             setLoading(false)
            setTimeout(() => {
                routes.push('/')
            }, 1000);
            reset()
        }


    }

    return (


        <div className='md:max-w-xl mx-auto mt-36 w-[90%]  '>
            <form onSubmit={handleSubmit(onSubmit)} >
                <h1 className="text-lg font-bold">Welcome to Airbnb</h1>

                <div className="mt-5">
                    <Label htmlFor="email" >Email</Label>
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        id="email"
                        className="mt-2"
                        {...register("email", { required: "Email Address is required" })}
                    />
                    <span className="text-red-400 mt-1">
                        {errors.email && <p>{errors.email?.message}</p>}

                    </span>
                </div>
                <div className="mt-5">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        placeholder="Enter your password"
                        type="password"
                        id="password"
                        className="mt-2"
                        {...register("password", { required: "password is required" })}
                    />
                    <span className="text-red-400 mt-1">
                        {errors.password && <p>{errors.password?.message}</p>}
                    </span>
                </div>

                <div className="mt-5">
                    {
                        <div className="mt-5">
                            {loading ?
                                (
                                    (<Button className="w-full "> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button>)
                                )
                                : (
                                    <Button className="w-full bg-brand">Continue</Button>
                                )}

                        </div>
                    }
                </div>
                <div className="text-center py-2 text-lg font-bold text-black">
                </div>
            </form>
            <span className='text-sm'>Don't have an account? <Link href="/auth/signup" className='text-blue-600'>Signup</Link></span>
        </div>
    )
}
