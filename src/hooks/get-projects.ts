import redis from "@/lib/db";
import { projectsData } from "@/lib/mocks/projects";
import commaNumber from "comma-number";

export type Project = {
  id: string;
  date: string;
  title: string;
  views: number;
  viewsFormatted: string;
};

type Views = {
  [key: string]: string;
};

export const getProjects = async () => {
  const allViews: null | Views = await redis.hgetall("views");
  const projects = projectsData.map((project): Project => {
    const views = Number(allViews?.[project.id] ?? 0);
    return {
      ...project,
      views,
      viewsFormatted: commaNumber(views),
    };
  });
  return projects;
};
