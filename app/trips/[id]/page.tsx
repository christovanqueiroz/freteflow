"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { currency } from "@/lib/utils/decimal";

type TripDetail = {
  trip: {
    id: number;
    cliente: string;
    origem: string;
    destino: string;
    valorFrete: string;
    kmRodado: string;
  };
  costs: { id: number; tipo: string; descricao: string; valor: string }[];
  metrics: {
    custoTotal: number;
    lucroBruto: number;
    custoPorKm: number;
    lucroPorKm: number;
  };
};

const costTypes = ["combustivel", "pedagio", "alimentacao", "manutencao", "outros"];

export default function TripDetailPage({ params }: { params: { id: string } }) {
  const [data, setData] = useState<TripDetail | null>(null);
  const [costForm, setCostForm] = useState({ tipo: "combustivel", descricao: "", valor: "" });

  const loadData = async () => {
    const response = await fetch(`/api/trips/${params.id}`);
    const json = (await response.json()) as TripDetail;
    setData(json);
  };

  useEffect(() => {
    void loadData();
  }, []);

  const addCost = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch(`/api/trips/${params.id}/costs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(costForm)
    });

    if (response.ok) {
      setCostForm({ tipo: "combustivel", descricao: "", valor: "" });
      void loadData();
    }
  };

  if (!data) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-white p-5">
        <h1 className="text-2xl font-bold">Viagem #{data.trip.id}</h1>
        <p>{data.trip.origem} → {data.trip.destino}</p>
        <p>Cliente: {data.trip.cliente}</p>
        <p>Frete: {currency(Number(data.trip.valorFrete))}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border bg-white p-5">
          <h2 className="mb-3 font-semibold">Custos</h2>
          <ul className="space-y-2 text-sm">
            {data.costs.map((cost) => (
              <li key={cost.id} className="flex justify-between">
                <span>{cost.tipo} - {cost.descricao}</span>
                <span>{currency(Number(cost.valor))}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border bg-white p-5">
          <h2 className="mb-3 font-semibold">Métricas</h2>
          <p>Custo total: {currency(data.metrics.custoTotal)}</p>
          <p>Lucro bruto: {currency(data.metrics.lucroBruto)}</p>
          <p>Custo por KM: {currency(data.metrics.custoPorKm)}</p>
          <p>Lucro por KM: {currency(data.metrics.lucroPorKm)}</p>
        </div>
      </div>

      <div className="rounded-lg border bg-white p-5">
        <h2 className="mb-3 font-semibold">Adicionar custo</h2>
        <form className="grid gap-3 md:grid-cols-3" onSubmit={addCost}>
          <select
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
            value={costForm.tipo}
            onChange={(event) => setCostForm((prev) => ({ ...prev, tipo: event.target.value }))}
          >
            {costTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <Input placeholder="Descrição" value={costForm.descricao} onChange={(event) => setCostForm((prev) => ({ ...prev, descricao: event.target.value }))} />
          <Input placeholder="Valor" value={costForm.valor} onChange={(event) => setCostForm((prev) => ({ ...prev, valor: event.target.value }))} />
          <div className="md:col-span-3 flex gap-2">
            <Button type="submit">Salvar custo</Button>
            <a href={`/api/trips/${params.id}/report`} target="_blank" rel="noreferrer">
              <Button type="button" className="bg-slate-700 hover:bg-slate-800">
                Gerar PDF
              </Button>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
