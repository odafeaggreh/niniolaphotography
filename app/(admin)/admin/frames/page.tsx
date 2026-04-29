import { getProducts, getProductCount } from "@/lib/db/products";
import { FramesClient } from "./FramesClient";

export const dynamic = "force-dynamic";

export default async function AdminFramesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const limit = 10;
  const offset = (currentPage - 1) * limit;

  const [products, totalCount] = await Promise.all([
    getProducts({ limit, offset }),
    getProductCount(),
  ]);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <FramesClient 
        initialFrames={products} 
        totalCount={totalCount}
        currentPage={currentPage}
        pageSize={limit}
      />
    </div>
  );
}
