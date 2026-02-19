import { NextResponse } from "next/server";
import { addCostToTrip } from "@/lib/services/trip-service";
import { getAuthFromCookies } from "@/lib/utils/auth";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const auth = await getAuthFromCookies();
    const body = await request.json();
    const tripId = Number.parseInt(params.id, 10);
    const data = await addCostToTrip(auth.empresaId, tripId, body);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro ao adicionar custo" },
      { status: 400 }
    );
  }
}
