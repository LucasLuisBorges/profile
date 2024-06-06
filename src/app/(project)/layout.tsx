import { getProjects } from "@/hooks/get-projects";
import { Header } from "./_content/header";

export const revalidate = 60;

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const projects = await getProjects();

  return (
    <article className="text-gray-300 mb-10">
      <Header posts={projects} />

      {children}
    </article>
  );
}
