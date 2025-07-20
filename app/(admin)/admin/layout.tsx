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
  return <div>{children}</div>;
}
