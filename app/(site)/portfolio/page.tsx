import type { Metadata } from "next";

import { getProjects, getProjectCount, getAllCategories } from "@/lib/db/projects";
import PortfolioPageContent from "./PortfolioPageContent";
import { absoluteUrl, buildBreadcrumbSchema, buildMetadata } from "@/lib/seo";

const ITEMS_PER_PAGE = 10;

type Props = {
  searchParams: Promise<{
    page?: string;
    category?: string;
  }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const category = params.category || "all";
  const query = new URLSearchParams();

  if (page > 1) query.set("page", String(page));
  if (category !== "all") query.set("category", category);

  const suffix = query.toString() ? `?${query.toString()}` : "";
  const title =
    category === "all"
      ? "Photography Portfolio"
      : `${category} Photography Portfolio`;
  const description =
    category === "all"
      ? "Explore storytelling, conceptual, portrait, and fine art photography projects by Niniola Photography from Benin City, Nigeria."
      : `Explore ${category.toLowerCase()} photography projects by Niniola Photography, serving clients in Benin City, across Nigeria, and internationally.`;

  return buildMetadata({
    title,
    description,
    path: `/portfolio${suffix}`,
    keywords: [
      "photography portfolio Nigeria",
      "Benin City photographer portfolio",
      `${category.toLowerCase()} photographer Nigeria`,
    ],
  });
}

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
  const pageSchema = [
    buildBreadcrumbSchema([
      { name: "Home", url: absoluteUrl("/") },
      { name: "Portfolio", url: absoluteUrl("/portfolio") },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name:
        currentCategory === "all"
          ? "Photography Portfolio"
          : `${currentCategory} Photography Portfolio`,
      url: absoluteUrl("/portfolio"),
      description:
        "A curated portfolio of storytelling, conceptual, and fine art photography by Niniola Photography.",
    },
  ];

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary selection:bg-accent-gold selection:text-black font-sans">
      {pageSchema.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
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
