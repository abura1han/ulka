import ReactQueryProvider from "@/components/ReactQueryProvider";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Ulka",
  description: "Platform for developers by developers",
  abstract: "The ultimate app deep linking solution",
  applicationName: "Ulka",
  authors: [{ name: "Abu Raihan", url: "https://github.com/abura1han" }],
  category: "Deep linking",
  keywords: ["Deep link", "Deep linking", "Share link", "Open app"],
  openGraph: {
    type: "website",
    title: "Ulka - The ultimate app deep linking solution",
    description: "The ultimate app deep linking solution",
    siteName: "ulka",
    images: [{ url: "/images/og.jpg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ReactQueryProvider>{children}</ReactQueryProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
