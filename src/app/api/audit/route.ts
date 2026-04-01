import { NextRequest, NextResponse } from "next/server";
import { runAudit } from "@/lib/claude";
import type { AuditRequest, AuditResponse } from "@/types/audit";

export async function POST(req: NextRequest): Promise<NextResponse<AuditResponse>> {
  try {
    const body: AuditRequest = await req.json();

    if (!body.input) {
      return NextResponse.json({ error: "Missing input" }, { status: 400 });
    }

    const result = await runAudit(body.input);
    return NextResponse.json({ result });
  } catch (err) {
    console.error("[audit route]", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
