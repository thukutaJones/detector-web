import Header from "@/components/home/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Detector | AI-Powered Exam Monitoring",
    description:
        "Detector is an AI-powered exam cheating detection system designed to enhance academic integrity by monitoring and flagging suspicious behavior in real time.",
};

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            <Header />
            {children}
        </main>
    );
}
