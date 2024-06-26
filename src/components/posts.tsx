"use client";

import { Project } from "@/hooks/get-projects";
import Link from "next/link";
import { Suspense, useMemo, useState } from "react";
import useSWR from "swr";

type SortSetting = ["date" | "views", "desc" | "asc"];

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects: initialProjects }: ProjectsProps) {
  const [sort, setSort] = useState<SortSetting>(["date", "desc"]);
  const { data: projects } = useSWR("/api/projects", fetcher, {
    fallbackData: initialProjects,
    refreshInterval: 5000,
  });

  function sortDate() {
    setSort((sort) => [
      "date",
      sort[0] !== "date" || sort[1] === "asc" ? "desc" : "asc",
    ]);
  }

  function sortViews() {
    setSort((sort) => [
      sort[0] === "views" && sort[1] === "asc" ? "date" : "views",
      sort[0] !== "views" ? "desc" : sort[1] === "asc" ? "desc" : "asc",
    ]);
  }

  return (
    <Suspense fallback={null}>
      <main className="max-w-2xl font-mono m-auto mb-10 text-sm">
        <header className="text-gray-600 flex items-center text-xs">
          <button
            onClick={sortDate}
            className={`w-12 h-9 text-left  ${
              sort[0] === "date" && sort[1] !== "desc" ? "text-gray-400" : ""
            }`}
          >
            data
            {sort[0] === "date" && sort[1] === "asc" && "↑"}
          </button>
          <span className="grow pl-2">titulo</span>
          <button
            onClick={sortViews}
            className={`
                  h-9
                  pl-4
                  ${sort[0] === "views" ? "text-gray-400" : ""}
                `}
          >
            visualizações
            {sort[0] === "views" ? (sort[1] === "asc" ? "↑" : "↓") : ""}
          </button>
        </header>

        <List projects={projects} sort={sort} />
      </main>
    </Suspense>
  );
}

interface ListProps {
  projects: Project[];
  sort: SortSetting;
}

function List({ projects, sort }: ListProps) {
  const sortedProjects = useMemo(() => {
    const [sortKey, sortDirection] = sort;
    return [...projects].sort((a, b) => {
      if (sortKey === "date") {
        return sortDirection === "desc"
          ? new Date(b.date).getTime() - new Date(a.date).getTime()
          : new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        return sortDirection === "desc" ? b.views - a.views : a.views - b.views;
      }
    });
  }, [projects, sort]);

  return (
    <ul>
      {sortedProjects.map((project, i: number) => {
        const year = getYear(project.date);
        const firstOfYear =
          !sortedProjects[i - 1] ||
          getYear(sortedProjects[i - 1].date) !== year;
        const lastOfYear =
          !sortedProjects[i + 1] ||
          getYear(sortedProjects[i + 1].date) !== year;

        return (
          <li key={project.id}>
            <Link
              href={`/${new Date(project.date).getFullYear()}/${project.id}`}
            >
              <span
                className={`flex transition-[background-color] hover:bg-[#242424] active:bg-[#222] border-y border-[#313131]
                ${!firstOfYear ? "border-t-0" : ""}
                ${lastOfYear ? "border-b-0" : ""}
              `}
              >
                <span
                  className={`py-3 px-1 flex grow items-center ${
                    !firstOfYear ? "ml-14" : ""
                  }`}
                >
                  {firstOfYear && (
                    <span className="w-14 inline-block self-start shrink-0 text-gray-500">
                      {year}
                    </span>
                  )}

                  <span className="grow text-gray-100">{project.title}</span>

                  <span className="text-gray-500 text-xs">
                    {project.viewsFormatted}
                  </span>
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function getYear(date: string) {
  return new Date(date).getFullYear();
}
