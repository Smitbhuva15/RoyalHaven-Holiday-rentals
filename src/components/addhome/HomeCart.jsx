import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

export default function HomeCart({home}) {
  return (
    <Link href={`/Home/${home.id}`}>
         <div className="text-start">
         <Image
          src={home?.image_url}
          width={100}
          height={100}
          alt={home.title}
          className="w-full h-[300px] rounded-xl object-cover object-center"
          unoptimized
        />
         <p className="font-semibold capitalize">
          {home?.city}, {home?.country}
        </p>
        <p className='text-gray-500 capitalize'>{home?.title}</p>
        <p className='font-semibold'>₹ {home?.price} night</p>
        <Link href={`/book-home/${home.id}`}>
        <Button className='mt-2 bg-brand'>
          Book Now
        </Button>
        </Link>
         </div>
    </Link>
  )
}
