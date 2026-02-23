import { getAdminDb } from "@/lib/firebase-admin";
import type { ServiceData } from "@/app/types";

export async function getServices(): Promise<ServiceData[]> {
  const db = getAdminDb();
  const snapshot = await db
    .collection("services")
    .orderBy("order", "asc")
    .get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      iconName: data.iconName ?? "Camera",
      title: data.title ?? "",
      description: data.description ?? "",
      price: data.price ?? "",
      order: data.order ?? 0,
    } satisfies ServiceData;
  });
}
