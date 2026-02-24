"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

type Company = {
  id: number;
  nome: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nome: "",
    email: "",
    password: "",
    empresaId: ""
  });
  const [companies, setCompanies] = useState<Company[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetch("/api/companies")
      .then((response) => response.json())
      .then((data: Company[]) => setCompanies(data))
      .catch(() => setError("Erro ao carregar empresas"));
  }, []);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        empresaId: Number.parseInt(form.empresaId, 10)
      })
    });

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      setError(data.error ?? "Erro ao registrar");
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="mx-auto max-w-md rounded-lg border bg-white p-6">
      <h1 className="mb-4 text-2xl font-bold">Criar conta</h1>
      <form className="space-y-3" onSubmit={onSubmit}>
        <Input placeholder="Seu nome" required value={form.nome} onChange={(event) => setForm((prev) => ({ ...prev, nome: event.target.value }))} />
        <Input placeholder="Email" type="email" required value={form.email} onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))} />
        <Input placeholder="Senha" type="password" required value={form.password} onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))} />
        <select
          className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm"
          required
          value={form.empresaId}
          onChange={(event) => setForm((prev) => ({ ...prev, empresaId: event.target.value }))}
        >
          <option value="">Selecione sua empresa</option>
          {companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.nome}
            </option>
          ))}
        </select>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <div className="flex justify-between items-center">
          <Button type="submit">Registrar</Button>
          <div className="flex flex-col items-end gap-1">
            <Link href="/companies/new" className="text-sm text-blue-600 hover:underline">Cadastre sua empresa</Link>
            <Link href="/login" className="text-sm text-blue-600 hover:underline">Já tem conta? Faça login</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
