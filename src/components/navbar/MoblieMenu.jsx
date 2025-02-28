"use client"
import { Search, SlidersHorizontal } from 'lucide-react'
import { useSearchParams } from 'next/navigation';
import React from 'react'

export default function MoblieMenu() {

  const searchParams = useSearchParams();
  const country = searchParams.get("country");
  
  return (
    <div className="m-3 md:hidden">
    <div className="flex justify-between items-center  border rounded-3xl px-3 py-1 space-x-10 ">
      <div className="flex items-center space-x-4">
        <Search height={20} width={20} />
        <div className="flex flex-col">
          <span className="text-sm font-semibold">{`${country ? country : "Anywhere"}`}</span>
          <span className="text-xs">Any week . Add guest</span>
        </div>
      </div>

      <SlidersHorizontal className="text-right" />
    </div>
  </div>
  )
}
