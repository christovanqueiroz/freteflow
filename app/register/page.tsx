"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nome: "",
    email: "",
    password: "",
    empresaNome: "",
    cnpj: ""
  });
  const [error, setError] = useState<string>("");

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
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
        <Input placeholder="Empresa" required value={form.empresaNome} onChange={(event) => setForm((prev) => ({ ...prev, empresaNome: event.target.value }))} />
        <Input placeholder="CNPJ" required value={form.cnpj} onChange={(event) => setForm((prev) => ({ ...prev, cnpj: event.target.value }))} />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <Button type="submit">Registrar</Button>
      </form>
    </div>
  );
}
