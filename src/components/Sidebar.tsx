"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, Folder, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Calculadora", href: "/dashboard/calculadora", icon: Home },
  { label: "Empresas", href: "/dashboard/empresas", icon: Briefcase },
  { label: "Pastas", href: "/dashboard/pastas", icon: Folder },
  { label: "Perfil", href: "/dashboard/perfil", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen border-r bg-neutral-50 p-4">
      <div className="text-xl font-bold mb-6">Prospect IQ</div>
      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 p-2 rounded-md text-sm font-medium transition",
                isActive ? "bg-neutral-200" : "text-neutral-700 hover:bg-neutral-100"
              )}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
