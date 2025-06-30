
import AnimatedPage from '@/components/AnimatedPage'
import { useState, useEffect } from 'react'
import { Calculator, ListFilter, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Check, ChevronsUpDown, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useTotalEmpresas } from '@/hooks/api'

/** Tipagens auxiliares **/
interface MetricCardProps {
  title: string
  value: string
}

interface DataTableProps {
  title: string
  data: Array<{ name: string; value: string }>
}

type Filter = {
  field: string
  condition: 'É' | 'Não é'
  value: string
}

/** Componentes visuais reutilizáveis **/
const MetricCard: React.FC<MetricCardProps> = ({ title, value }) => (
  <Card className="bg-white shadow-sm border border-gray-200">
    <CardHeader>
      <CardTitle className="text-lg font-semibold text-gray-00">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
    </CardContent>
  </Card>
)

const DataTable: React.FC<DataTableProps> = ({ title, data }) => (
  <Card className="bg-white shadow-sm border border-gray-200 h-full">
    <CardHeader>
      <CardTitle className="text-lg font-semibold text-gray-900">{title}</CardTitle>
    </CardHeader>
    <CardContent className="p-5 max-h-[360px]">
      <ScrollArea className="h-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-600">{title === 'Cidades' ? 'Cidade' : 'Setor'}</TableHead>
              <TableHead className="text-gray-600 text-right">Empresas</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-gray-900">{item.name}</TableCell>
                <TableCell className="text-gray-600 text-right">{item.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </CardContent>
  </Card>
)

/** Página principal **/
export default function CalculadoraPage() {
  const [filters, setFilters] = useState<Filter[]>([])
  const [loadingFilters, setLoadingFilters] = useState(true)

  /** Carrega filtros salvos uma única vez **/
  useEffect(() => {
    if (typeof window === 'undefined') return

    const filtrosSalvos = localStorage.getItem('prospectiq_filtros')
    if (filtrosSalvos) {
      try {
        const parsed = JSON.parse(filtrosSalvos)
        if (Array.isArray(parsed)) setFilters(parsed)
      } catch (err) {
        console.error('Erro ao carregar filtros salvos:', err)
      }
    }
    setLoadingFilters(false)
  }, [])

  /** Helpers */
  const getFiltroValor = (campo: string) => {
    const f = filters.find((x) => x.field === campo && x.condition === 'É')
    return f?.value
  }

  const uf = getFiltroValor('Estado')
  const municipio = getFiltroValor('Cidade')
  const cnae = getFiltroValor('Setor')

  /**
   * Só buscamos quando os filtros já foram lidos do localStorage.
   * Enquanto loadingFilters === true passamos null → o hook não faz request.
   */
  const queryParams = loadingFilters
  ? undefined
  : {
      ...(uf && { uf }),           // só adiciona se houver valor
      ...(municipio && { municipio }),
      ...(cnae && { cnae }),
    }
  const { data, loading, error } = useTotalEmpresas(queryParams)

  /** Handlers dos filtros **/
  const persist = (arr: Filter[]) =>
    typeof window !== 'undefined' && localStorage.setItem('prospectiq_filtros', JSON.stringify(arr))

  const clearAllFilters = () => {
    setFilters([])
    persist([])
  }

  const handleAddFilter = () => setFilters((prev) => [...prev, { field: '', condition: 'É', value: '' }])

  const handleRemoveFilter = (idx: number) => {
    setFilters((prev) => {
      const nxt = prev.filter((_, i) => i !== idx)
      persist(nxt)
      return nxt
    })
  }

  const handleChange = (idx: number, key: 'field' | 'value' | 'condition', val: string) => {
    setFilters((prev) => {
      const nxt = [...prev]
      if (key === 'field') {
        nxt[idx].field = val
        nxt[idx].value = ''
      } else if (key === 'condition') {
        nxt[idx].condition = val as 'É' | 'Não é'
      } else {
        nxt[idx].value = val
      }
      persist(nxt)
      return nxt
    })
  }
  return (
    <AnimatedPage>
      <div className="p-6 font-sans bg-[#F3F5F9] min-h-screen space-y-6">
        {/* Cabeçalho */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="bg-[#8332FF1A] p-2 rounded-md">
              <Calculator className="text-[#8332FF]" size={20} />
            </div>
            <div>
              <h1 className="text-[22px] font-bold text-gray-900">Calculadora</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Mapeie mercados potenciais com precisão, a partir de dados de diversas fontes.
              </p>
            </div>
          </div>
          {/* Botões direita */}
          <div className="flex gap-2">
            {/* Popover de Filtros */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2 rounded-full">
                  <ListFilter className="h-4 w-4 text-[#0A0A0A]" />
                  <span className="text-[#0A0A0A] font-medium">Filtros</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent side="bottom" align="start" className="w-[560px] space-y-4 -translate-x-24">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Filtros</h4>
                  <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                    Apagar tudo
                  </Button>
                </div>

                {filters.map((filter, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {/* Campo */}
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" role="combobox" className="w-[200px] justify-between">
                          {filter.field || 'Selecionar filtro'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Buscar filtro..." />
                          <CommandEmpty>Nenhum filtro encontrado.</CommandEmpty>
                          <CommandGroup>
                            {['Estado', 'Setor', 'Porte'].map((item) => (
                              <CommandItem key={item} value={item} onSelect={() => handleChange(index, 'field', item)}>
                                <Check className={cn('mr-2 h-4 w-4', filter.field === item ? 'opacity-100' : 'opacity-0')} />
                                {item}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    {/* Condição */}
                    <Select value={filter.condition} onValueChange={(v) => handleChange(index, 'condition', v)}>
                      <SelectTrigger className="w-[200px] hover:bg-muted">
                        <SelectValue placeholder="Condição" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="É">É</SelectItem>
                        <SelectItem value="Não é">Não é</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Valor (exemplo somente UFs; adapte conforme tipo) */}
                    <Select value={filter.value} onValueChange={(v) => handleChange(index, 'value', v)}>
                      <SelectTrigger className="w-[200px] hover:bg-muted">
                        <SelectValue placeholder="Selecionar valor" />
                      </SelectTrigger>
                      <SelectContent>
                        {['AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MG','MS','MT','PA','PB','PE','PI','PR','RJ','RN','RO','RR','RS','SC','SE','SP','TO'].map((uf) => (
                          <SelectItem key={uf} value={uf}>{uf}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Button variant="ghost" size="sm" onClick={() => handleRemoveFilter(index)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}

                <Button variant="outline" size="sm" onClick={handleAddFilter}>
                  Adicionar filtro
                </Button>
              </PopoverContent>
            </Popover>

            {/* Botão Exportar */}
            <Button size="sm" className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
              <Download className="h-4 w-4" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Cards de Métricas */}
        <div className="flex gap-4 flex-wrap">
          <div className="w-[280px]">
            <MetricCard
              title="Empresas"
              value={
                loading ? '...' : error ? 'Erro' : data?.totalEmpresas.toLocaleString('pt-BR') ?? '0'
              }
            />
          </div>
          <div className="w-[280px]">
            <MetricCard title="Faturamento Anual" value="R$ 152 Trilhões" />
          </div>
        </div>

        {/* Tabelas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <DataTable
            title="Cidades"
            data={
              data?.rankingCidades.map((c) => ({ name: c.nome, value: c.total.toLocaleString('pt-BR') })) || []
            }
          />
          <DataTable
            title="Setores"
            data={
              data?.rankingSetores.map((s) => ({ name: s.nome, value: s.total.toLocaleString('pt-BR') })) || []
            }
          />
        </div>
      </div>
    </AnimatedPage>
  )
}
