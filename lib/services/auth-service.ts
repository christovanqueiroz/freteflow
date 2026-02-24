import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { companies, users } from "@/lib/db/schema";
import { loginSchema, registerSchema } from "@/lib/validators/auth";
import { signToken } from "@/lib/utils/jwt";

type RegisterInput = typeof registerSchema._type;
type LoginInput = typeof loginSchema._type;

export const registerUser = async (input: RegisterInput): Promise<string> => {
  const data = registerSchema.parse(input);

  const [company] = await db
    .select()
    .from(companies)
    .where(eq(companies.id, data.empresaId))
    .limit(1);

  if (!company) {
    throw new Error("Empresa não encontrada");
  }

  const passwordHash = await bcrypt.hash(data.password, 10);

  const [user] = await db
    .insert(users)
    .values({
      nome: data.nome,
      email: data.email,
      passwordHash,
      empresaId: company.id
    })
    .returning();

  return signToken({ userId: user.id, empresaId: user.empresaId, email: user.email });
};

export const loginUser = async (input: LoginInput): Promise<string> => {
  const data = loginSchema.parse(input);

  const [user] = await db.select().from(users).where(eq(users.email, data.email)).limit(1);

  if (!user) {
    throw new Error("Credenciais inválidas");
  }

  const validPassword = await bcrypt.compare(data.password, user.passwordHash);

  if (!validPassword) {
    throw new Error("Credenciais inválidas");
  }

  return signToken({ userId: user.id, empresaId: user.empresaId, email: user.email });
};
