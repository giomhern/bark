import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Rubik } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "bark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className={`${rubik.className} bg-white min-h-screen flex`}>
          {children}
        </div>
      </body>
    </html>
  );
}
