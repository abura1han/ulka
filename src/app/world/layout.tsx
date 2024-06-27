import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";
import SessionWrapper from "@/components/SessionWrapper";
import WorldViewLeftSidebar from "@/components/WorldViewLeftSidebar";
import WorldHeader from "@/components/headers/WorldHeader";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import WorldViewRightSidebar from "@/components/WorldViewRightSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ulka",
  description: "The calendar for the universe - Ulka",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryClientProvider>
          <SessionWrapper>
            <WorldHeader />
            <div className="flex justify-between h-[calc(100vh-72px)] gap-4 bg-gray-100">
              <WorldViewLeftSidebar />
              <div className="flex-1 flex justify-center bg-indigo-100">
                {children}
              </div>
              <WorldViewRightSidebar />
            </div>
          </SessionWrapper>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
