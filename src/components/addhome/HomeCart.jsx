import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function HomeCart({home}) {
  return (
    <Link href={`/`}>
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
         </div>
    </Link>
  )
}
