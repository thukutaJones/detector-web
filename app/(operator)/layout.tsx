"use client";

import dynamic from "next/dynamic";
import type { Metadata } from "next";

const OperatorSideBar = dynamic(() => import("@/components/operator/OperatorSideBar"), {
  ssr: false,
});

export default function OperatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen relative bg-gradient-to-br from-slate-50 via-white to-slate-100 flex overflow-hidden text-gray-600">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/5 to-blue-400/5 rounded-full blur-3xl animate-pulse pointer-events-none z-0" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/5 to-pink-400/5 rounded-full blur-3xl animate-pulse delay-1000 pointer-events-none z-0" />
      <OperatorSideBar />
      <div className="flex-1 overflow-y-auto z-10">{children}</div>
    </main>
  );
}
