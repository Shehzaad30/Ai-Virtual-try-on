import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Drapify AI — Wear it before you buy it",
  description:
    "See exactly how any outfit looks on your body before buying. AI-powered virtual try-on in seconds.",
  keywords: ["virtual try-on", "AI fashion", "online clothes", "India fashion"],
  openGraph: {
    title: "Drapify AI — Wear it before you buy it",
    description: "AI-powered virtual try-on. Upload your photo, pick a cloth, see the result.",
    siteName: "Drapify AI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
