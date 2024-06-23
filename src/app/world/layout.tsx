import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";
import SessionWrapper from "@/components/SessionWrapper";
import WorldHeader from "@/components/headers/WorldHeader";

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
            {children}
          </SessionWrapper>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
