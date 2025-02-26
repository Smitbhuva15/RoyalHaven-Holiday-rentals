import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { countries } from '@/config/countries'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { categories } from '@/config/categories'

export default function AddHomeForm() {
    
  return (
   <form className="mb-10">
      <div className="grid grid-cols-1  lg:grid-cols-2  gap-4">
      <div className="mt-3">
          <Label htmlFor="title" >Title</Label>
          <Input
            placeholder="Enter title"
            id="title"
            className='mt-1'
          />
          <span className="text-red-500 font-bold">
            {/* {errors?.title?.message} */}
          </span>
        </div>

        <div className="mt-3">
          <Label htmlFor="countries">Countries</Label>
          <select
            className="outline-brand h-10 px-3 py-2 rounded-md w-full border mt-1"
            id="countries"

            // {...register("country")}
          >
            <option value=""> -- Select Counrties --</option>
            {countries.map((item) => (
              <option key={item.label} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <span className="text-red-500 font-bold">
            {/* {errors?.country?.message} */}
          </span>
        </div>

        <div className="mt-3">
          <Label htmlFor="state">State</Label>
          <Input placeholder="Enter state" id="state" 
           className='mt-1'
        //   {...register("state")} 
          />
          <span className="text-red-500 font-bold">
            {/* {errors?.state?.message} */}
          </span>
        </div>

        <div className="mt-3">
          <Label htmlFor="city">City</Label>
          <Input placeholder="Enter city" id="city" 
           className='mt-1'
        //   {...register("city")} 
          />
          <span className="text-red-500 font-bold">
            {/* {errors?.city?.message} */}
          </span>
        </div>

        <div className="mt-3">
          <Label htmlFor="price">Price</Label>
          <Input
            placeholder="Enter price"
            type="number"
            id="price"
             className='mt-1'
            // {...register("price")}
          />
          <span className="text-red-500 font-bold">
            {/* {errors?.price?.message} */}
          </span>
        </div>

        <div className="mt-3">
          <Label htmlFor="image">Image</Label>
          <Input
            type="file"
            placeholder="Enter image"
            id="image"
            accept="image/*"
             className='mt-1'
          />
          <span className="text-red-500 font-bold">
            {/* {errors?.image?.message} */}
          </span>
        </div>
         
      

      </div>
      <div className="mt-5">
        <Label htmlFor="description">Description</Label>
        <Textarea
          placeholder="Write your description here.."
          id="description"
          className='resize-none mt-1'
    
        //   {...register("description")}
        ></Textarea>
        <span className="text-red-500 font-bold">
          {/* {errors?.description?.message} */}
        </span>
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
              />
              <label htmlFor={item.name} className="text-sm font-medium ">
                {item.name}
              </label>
            </div>
          ))}
      </div>
      </div>

      <div className="mt-5">
        <Button className="bg-brand w-full">
          Submit
        </Button>
      </div>
   </form>
  )
}
