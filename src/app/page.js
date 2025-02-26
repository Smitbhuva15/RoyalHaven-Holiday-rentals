import NavBar from "@/components/navbar/NavBar";
import Image from "next/image";

import Categories from "@/components/category/Categories";

export default function Home() {
  return (
   <div>
     <NavBar />
     <Categories />
   </div>
  );
}
