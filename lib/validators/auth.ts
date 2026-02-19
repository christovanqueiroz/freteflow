import { z } from "zod";

export const registerSchema = z.object({
  nome: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  empresaNome: z.string().min(2),
  cnpj: z.string().min(14)
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});
