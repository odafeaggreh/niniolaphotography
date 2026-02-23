import { Star } from "lucide-react";
import type { Testimonial } from "@/app/types";

interface Props {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: Props) {
  return (
    <section className="py-30 bg-bg-primary px-6 overflow-hidden">
      <div className="max-w-300 mx-auto">
        <div className="mb-16">
          <p className="text-accent-gold uppercase tracking-[0.2em] text-sm mb-2">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-5xl text-white font-serif">
            What Our Clients Say
          </h2>
        </div>

        <div className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory scrollbar-hide">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="min-w-75 md:min-w-100 bg-bg-secondary p-8 rounded-md border border-white/5 snap-start"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-accent-gold text-accent-gold" />
                ))}
              </div>
              <p className="text-text-secondary text-lg italic mb-6 leading-relaxed">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-full bg-neutral-700 bg-cover bg-center"
                  style={{
                    backgroundImage: testimonial.avatarUrl
                      ? `url('${testimonial.avatarUrl}')`
                      : undefined,
                  }}
                />
                <div>
                  <h4 className="text-white font-bold text-sm">{testimonial.name}</h4>
                  <span className="text-text-muted text-xs uppercase tracking-wider">
                    {testimonial.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

