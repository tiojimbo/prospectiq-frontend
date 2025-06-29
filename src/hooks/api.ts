'use client'

import { useEffect, useState } from 'react'


interface RankingCidade {
  municipio: string
  nome: string
  total: number
}

interface RankingSetor {
  cnae: string
  nome: string
  total: number
}

interface TotalResponse {
  totalEmpresas: number
  rankingCidades: RankingCidade[]
  rankingSetores: RankingSetor[]
}

interface Filters {
  uf?: string
  municipio?: string
  cnae?: string
}

export function useTotalEmpresas(filters: Filters) {
  const [data, setData] = useState<TotalResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams()
    if (filters.uf) params.set('uf', filters.uf)
    if (filters.municipio) params.set('municipio', filters.municipio)
    if (filters.cnae) params.set('cnae', filters.cnae)

    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/empresas/total?${params.toString()}`)
        if (!res.ok) throw new Error('Erro ao buscar dados')
        const json = await res.json()
        console.log('[DEBUG] Resposta API /api/empresas/total:', json)
        setData(json)
      } catch (err: any) {
        setError(err.message || 'Erro desconhecido')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [filters.uf, filters.municipio, filters.cnae])

  return { data, loading, error }

}
import type { Filter } from "@/types/filters";

export async function getEmpresasComFiltros(filtros: Filter[]) {
  const queryParams = new URLSearchParams();

  filtros.forEach(f => {
    if (f.field === 'Estado') queryParams.append('uf', f.value);
    if (f.field === 'Setor') queryParams.append('cnae', f.value);
  });

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/empresas?${queryParams.toString()}`);
  if (!res.ok) throw new Error('Erro ao buscar empresas');
  return res.json();
}
