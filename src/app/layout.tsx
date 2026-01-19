import "@styles/global.css";
import { Analytics } from "@vercel/analytics/next";
import type { ReactNode } from "react";
import { Providers } from "./provider";

export const metadata = {
  title: "Next15 Template",
  description: "Next15 + TypeScript Template",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
