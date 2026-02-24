"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NewVehiclePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    placa: "",
    modelo: "",
    consumoMedioKmL: ""
  });
  const [error, setError] = useState("");

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    const response = await fetch("/api/vehicles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      setError(data.error ?? "Erro ao cadastrar veículo");
      return;
    }

    router.push("/trips/new");
  };

  return (
    <div className="mx-auto max-w-md rounded-lg border bg-white p-6">
      <h1 className="mb-4 text-2xl font-bold">Cadastrar veículo</h1>
      <form className="space-y-3" onSubmit={onSubmit}>
        <Input placeholder="Placa" required value={form.placa} onChange={(event) => setForm((prev) => ({ ...prev, placa: event.target.value }))} />
        <Input placeholder="Modelo" required value={form.modelo} onChange={(event) => setForm((prev) => ({ ...prev, modelo: event.target.value }))} />
        <Input placeholder="Consumo médio (km/L)" required value={form.consumoMedioKmL} onChange={(event) => setForm((prev) => ({ ...prev, consumoMedioKmL: event.target.value }))} />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <Button type="submit">Salvar veículo</Button>
      </form>
    </div>
  );
}
