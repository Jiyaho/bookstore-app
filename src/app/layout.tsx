import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/UI/Common/Footer/Footer";
import Providers from "@/components/Context/Common/Providers/Providers";

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
        <Providers>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
