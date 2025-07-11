"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

const Page = () => {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const inputRef = useRef(null);

  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


  const openGenerate = (email, e) => {
    e.preventDefault();
    if (!isEmailValid(email)) {
      setEmailError("Please enter a valid email address.");
      inputRef.current?.focus();
    } else {
      setEmailError(""); // clear any previous error
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "email": email,
        "timestamp": new Date()
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      fetch(`${process.env.NEXT_PUBLIC_HOST}/api/add`, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));



      router.push("/generate");
    }
  }

  return (
    <div>
      <section className='flex p-10 md:flex-row bg-[#e9c0e9] text-[#502274]' >
        {/* left */}
        <div className=' md:w-1/2 w-full'>
          <Link href="/" >
            <Image className='cursor-pointer w-20 md:w-25 ' src="/logo2.svg" width={120} height={60} alt='logo' />
          </Link>
          <div className='flex flex-col gap-3 py-10 items-center'>
            <h1 className='text-3xl font-bold md:text-4xl md:font-extrabold'>Join Linktree</h1>
            <p className='text-gray-600 text-sm pb-10'>Sign up for free!</p>

            <form onSubmit={(e) => openGenerate(email, e)}  className="relative  flex flex-col items-center mx-5">
              <input ref={inputRef} id="name" value={email} onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) {
                  setEmailError("");
                }
              }}
                type="text" placeholder='Email' className="peer  sm:w-full w-1/2 px-4 pt-5 pb-2  rounded-md placeholder-transparent focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-100 placeholder:absolute placeholder:top-0  min-w-[80vw] sm:min-w-80 mx-auto " aria-required
              />
              <label
                htmlFor="name"
                className="absolute left-4 w-1/2 top-2 text-sm text-gray-100 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-gray-500"
              >
                Email
              </label>

              {emailError && (
                <p className="text-red-500 text-xs self-start ml-2">{emailError}</p>
              )}

              <button type='submit'  className=' mt-5 p-2 px-3 bg-gray-300 rounded-full text-base cursor-pointer font-semibold hover:shadow-sm'>Create account</button>
            </form>

            <div className='text-center break-words mx-10  text-gray-600 text-sm'>By clicking <span className='font-semibold'>Create account,</span> you agree to Linktree's <span className='underline'>privacy notice, T&Cs</span>  and to receive offers, news and updates.</div>
            <div className='hidden  flex-col items-center gap-4'>
              <h2>OR</h2>
              <button>Sign in with google</button>
              <button>Sign in with apple</button>
            </div>
          </div>
        </div>



        {/* right */}
        <div className='hidden md:block relative h-[100vh] md:w-1/2'>
          <Image className='w-full h-full object-cover' src="/imageLogin.webp" alt='loginpage' width={600} height={0} />
        </div>
      </section>
    </div>
  )
}

export default Page
