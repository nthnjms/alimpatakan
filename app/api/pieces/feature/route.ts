import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const PIECES_PATH = path.join(process.cwd(), "data", "pieces.json");

export async function POST(req: Request) {
  const { slug } = await req.json();
  const raw = fs.readFileSync(PIECES_PATH, "utf-8");
  const pieces = JSON.parse(raw);
  const updated = pieces.map((p: { slug: string; featured: boolean }) => ({
    ...p,
    featured: p.slug === slug,
  }));
  fs.writeFileSync(PIECES_PATH, JSON.stringify(updated, null, 2), "utf-8");
  return NextResponse.json({ success: true });
}