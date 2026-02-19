import { z } from "zod";
import { tripCostTypeEnum } from "@/lib/db/schema";

export const createTripSchema = z.object({
  motoristaId: z.number().int().positive(),
  veiculoId: z.number().int().positive(),
  cliente: z.string().min(2),
  origem: z.string().min(2),
  destino: z.string().min(2),
  data: z.string().date(),
  valorFrete: z.string().regex(/^\d+(\.\d{1,2})?$/),
  kmRodado: z.string().regex(/^\d+(\.\d{1,2})?$/),
  tipoCarga: z.string().min(2)
});

export const addTripCostSchema = z.object({
  tipo: z.enum(tripCostTypeEnum.enumValues),
  descricao: z.string().min(2),
  valor: z.string().regex(/^\d+(\.\d{1,2})?$/)
});
