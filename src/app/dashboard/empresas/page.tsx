'use client'

import AnimatedPage from '@/components/AnimatedPage'
import { Layers } from 'lucide-react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  PaginationState,
} from '@tanstack/react-table'

import {
  Table as TableUI,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetOverlay,
  
} from "@/components/ui/sheet"

import { Table as TableIcon, CircleDashed } from 'lucide-react'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { MoreVertical } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


/* ----------------------------- Tipo da Empresa ----------------------------- */
type Empresa = {
  id: string
  nomeFantasia: string
  cnpj: string
  endereco: string
  setor: string
  porte: string
}

/* ----------------------------- Colunas da Tabela ----------------------------- */
const empresaColumns: ColumnDef<Empresa>[] = [
  {
    accessorKey: 'nomeFantasia',
    header: 'Nome Fantasia',
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue('nomeFantasia')}</span>
    ),
  },
  {
    accessorKey: 'cnpj',
    header: 'CNPJ',
    cell: ({ row }) => (
      <span className="text-gray-600 text-sm">{row.getValue('cnpj')}</span>
    ),
  },
  {
    accessorKey: 'endereco',
    header: 'Endereço',
    cell: ({ row }) => (
      <span className="text-gray-600 text-sm">{row.getValue('endereco')}</span>
    ),
  },
  {
    accessorKey: 'setor',
    header: 'Setor',
    cell: ({ row }) => (
      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md">
        {row.getValue('setor')}
      </span>
    ),
  },
  {
    accessorKey: 'porte',
    header: 'Porte',
    cell: ({ row }) => (
      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md">
        {row.getValue('porte')}
      </span>
    ),
  },
]

/* ----------------------------- Componente DataTable ----------------------------- */
function DataTable({
  columns,
  data,
}: {
  columns: ColumnDef<Empresa>[]
  data: Empresa[]
}) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: { pagination },
    onPaginationChange: setPagination,
    manualPagination: false,
    pageCount: Math.ceil(data.length / pagination.pageSize),
  })

  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)

const toggleSelecionado = (id: string) => {
  setSelectedIds((prev) =>
    prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
  )
}

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        
  {/* Render cards ao invés de linhas HTML */}
  <div className="flex flex-col gap-4">
    
{/* Cabeçalho estilo ClickUp */}
<div className="grid grid-cols-[32px_2fr_1fr_1fr_1fr_40px] text-xs font-semibold text-muted-foreground px-2 py-2 border-b">
  <div></div>
  <div>Nome</div>
  <div>CNPJ</div>
  <div>Setor</div>
  <div>Porte</div>
  <div></div>
</div>


{/* Linhas */}
{table.getRowModel().rows.map((row) => {
  const empresa = row.original as Empresa
  const isSelected = selectedIds.includes(empresa.id)


const [empresaSelecionada, setEmpresaSelecionada] = useState<Empresa | null>(null)
const [isSheetAberto, setIsSheetAberto] = useState(false)

const abrirDetalhesEmpresa = (empresa: Empresa) => {
  setEmpresaSelecionada(empresa)
  setIsSheetAberto(true)
}


  return (
    <div
      key={row.id}
      onMouseEnter={() => setHoveredRow(row.id)}
      onMouseLeave={() => setHoveredRow(null)}
      className={`group grid grid-cols-[32px_2fr_1fr_1fr_1fr_40px] items-center px-2 py-2 border-b text-[13px] transition 
        ${isSelected ? "bg-[#F3EDFF] border-l-4 border-[#7c3aed]" : "hover:bg-[#FAFAFA]"}`}
    >
      {/* Célula: ícone decorativo, checkbox e botão + */}
  <div className="relative flex items-center justify-start w-full h-6 group">
  <div className="absolute left-0 flex items-center gap-2 pl-2">
    {/* Ícone decorativo (padrão) */}
    {!isSelected && hoveredRow !== row.id && (
      <CircleDashed className="w-4 h-4 text-muted-foreground" />
    )}

    {/* Checkbox no hover ou se estiver selecionado */}
    {(hoveredRow === row.id || isSelected) && (
      <Checkbox
        checked={isSelected}
        onCheckedChange={() => toggleSelecionado(empresa.id)}
        className="w-4 h-4 transition-all duration-150"
      />
    )}
  </div>
</div>

<Sheet open={isSheetAberto} onOpenChange={setIsSheetAberto}>
  <SheetOverlay className="bg-transparent pointer-events-none" /> {/* ← isso remove o overlay escuro */}
  <SheetContent className="!w-full !max-w-[900px] sm:!max-w-[1100px] md:!max-w-[1200px] lg:!max-w-[900px]">
    <SheetHeader>
      <SheetTitle>{empresaSelecionada?.nomeFantasia}</SheetTitle>
    </SheetHeader>

    {empresaSelecionada && (
  <div className="px-6 mt-6 space-y-6 text-sm text-gray-900">

    {/* Identificação */}
    <div className="space-y-1">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase">Identificação</h3>
      <div className="flex flex-col gap-1">
        <p><span className="font-medium">CNPJ:</span> {empresaSelecionada.cnpj}</p>
        <p><span className="font-medium">Razão Social:</span> Nome LTDA</p>
        <p><span className="font-medium">Nome Fantasia:</span> {empresaSelecionada.nomeFantasia}</p>
        <p><span className="font-medium">Tipo:</span> Matriz</p>
        <p><span className="font-medium">Situação:</span> Ativa</p>
      </div>
    </div>

    {/* Endereço */}
    <div className="space-y-1">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase">Endereço</h3>
      <div className="flex flex-col gap-1">
        <p><span className="font-medium">Logradouro:</span> Av. Exemplo</p>
        <p><span className="font-medium">Número:</span> 123</p>
        <p><span className="font-medium">Complemento:</span> Sala 10</p>
        <p><span className="font-medium">Bairro:</span> Centro</p>
        <p><span className="font-medium">CEP:</span> 00000-000</p>
        <p><span className="font-medium">UF:</span> SP</p>
        <p><span className="font-medium">Município:</span> São Paulo</p>
      </div>
    </div>

    {/* Atividade Econômica */}
    <div className="space-y-1">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase">Atividade Econômica</h3>
      <p><span className="font-medium">CNAE Principal:</span> 62.01-5-01 - Desenvolvimento de programas de computador sob encomenda</p>
      <p><span className="font-medium">CNAEs Secundários:</span> 62.02-3-00, 62.03-1-00</p>
    </div>

    {/* Natureza & Porte */}
    <div className="space-y-1">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase">Natureza & Porte</h3>
      <div className="flex flex-col gap-1">
        <p><span className="font-medium">Natureza Jurídica:</span> Sociedade Empresária Limitada</p>
        <p><span className="font-medium">Porte:</span> {empresaSelecionada.porte}</p>
        <p><span className="font-medium">Capital Social:</span> R$ 100.000,00</p>
      </div>
    </div>

    {/* Regime Tributário */}
    <div className="space-y-1">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase">Regime Tributário</h3>
      <ul className="list-disc list-inside">
        <li>2023 - Simples Nacional</li>
        <li>2022 - Lucro Presumido</li>
        <li>2021 - Lucro Presumido</li>
      </ul>
    </div>

    {/* Quadro Societário */}
    <div className="space-y-1">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase">Quadro Societário</h3>
      <ul className="list-disc list-inside">
        <li>João Silva – Sócio administrador</li>
        <li>Maria Souza – Sócia</li>
      </ul>
    </div>

    {/* Contatos */}
    <div className="space-y-1">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase">Contatos</h3>
      <p><span className="font-medium">Telefone:</span> (11) 1234-5678</p>
    </div>

  </div>
)}

  </SheetContent>
</Sheet>


      {/* Nome da empresa (hover roxo) */}
      <div className={`flex items-center gap-2 font-medium transition-colors ${hoveredRow === row.id ? "text-[#8332FF]" : "text-gray-900"}`}>
      <button
      onClick={() => abrirDetalhesEmpresa(empresa)}
      className={`transition-colors ${hoveredRow === row.id ? "text-[#8332FF]" : "text-gray-900"} font-medium cursor-pointer`}
    >
      {empresa.nomeFantasia}
    </button>

  
  {hoveredRow === row.id && (
    <button
      onClick={() => console.log("Adicionar à pasta:", empresa.id)}
      className="w-5 h-5 text-muted-foreground border rounded-md flex items-center justify-center bg-white shadow-sm hover:bg-muted"
      title="Adicionar à pasta"
    >
      +
    </button>
      )}
    </div>


      {/* CNPJ */}
      <div className="text-[12px] text-muted-foreground">{empresa.cnpj}</div>

      {/* Setor */}
      <div className="text-[12px] text-muted-foreground">{empresa.setor}</div>

      {/* Porte */}
      <div className="text-[12px] text-muted-foreground">{empresa.porte}</div>

      {/* Ação */}
      <div className="flex justify-end">
        <MoreVertical className="w-4 h-4 text-[#B0B0B0]" />
      </div>
    </div>
  )
})}


</div>


  {/* Paginação */}
 {/* Paginação estilo ClickUp */}
<div className="flex justify-center mt-4">
  <Pagination>
    <PaginationContent>
      <PaginationItem>
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="text-sm h-8 rounded-md bg-white text-gray-800 hover:bg-gray-100 hover:text-gray-900 cursor-pointer px-3"
        >
          Anterior
        </Button>


      </PaginationItem>

      {Array.from({ length: table.getPageCount() }).map((_, index) => (
        <PaginationItem key={index}>
          <Button
            onClick={() => table.setPageIndex(index)}
            className={`w-8 h-8 text-sm rounded-md transition-colors duration-150 ${
              table.getState().pagination.pageIndex === index
                ? "bg-[#7E49FF] text-white"
                : "text-gray-800 bg-white hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
            }`}
          >
            {index + 1}
          </Button>
        </PaginationItem>
      ))}

      <PaginationItem>
        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="text-sm h-8 rounded-md bg-white text-gray-800 hover:bg-gray-100 hover:text-gray-900 cursor-pointer px-3"
        >
          Próximo
        </Button>
      </PaginationItem>
    </PaginationContent>
  </Pagination>
</div>


</div>

    </div>
  )
}

export default function EmpresasPage() {
  const empresas: Empresa[] = Array.from({ length: 50 }, (_, i) => ({
    id: `id-${i}`,
    nomeFantasia: `Empresa ${i + 1}`,
    cnpj: '00.000.000/0001-00',
    endereco: 'Av. Exemplo, 123 - SP',
    setor: 'Tecnologia',
    porte: 'de 10 a 50',
  }))

  return (
    <AnimatedPage>
    <div className="p-6 font-sans bg-[#F3F5F9] min-h-screen space-y-6">
        {/* Cabeçalho */}
        <div className="flex items-start gap-4">
          <div className="bg-[#8332FF1A] p-2 rounded-md">
            <Layers className="text-[#8332FF]" size={20} />
          </div>
          <div>
            <h1 className="text-[22px] font-bold text-gray-900">Empresas</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Lista de empresas retornadas da filtragem.
            </p>
          </div>
        </div>

        {/* Tabela */}
        <Card className="bg-white border border-gray-200 shadow-sm">
        <CardContent className="p-0">
          <DataTable columns={empresaColumns} data={empresas} />
        </CardContent>
      </Card>
      </div>

      
    </AnimatedPage>
    
  );
}
