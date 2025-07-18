import AdminSideBar from "@/components/admin/AdminSideBar";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin | Detector",
    description:
        "Detector is an AI-powered exam cheating detection system designed to enhance academic integrity by monitoring and flagging suspicious behavior in real time.",
};

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="h-screen relative bg-gradient-to-br from-slate-50 via-white to-slate-100 flex overflow-hidden">
            {/* Optional ambient blobs */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/5 to-blue-400/5 rounded-full blur-3xl animate-pulse pointer-events-none z-0"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/5 to-pink-400/5 rounded-full blur-3xl animate-pulse delay-1000 pointer-events-none z-0"></div>

            {/* Main layout */}
            <AdminSideBar />
            <div className="flex-1 overflow-y-auto z-10">
                {children}
            </div>
        </main>
    );
}
