import { Toaster } from "@/components/ui/sonner";
import { TRPCReactProvider } from "@/trpc/client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export const metadata: Metadata = {
  title: "Aldiyes Paskalis Birta | Portfolio",
  description:
    "Welcome to my personal portfolio! This repository showcases my projects, skills, and experience as a developer. It highlights my work across web, mobile, and AR/Unity applications, demonstrating my technical abilities and passion for creating impactful solutions. Feel free to explore my projects, read about my journey, and get in touch if you'd like to collaborate or learn more about my work.",
  icons: {
    icon: "./logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <TRPCReactProvider>
        <body className={`${inter.className} antialiased`}>
          <Toaster position="top-center" expand={true} />
          {children}
        </body>
      </TRPCReactProvider>
    </html>
  );
}
