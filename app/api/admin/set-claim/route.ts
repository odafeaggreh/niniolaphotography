import { NextRequest, NextResponse } from "next/server";
import { getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { Timestamp } from "firebase-admin/firestore";
import { enforceRateLimit } from "@/lib/security/rate-limit";

async function verifyAdmin(request: NextRequest) {
  const sessionCookie = request.cookies.get("__session")?.value;
  if (!sessionCookie) return null;

  try {
    const auth = getAdminAuth();
    const decodedToken = await auth.verifySessionCookie(sessionCookie, true);
    return decodedToken.admin ? decodedToken : null;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  const rateLimitResponse = enforceRateLimit(request, {
    key: "admin-set-claim",
    limit: 5,
    windowMs: 15 * 60 * 1000,
  });
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  const admin = await verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { uid, email } = await request.json();
    if (!uid || !email) {
      return NextResponse.json({ error: "UID and email are required" }, { status: 400 });
    }

    const auth = getAdminAuth();
    const db = getAdminDb();

    // Set custom claims
    await auth.setCustomUserClaims(uid, { admin: true });

    // Save user data to Firestore
    await db.collection("users").doc(uid).set({
      uid,
      email,
      role: "admin",
      createdAt: Timestamp.now(),
    }, { merge: true });

    return NextResponse.json({ 
      message: `Successfully promoted user ${uid} to admin and saved to database.`,
      status: "success" 
    });
  } catch (error: any) {
    console.error("Set custom claim error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
