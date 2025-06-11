"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { LogIn } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 h-screen w-full">
      {/* Lado Esquerdo: institucional */}
<div
  className="relative h-full w-full bg-cover bg-no-repeat bg-center"
  style={{ backgroundImage: "url('/bg-login.png')" }}
>
  {/* Logo no canto superior esquerdo */}
  <div className="absolute top-6 left-6">
    <Image
      src="/logo-prospectiq.png"
      alt="Logo Prospect IQ"
      width={250}
      height={250}
      className="object-contain"
    />
  </div>

  {/* Frase institucional centralizada */}
  <div className="absolute inset-0 flex items-center justify-center px-6">
<h2 className="text-white text-[36px] font-sans font-semibold max-w-lg text-center drop-shadow-xl leading-snug">
  Potencialize sua prospecção<br />
  de forma estratégica.
</h2>

  </div>
</div>

      {/* Lado Direito: formulário de login */}
      <div className="flex flex-col items-center justify-center px-6">
        <div className="mb-6 text-center">
          <h1 className="font-sans font-semibold text-[30px] text-center text-black">
              Login
          </h1>
        <p className="font-sans font-normal text-[14px] text-[#999999] text-center">
          Entre para acessar sua conta
        </p>   
        </div>
        <div className="w-[479px] h-auto bg-white border border-[#EBEBEB] drop-shadow-md p-8 md:py-12 rounded-xl">
          <form className="space-y-4">
            <input
              type="email"
              placeholder="E-mail"
              className="w-full h-[51px] px-4 bg-[#E5E7EB] border border-[#E0E0E0] text-sm outline-none rounded-md font-sans"
            />

{/* Campo de senha */}
<div className="relative mb-2">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Digite sua senha"
    className="w-full h-[51px] px-4 pr-10 bg-[#E5E7EB] border border-[#E0E0E0] text-sm outline-none rounded-md font-sans"
  />
  <button
    type="button"
    onClick={() => setShowPassword((prev) => !prev)}
    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
  >
    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
  </button>
</div>

{/* Lembre-me */}
<div className="flex items-center space-x-2 mb-4">
  <input
    type="checkbox"
    id="remember"
    className="size-4 rounded-md accent-[#0A165F]"
  />
  <label htmlFor="remember" className="text-sm text-muted-foreground font-sans">
    Lembre-me
  </label>
</div>



<Button
  type="button"
  onClick={() => router.push("/dashboard/calculadora")}
  className="w-full h-[51px] bg-[#553ED0] hover:bg-[#4730b1] rounded-md flex items-center justify-center"
>

  <LogIn size={24} strokeWidth={2} className="text-white" />
  <span className="ml-1 font-sans font-bold text-[18px] leading-none text-white">
    Entrar
  </span>
</Button>
          </form>
        </div>
      </div>
    </main>
  );
}