import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Team | Detector",
  description:
    "Detector is an AI-powered exam cheating detection system designed to enhance academic integrity by monitoring and flagging suspicious behavior in real time.",
};

export default function OurTeamLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <main>
        {children}
      </main>
  );
}
