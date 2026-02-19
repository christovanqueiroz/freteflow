import PDFDocument from "pdfkit";
import { currency } from "@/lib/utils/decimal";
import { getTripWithCosts } from "@/lib/services/trip-service";

export const generateTripPdf = async (empresaId: number, tripId: number): Promise<Buffer> => {
  const data = await getTripWithCosts(empresaId, tripId);
  const doc = new PDFDocument({ margin: 40 });

  const chunks: Buffer[] = [];
  return await new Promise((resolve, reject) => {
    doc.on("data", (chunk: Buffer) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    doc.fontSize(20).text("Relatório de Viagem - FreteFlow");
    doc.moveDown();
    doc.fontSize(12).text(`Cliente: ${data.trip.cliente}`);
    doc.text(`Origem: ${data.trip.origem}`);
    doc.text(`Destino: ${data.trip.destino}`);
    doc.text(`Data: ${data.trip.data}`);
    doc.text(`Valor do Frete: ${currency(Number(data.trip.valorFrete))}`);
    doc.text(`KM Rodado: ${data.trip.kmRodado}`);

    doc.moveDown();
    doc.fontSize(14).text("Custos");
    data.costs.forEach((cost) => {
      doc.fontSize(12).text(`${cost.tipo} - ${cost.descricao}: ${currency(Number(cost.valor))}`);
    });

    doc.moveDown();
    doc.fontSize(14).text("Métricas Financeiras");
    doc.fontSize(12).text(`Custo total: ${currency(data.metrics.custoTotal)}`);
    doc.text(`Lucro bruto: ${currency(data.metrics.lucroBruto)}`);
    doc.text(`Custo por KM: ${currency(data.metrics.custoPorKm)}`);
    doc.text(`Lucro por KM: ${currency(data.metrics.lucroPorKm)}`);

    doc.end();
  });
};
