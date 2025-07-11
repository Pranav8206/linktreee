import clientPromise from "@/lib/mongodb";

export async function POST(request){
    const body = await request.json()
    
    const client = await clientPromise;

    const db = client.db("linktree")
    const collection = db.collection("links")

    const doc = await collection.findOne({handle: body.handle.toLowerCase() })

    if (doc){
      return Response.json({success: false, error: true, message: "Linktree already exist!"});
    }
    
    await collection.insertOne({ ...body, handle: body.handle.toLowerCase() })
    
    return Response.json({success: true, error: false, message: "Your LinkTree is created!"})
}