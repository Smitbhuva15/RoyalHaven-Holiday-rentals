"use client"
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useForm } from "react-hook-form";
import { Button } from '@/components/ui/button'
import SocialAuth from '@/components/Auth/SocialAuth'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { redirect, useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { Eye, EyeIcon, EyeOff, Loader2 } from 'lucide-react';




export default function Login() {
    const router = useRouter();
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    const { data: session, status } = useSession();


    useEffect(() => {
        if (status === "authenticated") {
            router.push("/");
        }
    }, [status, router]);


    if (status === "loading") return (
        <div className="fixed inset-0 flex justify-center items-center z-50">
            <Loader2 className="h-9 w-9 animate-spin text-gray-500" />
        </div>
    )


    if (status === "authenticated") return null;



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
            reset()
            router.push('/')
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
                <div className="mt-5 relative">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            id="password"
                            className="mt-2 pr-10"
                            {...register("password", { required: "Password is required" })}
                        />

                        <button
                            type="button"
                            onClick={() => { setShowPassword(!showPassword) }}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {errors.password && <span className="text-red-400 mt-1">{errors.password.message}</span>}
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
        </div>)

}
