import { NextRequest, NextResponse } from "next/server";

// Socket.io is initialized in server.ts — this route just signals readiness
export function GET(_req: NextRequest) {
  return NextResponse.json({ ok: true });
}
