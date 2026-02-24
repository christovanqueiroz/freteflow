"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NewCompanyPage() {
  const router = useRouter();
  const [form, setForm] = useState({ nome: "", cnpj: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const response = await fetch("/api/companies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = (await response.json()) as { error?: string };

    if (!response.ok) {
      setError(data.error ?? "Erro ao cadastrar empresa");
      return;
    }

    setSuccess("Empresa cadastrada com sucesso! Agora você pode criar sua conta.");
    setTimeout(() => router.push("/register"), 1200);
  };

  return (
    <div className="mx-auto max-w-md rounded-lg border bg-white p-6">
      <h1 className="mb-4 text-2xl font-bold">Cadastrar empresa</h1>
      <form className="space-y-3" onSubmit={onSubmit}>
        <Input
          placeholder="Nome da empresa"
          required
          value={form.nome}
          onChange={(event) => setForm((prev) => ({ ...prev, nome: event.target.value }))}
        />
        <Input
          placeholder="CNPJ"
          required
          value={form.cnpj}
          onChange={(event) => setForm((prev) => ({ ...prev, cnpj: event.target.value }))}
        />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        {success ? <p className="text-sm text-green-700">{success}</p> : null}
        <div className="flex items-center justify-between">
          <Button type="submit">Salvar empresa</Button>
          <Link href="/register" className="text-sm text-blue-600 hover:underline">
            Ir para cadastro de usuário
          </Link>
        </div>
      </form>
    </div>
  );
}
