import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const body = await request.json();
    
    if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return Response.json({ success: false, message: "Invalid email format" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("linktree");
    const collection = db.collection("loginemails");

    await collection.updateOne(
      { email: body.email },
      { $setOnInsert: { ...body } },
      { upsert: true }
    );
    return Response.json({ success: true, message: "Email stored" });
  } catch (error) {
    console.error("Error saving email:", error);
    return Response.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
