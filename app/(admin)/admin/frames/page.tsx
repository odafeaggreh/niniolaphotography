import { getProducts } from "@/lib/db/products";
import { FramesClient } from "./FramesClient";

export const dynamic = "force-dynamic";

export default async function AdminFramesPage() {
  const frames = await getProducts();

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <FramesClient initialFrames={frames} />
    </div>
  );
}
