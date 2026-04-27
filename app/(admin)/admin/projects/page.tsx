import { getProjects } from "@/lib/db/projects";
import { ProjectsClient } from "./ProjectsClient";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <ProjectsClient initialProjects={projects} />
    </div>
  );
}
