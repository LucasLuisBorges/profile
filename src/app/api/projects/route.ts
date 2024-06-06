import { getProjects } from "@/hooks/get-projects";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getProjects());
}
