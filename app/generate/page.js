"use client"
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

const Generate = () => {
  const searchParams = useSearchParams()

  // const [link, setlink] = useState("")
  // const [linktext, setLinktext] = useState("")
  const [links, setlinks] = useState([{ link: "", linktext: "" }])
  const [handle, sethandle] = useState(searchParams.get('handle'))
  const [pic, setpic] = useState("")
  const [desc, setdesc] = useState("")

  const handleChange = (index, link, linktext) => {
    setlinks((initialLinks) => {
      return initialLinks.map((item, i) => {
        if (i == index) {
          return { link, linktext }
        } else {
          return item
        }
      })
    })
  }

  const addLink = () => {
    setlinks(links.concat([{ link: "", linktext: "" }]))
  }



  const submitLinks = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "links": links,
      "handle": handle,
      "pic": pic,
      "desc": desc
    });

    console.log(raw)

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    const r = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/add`, requestOptions)
    const result = await r.json()
    if (result.success) {
      toast.success(result.message)
    } else {
      toast.error(result.message)
    }
  }


  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className='bg-[#e9c0e9] text-[#502274] p-10  grid-cols-1 grid sm:grid-cols-2 '>

        <div className="col1 flex justify-center items-center sm:items-end flex-col ">
          <div className='flex justify-start w-full'>
            <Link href="/" >
              <Image className='cursor-pointer w-20 md:w-25 ' src="/logo2.svg" width={120} height={60} alt='logo' />
            </Link>
          </div>

          <form onSubmit={(e) => {
            e.preventDefault();
            submitLinks();
          }} className='flex flex-col  '>
            <h1 className='font-bold text-4xl my-5 sm:my-8'>Create your Bittree</h1>
            <h2 className='font-semibold text-2xl '>Step 1: Claim your Handle</h2>
            <input value={handle} name='handle' onChange={e => { sethandle(e.target.value) }} className='px-4 py-2 my-2 mb-4 sm:mb-6 max-w-60 bg-white focus:outline-pink-500 rounded-full'
              type="text" placeholder='Choose a Handle' required />

            <h2 className='font-semibold text-2xl'>Step 2: Add Links</h2>

            {links && links.map((item, index) => {

              return <div key={index} className='grid grid-cols-2'>
                <input name='linktext' value={item.linktext} onChange={e => { handleChange(index, item.link, e.target.value) }} className='px-4 py-2 mr-2 my-2 max-w-60 bg-white focus:outline-pink-500 rounded-full' type="text" placeholder='Enter link text' />

                <input name='link' value={item.link} onChange={e => { handleChange(index, e.target.value, item.linktext) }} className='px-4 py-2  my-2 max-w-60 bg-white focus:outline-pink-500 rounded-full'
                  type="url" placeholder='Enter link' />
              </div>
            })}
            <button onClick={() => { addLink() }} className='p-4 py-0 pb-2 mb-4 sm:mb-6 max-w-40 bg-slate-900 text-white font-bold rounded-3xl cursor-pointer' ><span className='text-2xl py-0 my-0'>+</span>Add Link</button>

            <h2 className='font-semibold text-2xl'>Step 3: Add Picture and Description</h2>
            <div className='flex flex-col mb-4 sm:mb-6'>
              <input name='pic' value={pic} onChange={e => { setpic(e.target.value) }} className='px-4 py-2  my-2 bg-white focus:outline-pink-500 rounded-full' type="url" placeholder='Enter link to your Picture' required />

              <input name='desc' value={desc} onChange={e => { setdesc(e.target.value) }} className='px-4 py-2  my-2 bg-white focus:outline-pink-500 rounded-full ' type="text" placeholder='Enter description' />
            </div>
            <button disabled={pic == "" || handle == "" || links[0].linktext == ""} type='submit' className='disabled:bg-gray-300 px-5 py-2 mx-auto w-fit mt-2 bg-slate-900 text-white font-bold rounded-3xl cursor-pointer'>Create your LinkTree</button>
          </form>
        </div>




        <div className="col2 hidden sm:flex items-center justify-center w-full h-screen bg-[#E9C0E9]">
          <Image className='h-full object-contain' src="/generate.png" alt="Generate your links" />

        </div>
      </div>
    </>
  )
}

export default Generate