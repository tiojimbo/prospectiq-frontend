import React from "react";
import Header from "@/components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 overflow-auto bg-[#F3F5F9] px-6 py-4">
        {children}
      </main>
    </div>
  );
}
