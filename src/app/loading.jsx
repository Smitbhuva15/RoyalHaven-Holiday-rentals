import { Loader2 } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Loading() {
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col">
      <Image src="/images/logo.png" width={300} height={300} alt="logo" />
      <h1 className="mt-3 text-2xl">
      <Loader2 className="h-9 w-9 animate-spin text-gray-500" />
      </h1>
    </div>
  );
}
