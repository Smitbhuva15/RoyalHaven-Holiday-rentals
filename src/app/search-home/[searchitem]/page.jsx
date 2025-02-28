import HomeCart from '@/components/addhome/HomeCart'
import NavBar from '@/components/navbar/NavBar'

import React, { cache } from 'react'

const gethomes = async (searchQuery) => {

  try {
    const res = await fetch(`http://localhost:3000/api/search/${searchQuery}`, { cache: 'no-store' })

    if (!res.ok) {
      return "fail to fetch data"
    }

    return await res.json()
  } catch (error) {
    return "fail to fetch data--error"
  }
}

export default async function page({ params }) {
  const searchQuery = params.searchitem;
  console.log(searchQuery);

  const data = await gethomes(searchQuery);

  console.log(data.homes)
  return (
    <div>
      <NavBar />
      {
        data?.homes.length > 0 ?
          (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 px-10 mt-10">
              {data?.homes.map((item) => (
                <HomeCart home={item} key={item.id} />
              ))
              }
            </div>
          )
          :
          (
            <div className="text-center mt-4">
              <h1 className="text-brand font-bold text-2xl">No suitable homes were found based on your interest !!</h1>
            </div>
          )
      }

    </div>
  )
}
