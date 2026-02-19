import { cookies } from "next/headers";
import { verifyToken } from "@/lib/utils/jwt";

export const getAuthFromCookies = async () => {
  const token = cookies().get("freteflow_token")?.value;

  if (!token) {
    throw new Error("Não autenticado");
  }

  return verifyToken(token);
};
