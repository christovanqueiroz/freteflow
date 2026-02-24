"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NewDriverPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    telefone: "",
  })

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch("/api/drivers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        empresaId: 1, // 🔴 pegar do usuário logado depois
      }),
    })

    setLoading(false)

    if (res.ok) {
      router.push("/drivers")
    } else {
      alert("Erro ao cadastrar")
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Novo Motorista
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Nome"
          className="w-full border p-2 rounded"
          value={form.nome}
          onChange={(e) =>
            setForm({ ...form, nome: e.target.value })
          }
        />

        <input
          placeholder="CPF"
          className="w-full border p-2 rounded"
          value={form.cpf}
          onChange={(e) =>
            setForm({ ...form, cpf: e.target.value })
          }
        />

        <input
          placeholder="Telefone"
          className="w-full border p-2 rounded"
          value={form.telefone}
          onChange={(e) =>
            setForm({ ...form, telefone: e.target.value })
          }
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          {loading ? "Salvando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  )
}
