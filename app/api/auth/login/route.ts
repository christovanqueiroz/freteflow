import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { loginUser } from "@/lib/services/auth-service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const token = await loginUser(body);

    cookies().set("freteflow_token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/"
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro no login" },
      { status: 401 }
    );
  }
}
