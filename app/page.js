"use client"
import Image from "next/image";
import Link from "next/link";
import { useState , useRef } from "react";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter()
  const [text, settext] = useState("")
  const [textError, settextError] = useState("");
  const inputRef = useRef(null);

  const createLinktree = () => {
    if (text == ""){
      settextError("Please Enter Handle")
      inputRef.current?.focus();
    } else {
      router.push(`/generate?handle=${text}`)
    }
  }
  

  return (
<main className="min-h-[200vh] bg-[#254f1a]">

  {/* s1 */}
  <section className="pt-[30vh] px-5 sm:px-10 md:px-15 py-15 flex sm:flex-row bg-[#254f1a] flex-col justify-center items-center min-w-full ">
    <div>
      <h1 className="text-[#d2e823]">
        <p className="text-5xl sm:text-7xl font-extrabold -tracking-wider leading-12 sm:leading-16">Everything you are. In one, simple link in bio.</p>
      </h1>
      <p className="text-white text-[16px] py-5 font-semibold">
        Join 70M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.
      </p>
      <div className="py-3 flex flex-wrap flex-initial items-start justify-start ">
        <span className=" w-fit ">
          <input value={text} onChange={(e)=>{
            settext(e.target.value);
             if (textError) {
                  settextError("")
                }}} className="bg-white mr-1 rounded-md p-4 placeholder:font-medium" type="text" placeholder="Enter Your Handle"/>
          {textError && <p className="text-red-500 text-xs self-start ml-2">{textError}</p>}
        </span>
        <button onClick={()=>createLinktree()} title="Enter your handle" className="mt-1 px-4 py-3 sm:py-4 font-bold rounded-full sm:min-w-fit w-fit sm:ml-2 bg-[#e9c0e9] hover:bg-[#e8b4e8] cursor-pointer">Claim Your Linktree</button>
      </div>
    </div>
    <div className="w-full flex sm:min-w-[40vw] md:min-w-[50vw] justify-center">
      <img className="h-[50vh] sm:h-[90vh] w-fit" src="/image.png" alt="image" />
    </div>
  </section>




  {/* s2 */}

  <section className="bg-[#e9c0e9] px-5 sm:px-10 md:px-15 py-15 flex sm:flex-row-reverse flex-col justify-center items-center min-w-full">
    <div>
      <h1 className="text-[#502274]">
        <p className="text-4xl sm:text-6xl font-extrabold -tracking-wider leading-10 sm:leading-16">Create and customize your Linktree in minutes</p>
      </h1>
        <p className="text-black text-[16px] py-5 font-semibold">
        Connect your TikTok, Instagram, Twitter, website, store, videos, music, podcast, events and more. It all comes together in a link in bio landing page designed to convert.
        </p>
      <div>
        <Link href="/login">
        <button className="font-semibold rounded-full bg-[#502274] hover:bg-[#462d59] text-white cursor-pointer px-6 py-3 sm:py-4 sm:px-4 w-fit sm:ml-2 ">Get started for free</button>
        </Link>
      </div>
    </div>
    <div className="w-full flex sm:min-w-[40vw] md:min-w-[50vw] justify-center">
      <img className="h-[50vh] sm:h-[90vh] w-fit" src="/image2.png" alt="image"/>
    </div>
  </section>




  {/* s3 */}
  <section>

  </section>





</main>
    
  );
}
