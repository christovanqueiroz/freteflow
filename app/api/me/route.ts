import { NextResponse } from "next/server";
import { getAuthFromCookies } from "@/lib/utils/auth";

export async function GET() {
  try {
    const auth = await getAuthFromCookies();
    return NextResponse.json(auth);
  } catch {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }
}
