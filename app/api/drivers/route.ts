import { NextResponse } from "next/server"
import { db } from "@/lib/db/client"
import { drivers } from "@/lib/db/schema"
import { createDriverSchema } from "@/lib/validators/drivers"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const parsed = createDriverSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const driver = await db.insert(drivers).values(parsed.data).returning()

    return NextResponse.json(driver[0])
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar motorista" },
      { status: 500 }
    )
  }
}
