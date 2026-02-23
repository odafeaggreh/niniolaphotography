import { getAdminDb } from "@/lib/firebase-admin";
import type { Project } from "@/app/types";

export async function getProjects(): Promise<Project[]> {
  const db = getAdminDb();
  const snapshot = await db
    .collection("projects")
    .orderBy("order", "asc")
    .get();

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
