import type { Metadata } from "next";
import { DM_Sans, Orbitron, Press_Start_2P } from "next/font/google";
import { SpringCursor } from "@/components/ui/spring-cursor";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["700", "900"],
});

const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-press-start",
});

export const metadata: Metadata = {
  title: "Muhammad Usman Siddiqui",
  description: "AI, Automation, and Technology Consultant · Penn State CS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${dmSans.variable} ${orbitron.variable} ${pressStart.variable} font-sans antialiased`}>
        <ScrollProgress />
        <SpringCursor />
        {children}
      </body>
    </html>
  );
}
