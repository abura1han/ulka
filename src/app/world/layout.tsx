import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";
import SessionWrapper from "@/components/SessionWrapper";
import WorldHeader from "@/components/headers/WorldHeader";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React, { Suspense } from "react";
import "../globals.css";
import { getTimesWithAmPm } from "@/utils/calendar";
import { cn } from "@/lib/utils";

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
            <div className="w-full h-screen overflow-hidden">
              <WorldHeader />
              <div className="w-screen h-full flex pt-[64px]">
                <div className="w-full overflow-auto bg-indigo-100">
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
            </div>
          </SessionWrapper>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}

const HoursRow = () => {
  return (
    <div className="sticky top-0 text-xs flex flex-row justify-between py-2 w-max border-b bg-gray-50">
      {getTimesWithAmPm().map((time, index) => (
        <div
          key={time + index}
          className={cn("min-w-[130px] font-bold", !index && "pl-4")}
        >
          {time}
        </div>
      ))}
    </div>
  );
};
