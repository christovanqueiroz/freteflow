import { NextResponse } from "next/server";
import { getDashboardMetrics } from "@/lib/services/dashboard-service";
import { getAuthFromCookies } from "@/lib/utils/auth";

export async function GET(request: Request) {
  try {
    const auth = await getAuthFromCookies();
    const { searchParams } = new URL(request.url);
    const month = searchParams.get("month") ?? undefined;
    const motoristaIdValue = searchParams.get("motoristaId");
    const motoristaId = motoristaIdValue ? Number.parseInt(motoristaIdValue, 10) : undefined;

    const data = await getDashboardMetrics(auth.empresaId, month, motoristaId);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro no dashboard" },
      { status: 400 }
    );
  }
}
