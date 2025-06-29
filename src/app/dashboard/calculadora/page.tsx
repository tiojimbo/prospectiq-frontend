'use client'

import AnimatedPage from '@/components/AnimatedPage'
import { useState } from 'react'
import { Calculator, ListFilter, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,} from '@/components/ui/dropdown-menu'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { ChevronDown,  Trash2} from 'lucide-react'
import { Combobox } from "@/components/ui/combobox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ScrollArea } from "@/components/ui/scroll-area"
import { useTotalEmpresas } from '@/hooks/api'


interface MetricCardProps {
  title: string
  value: string
}

type Filter = {
  field: string;
  condition: 'É' | 'Não é';
  value: string;
};


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

interface DataTableProps {
  title: string
  data: Array<{ name: string; value: string }>
}

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

const cidadesData = [
  { name: 'São Paulo', value: '4.248.955' },
  { name: 'Rio de Janeiro', value: '2.248.955' },
  { name: 'Belo Horizonte', value: '2.248.955' },
  { name: 'Curitiba', value: '2.248.955' },
  { name: 'Porto Alegre', value: '2.248.955' },
  { name: 'Brasília', value: '2.248.955' },
]

const setoresData = [
  { name: 'Serviços', value: '2.248.955' },
  { name: 'Comércio Varejista', value: '2.248.955' },
  { name: 'Alimentos', value: '2.248.955' },
  { name: 'Manufatura', value: '2.248.955' },
  { name: 'Construção', value: '2.248.955' },
  { name: 'Educação', value: '2.248.955' },
  { name: 'Saúde', value: '2.248.955' },
]


export default function CalculadoraPage() {      
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<Filter[]>([]);
  const [loadingFilters, setLoadingFilters] = useState(true);

useEffect(() => {
  if (typeof window === 'undefined') return;

  const filtrosSalvos = localStorage.getItem('prospectiq_filtros');
  if (filtrosSalvos) {
    try {
      const parsed = JSON.parse(filtrosSalvos);
      if (Array.isArray(parsed)) {
        setFilters(parsed);
      }
    } catch (err) {
      console.error('Erro ao carregar filtros salvos:', err);
    }
  }
  setLoadingFilters(false);
}, []);



const getFiltroValor = (campo: string): string | undefined => {
  const filtro = filters.find(f => f.field === campo && f.condition === 'É')
  return filtro?.value || undefined
}

const uf = getFiltroValor('Estado')
const municipio = getFiltroValor('Cidade')
const cnae = getFiltroValor('Setor')
const { data, loading, error } = useTotalEmpresas({ uf, municipio, cnae })

const clearAllFilters = () => {
  setFilters([]);
  if (typeof window !== 'undefined') {
  localStorage.setItem('prospectiq_filtros', JSON.stringify([]));
}
  
};

const handleAddFilter = () => {
  setFilters([...filters, { field: '', condition: 'É', value: '' }])
}

const handleRemoveFilter = (index: number) => {
  const newFilters = filters.filter((_, i) => i !== index)
  setFilters(newFilters)
 if (typeof window !== 'undefined') {
  localStorage.setItem('prospectiq_filtros', JSON.stringify(newFilters));
}

}

const handleChange = (index: number, key: 'field' | 'value' | 'condition', newValue: string) => {
  const newFilters = [...filters];

  if (key === 'field') {
    newFilters[index].field = newValue;
    newFilters[index].value = ''; // Resetar valor ao mudar filtro
  } else if (key === 'condition') {
    newFilters[index].condition = newValue as 'É' | 'Não é';
  } else {
    newFilters[index].value = newValue;
  }

  setFilters(newFilters);
  if (typeof window !== 'undefined') {
  localStorage.setItem('prospectiq_filtros', JSON.stringify(newFilters));
}

};

const filterRef = useRef<HTMLDivElement>(null)

  return (
    <AnimatedPage>
    <div className="p-6 font-sans bg-[#F3F5F9] min-h-screen space-y-6">
      <div className="space-y-6">
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
      <div className="flex gap-2">

    <Popover>
  <PopoverTrigger asChild>
    <Button
      variant="outline"
      size="sm"
      className="flex items-center gap-2 cursor-pointer rounded-full"
    >
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
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="w-[200px] justify-between"
            >
              {filter.field || "Selecionar filtro"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Buscar filtro..." />
              <CommandEmpty>Nenhum filtro encontrado.</CommandEmpty>
              <CommandGroup>
                {['Estado', 'Setor', 'Porte'].map((item) => (
                  <CommandItem
                    key={item}
                    value={item}
                    onSelect={(currentValue) =>
                      handleChange(index, 'field', currentValue)
                    }
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        filter.field === item ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {item}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        <Select
          value={filter.condition}
          onValueChange={(value) => handleChange(index, "condition", value)}
        >
          <SelectTrigger className="w-[200px] hover:bg-muted">
            <SelectValue placeholder="Condição" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="É">É</SelectItem>
            <SelectItem value="Não é">Não é</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filter.value}
          onValueChange={(value) => handleChange(index, "value", value)}
        >
          <SelectTrigger className="w-[200px] hover:bg-muted">
            <SelectValue placeholder="Selecionar valor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AC">AC</SelectItem>
            <SelectItem value="AL">AL</SelectItem>
            <SelectItem value="AM">AM</SelectItem>
            <SelectItem value="AP">AP</SelectItem>
            <SelectItem value="BA">BA</SelectItem>
            <SelectItem value="CE">CE</SelectItem>
            <SelectItem value="DF">DF</SelectItem>
            <SelectItem value="ES">ES</SelectItem>
            <SelectItem value="GO">GO</SelectItem>
            <SelectItem value="MA">MA</SelectItem>
            <SelectItem value="MG">MG</SelectItem>
            <SelectItem value="MS">MS</SelectItem>
            <SelectItem value="MT">MT</SelectItem>
            <SelectItem value="PA">PA</SelectItem>
            <SelectItem value="PB">PB</SelectItem>
            <SelectItem value="PI">PI</SelectItem>
            <SelectItem value="PR">PR</SelectItem>
            <SelectItem value="RJ">RJ</SelectItem>
            <SelectItem value="RN">RN</SelectItem>
            <SelectItem value="RO">RO</SelectItem>
            <SelectItem value="RR">RR</SelectItem>
            <SelectItem value="RS">RS</SelectItem>
            <SelectItem value="RR">RR</SelectItem>
            <SelectItem value="SC">SC</SelectItem>
            <SelectItem value="SE">SE</SelectItem>
            <SelectItem value="SP">SP</SelectItem>
            <SelectItem value="TO">TO</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleRemoveFilter(index)}
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>
    ))}

    <Button variant="outline" size="sm" onClick={handleAddFilter}>
      Adicionar filtro
    </Button>
  </PopoverContent>
</Popover>

        <Button size="sm" className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
          <Download className="h-4 w-4" />
          Exportar
        </Button>
      </div>
    </div>
    
        {/* Cards de métricas */}
        <div className="flex gap-4 flex-wrap">
  <div className="w-[280px]">
      <MetricCard
      title="Empresas"
      value={
        loading
          ? '...'
          : error
          ? 'Erro'
          : data?.totalEmpresas.toLocaleString('pt-BR') ?? '0'
      }
      />
  </div>
  <div className="w-[280px]">
    <MetricCard title="Faturamento Anual" value="R$ 152 Trilhões" />
  </div>
</div>
        {/* Layout principal com mapa e tabelas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <DataTable
              title="Cidades"
              data={
                data?.rankingCidades.map(c => ({
                  name: c.nome, // ✅ correto (agora o backend envia .nome)
                  value: c.total.toLocaleString('pt-BR')
                })) || []
              }
            />
              <DataTable
                title="Setores"
                data={
                  data?.rankingSetores.map(s => ({
                    name: s.nome, // ✅ correto
                    value: s.total.toLocaleString('pt-BR')
                  })) || []
                }
              />

          </div>
      </div>
    </div>
    </AnimatedPage>
  );
}
