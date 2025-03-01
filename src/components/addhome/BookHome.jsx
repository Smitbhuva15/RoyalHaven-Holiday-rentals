
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

export default function BookHome({ homeid }) {
    return (
        <Link href={`/book-home/${homeid}`}>
            <Button className='mt-2 bg-brand'>
                Book Now
            </Button>
        </Link>
    )
}
