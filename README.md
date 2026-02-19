# FreteFlow

MVP SaaS para controle financeiro de transporte com foco em lucro por viagem.

## Stack
- Next.js 14 + TypeScript + Tailwind
- Drizzle ORM + PostgreSQL
- JWT + bcryptjs
- Zod
- PDFKit

## Rodar local
1. Copie `.env.example` para `.env`.
2. Instale deps com `npm install`.
3. Execute migrações e rode app:
   - `npm run db:generate`
   - `npm run db:migrate`
   - `npm run dev`

## Arquitetura
- `lib/db`: acesso a dados e schema
- `lib/services`: regras de negócio
- `lib/validators`: validações de entrada
- `app/api/*`: controllers HTTP
