"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calculator, LayoutGrid, Folder, Unplug, LogOut, UserPen, Layers } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRef, useEffect } from "react";

const navItems = [
  { label: "Geral", href: "/dashboard/geral", icon: LayoutGrid },
  { label: "Calculadora", href: "/dashboard/calculadora", icon: Calculator },
  { label: "Empresas", href: "/dashboard/empresas", icon: Layers,},
  { label: "Pastas", href: "/dashboard/pastas", icon: Folder },
  { label: "Integrações", href: "/dashboard/integracoes", icon: Unplug },
];


export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  function handleClickOutside(event: MouseEvent) {
    if (menuContainerRef.current && !menuContainerRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  }

  if (open) {
    document.addEventListener("mousedown", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [open]);


  return (
    <div className="flex w-full items-center justify-between relative px-6 py-4">

      <Link href="/dashboard/geral" className="flex items-center h-16">
        <Image
          src="/logo2-prospectiq.png"
          alt="Prospect IQ"
          width={150}
          height={40}
          className="object-contain"
        />
      </Link>

      {/* Navegação centralizada com container cinza arredondado */}
<div className="absolute left-1/2 transform -translate-x-1/2 bg-[#F4F5F7] rounded-full px-3 py-1.5">
<nav className="relative flex items-center gap-3 bg-[#F3F5F9] px-2 py-1 rounded-full">
  {navItems.map(({ label, href, icon: Icon }) => {
    const isActive = pathname === href;
    return (
      <Link
        key={href}
        href={href}
        className="relative z-10 px-3 py-1.5 text-sm font-medium rounded-full flex items-center gap-2 text-black"
      >
        {isActive && (
        <motion.div
          layoutId="active-pill"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="absolute inset-0 rounded-full bg-[#7E49FF] z-0"
        />
        )}
          <span
            className={cn(
              "relative z-10 flex items-center gap-2 text-base font-medium font-sans transition-colors",
              isActive ? "text-white" : "text-black"
            )}
          >
          <Icon className="size-4" />
          {label}
        </span>
      </Link>
    );
  })}
</nav>
</div>
      {/* Avatar à direita */}
<div className="relative" ref={menuContainerRef}>
  <Image
    src="/avatar-default.png"
    alt="Avatar"
    width={32}
    height={32}
    className="rounded-full cursor-pointer"
    onClick={() => setOpen(prev => !prev)}
  />

  <AnimatePresence>
    {open && (
        <motion.div
          key="user-menu"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 mt-2 w-56 rounded-md bg-white shadow-md border border-gray-200 z-50"
        >

        <div className="px-4 py-2 font-sans">
          <p className="text-sm font-medium text-gray-500">Pedro Carlos</p>
          <p className="text-xs text-gray-500">pedroolx2024@gmail.com</p>
        </div>

        <div className="border-t border-gray-200" />

        <Link
          href="/dashboard/perfil"
          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition font-sans"
        >
          <UserPen className="w-4 h-4" />
          Perfil
        </Link>

        <div className="border-t border-gray-200" />

        <button
          onClick={() => {
            console.log("Sair");
          }}
          className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-gray-100 transition w-full text-left font-sans"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </motion.div>
    )}
  </AnimatePresence>
</div>
    </div>
  );
}
