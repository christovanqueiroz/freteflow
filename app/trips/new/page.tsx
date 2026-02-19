"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NewTripPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    motoristaId: "1",
    veiculoId: "1",
    cliente: "",
    origem: "",
    destino: "",
    data: "",
    valorFrete: "",
    kmRodado: "",
    tipoCarga: ""
  });

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();

    const payload = {
      ...form,
      motoristaId: Number.parseInt(form.motoristaId, 10),
      veiculoId: Number.parseInt(form.veiculoId, 10)
    };

    const response = await fetch("/api/trips", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      router.push("/trips");
    }
  };

  return (
    <div className="max-w-2xl rounded-lg border bg-white p-6">
      <h1 className="mb-4 text-2xl font-bold">Criar viagem</h1>
      <form className="grid gap-3 md:grid-cols-2" onSubmit={submit}>
        <Input placeholder="Motorista ID" value={form.motoristaId} onChange={(event) => setForm((prev) => ({ ...prev, motoristaId: event.target.value }))} />
        <Input placeholder="Veículo ID" value={form.veiculoId} onChange={(event) => setForm((prev) => ({ ...prev, veiculoId: event.target.value }))} />
        <Input placeholder="Cliente" value={form.cliente} onChange={(event) => setForm((prev) => ({ ...prev, cliente: event.target.value }))} />
        <Input placeholder="Origem" value={form.origem} onChange={(event) => setForm((prev) => ({ ...prev, origem: event.target.value }))} />
        <Input placeholder="Destino" value={form.destino} onChange={(event) => setForm((prev) => ({ ...prev, destino: event.target.value }))} />
        <Input type="date" placeholder="Data" value={form.data} onChange={(event) => setForm((prev) => ({ ...prev, data: event.target.value }))} />
        <Input placeholder="Valor frete" value={form.valorFrete} onChange={(event) => setForm((prev) => ({ ...prev, valorFrete: event.target.value }))} />
        <Input placeholder="KM rodado" value={form.kmRodado} onChange={(event) => setForm((prev) => ({ ...prev, kmRodado: event.target.value }))} />
        <Input placeholder="Tipo de carga" value={form.tipoCarga} onChange={(event) => setForm((prev) => ({ ...prev, tipoCarga: event.target.value }))} />
        <div className="md:col-span-2">
          <Button type="submit">Salvar viagem</Button>
        </div>
      </form>
    </div>
  );
}
