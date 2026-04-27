import { NextRequest, NextResponse } from "next/server";
import { addProject } from "@/lib/db/projects";
import { getAdminAuth } from "@/lib/firebase-admin";

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
    const id = await addProject(data);

    return NextResponse.json({ id, status: "success" });
  } catch (error: any) {
    console.error("Add project error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
