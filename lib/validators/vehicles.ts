import { z } from "zod";

export const createVehicleSchema = z.object({
  placa: z.string().min(7, "Placa inválida"),
  modelo: z.string().min(2, "Modelo obrigatório"),
  consumoMedioKmL: z.string().min(1, "Consumo obrigatório")
});
