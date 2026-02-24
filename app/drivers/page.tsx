"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function DriversPage() {
  const [drivers, setDrivers] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/drivers/list")
      .then((r) => r.json())
      .then(setDrivers)
  }, [])

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Motoristas</h1>

        <Link
          href="/drivers/new"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Novo
        </Link>
      </div>

      <div className="space-y-2">
        {drivers.map((d) => (
          <div key={d.id} className="border p-3 rounded">
            <div className="font-semibold">{d.nome}</div>
            <div className="text-sm text-gray-500">
              {d.telefone}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}