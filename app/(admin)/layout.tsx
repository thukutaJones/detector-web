"use client";

import dynamic from "next/dynamic";
import type { Metadata } from "next";

const AdminSideBar = dynamic(() => import("@/components/admin/AdminSideBar"), {
  ssr: false,
});

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen relative bg-white flex overflow-hidden text-gray-600">
      <AdminSideBar />
      <div className="flex-1 overflow-y-auto scroll-container z-10">{children}</div>
    </main>
  );
}
