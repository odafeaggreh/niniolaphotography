import { NextRequest, NextResponse } from "next/server";
import { addProduct } from "@/lib/db/products";
import { getAdminAuth } from "@/lib/firebase-admin";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get("__session")?.value;
    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const auth = getAdminAuth();
    const decodedToken = await auth.verifySessionCookie(sessionCookie, true);
    if (!decodedToken.admin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const data = await request.json();
    // Ensure slug is generated if not provided
    if (!data.slug) {
      data.slug = data.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    }
    
    const id = await addProduct(data);
    
    revalidatePath("/");
    revalidatePath("/frames");

    return NextResponse.json({ id, status: "success" });
  } catch (error: any) {
    console.error("Add frame error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
