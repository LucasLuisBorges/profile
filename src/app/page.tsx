import { Projects } from "@/components/posts";
import { getProjects } from "@/hooks/get-projects";

export const revalidate = 60;

export default async function Home() {
  const projects = await getProjects();
  return <Projects projects={projects} />;
}
