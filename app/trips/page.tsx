"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type Trip = {
  id: number;
  cliente: string;
  origem: string;
  destino: string;
  data: string;
};

export default function TripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    fetch("/api/trips")
      .then((response) => response.json())
      .then((data: Trip[]) => setTrips(data));
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Viagens</h1>
        <Link href="/trips/new">
          <Button>Nova viagem</Button>
        </Link>
      </div>

      <div className="rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead className="border-b bg-slate-50">
            <tr>
              <th className="p-3 text-left">Cliente</th>
              <th className="p-3 text-left">Rota</th>
              <th className="p-3 text-left">Data</th>
            </tr>
          </thead>
          <tbody>
            {trips.map((trip) => (
              <tr key={trip.id} className="border-b">
                <td className="p-3">
                  <Link href={`/trips/${trip.id}`} className="text-blue-600">
                    {trip.cliente}
                  </Link>
                </td>
                <td className="p-3">{trip.origem} → {trip.destino}</td>
                <td className="p-3">{trip.data}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
