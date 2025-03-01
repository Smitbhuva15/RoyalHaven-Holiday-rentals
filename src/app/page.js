import NavBar from "@/components/navbar/NavBar";
import Image from "next/image";

import Categories from "@/components/category/Categories";
import { Loader2 } from "lucide-react";
import HomeCart from "@/components/addhome/HomeCart";





const getAllHome = async (country,categories) => {
  

  try {
    const res = await fetch(`http://localhost:3000/api/home/allhome?country=${country}&categories=${categories}`, { cache: 'no-store' });

    if (!res.ok) {
      return "Failed to fetch data";
    }

    return await res.json();
  } catch (error) {
    console.log("Error fetching data:", error);
    return "fail to fetch data";
  }
};

export default async function Home({searchParams}) {

  const country= searchParams.country;
  const categories=searchParams.categories
  
  var loading = true;

  const data = await getAllHome(country,categories);

  if (data.homes) {
    loading = false
  }

  return (
    <div className="mb-10">
      <NavBar />
      <Categories />

      {
        loading
          ?
          (
            <div className="fixed inset-0 flex justify-center items-center z-50">
              <Loader2 className="h-9 w-9 animate-spin text-gray-500" />
            </div>
          )
          :
          (
            data?.homes.length > 0 ?
              (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 px-10">
                  {data?.homes.map((item) => (
                    <HomeCart home={item} key={item.id} />
                  ))
                  }
                </div>
              )
              :
              (
                <div className="text-center mt-4">
                  <h1 className="text-brand font-bold text-2xl">No Royal Haven found!</h1>
                </div>
              )

          )


      }

    </div>
  );
}
