import { NextRequest, NextResponse } from "next/server";
import { updateTestimonial, deleteTestimonial } from "@/lib/db/testimonials";
import { getAdminAuth } from "@/lib/firebase-admin";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
    const data = await request.json();
    await updateTestimonial(id, data);

    return NextResponse.json({ status: "success" });
  } catch (error: any) {
    console.error("Update testimonial error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteTestimonial(id);
    return NextResponse.json({ status: "success" });
  } catch (error: any) {
    console.error("Delete testimonial error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
