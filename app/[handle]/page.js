import Link from "next/link"
import Image from "next/image"
import clientPromise from "@/lib/mongodb"
import { notFound } from "next/navigation";

export default async function Page({ params }) {
    
    const handle =  params.handle
    const client = await clientPromise;

    const db = client.db("linktree")
    const collection = db.collection("links")

    const item = await collection.findOne({handle: handle})

    if (!item){
        return notFound()
    }    

    return <>
        <div className="flex p-10  flex-col bg-[#e9c0e9] text-[#502274] items-center">
            <div className='  w-full'>
                <Link href="/" >
                    <Image className='cursor-pointer w-20 md:w-25 ' src="/logo2.svg" width={120} height={60} alt='logo' />
                </Link>
            </div>
            <div className="shadow bg-[#e9c0da] mt-7 rounded-xl w-[70vw] sm:w-[50vw] md:w-[28rem] mx-auto my-4 flex flex-col justify-center items-center p-1">
                <img className="rounded-full size-32 object-cover" src={item.pic} alt="photo" />
                <div className="font-bold text-2xl ">@{item.handle}</div>
                <div className="text-center mb-4 sm:max-w-140 px-4">{item.desc}</div>
                <div>
                    {item.links.map((item, index)=>{
                        return <div className="gap-9 flex flex-col " key={index}> 
                            <Link target="_blank" className="py-2 text-black hover:text-blue-400 my-2 bg-white px-3 shadow rounded-xl min-w-20 text-center font-bold hover:underline text-xl" href={item.link}>{item.linktext}</Link>
                        </div>
                    })}
                </div>
            </div>
        </div>
    
    </>
}
