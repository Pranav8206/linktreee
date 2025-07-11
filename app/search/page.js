'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link"
import Image from "next/image"


const HandleSearchPage = () => {
  const [handle, setHandle] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const checkHandleAndRedirect = async () => {
    setError('');

    if (!handle.trim()) {
      setError('Please enter a handle.');
      return;
    }

    try {
      const res = await fetch(`/api/checkhandle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ handle: handle.trim().toLowerCase() }),
      });

      const result = await res.json();

      if (result.success) {
        router.push(`/${handle.trim().toLowerCase()}`);
      } else {
        setError('Handle does not exist.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      checkHandleAndRedirect();
    }
  };

  return (
    <>
     <div className='p-10 w-full'>
        <Link href="/" >
            <Image className='cursor-pointer w-20 md:w-25 ' src="/logo2.svg" width={120} height={60} alt='logo' />
        </Link>
      </div>
    <div className="mt-20 flex  justify-center bg-[#e9c0e9] px-4">
     
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Find Your Linktree</h1>
        <input
          type="text"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter your handle"
          className="w-full border border-gray-300 px-4 py-2 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-[#c48dc4]"
        />
        {error && 
        <div className='flex items-center gap-3'>
            <p className="text-red-500 text-sm ">{error}</p>
            <p onClick={()=>{router.push("/generate")}} className="text-sm cursor-pointer hover:underline">Create new</p>
        </div>
        }
        <button
          onClick={checkHandleAndRedirect}
          className="w-full cursor-pointer bg-[#ad76ad] text-white py-2 rounded-md font-bold hover:bg-[#c48dc4] transition" type='button'
        >
          Go to Linktree
        </button>
      </div>
    </div>
    </>
  );
};

export default HandleSearchPage;
