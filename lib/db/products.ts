import { getAdminDb } from "@/lib/firebase-admin";
import type { Product } from "@/app/types";

export async function getProducts(): Promise<Product[]> {
  const db = getAdminDb();
  const snapshot = await db
    .collection("products")
    .orderBy("order", "asc")
    .get();

  return snapshot.docs.map((doc) => docToProduct(doc));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const db = getAdminDb();
  const snapshot = await db
    .collection("products")
    .where("slug", "==", slug)
    .limit(1)
    .get();

  if (snapshot.empty) return null;
  return docToProduct(snapshot.docs[0]);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function docToProduct(doc: any): Product {
  const data = doc.data();
  let images = data.images ?? [];

  // Legacy support: if images is a string array, convert it
  if (images.length > 0 && typeof images[0] === "string") {
    images = images.map((url: string, index: number) => ({
      url,
      isPrimary: index === 0,
      cloudinaryPublicId: `legacy-${doc.id}-${index}`,
    }));
  } else if (images.length === 0 && data.imageUrl) {
    // Legacy support: if images is empty but imageUrl exists
    images = [{
      url: data.imageUrl,
      isPrimary: true,
      cloudinaryPublicId: data.cloudinaryPublicId || `legacy-${doc.id}`,
    }];
  }

  return {
    id: doc.id,
    slug: data.slug ?? doc.id,
    title: data.title ?? "",
    price: data.price ?? "",
    images: images,
    description: data.description ?? "",
    category: data.category ?? null,
    edition: data.edition ?? null,
    series: data.series ?? null,
    specs: data.specs ?? [],
    order: data.order ?? 0,
    status: data.status ?? "available",
  } satisfies Product;
}
export async function addProduct(product: Omit<Product, "id">): Promise<string> {
  const db = getAdminDb();
  const docRef = await db.collection("products").add(product);
  return docRef.id;
}

export async function updateProduct(id: string, product: Partial<Product>): Promise<void> {
  const db = getAdminDb();
  await db.collection("products").doc(id).update(product);
}

export async function deleteProduct(id: string): Promise<void> {
  const db = getAdminDb();
  await db.collection("products").doc(id).delete();
}
