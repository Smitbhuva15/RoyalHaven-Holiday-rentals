import React from 'react'
import { categories } from '@/config/categories'
import Image from 'next/image'

export default function Categories() {
    return (
        <div className="flex items-center space-x-8 px-10 my-3 overflow-x-auto whitespace-nowrap scroll-smooth pb-4">
            {categories.map((item) => (
                <div
                    className="flex justify-center flex-col items-center cursor-pointer "
                    key={item.name}

                >
                    <Image src={item.icon} width={25} height={25} alt={item.name} />
                    <span
                        className={` text-sm` }
                    >
                        {item.name}
                    </span>
                </div>
            ))}
        </div>
    )
}
