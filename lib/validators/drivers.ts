import { z } from "zod"

export const createDriverSchema = z.object({
  nome: z.string().min(3, "Nome obrigatório"),
  cpf: z.string().min(11, "CPF inválido"),
  telefone: z.string().min(8, "Telefone inválido"),
  empresaId: z.number(),
})

export type CreateDriverInput = z.infer<typeof createDriverSchema>
