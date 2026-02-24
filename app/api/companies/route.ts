import { NextResponse } from "next/server";
import { registerCompany } from "@/lib/services/company-service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const company = await registerCompany(body);

    return NextResponse.json({ success: true, company });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro ao cadastrar empresa" },
      { status: 400 }
    );
  }
}
