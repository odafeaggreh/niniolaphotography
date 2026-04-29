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


  if (options?.offset) {
    query = query.offset(options.offset);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const snapshot = await query.get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    let images = data.images ?? [];
    
    // Legacy support: if images is empty but imageUrl exists, convert it
    if (images.length === 0 && data.imageUrl) {
      images = [{
        url: data.imageUrl,
        isPrimary: true,
        cloudinaryPublicId: data.cloudinaryPublicId || `legacy-${doc.id}`,
      }];
    }

    return {
      id: doc.id,
      title: data.title ?? "",
      category: data.category ?? "",
      images: images,
      description: data.description ?? "",
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
export async function addProject(project: Omit<Project, "id">): Promise<string> {
  const db = getAdminDb();
  const docRef = await db.collection("projects").add({
    ...project,
    createdAt: new Date().toISOString(),
  });
  return docRef.id;
}

export async function updateProject(id: string, project: Partial<Project>): Promise<void> {
  const db = getAdminDb();
  await db.collection("projects").doc(id).update(project);
}

export async function deleteProject(id: string): Promise<void> {
  const db = getAdminDb();
  await db.collection("projects").doc(id).delete();
}

export async function getProjectById(id: string): Promise<Project | null> {
  const db = getAdminDb();
  const doc = await db.collection("projects").doc(id).get();
  
  if (!doc.exists) return null;
  
  const data = doc.data()!;
  return {
    id: doc.id,
    title: data.title ?? "",
    category: data.category ?? "",
    images: data.images ?? [],
    description: data.description ?? "",
  } satisfies Project;
}
