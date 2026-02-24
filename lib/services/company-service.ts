import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { companies } from "@/lib/db/schema";
import { companyRegisterSchema } from "@/lib/validators/companies";

type CompanyRegisterInput = typeof companyRegisterSchema._type;

export const registerCompany = async (input: CompanyRegisterInput) => {
  const data = companyRegisterSchema.parse(input);

  const [existingCompany] = await db
    .select()
    .from(companies)
    .where(eq(companies.cnpj, data.cnpj))
    .limit(1);

  if (existingCompany) {
    throw new Error("Empresa já cadastrada com este CNPJ");
  }

  const [company] = await db
    .insert(companies)
    .values({
      nome: data.nome,
      cnpj: data.cnpj
    })
    .returning();

  return company;
};
