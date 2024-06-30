import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";
import SessionWrapper from "@/components/SessionWrapper";
import WorldHeader from "@/components/headers/WorldHeader";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React, { Suspense } from "react";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ulka",
  description: "The calendar for the universe - Ulka",
};

export default function RootLayout({
  children,
  detailsPanel,
  providersPanel,
}: Readonly<{
  children: React.ReactNode;
  detailsPanel: React.ReactNode;
  providersPanel: React.ReactNode;
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
              <Suspense
                fallback={
                  <>
                    <div>Loading...</div>
                  </>
                }
              >
                {detailsPanel}
              </Suspense>
            </div>
          </SessionWrapper>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
