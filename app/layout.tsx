import type { Metadata } from "next";
import { Lato, Josefin_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/contexts/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";
import ScrollToTop from "@/components/layout/ScrollToTop";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

const josefinSans = Josefin_Sans({
  variable: "--font-josefin",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sleep6 | American-Made Mattresses | Six Essential Components",
  description:
    "Discover Sleep6 - premium mattresses handcrafted in the USA with 25+ years of expertise. Six essential components for the perfect night's sleep. Free delivery, financing available, up to 20 year warranty.",
  keywords: [
    "American made mattress",
    "USA mattress",
    "direct to consumer mattress",
    "handcrafted mattress",
    "luxury mattress",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.variable} ${josefinSans.variable} ${playfairDisplay.variable} antialiased`}>
        {/* Quilted wave pattern overlay */}
        <div className="quilted-wave-overlay" aria-hidden="true" />
        <CartProvider>
          <ScrollToTop />
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
