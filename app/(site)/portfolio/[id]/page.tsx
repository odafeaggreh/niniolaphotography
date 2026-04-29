import { getProjectById } from "@/lib/db/projects";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Reveal } from "@/app/components/ui/Animations";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  const primaryImage = project.images.find((img) => img.isPrimary) || project.images[0];
  const galleryImages = project.images;

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary pt-32 pb-20">
      <div className="max-w-1200 mx-auto px-6">
        <Reveal>
          <Link 
            href="/portfolio" 
            className="inline-flex items-center gap-2 text-accent-gold hover:text-accent-light transition-colors mb-12 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <Reveal>
            <div>
              <p className="text-accent-gold uppercase tracking-[0.2em] text-sm mb-4">
                {project.category}
              </p>
              <h1 className="text-4xl md:text-6xl font-serif mb-8">
                {project.title}
              </h1>
              
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {project.description || ""}
                </ReactMarkdown>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="rounded-lg overflow-hidden border border-white/5">
              <img
                src={primaryImage?.url || "/placeholder-image.jpg"}
                alt={project.title}
                className="w-full h-auto object-cover"
              />
            </div>
          </Reveal>
        </div>

        {/* Gallery */}
        {galleryImages.length > 0 && (
          <Reveal delay={0.4}>
            <div>
              <h2 className="text-2xl font-serif mb-10 border-b border-white/10 pb-4">
                Project Gallery
              </h2>
              <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {galleryImages.map((img, i) => (
                  <div key={img.cloudinaryPublicId} className="rounded-lg overflow-hidden border border-white/5 bg-bg-secondary">
                    <img
                      src={img.url}
                      alt={`Gallery image ${i + 1}`}
                      className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </main>
  );
}
