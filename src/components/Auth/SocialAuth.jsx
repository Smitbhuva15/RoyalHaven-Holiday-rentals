import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'

export default function SocialAuth() {
  return (
    <div>
        <Button variant="outline" className="w-full mb-3" >
        <Image
          src="/images/google.png"
          width={25}
          height={25}
          alt="google"
          className="mr-5"
        />
        Continue with Google
      </Button>

      <Button variant="outline" className="w-full mb-2" >
        <Image
          src="/images/github.png"
          width={25}
          height={25}
          alt="google"
          className="mr-5"
        />
        Continue with Github
      </Button>
    </div>
  )
}
