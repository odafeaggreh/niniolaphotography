import { getProducts, getProductCount } from "@/lib/db/products";
import FramesPageContent from "./FramesPageContent";

const ITEMS_PER_PAGE = 12;

type Props = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function FramesPage({ searchParams }: Props) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  const [products, totalCount] = await Promise.all([
    getProducts({
      limit: ITEMS_PER_PAGE,
      offset: (currentPage - 1) * ITEMS_PER_PAGE,
    }),
    getProductCount(),
  ]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary selection:bg-accent-gold selection:text-black font-sans">
      <FramesPageContent 
        products={products} 
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </main>
  );
}
