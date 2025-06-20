'use client'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UserPen } from 'lucide-react';
import { useState } from 'react';
import AnimatedPage from '@/components/AnimatedPage'

export default function PerfilPage() {
  const [nome, setNome] = useState('Pedro Carlos');
  const [email, setEmail] = useState('pedrocarlos@gmail.com');
  
  return (
    <AnimatedPage>
          <div className="w-full max-w-[1000px] ml-12 px-6 py-12 font-inter">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Lado esquerdo */}
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="bg-[#8332FF1A] p-2 rounded-md">
            <UserPen className="text-[#8332FF]" size={20} />
          </div>
            <div>
              <h1 className="text-2xl font-bold">Editar Perfil</h1>
              <p className="text-sm text-muted-foreground">
                Atualize suas informações de perfil.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-sans">Métricas e conversões</h2>
            <p className="text-sm text-muted-foreground font-sans">
              Atualize o seu avatar, seu nome, telefone e senha
            </p>
          </div>
        </div>

        {/* Lado direito */}
        <div className="space-y-6">
          <div className="space-y-2">
            <img
            src="/avatar-default.png"
            alt="Avatar"
            className="w-20 h-20 rounded-full object-cover"
          />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium font-sans">Nome</label>
            <Input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Digite seu nome" className="bg-[#F8F8F8] border border-[#E5E5E5] rounded-md font-sans text-sm placeholder:text-gray-500"/>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium font-sans">Email</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu telefone de contato" className="bg-[#F8F8F8] border border-[#E5E5E5] rounded-md font-sans text-sm placeholder:text-gray-500"/>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium font-sans">Alterar Senha</label>
            <Input placeholder="Nova senha" type="password" className="bg-[#F8F8F8] border border-[#E5E5E5] rounded-md font-sans text-sm placeholder:text-gray-500"/>
          </div>

          <Button className="bg-[#7E49FF] hover:bg-[#6c3dd6] text-white font-medium">
            Salvar
          </Button>
        </div>
      </div>
    </div>
    </AnimatedPage>
  );
}
