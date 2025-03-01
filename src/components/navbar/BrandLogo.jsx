import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function BrandLogo() {
    return (
        <Link href='/'>
            <Image
                src="/images/royal-logo4.png"
                width={110}
                height={120}
                alt="logo"
                className="lg:block hidden ml-10"
            />

            <Image
                src="/images/royal-logo4.png"
                width={90}
                height={90}
                alt="logo"
                className="lg:hidden"
            />
        </Link>
    )
}
