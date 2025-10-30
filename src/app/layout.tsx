import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "LIMS - Laboratory Sample Tracker",
  description:
    "A full-stack LIMS-lite application for managing lab samples, built with Next.js and Django.",
  openGraph: {
    title: "LIMS - Laboratory Sample Tracker",
    description: "A full-stack LIMS-lite application for managing lab samples.",
    images: [
      {
        url: "/apple-touch-icon.png",
        width: 180,
        height: 180,
        alt: "LIMS Logo",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
