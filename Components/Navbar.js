"use client";
import React from 'react'
import Image from 'next/image'
import { usePathname } from "next/navigation";
import Link from 'next/link';

const Navbar = () => {
    const pathname = usePathname();

    if (pathname !== "/") return null;

  return (
    <>
        <nav className='absolute top-11 rounded-full w-[90vw] mx-[3vw] sm:mx-[4vw]
         bg-white pl-5 sm:pl-9 pr-3 flex items-center justify-between gap-5'>
            <div className='flex gap-10 py-5'>
                <div>
                    <Link href="/" >
                        <Image className='cursor-pointer pt-0 lg:pt-2 w-25 ' src="/logo.svg" width={120} height={60} alt='logo'/>
                    </Link>
                </div>
                <ul className='hidden lg:flex  text-black'>
                    <Link href='/'><li className='cursor-pointer hover:bg-gray-100 px-4 py-2 rounded-xl'>Products</li></Link>
                    <Link href='/'><li className='cursor-pointer hover:bg-gray-100 px-4 py-2 rounded-xl'>Templates</li></Link>
                    <Link href='/'><li className='cursor-pointer hover:bg-gray-100 px-4 py-2 rounded-xl'>Marketplace</li></Link>
                    <Link href='/'><li className='cursor-pointer hover:bg-gray-100 px-4 py-2 rounded-xl'>Learn</li></Link>
                    <Link href='/'><li className='cursor-pointer hover:bg-gray-100 px-4 py-2 rounded-xl'>Pricing</li></Link>
                </ul>
            </div>
            <div className='inline-flex items-center justify-center'>
                <Link href='/search'>
                    <span className='inline-flex items-center cursor-pointer sm:p-3 p-2 px-1.5  w-fit sm:rounded-xl font-medium sm:font-semibold text-base sm:text-[18px] bg-gray-200 hover:bg-gray-300 mr-2 sm:mr-4 md:mr-5 rounded-full'>
                        <Image className='size-5 ' src="/search.svg" width={10} height={10} alt='search'/>
                        <span className='hidden sm:block'>Search</span>
                    </span>
                </Link>
                <Link href='/login'>
                <span className='cursor-pointer sm:p-4 p-2 w-fit rounded-full font-medium sm:font-semibold text-base sm:text-[18px] bg-black text-white   '>Log in</span>
                </Link>
            </div>
        </nav>
        

    </>
  )
}

export default Navbar
