import redis from "@/lib/db";
import { projectsData } from "@/lib/mocks/projects";
import commaNumber from "comma-number";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id") ?? null;

  if (id === null) {
    return NextResponse.json(
      {
        error: {
          message: 'Missing "id" query',
          code: "MISSING_ID",
        },
      },
      { status: 400 }
    );
  }

  const project = projectsData.find((project) => project.id === id);

  if (project == null) {
    return NextResponse.json(
      {
        error: {
          message: "Unknown post",
          code: "UNKNOWN_POST",
        },
      },
      { status: 400 }
    );
  }

  if (url.searchParams.get("incr") != null) {
    const views = await redis.hincrby("views", id, 1);
    return NextResponse.json({
      ...project,
      views,
      viewsFormatted: commaNumber(views),
    });
  } else {
    const views = (await redis.hget("views", id)) ?? 0;
    return NextResponse.json({
      ...project,
      views,
      viewsFormatted: commaNumber(Number(views)),
    });
  }
}
