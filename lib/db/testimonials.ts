import { getAdminDb } from "@/lib/firebase-admin";
import type { Testimonial } from "@/app/types";

export async function getTestimonials(): Promise<Testimonial[]> {
  const db = getAdminDb();
  const snapshot = await db
    .collection("testimonials")
    .orderBy("order", "asc")
    .get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name ?? "",
      role: data.role ?? "",
      text: data.text ?? "",
      rating: data.rating ?? 5,
      avatarUrl: data.avatarUrl ?? null,
      order: data.order ?? 0,
    } satisfies Testimonial;
  });
}
