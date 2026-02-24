import { z } from "zod";

export const companyRegisterSchema = z.object({
  nome: z.string().min(2),
  cnpj: z.string().min(14)
});
