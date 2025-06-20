'use client'

import AnimatedPage from '@/components/AnimatedPage'

export default function EmpresasPage() {
  return (
    <AnimatedPage>
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-2">Empresas Encontradas</h1>
      <p className="text-sm text-muted-foreground">Lista de empresas retornadas da filtragem.</p>
    </div>
    </AnimatedPage>
  );
}
