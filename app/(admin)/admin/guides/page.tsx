import * as React from "react";
import { PlayCircle, Video, Info } from "lucide-react";

interface Guide {
  id: string;
  title: string;
  description: string;
  videoUrl: string; // YouTube embed URL
}

const guides: Guide[] = [
  {
    id: "1",
    title: "Managing Portfolio Projects",
    description: "Learn how to add, edit, and organize your photography projects in the portfolio section.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
  },
  {
    id: "2",
    title: "Updating Site Settings",
    description: "A quick walkthrough on how to update your contact information, social media links, and stats.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
  },
  {
    id: "3",
    title: "Configuring Frame Prices",
    description: "How to set up different frames and currencies for your shop items.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
  },
  {
    id: "4",
    title: "Managing Testimonials",
    description: "Learn how to curate and display client feedback on your website.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
  },
];

export default function GuidesPage() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Video Guides</h1>
        <p className="text-muted-foreground">
          Step-by-step walkthroughs to help you master your admin dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {guides.map((guide) => (
          <div key={guide.id} className="bg-secondary rounded-xl border border-white/5 overflow-hidden flex flex-col">
            <div className="aspect-video w-full bg-black/40">
              <iframe
                src={guide.videoUrl}
                title={guide.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-6 space-y-3 flex-1">
              <div className="flex items-center gap-2 text-accent-gold">
                <PlayCircle className="h-5 w-5" />
                <h3 className="font-semibold text-lg">{guide.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {guide.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-accent-gold/5 border border-accent-gold/20 rounded-xl p-6 flex gap-4 items-start">
        <Info className="h-6 w-6 text-accent-gold shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-accent-gold mb-1">Need more help?</h4>
          <p className="text-sm text-muted-foreground">
            If you can't find what you're looking for, please contact support or refer to the technical documentation.
          </p>
        </div>
      </div>
    </div>
  );
}
