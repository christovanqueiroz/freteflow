import { toNumber } from "@/lib/utils/decimal";
import { calculateTripMetrics, listTripsByFilters } from "@/lib/services/trip-service";

export const getDashboardMetrics = async (empresaId: number, month?: string, motoristaId?: number) => {
  const filteredTrips = await listTripsByFilters(empresaId, month, motoristaId);

  const enriched = await Promise.all(
    filteredTrips.map(async (trip) => {
      const metrics = await calculateTripMetrics(empresaId, trip.id);
      return {
        ...trip,
        metrics,
        valorFreteNum: toNumber(trip.valorFrete)
      };
    })
  );

  const totalFaturado = enriched.reduce((acc, trip) => acc + trip.valorFreteNum, 0);
  const totalCustos = enriched.reduce((acc, trip) => acc + trip.metrics.custoTotal, 0);

  return {
    totalFaturado,
    totalCustos,
    lucroLiquido: totalFaturado - totalCustos,
    ranking: enriched
      .sort((a, b) => b.metrics.lucroBruto - a.metrics.lucroBruto)
      .slice(0, 10)
      .map((trip) => ({
        id: trip.id,
        cliente: trip.cliente,
        lucroBruto: trip.metrics.lucroBruto
      }))
  };
};
