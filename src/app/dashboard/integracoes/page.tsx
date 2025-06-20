'use client'

import AnimatedPage from '@/components/AnimatedPage'
import { Zap } from 'lucide-react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { BadgeCheck, Link, Unplug, List, Table } from 'lucide-react'
import { useState } from 'react'


export default function IntegraçõesPage() {

const [busca, setBusca] = useState('')
const [filtro, setFiltro] = useState<'todas' | 'conectadas' | 'nao-conectadas'>('todas')

const integracoes = [
  {
    id: 'google-sheets',
    nome: 'Google Sheets',
    categoria: 'Planilhas',
    descricao: 'Sincronize seus dados automaticamente com planilhas do Google.',
    logo: '/google-sheets.png',
  },
  {
    id: 'clickup',
    nome: 'ClickUp',
    categoria: 'Gerenciamento de Tarefas',
    descricao: 'Integre tarefas automaticamente para o ClickUp.',
    logo: '/clickup-logo.png',
    conectada: true,
  },
  {
    id: 'trello',
    nome: 'Trello',
    categoria: 'Gerenciamento de Tarefas',
    descricao: 'Crie cards no Trello automaticamente.',
    logo: '/trello-logo.png',
  },
  
]

const filtradas = integracoes
  .filter((item) =>
    item.nome.toLowerCase().includes(busca.toLowerCase())
  )
  .filter((item) => {
    if (filtro === 'todas') return true
    if (filtro === 'conectadas') return item.conectada
    if (filtro === 'nao-conectadas') return !item.conectada
  })

  return (
    <AnimatedPage>
    <div className="p-6 font-sans bg-[#F3F5F9] min-h-screen space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-start gap-4">
        <div className="bg-[#8332FF1A] p-2 rounded-md">
          <Unplug className="text-[#8332FF]" size={20} />
        </div>
        <div>
          <h1 className="text-[22px] font-bold text-gray-900">Integrações</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Amplie o potencial da sua prospecção conectando suas ferramentas favoritas para automatizar seu fluxo de trabalho.
          </p>
        </div>
      </div>
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
  {/* Lado esquerdo: badge + campo de busca */}
<div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 w-full">
  {/* Lado esquerdo */}
  <div className="flex flex-col gap-2">
    <div className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-md flex items-center gap-1 w-fit">
      <BadgeCheck size={14} />
      0 integrações ativas
    </div>

    <Input
      placeholder="Buscar integrações..."
      value={busca}
      onChange={(e) => setBusca(e.target.value)}
      className="w-full md:w-64 h-9 bg-white text-sm border border-gray-200"
    />
  </div>
</div>

    </div>

      {/* Bloco de integrações */}
      <div className="border border-gray-200 rounded-xl p-6 bg-white w-fit">

        <h2 className="text-sm font-semibold mb-4">Todas as integrações</h2>
        <div className="flex flex-wrap justify-start gap-6">


      {filtradas.length > 0 ? (
    filtradas.map((item) => (
    <div
      key={item.id}
      className="flex flex-col justify-between bg-white border border-[#E5E7EB] rounded-lg w-[510px] h-[300px] p-6 shadow-sm hover:shadow-lg hover:scale-[1.00] transition duration-200 ease-in-out"
    >
      <div>
        <Image
          src={item.logo}
          alt={item.nome}
          width={100}
          height={24}
          className="mb-4 mx-auto object-contain max-h-[300px]"
        />
        <p className="text-sm font-semibold text-gray-900 mt-4 mb-2">{item.nome}</p>
        <p className="text-[10px] text-gray-600 bg-gray-100 w-fit px-2 py-0.5 rounded mt-1 mb-2">
          {item.categoria}
        </p>
        <p className="text-sm text-gray-600">
          {item.descricao}
        </p>
      </div>
      <Button className="w-[460px] h-[40px] bg-[#7E49FF] text-white hover:bg-[#472fb2] text-sm rounded-[6px] mx-auto cursor-pointer">
      <Link size={16} className="mr-2" />
      {item.conectada ? 'Conectado' : 'Conectar'}
      </Button>
          </div>
          ))
        ) : (
      <div className="w-full flex items-center justify-center py-12">
      <div className="w-full flex items-center justify-center py-12">
        <p className="text-sm font-medium font-sans text-gray-600">
          {filtro === 'conectadas'
            ? 'Nenhuma integração conectada'
            : 'Integração não encontrada'}
        </p>
      </div>
      </div>
      )}    
      </div>
      </div>
    </div>
    </AnimatedPage>
  );
}

