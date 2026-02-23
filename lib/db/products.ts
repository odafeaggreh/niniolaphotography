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
  return {
    id: doc.id,
    slug: data.slug ?? doc.id,
    title: data.title ?? "",
    price: data.price ?? "",
    imageUrl: data.imageUrl ?? "",
    images: data.images ?? [],
    cloudinaryPublicId: data.cloudinaryPublicId ?? null,
    details: data.details ?? null,
    description: data.description ?? null,
    category: data.category ?? null,
    edition: data.edition ?? null,
    series: data.series ?? null,
    specs: data.specs ?? [],
    order: data.order ?? 0,
  } satisfies Product;
}
