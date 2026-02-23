"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Project } from "@/app/types";
import PortfolioGrid from "@/app/components/PortfolioGrid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  projects: Project[];
  categories: string[];
  currentPage: number;
  currentCategory: string;
  totalPages: number;
}

export default function PortfolioPageContent({ 
  projects, 
  categories,
  currentPage,
  currentCategory,
  totalPages
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    if (name === "category") params.delete("page"); // Reset page on category change
    return params.toString();
  };

  const handleCategoryChange = (category: string) => {
    router.push(`${pathname}?${createQueryString("category", category)}`, { scroll: true });
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
                Portfolio
              </p>
              <h1 className="text-4xl md:text-6xl text-white font-serif">
                Our Work
              </h1>
            </div>

            <div className="flex flex-col gap-2 min-w-50">
              <p className="text-white/60 text-xs uppercase tracking-widest pl-1">
                Filter by Category
              </p>
              <Select
                value={currentCategory}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger className="w-full bg-bg-secondary border-white/10 text-white capitalize">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className="bg-bg-secondary border-white/10 text-white">
                  {categories.map((category) => (
                    <SelectItem
                      key={category}
                      value={category}
                      className="capitalize focus:bg-accent-gold focus:text-black"
                    >
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Reveal>
      </div>

      <PortfolioGrid
        projects={projects}
        showHeader={false}
      />

      {projects.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-white/40 text-lg italic">No projects found in this category.</p>
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
