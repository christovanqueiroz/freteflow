import { NextResponse } from "next/server";
import { createTrip, listTrips } from "@/lib/services/trip-service";
import { getAuthFromCookies } from "@/lib/utils/auth";

export async function GET() {
  try {
    const auth = await getAuthFromCookies();
    const trips = await listTrips(auth.empresaId);
    return NextResponse.json(trips);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro ao listar viagens" },
      { status: 401 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const auth = await getAuthFromCookies();
    const body = await request.json();
    const trip = await createTrip(auth.empresaId, body);
    return NextResponse.json(trip, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro ao criar viagem" },
      { status: 400 }
    );
  }
}
