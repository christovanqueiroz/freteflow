import { NextResponse } from "next/server";
import { generateTripPdf } from "@/lib/services/pdf-service";
import { getAuthFromCookies } from "@/lib/utils/auth";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const auth = await getAuthFromCookies();
    const tripId = Number.parseInt(params.id, 10);
    const pdfBuffer = await generateTripPdf(auth.empresaId, tripId);

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="trip-${tripId}.pdf"`
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro ao gerar PDF" },
      { status: 400 }
    );
  }
}
