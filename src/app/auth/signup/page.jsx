"use client"
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import Link from 'next/link';
import { Eye, EyeOff, Loader2 } from 'lucide-react';


export default function SignUp() {
    const routes = useRouter()
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const[showPassword,setShowPassword]=useState(false)
    const [loading, setLoading] = useState(false);
    const onSubmit = async (data) => {

       
        try {
            setLoading(true)
            const res = await fetch('/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            if (res.ok) {
                const resmessage = await res.json();
                toast.success(resmessage.message);
                reset()
                setTimeout(() => {
                    routes.push('/auth/login')
                }, 1000);
            }
            else {
                const errmessage = await res.json();
                if (errmessage.message === "Validation error") {
                    toast.error(errmessage.errors.issues[0].message)
                }
                else {
                    toast.error(errmessage.message);

                }
            }
        } catch (error) {
            console.log(error);
            toast.error("Internal Server Error ")
        }
        finally {
            setLoading(false)
        }
    }


    return (
        <div className='md:max-w-xl mx-auto mt-36 w-[90%]'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1 className="text-lg font-bold">Welcome to Airbnb</h1>
                <div className="mt-5">
                    <Label htmlFor="name">UserName</Label>
                    <Input
                        placeholder="Enter userName"
                        id="userName"
                        className="mt-2"
                        {...register("userName")}
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
                        {...register("email")}
                    />
                   
                </div>
                <div className="mt-5 relative">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            id="password"
                            className="mt-2 pr-10"
                        />
                        
                        <button
                            type="button"
                            onClick={()=>{setShowPassword(!showPassword)}}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                   
                </div>

                <div className="mt-5">
                    {loading ?
                        (
                            (<Button className="w-full "> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button>)
                        )
                        : (
                            <Button className="w-full bg-brand">Continue</Button>
                        )}

                </div>
                <div className="text-center py-2 text-lg font-bold text-black">

                </div>
            </form>

            <span className='text-sm'>Already have an account? <Link href="/auth/login" className='text-blue-600'>Login</Link></span>

        </div>
    )
}
