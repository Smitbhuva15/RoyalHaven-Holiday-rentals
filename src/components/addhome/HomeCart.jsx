import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import BookHome from './BookHome'

export default function HomeCart({ home }) {
  return (
    <div className="text-start">
      <Link href={`/Home/${home.id}`}>
        <div> {/* Wrapper inside Link */}
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

      <BookHome homeid={home.id} />
    </div>
  )
}
