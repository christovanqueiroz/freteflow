"use client";

import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { currency } from "@/lib/utils/decimal";

type DashboardData = {
  totalFaturado: number;
  totalCustos: number;
  lucroLiquido: number;
  ranking: { id: number; cliente: string; lucroBruto: number }[];
};

export default function DashboardPage() {
  const defaultMonth = useMemo(() => new Date().toISOString().slice(0, 7), []);
  const [month, setMonth] = useState(defaultMonth);
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetch(`/api/dashboard?month=${month}`)
      .then((response) => response.json())
      .then((json: DashboardData) => setData(json));
  }, [month]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Dashboard Financeiro</h1>
      <div className="max-w-xs">
        <label className="mb-1 block text-sm font-medium">Mês</label>
        <Input type="month" value={month} onChange={(event) => setMonth(event.target.value)} />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card title="Total faturado">{data ? currency(data.totalFaturado) : "..."}</Card>
        <Card title="Total custos">{data ? currency(data.totalCustos) : "..."}</Card>
        <Card title="Lucro líquido">{data ? currency(data.lucroLiquido) : "..."}</Card>
      </div>

      <Card title="Viagens mais lucrativas">
        <ul className="space-y-2 text-sm">
          {data?.ranking.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>{item.cliente}</span>
              <span>{currency(item.lucroBruto)}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
