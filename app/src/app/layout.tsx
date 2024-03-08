import "./globals.css";
import type { Metadata, Viewport } from "next";
import Image from "next/image";
import { Inter } from "next/font/google";
import ReactQueryProvider from "./provider";
import { AppBar } from "./components/AppBar";
import { AppConstants } from "./lib/constants.lib";
import { Suspense } from "react";
import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#FCCE02" }],
};

export const metadata: Metadata = {
  title: AppConstants.metaData.title,
  description: AppConstants.metaData.description,
  applicationName: "Boloons",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["multiplayer", "mind games"],
  openGraph: {
    type: "website",
    title: AppConstants.metaData.title,
    description: AppConstants.metaData.description,
    images: "",
  },

  authors: { name: "Taranjeet Singh" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} fixed mx-auto h-screen overflow-hidden w-screen`}
      >
        <AppBar />
        <Image
          fill={true}
          className="object-fill bg-cover bg-center"
          src={AppConstants.pages.home.background}
          alt=""
        />
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
