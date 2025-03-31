import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";


const inter = Inter({subsets:["latin"]})

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className}`}
      >
        <Header/>
        <main className="min-h-screen">{children}</main>
        <footer className="bg-blue-600 py-12">
            <div className="container mx-auto text-center px-4 text-gray-900">
              <p>KB Soultions copyright 2025</p>
            </div>
        </footer>
      </body>
    </html>
  );
}
