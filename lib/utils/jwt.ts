import { jwtVerify, SignJWT } from "jose";

export type AuthPayload = {
  userId: number;
  empresaId: number;
  email: string;
};

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error("JWT_SECRET não configurado");
}

const key = new TextEncoder().encode(secret);

export const signToken = async (payload: AuthPayload): Promise<string> => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);
};

export const verifyToken = async (token: string): Promise<AuthPayload> => {
  const result = await jwtVerify<AuthPayload>(token, key);
  return result.payload;
};
