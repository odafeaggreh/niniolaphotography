import { getAdminDb } from "@/lib/firebase-admin";
import type { Testimonial } from "@/app/types";

export async function getTestimonials(options?: {
  limit?: number;
  offset?: number;
}): Promise<Testimonial[]> {
  const db = getAdminDb();
  let query: FirebaseFirestore.Query = db.collection("testimonials");

  if (options?.offset) {
    query = query.offset(options.offset);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const snapshot = await query.get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name ?? "",
      role: data.role ?? "",
      text: data.text ?? "",
      rating: data.rating ?? 5,
      avatarUrl: data.avatarUrl ?? null,
    } satisfies Testimonial;
  });
}

export async function getTestimonialCount(): Promise<number> {
  const db = getAdminDb();
  const snapshot = await db.collection("testimonials").count().get();
  return snapshot.data().count;
}
export async function addTestimonial(testimonial: Omit<Testimonial, "id">): Promise<string> {
  const db = getAdminDb();
  const docRef = await db.collection("testimonials").add({
    ...testimonial,
    createdAt: new Date().toISOString(),
  });
  return docRef.id;
}

export async function updateTestimonial(id: string, testimonial: Partial<Testimonial>): Promise<void> {
  const db = getAdminDb();
  await db.collection("testimonials").doc(id).update(testimonial);
}

export async function deleteTestimonial(id: string): Promise<void> {
  const db = getAdminDb();
  await db.collection("testimonials").doc(id).delete();
}
