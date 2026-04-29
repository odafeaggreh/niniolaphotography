import * as React from "react";
import { Camera, Image as ImageIcon, MessageSquare, TrendingUp, ArrowUpRight, History, Settings, PlayCircle } from "lucide-react";
import { getProjectCount, getProjects } from "@/lib/db/projects";
import { getProductCount } from "@/lib/db/products";
import { getTestimonialCount } from "@/lib/db/testimonials";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default async function AdminDashboardPage() {
  // Fetch real data from DB
  const [projectCount, productCount, testimonialCount, recentProjects] = await Promise.all([
    getProjectCount(),
    getProductCount(),
    getTestimonialCount(),
    getProjects({ limit: 4 }), // Fetch latest 4 projects
  ]);

  const stats = [
    { label: "Total Projects", value: projectCount.toString(), icon: Camera, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Total Frames", value: productCount.toString(), icon: ImageIcon, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Testimonials", value: testimonialCount.toString(), icon: MessageSquare, color: "text-green-500", bg: "bg-green-500/10" },
    { label: "Recent Activity", value: "Live", icon: TrendingUp, color: "text-accent-gold", bg: "bg-accent-gold/10" },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Welcome to your photography admin panel.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-md border bg-card p-6 text-card-foreground shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium">{stat.label}</h3>
              <div className={`${stat.bg} ${stat.color} p-2 rounded-lg`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {/* Recent Projects Card */}
        <div className="rounded-md border bg-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <History className="h-5 w-5 text-accent-gold" />
              <h2 className="text-lg font-semibold text-primary">Recent Projects</h2>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/projects" className="text-accent-gold">
                View All <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="divide-y border rounded-md overflow-hidden">
            {recentProjects.length > 0 ? (
              recentProjects.map((project) => (
                <div key={project.id} className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors">
                  <div className="relative h-12 w-12 rounded-md overflow-hidden border bg-muted shrink-0">
                    <img 
                      src={project.images[0]?.url || "/placeholder.jpg"} 
                      alt={project.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{project.title}</p>
                    <p className="text-xs text-muted-foreground">{project.category}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {project.images.length} {project.images.length === 1 ? 'image' : 'images'}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8 italic">No projects found.</p>
            )}
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="rounded-md border bg-card p-6">
          <h2 className="text-lg font-semibold mb-6 text-primary">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-24 flex flex-col gap-2 hover:border-accent-gold hover:bg-accent-gold/5" asChild>
              <Link href="/admin/projects">
                <Camera className="h-6 w-6 text-accent-gold" />
                <span className="text-sm text-primary">New Project</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col gap-2 hover:border-accent-gold hover:bg-accent-gold/5" asChild>
              <Link href="/admin/frames">
                <ImageIcon className="h-6 w-6 text-accent-gold" />
                <span className="text-sm text-primary">New Frame</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col gap-2 hover:border-accent-gold hover:bg-accent-gold/5" asChild>
              <Link href="/admin/settings">
                <Settings className="h-6 w-6 text-accent-gold" />
                <span className="text-sm text-primary">Update Stats</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col gap-2 hover:border-accent-gold hover:bg-accent-gold/5" asChild>
              <Link href="/admin/guides">
                <PlayCircle className="h-6 w-6 text-accent-gold" />
                <span className="text-sm text-primary">View Guides</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
