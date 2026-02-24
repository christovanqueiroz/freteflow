import { z } from "zod";

export const registerSchema = z.object({
  nome: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  empresaId: z.number().int().positive()
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});
