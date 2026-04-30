"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Product } from "@/app/types";
import { ShopSectionContent } from "@/app/components/ShopSection";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Reveal } from "@/app/components/ui/Animations";

interface Props {
  products: Product[];
  currentPage: number;
  totalPages: number;
}

export default function FramesPageContent({ 
  products, 
  currentPage,
  totalPages
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    return params.toString();
  };

  const handlePageChange = (page: number) => {
    router.push(`${pathname}?${createQueryString("page", page.toString())}`, { scroll: true });
  };

  const renderPaginationItems = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Dynamic window logic
      if (currentPage <= 3) {
        // Near start: 1, 2, 3, 4 ... n
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near end: 1 ... n-3, n-2, n-1, n
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        // Middle: 1 ... i-1, i, i+1 ... n
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages.map((page, index) => {
      if (page === '...') {
        return (
          <PaginationItem key={`ellipsis-${index}`}>
            <PaginationEllipsis className="text-white/60" />
          </PaginationItem>
        );
      }

      const pageNumber = page as number;
      return (
        <PaginationItem key={pageNumber}>
          <PaginationLink
            onClick={() => handlePageChange(pageNumber)}
            isActive={currentPage === pageNumber}
            className={currentPage === pageNumber ? "text-black" : "cursor-pointer bg-bg-secondary border-white/10 text-white"}
          >
            {pageNumber}
          </PaginationLink>
        </PaginationItem>
      );
    });
  };

  return (
    <main className="pt-32 pb-20 bg-bg-primary min-h-screen">
      <div className="max-w-300 mx-auto px-6 mb-12">
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
            <div>
              <p className="text-accent-gold uppercase tracking-[0.2em] text-sm mb-2">
                Shop
              </p>
              <h1 className="text-4xl md:text-6xl text-white font-serif">
                Premium Frames
              </h1>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="px-6">
        <ShopSectionContent products={products} showHeader={false} showViewAll={false} />
      </div>

      {products.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-white/40 text-lg italic">No frames available at the moment.</p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-12">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              
              {renderPaginationItems()}

              <PaginationItem>
                <PaginationNext 
                  onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </main>
  );
}
