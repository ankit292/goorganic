import Link from 'next/link'
import React, {useEffect} from 'react'
import { useRouter } from "next/router";

export default function forgot() {
  const router = useRouter();
  useEffect(()=>{
    if(localStorage.getItem('token')){
      router.push('/')
    }

  },[])
  return (
    <div className="flex flex-wrap">
      <div className="flex w-full flex-col">
        
        <div className="lg:w-[28rem] mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-0">
          <p className="text-center text-3xl font-bold">Forgot Password</p>
          
          
          <form className="flex flex-col pt-3 md:pt-8">
            <div className="flex flex-col pt-4">
              <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                <input
                  type="email"
                  id="login-email"
                  className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Email"
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="mt-5 w-full rounded-lg bg-gray-900 px-4 py-2 text-center text-base font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2"
            >
              Continue
            </button>
            
          </form>
          <div className="py-12 text-center">
            <p className="whitespace-nowrap text-gray-600">
              
              <Link
                href="/login"
                className="underline-offset-4 font-semibold text-gray-900 underline"
              >
                Sign in for free.
              </Link>
            </p>
          </div>
        </div>
      </div>
      
    </div>
  )
}
