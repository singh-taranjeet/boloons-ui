import "./globals.css";
import type { Metadata, Viewport } from "next";
import Image from "next/image";
import { Inter } from "next/font/google";
import { AppConfig } from "../../config";
import { emptyFunction } from "./lib/server.lib";
import ReactQueryProvider from "./provider";
import { AppBar } from "./components/AppBar";
import { AppConstants } from "./lib/constants.lib";
import GoogleAnalytics from "./GoogleAnalytics";

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
        <GoogleAnalytics ga_id={"G-7B9M6V3SGD"} />
        <AppBar />
        <Image
          src={AppConstants.pages.home.background}
          layout="fill"
          alt=""
          objectFit="cover"
          objectPosition="center"
        />
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}

/**
 * Disable console.logs in production
 */
function disableConsoleLogs() {
  if (AppConfig().env === "production") {
    console.log === emptyFunction;
  }
}

disableConsoleLogs();
