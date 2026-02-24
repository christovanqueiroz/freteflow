import { NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { vehicles } from "@/lib/db/schema";
import { getAuthFromCookies } from "@/lib/utils/auth";
import { createVehicleSchema } from "@/lib/validators/vehicles";

export async function POST(request: Request) {
  try {
    const auth = await getAuthFromCookies();
    const body = await request.json();
    const data = createVehicleSchema.parse(body);

    const [vehicle] = await db
      .insert(vehicles)
      .values({
        ...data,
        empresaId: auth.empresaId
      })
      .returning();

    return NextResponse.json(vehicle);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro ao cadastrar veículo" },
      { status: 400 }
    );
  }
}
