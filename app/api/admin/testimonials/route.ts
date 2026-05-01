import { NextRequest, NextResponse } from "next/server";
import { addTestimonial } from "@/lib/db/testimonials";
import { getAdminAuth } from "@/lib/firebase-admin";
import { revalidatePath } from "next/cache";
import { enforceRateLimit } from "@/lib/security/rate-limit";

export async function POST(request: NextRequest) {
  const rateLimitResponse = enforceRateLimit(request, {
    key: "admin-testimonials-create",
    limit: 20,
    windowMs: 60 * 1000,
  });
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

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
    const id = await addTestimonial(data);
    
    revalidatePath("/");

    return NextResponse.json({ id, status: "success" });
  } catch (error: any) {
    console.error("Add testimonial error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
