import {
  date,
  decimal,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar
} from "drizzle-orm/pg-core";

export const planEnum = pgEnum("plan", ["free", "pro"]);
export const tripCostTypeEnum = pgEnum("trip_cost_type", [
  "combustivel",
  "pedagio",
  "alimentacao",
  "manutencao",
  "outros"
]);

export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  nome: varchar("nome", { length: 120 }).notNull(),
  cnpj: varchar("cnpj", { length: 18 }).notNull().unique(),
  plan: planEnum("plan").notNull().default("free"),
  tripLimit: integer("trip_limit").notNull().default(50),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  nome: varchar("nome", { length: 120 }).notNull(),
  email: varchar("email", { length: 200 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  empresaId: integer("empresa_id")
    .notNull()
    .references(() => companies.id),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const drivers = pgTable("drivers", {
  id: serial("id").primaryKey(),
  nome: varchar("nome", { length: 120 }).notNull(),
  cpf: varchar("cpf", { length: 14 }).notNull(),
  telefone: varchar("telefone", { length: 20 }).notNull(),
  empresaId: integer("empresa_id")
    .notNull()
    .references(() => companies.id),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const vehicles = pgTable("vehicles", {
  id: serial("id").primaryKey(),
  placa: varchar("placa", { length: 10 }).notNull(),
  modelo: varchar("modelo", { length: 120 }).notNull(),
  consumoMedioKmL: decimal("consumo_medio_km_l", { precision: 10, scale: 2 }).notNull(),
  empresaId: integer("empresa_id")
    .notNull()
    .references(() => companies.id),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const trips = pgTable("trips", {
  id: serial("id").primaryKey(),
  empresaId: integer("empresa_id")
    .notNull()
    .references(() => companies.id),
  motoristaId: integer("motorista_id")
    .notNull()
    .references(() => drivers.id),
  veiculoId: integer("veiculo_id")
    .notNull()
    .references(() => vehicles.id),
  cliente: varchar("cliente", { length: 150 }).notNull(),
  origem: varchar("origem", { length: 150 }).notNull(),
  destino: varchar("destino", { length: 150 }).notNull(),
  data: date("data").notNull(),
  valorFrete: decimal("valor_frete", { precision: 14, scale: 2 }).notNull(),
  kmRodado: decimal("km_rodado", { precision: 14, scale: 2 }).notNull(),
  tipoCarga: varchar("tipo_carga", { length: 120 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const tripCosts = pgTable("trip_costs", {
  id: serial("id").primaryKey(),
  tripId: integer("trip_id")
    .notNull()
    .references(() => trips.id),
  tipo: tripCostTypeEnum("tipo").notNull(),
  descricao: varchar("descricao", { length: 240 }).notNull(),
  valor: decimal("valor", { precision: 14, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export type TripCostType = (typeof tripCostTypeEnum.enumValues)[number];
