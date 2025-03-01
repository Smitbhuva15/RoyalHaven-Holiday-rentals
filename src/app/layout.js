
import { Geist, Geist_Mono } from "next/font/google";
import { SessionProvider } from "next-auth/react"

import "./globals.css";
import AuthProvider from "@/components/Auth/SessionProvider";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Royal Haven | Holiday rentals,beach houses",
  description: "Holiday rentals,beach houses, Cabins & more",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f0f3f4]`}  >
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            reverseOrder={false}
          />
        </AuthProvider>
      </body>

    </html>
  );
}
