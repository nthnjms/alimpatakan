import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const PIECES_PATH = path.join(process.cwd(), "data", "pieces.json");

function readPieces() {
  const raw = fs.readFileSync(PIECES_PATH, "utf-8");
  return JSON.parse(raw);
}

function writePieces(pieces: unknown[]) {
  fs.writeFileSync(PIECES_PATH, JSON.stringify(pieces, null, 2), "utf-8");
}

export async function GET() {
  const pieces = readPieces();
  const sorted = pieces.sort(
    (a: { date: string }, b: { date: string }) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return NextResponse.json(sorted);
}

export async function POST(req: Request) {
  const newPiece = await req.json();
  const pieces = readPieces();
  const exists = pieces.find((p: { slug: string }) => p.slug === newPiece.slug);
  if (exists) {
    return NextResponse.json(
      { error: "A piece with this slug already exists." },
      { status: 409 }
    );
  }
  pieces.push(newPiece);
  writePieces(pieces);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  if (!slug) {
    return NextResponse.json({ error: "No slug provided." }, { status: 400 });
  }
  const pieces = readPieces();
  const filtered = pieces.filter((p: { slug: string }) => p.slug !== slug);
  writePieces(filtered);
  return NextResponse.json({ success: true });
}