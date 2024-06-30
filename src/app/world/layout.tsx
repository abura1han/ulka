import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";
import SessionWrapper from "@/components/SessionWrapper";
import WorldHeader from "@/components/headers/WorldHeader";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ulka",
  description: "The calendar for the universe - Ulka",
};

export default function RootLayout({
  children,
  "details-panel": detailsPanel,
  "providers-panel": providersPanel,
}: Readonly<{
  children: React.ReactNode;
  "details-panel": React.ReactNode;
  "providers-panel": React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryClientProvider>
          <SessionWrapper>
            <WorldHeader />
            <div className="flex justify-between h-[calc(100vh-64px)] bg-gray-100">
              {providersPanel}
              <div className="flex-1 flex justify-center bg-indigo-100">
                {children}
              </div>
              {detailsPanel}
            </div>
          </SessionWrapper>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
