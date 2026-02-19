import { and, eq, gte, lte, sql } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { tripCosts, trips } from "@/lib/db/schema";
import { toNumber } from "@/lib/utils/decimal";
import { addTripCostSchema, createTripSchema } from "@/lib/validators/trips";

export type TripMetrics = {
  custoTotal: number;
  lucroBruto: number;
  custoPorKm: number;
  lucroPorKm: number;
};

export const createTrip = async (empresaId: number, payload: unknown) => {
  const data = createTripSchema.parse(payload);
  const [trip] = await db
    .insert(trips)
    .values({
      ...data,
      empresaId
    })
    .returning();

  return trip;
};

export const addCostToTrip = async (empresaId: number, tripId: number, payload: unknown) => {
  const data = addTripCostSchema.parse(payload);

  const [trip] = await db
    .select()
    .from(trips)
    .where(and(eq(trips.id, tripId), eq(trips.empresaId, empresaId)))
    .limit(1);

  if (!trip) {
    throw new Error("Viagem não encontrada");
  }

  const [cost] = await db
    .insert(tripCosts)
    .values({
      tripId,
      ...data
    })
    .returning();

  return cost;
};

export const calculateTripMetrics = async (empresaId: number, tripId: number): Promise<TripMetrics> => {
  const [trip] = await db
    .select()
    .from(trips)
    .where(and(eq(trips.id, tripId), eq(trips.empresaId, empresaId)))
    .limit(1);

  if (!trip) {
    throw new Error("Viagem não encontrada");
  }

  const [sumCosts] = await db
    .select({ total: sql<string>`COALESCE(SUM(${tripCosts.valor}),0)` })
    .from(tripCosts)
    .where(eq(tripCosts.tripId, trip.id));

  const custoTotal = toNumber(sumCosts.total);
  const valorFrete = toNumber(trip.valorFrete);
  const kmRodado = toNumber(trip.kmRodado);
  const lucroBruto = valorFrete - custoTotal;

  return {
    custoTotal,
    lucroBruto,
    custoPorKm: kmRodado > 0 ? custoTotal / kmRodado : 0,
    lucroPorKm: kmRodado > 0 ? lucroBruto / kmRodado : 0
  };
};

export const getTripWithCosts = async (empresaId: number, tripId: number) => {
  const [trip] = await db
    .select()
    .from(trips)
    .where(and(eq(trips.id, tripId), eq(trips.empresaId, empresaId)))
    .limit(1);

  if (!trip) {
    throw new Error("Viagem não encontrada");
  }

  const costs = await db.select().from(tripCosts).where(eq(tripCosts.tripId, trip.id));
  const metrics = await calculateTripMetrics(empresaId, tripId);

  return { trip, costs, metrics };
};

export const listTrips = async (empresaId: number) => {
  return db.select().from(trips).where(eq(trips.empresaId, empresaId));
};

export const monthRange = (month: string): { from: string; to: string } => {
  const [year, monthNum] = month.split("-").map((v) => Number.parseInt(v, 10));
  const from = new Date(Date.UTC(year, monthNum - 1, 1));
  const to = new Date(Date.UTC(year, monthNum, 0));
  return {
    from: from.toISOString().slice(0, 10),
    to: to.toISOString().slice(0, 10)
  };
};

export const listTripsByFilters = async (empresaId: number, month?: string, motoristaId?: number) => {
  if (!month) {
    return db.select().from(trips).where(eq(trips.empresaId, empresaId));
  }

  const { from, to } = monthRange(month);
  const baseFilter = and(
    eq(trips.empresaId, empresaId),
    gte(trips.data, from),
    lte(trips.data, to),
    motoristaId ? eq(trips.motoristaId, motoristaId) : undefined
  );

  return db.select().from(trips).where(baseFilter);
};
