ALTER TABLE "drivers" ADD CONSTRAINT "drivers_cpf_unique" UNIQUE("cpf");--> statement-breakpoint
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_placa_unique" UNIQUE("placa");