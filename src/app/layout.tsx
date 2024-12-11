import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/UI/Common/Footer/Footer";
import Providers from "@/components/Context/Common/Providers/Providers";
import Header from "@/components/Context/Common/Header/Header";

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
      <body className="md:max-w-screen-[95vw] lg:max-w-screen-lg mx-auto">
        <Providers>
          <Header />
          <main className="flex flex-col min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
