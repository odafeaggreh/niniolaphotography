import type { Metadata } from "next";

import { getProducts, getProductCount } from "@/lib/db/products";
import FramesPageContent from "./FramesPageContent";
import { absoluteUrl, buildBreadcrumbSchema, buildMetadata } from "@/lib/seo";

const ITEMS_PER_PAGE = 12;

type Props = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const suffix = page > 1 ? `?page=${page}` : "";

  return buildMetadata({
    title: "Photography Prints and Frames",
    description:
      "Shop framed photography, wall art, and collectible prints from Niniola Photography, a Benin City-based artist with work available to buyers in Nigeria and globally.",
    path: `/frames${suffix}`,
    keywords: [
      "buy photography prints Nigeria",
      "framed photography Benin City",
      "African wall art photography prints",
    ],
  });
}

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
  const pageSchema = [
    buildBreadcrumbSchema([
      { name: "Home", url: absoluteUrl("/") },
      { name: "Frames", url: absoluteUrl("/frames") },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Photography Prints and Frames",
      url: absoluteUrl("/frames"),
      description:
        "Framed photography and collectible print collection from Niniola Photography.",
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
      <FramesPageContent 
        products={products} 
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </main>
  );
}
