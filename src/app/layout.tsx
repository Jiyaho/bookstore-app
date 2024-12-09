import type { Metadata } from "next";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { Footer } from "@/components/UI/Common/Footer/Footer";

export const metadata: Metadata = {
  title: "Bookstore App",
  description: "Bookstore App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <NextUIProvider>
          {children}
          <Footer />
        </NextUIProvider>
      </body>
    </html>
  );
}
