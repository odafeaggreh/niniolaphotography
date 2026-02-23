import { getProjects, getProjectCount, getAllCategories } from "@/lib/db/projects";
import PortfolioPageContent from "./PortfolioPageContent";

const ITEMS_PER_PAGE = 10;

type Props = {
  searchParams: Promise<{
    page?: string;
    category?: string;
  }>;
};

export default async function PortfolioPage({ searchParams }: Props) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const currentCategory = params.category || "all";

  const [projects, totalCount, categories] = await Promise.all([
    getProjects({
      category: currentCategory,
      limit: ITEMS_PER_PAGE,
      offset: (currentPage - 1) * ITEMS_PER_PAGE,
    }),
    getProjectCount(currentCategory),
    getAllCategories(),
  ]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary selection:bg-accent-gold selection:text-black font-sans">
      <PortfolioPageContent 
        projects={projects} 
        categories={["all", ...categories]}
        currentPage={currentPage}
        currentCategory={currentCategory}
        totalPages={totalPages}
      />
    </main>
  );
}
