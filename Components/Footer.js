import React from 'react'
import Link from 'next/link'


const Footer = () => {
  return (
    <>
        <div className='z-10 bg-[#e9c0e9] text-[#502274] pt-3'>
            <hr className='    w-30 text-center container mx-auto' />
            <ul className='flex font-semibold gap-8 justify-center '>
                <Link  href="/search">
                    <li className="cursor-pointer hover:text-gray-900">Search</li>
                </Link>
                <Link  href="/">
                    <li className="cursor-pointer hover:text-gray-900">Home</li>
                </Link>
                
                <Link  href="mailto:pranavmavle8206@gmail.com">
                    <li className="cursor-pointer hover:text-gray-900">Contact</li>
                </Link>
            </ul>
            <hr className='text-black w-30 text-center container mx-auto' />
            <div>
                <div className="text-center text-[#502274] text-sm flex flex-col mt-1 sm:flex-row-reverse sm:justify-between sm:px-30 md:px-45 lg:px-60">
                    <div>&copy; {new Date().getFullYear()} Linktree_clone</div>
                    <div>Created by Pranav Mavle</div>
                </div>
            </div>
        </div>

    </>
  )
}

export default Footer