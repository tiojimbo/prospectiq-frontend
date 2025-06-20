'use client'

import AnimatedPage from '@/components/AnimatedPage'
import { StatusItem } from '@/components/ui/status-item'
import React, { useState } from 'react'
import { Folder, LayoutGrid, Zap, Star, Search, Plus, ChevronDown, Filter, Pencil, Trash2, Copy, Edit, MoreHorizontal,} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from '@/components/ui/dropdown-menu'
import { DataTable } from '@/components/ui/data-table'
import { Switch } from '@/components/ui/switch'
import { ColumnDef } from '@tanstack/react-table'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'

type Pasta = {
  id: string
  nome: string
  criadoEm: string
  ativo: boolean
}

interface StatusItemProps {
  label: string
  color: 'red' | 'blue'
}

const consultas = 1
const pastas = 1

type StatusLineProps = {
  icon: React.ReactNode
  label: string
  count: number
}
const StatusLine: React.FC<StatusLineProps> = ({ icon, label, count }) => {
  if (count === 0) return null

  return (
    <div className="flex items-center justify-between text-sm text-gray-900">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-[15px] font-medium mt-[2px]">{label}</span>
      </div>
      <span className="text-[13px] font-semibold">{count}</span>
    </div>
  )
}

const StatusCard: React.FC = () => (
  <Card className="bg-white shadow-sm border border-gray-200 transition duration-200 ease-in-out hover:shadow-lg hover:scale-[1.00]">
    <div className="px-4 pt-[10px]">
    <div className="flex items-center gap-2 text-base font-semibold text-gray-900 leading-tight">
      <Zap className="h- w-5 text-[#8332FF]" />
      Status
    </div>
    <div className="mt-[2px] border-t border-gray-200" />
  </div>

  
    <CardContent className="space-y-3">
  <StatusLine
    icon={
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8332FF] opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#8332FF]" />
      </span>
    }
    label="Consultas Realizadas"
    count={consultas}
  />

  <StatusLine
    icon={<Folder className="w-4 h-4 text-[#161616]" />}
    label="Pastas"
    count={pastas}
  />
</CardContent>

  </Card>
)

const FavoritosCard: React.FC = () => (
  <Card className="bg-white shadow-sm border border-gray-200 transition duration-200 ease-in-out hover:shadow-lg hover:scale-[1.00]">
    <div className="px-4 pt-[10px]">
      <div className="flex items-center gap-2 text-base font-semibold text-gray-900 leading-tight">
        <Star className="h-5 w-5 text-[#FBC73F]" />
        Favoritos
      </div>
      <div className="mt-[2px] border-t border-gray-200" />
    </div>
    <CardContent>
      <p className="text-sm text-gray-500 text-center py-4">
        Não encontramos seus itens favoritos.
      </p>
    </CardContent>
  </Card>
)

const EmptyTable: React.FC = () => (
  <Card className="bg-white shadow-sm border border-gray-200">
    <CardContent className="p-0">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-200">
            <TableHead className="text-gray-600 font-medium">Nome</TableHead>
            <TableHead className="text-gray-600 font-medium">Criado Em</TableHead>
            <TableHead className="text-gray-600 font-medium">Status</TableHead>
            <TableHead className="text-gray-600 font-medium text-right">
              <div className="flex items-center justify-end gap-2">
                Ações
                <Filter className="h-4 w-4" />
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={4} className="text-center py-12">
              <div className="text-gray-500">
                <p className="text-sm">Nenhum formulário encontrado</p>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
)

const CreateFolderButton: React.FC = () => {
  const handleCreateFolder = () => {
    console.log('Criar nova pasta')
  }

  return (
    <Button
      onClick={handleCreateFolder}
      className="flex items-center gap-2 bg-[#7E49FF] hover:bg-[#472FB2] text-white font-medium"
    >
      <Plus className="h-4 w-4" />
      Criar Pasta
    </Button>
  )
}



export default function PastasPage() {
  const [search, setSearch] = useState('')
  
  const allData: Pasta[] = [
  {
    id: 'pasta-1',
    nome: 'Campanha Black Friday',
    criadoEm: '2025-06-15',
    ativo: true,
  },
  {
    id: 'pasta-2',
    nome: 'Novos Leads B2B',
    criadoEm: '2025-06-18',
    ativo: false,
  },
]


const data = allData.filter((item) =>
  item.nome.toLowerCase().includes(search.toLowerCase())
)

const columns: ColumnDef<Pasta>[] = [

  {
    accessorKey: 'nome',
    header: 'Nome',
    cell: ({ row }) => (
      <span className="text-sm text-gray-900">{row.getValue('nome')}</span>
    ),
  },
  {
    accessorKey: 'criadoEm',
    header: 'Criado Em',
    cell: ({ row }) => {
      const raw = row.getValue<string>('criadoEm')
      const dataFormatada = new Date(raw).toLocaleDateString('pt-BR')
      return <span className="text-sm text-muted-foreground">{dataFormatada}</span>
    },
  },
  {
    accessorKey: 'ativo',
    header: 'Status',
    cell: ({ row }) => {
      const [ativo, setAtivo] = useState(row.getValue<boolean>('ativo'))
        return (
          <Switch
            checked={ativo}
            onCheckedChange={(val) => {
              setAtivo(val)
              console.log('Status alterado:', row.original.nome, val)
            }}
            className="data-[state=checked]:bg-[#8332FF]"
          />
        )
    },
  },
{
  id: 'acoes',
  header: 'Ações',
  cell: ({ row }) => {
    const pasta = row.original

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </PopoverTrigger>

        <PopoverContent align="end" className="w-56 p-2 space-y-1">
          <div
            onClick={() => console.log('Favoritar', pasta.nome)}
            className="flex items-center text-sm px-2 py-1.5 rounded-md hover:bg-muted cursor-pointer"
          >
            <Star className="w-4 h-4 mr-2" />
            Adicionar aos favoritos
          </div>
          <div
           
            onClick={() => console.log('Renomear', pasta.nome)}
            className="flex items-center text-sm px-2 py-1.5 rounded-md hover:bg-muted cursor-pointer"
          >
            <Edit className="w-4 h-4 mr-2" />
            Renomear
          </div>
          <div
            onClick={() => console.log('Duplicar', pasta.nome)}
            className="flex items-center text-sm px-2 py-1.5 rounded-md hover:bg-muted cursor-pointer"
          >
            <Copy className="w-4 h-4 mr-2" />
            Duplicar
          </div>
          <div
            onClick={() => console.log('Apagar', pasta.nome)}
            className="flex items-center text-sm px-2 py-1.5 rounded-md hover:bg-destructive/10 text-red-600 cursor-pointer"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Apagar
          </div>
        </PopoverContent>
      </Popover>
    )
  },
},

]

  return (
    <AnimatedPage>
    <div className="min-h-screen font-sans bg-[#F4F5F7] p-6 space-y-6">
      <div className="space-y-6">
        {/* Cabeçalho */}
        <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="bg-[#8332FF1A] p-2 rounded-md">
            <LayoutGrid  className="text-[#8332FF]" size={20} />
          </div>
          <div>
            <h1 className="text-[22px] font-bold text-gray-900">Geral</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Gerencie pastas e itens favoritos.
            </p>
          </div>
        </div>

        <CreateFolderButton />

      </div>

        {/* Cards superiores - Status e Favoritos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StatusCard />
          <FavoritosCard />
        </div>

        <div className="max-w-sm">
        <Input
          type="text"
          placeholder="Pesquisar Pasta"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="text-sm bg-white"
        />
      </div>

      {/* Tabela de Pastas */}
     <div className="bg-white border border-gray-200 shadow-sm rounded-xl transition duration-200 ease-in-out hover:shadow-md">
      <DataTable columns={columns} data={data} />
      </div>


      </div>
    </div>
    </AnimatedPage>
  );
}
