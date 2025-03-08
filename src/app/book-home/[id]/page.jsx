"use client"
import NavBar from '@/components/navbar/NavBar'
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import useSWR from 'swr';
import { Button } from '@/components/ui/button';
import DatePicker from '../DatePicker';
import PaymentTabel from '../PaymentTabel';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';



export default function page() {
  const params = useParams()
  const id = params.id
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data: session, status } = useSession();

  const { data, error, isLoading } = useSWR(`/api/home/${id}`, fetcher)

  const [userDataId, setUserDataId] = useState();

  const getuserData = async () => {
    const res = await fetch(`/api/user/${session?.user?.id}`, {
      method: 'GET'
    })
    const messData = await res.json();
    setUserDataId(messData?.user?.id);
  }

  useEffect(() => {
    getuserData();
  }, [session])


  const routes = useRouter()

  const [dateDifference, setDateDifference] = useState()
  const [totalBeforeDiscount, setTotalBeforeDiscount] = useState(data?.home?.price)
  const [discount, setDiscount] = useState(0)
  const [total, setTotal] = useState(0)
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()



  useEffect(() => {
    if (status === 'unauthenticated') {
      routes.push('/auth/login')
    }

  }, [status, routes])


  if (status === "loading") return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <Loader2 className="h-9 w-9 animate-spin text-gray-500" />
    </div>
  )

  if (status === 'unauthenticated') return null


  const daydifferencevalue = (value, starting, ending) => {
    setStartDate(starting)
    setEndDate(ending)
    setDateDifference(value + 1)
    setTotalBeforeDiscount(data?.home?.price * (value + 1))
    setDiscount(Math.floor((data?.home?.price * (value + 1)) * 0.075))
    setTotal((data?.home?.price * (value + 1)) - (Math.floor((data?.home?.price * (value + 1)) * 0.075)))
  }

  const handelorder = async (response, orderId, amount) => {


    const date1 = new Date(startDate);
    const date2 = new Date(endDate);

    date1.setDate(date1.getDate() + 1);
    date2.setDate(date2.getDate() + 1);

    const starting_date = date1.toISOString();
    const ending_date = date2.toISOString();

    const obj1 = {
      place: data?.home?.image_url,
      amount: amount / 100,
      starting_date: starting_date,
      ending_date: ending_date,
      userId: userDataId,
      orderId: response?.razorpay_order_id

    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/book-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

        },
        body: JSON.stringify(obj1)
      })

      if (res.ok) {
        console.log("order success!!")
      }
      else {
        console.log("order is unsuccess!!")
      }


    } catch (error) {
      console.log(error, "error found")
    }





  }


  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (total) => {

    const r1 = await loadRazorpayScript();

    if (!r1) {
      toast.error("Failed to load Razorpay. Check your internet connection.");
      return;
    }

    try {

      const res = await fetch(`/api/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount: total })
      })

      if (res.ok) {

        const data = await res.json();
        const order = data.order;



        const options = {
          key: process.env.NEXT_PUBLIC_PAYMENT_KEY_ID,
          amount: order.amount,
          currency: "INR",
          name: "Royal Haven",
          description: "Booking Your House Confirm!!",
          order_id: order.id,
          image: `/images/royal-logo4.png`,
          handler: function (response) {
            handelorder(response, order.id, order.amount)
            routes.push('/confirm-order');
            toast.success("Payment Successful! Payment ID: " + response.razorpay_payment_id);

          },
          prefill: {
            name: `${session?.user?.name}`,
            email: `${session?.user?.email}`,
            contact: "9358965812",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();


      }
      else {
        const errmessage = await res.json();
        console.log(errmessage)
      }

    } catch (error) {
      console.log("client side payment internal server error", error)
    }
  }

  return (
    <div>
      <NavBar />
      {
        isLoading ?
          (
            <div className="fixed inset-0 flex justify-center items-center z-50">
              <Loader2 className="h-9 w-9 animate-spin text-gray-500" />
            </div>

          )
          :
          (
            <div className='flex container mt-6 justify-around md:flex-row flex-col'>
              {/* left side */}
              <div className='md:w-1/2 '>
                <div className='md:text-5xl font-bold text-brand text-center text-3xl'>
                  Select date
                </div>
                <div className='flex justify-center'>
                  <div className=''>
                    <DatePicker daydifferencevalue={daydifferencevalue} />
                  </div>
                </div>
              </div>
              {/* right side */}

              <div className='md:w-1/2 mb-10 mt-10'>
                <div className='flex justify-center'>
                  <Image src={data?.home?.image_url}
                    alt='home photo'
                    width={300}
                    height={100}
                    className='w-3/4 '
                    unoptimized
                  />
                </div>

                <PaymentTabel dateDifference={dateDifference} totalBeforeDiscount={totalBeforeDiscount} discount={discount} total={total}
                  baseprice={data?.home?.price} />

                <div className='flex justify-center pt-4'>
                  <Button className='bg-brand px-16' onClick={() => { handlePayment(total) }}>
                    Pay Now
                  </Button>
                </div>


              </div>
            </div>
          )
      }

    </div>
  )
}
