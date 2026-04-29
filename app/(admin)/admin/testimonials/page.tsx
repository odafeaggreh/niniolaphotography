import { getTestimonials, getTestimonialCount } from "@/lib/db/testimonials";
import { TestimonialsClient } from "./TestimonialsClient";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const limit = 10;
  const offset = (currentPage - 1) * limit;

  const [testimonials, totalCount] = await Promise.all([
    getTestimonials({ limit, offset }),
    getTestimonialCount(),
  ]);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <TestimonialsClient 
        initialTestimonials={testimonials} 
        totalCount={totalCount}
        currentPage={currentPage}
        pageSize={limit}
      />
    </div>
  );
}
