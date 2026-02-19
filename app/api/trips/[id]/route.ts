import { NextResponse } from "next/server";
import { getTripWithCosts } from "@/lib/services/trip-service";
import { getAuthFromCookies } from "@/lib/utils/auth";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const auth = await getAuthFromCookies();
    const tripId = Number.parseInt(params.id, 10);
    const data = await getTripWithCosts(auth.empresaId, tripId);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro ao obter viagem" },
      { status: 404 }
    );
  }
}
