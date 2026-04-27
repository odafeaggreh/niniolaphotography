import { NextRequest, NextResponse } from "next/server";
import { getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { Timestamp } from "firebase-admin/firestore";

export async function POST(request: NextRequest) {
  try {
    const { uid, email, setupKey } = await request.json();
    if (!uid || !setupKey || !email) {
      return NextResponse.json({ error: "UID, email and setupKey are required" }, { status: 400 });
    }

    

    // Security check: require a secret setup key from environment variables
    if (setupKey !== process.env.ADMIN_SETUP_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
