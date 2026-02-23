import { getAdminDb } from "@/lib/firebase-admin";
import type { Project } from "@/app/types";

export async function getProjects(options?: {
  category?: string;
  limit?: number;
  offset?: number;
}): Promise<Project[]> {
  const db = getAdminDb();
  let query: FirebaseFirestore.Query = db.collection("projects");

  if (options?.category && options.category !== "all") {
    query = query.where("category", "==", options.category);
  }

  query = query.orderBy("order", "asc");

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
      title: data.title ?? "",
      category: data.category ?? "",
      height: data.height ?? "h-64",
      imageUrl: data.imageUrl ?? "",
      cloudinaryPublicId: data.cloudinaryPublicId ?? null,
      order: data.order ?? 0,
    } satisfies Project;
  });
}

export async function getProjectCount(category?: string): Promise<number> {
  const db = getAdminDb();
  let query: FirebaseFirestore.Query = db.collection("projects");

  if (category && category !== "all") {
    query = query.where("category", "==", category);
  }

  const snapshot = await query.count().get();
  return snapshot.data().count;
}

export async function getAllCategories(): Promise<string[]> {
  const db = getAdminDb();
  const snapshot = await db.collection("projects").get();
  const categories = new Set<string>();
  snapshot.docs.forEach((doc) => {
    const cat = doc.data().category;
    if (cat) categories.add(cat);
  });
  return Array.from(categories).sort();
}
