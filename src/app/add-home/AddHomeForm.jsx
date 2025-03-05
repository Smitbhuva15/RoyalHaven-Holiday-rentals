"use client"
import { useForm } from "react-hook-form";
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'
import { countries } from '@/config/countries'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { categories } from '@/config/categories'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AddHomeForm() {

  const [loading, setLoading] = useState(false);
  const routes = useRouter()
  const { data: session } = useSession()
  const userId = session?.user?.id

  const schema = yup.object().shape({
    title: yup.string().min(3, "Title must be at least 3 characters").required("Title is required"),
    country: yup.string().required("Please select your country"),
    state: yup.string().required("state is required"),
    city: yup.string().required("city is required"),
    price: yup.string().required("Price is required"),
    image: yup.mixed().required("Image is required"),
    description: yup.string().min(10, "Description must be at least 10 characters").required("Description is required"),

  }).required();


  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const handleFormError = () => {
    Object.values(errors).forEach((error) => {
      toast.error(error.message);
    });
  };

  const onSubmit = async (data) => {
    // console.log(data.country , "data")
    if (data.categories === false || data.categories.length === 0) {
     return toast.error("Please select at least one category")
    }

    if (data.image.length === 0) {
     return toast.error("Image is required")

    }
    setLoading(true)


    const newformdata = new FormData();

    newformdata.append("file", data.image[0])
    newformdata.append('upload_preset', 'my-uploads');
    const photourl = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_DOMAIN}/image/upload`, {
      method: 'POST',
      body: newformdata
    }).then(r => r.json());


    const image_url = photourl.secure_url

    const newData = {
      categories: data.categories,
      city: data.city,
      country: data.country,
      description: data.description,
      price: data.price,
      state: data.state,
      title: data.title,
      image_url,
      userId
    };

    try {

      const res = await fetch('/api/home/addhome', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      })

      if (res.ok) {
        const resmessage = await res.json()
        // console.log(resmessage)
        toast.success(resmessage.message)
        reset()
        routes.push('/dashboard/')
      }
      else {
        const errmessage = await res.json()
        // console.log(errmessage)
        toast.error(errmessage.message)

      }

    } catch (error) {
      toast.error("Internal Server Error!!")
      console.log(error)
    }
    finally{
      setLoading(false)
    }


  }


  return (
    <form className="mb-10" onSubmit={handleSubmit(onSubmit, handleFormError)}>
      <div className="grid grid-cols-1  lg:grid-cols-2  gap-4">
        <div className="mt-3">
          <Label htmlFor="title" >Title</Label>
          <Input
            placeholder="Enter title"
            id="title"
            className='mt-1'
            {...register("title")}
          />

        </div>

        <div className="mt-3">
          <Label htmlFor="countries">Countries</Label>
          <select
            className="outline-brand h-10 px-3 py-2 rounded-md w-full border mt-1"
            id="countries"

            {...register("country")}
          >
            <option value=""> -- Select Counrties --</option>
            {countries.map((item) => (
              <option key={item.label} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

        </div>

        <div className="mt-3">
          <Label htmlFor="state">State</Label>
          <Input placeholder="Enter state" id="state"
            className='mt-1'
            {...register("state")}
          />

        </div>

        <div className="mt-3">
          <Label htmlFor="city">City</Label>
          <Input placeholder="Enter city" id="city"
            className='mt-1'
            {...register("city")}
          />

        </div>

        <div className="mt-3">
          <Label htmlFor="price">Price</Label>
          <Input
            placeholder="Enter price"
            type="number"
            id="price"
            className='mt-1'
            {...register("price")}
          />

        </div>

        <div className="mt-3">
          <Label htmlFor="image">Image</Label>
          <Input
            type="file"
            placeholder="Enter image"
            id="image"
            accept="image/*"
            className='mt-1'
            {...register("image")}

          />

        </div>



      </div>
      <div className="mt-5">
        <Label htmlFor="description">Description</Label>
        <Textarea
          placeholder="Write your description here.."
          id="description"
          className='resize-none mt-1'

          {...register("description")}
        ></Textarea>

      </div>

      <div className="mt-5">
        <Label htmlFor="categories">Categories</Label>
        <div className="mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((item) => (
            <div className="items-top flex space-x-2" key={item.name}>
              <input
                type="checkbox"
                id={item.name}
                value={item.name}
                className="bg-red-100 border-red-300 text-red-500 focus:ring-red-200"
                {...register("categories")}
              />
              <label htmlFor={item.name} className="text-sm font-medium ">
                {item.name}
              </label>
            </div>
          ))}
        </div>

      </div>

      <div className="mt-5">
        {
          loading?
          (
            (<Button className="w-full "> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button>)

          )
          :
          (
            <Button className="bg-brand w-full">
            Submit
          </Button>
          )
        }
      
      </div>
    </form>
  )
}
