import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  const { handle } = await request.json();

  const client = await clientPromise;
  const db = client.db("linktree");
  const collection = db.collection("links");

  const doc = await collection.findOne({ handle });

  if (doc) {
    return Response.json({ success: true });
  } else {
    return Response.json({ success: false });
  }
}
