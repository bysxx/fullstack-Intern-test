import "@styles/global.css";
import { Analytics } from "@vercel/analytics/next";
import type { ReactNode } from "react";
import { Providers } from "./provider";
import { Inter, Playfair_Display } from "next/font/google";
import { cn } from "@/shared/utils/cn";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-serif",
  display: "swap",
});

export const metadata = {
  title: "Next15 Template",
  description: "Next15 + TypeScript Template",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className={cn(inter.variable, playfair.variable)}>
      <body className="font-sans antialiased text-gray-900 bg-white">
        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
