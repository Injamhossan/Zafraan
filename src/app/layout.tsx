import type { Metadata } from "next";
import { Inter, Hind_Siliguri, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";

const inter = Inter({
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "bengali"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zafraan | A World of Luxury",
  description: "Experience seamless support, fast response, and care in every detail.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${hindSiliguri.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#FFFFFF] text-[#1A1A1A] selection:bg-[#D4AF37] selection:text-white">
        <SessionProviderWrapper>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
