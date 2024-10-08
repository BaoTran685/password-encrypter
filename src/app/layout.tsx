import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "../components/header";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Password Encrypter",
  description: "Password Encryption",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-[--background-black-color] text-[white]`}
      >
        <div className="container mx-auto">
          <div className="mx-4 md:mx-6 lg:mx-8">
            <Header />
            {children}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
