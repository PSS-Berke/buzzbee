import type { Metadata, Viewport } from "next";
import { SITE_URL } from "@/lib/site";
import { Lato, Josefin_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import { CartProvider } from "@/contexts/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { Analytics } from "@vercel/analytics/next";

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Busby | American-Made Mattresses | Premium Sleep",
  description:
    "Discover Busby - premium mattresses handcrafted in the USA with 25+ years of expertise. The perfect night's sleep. Free delivery, financing available, up to 20 year warranty.",
  keywords: [
    "American made mattress",
    "USA mattress",
    "direct to consumer mattress",
    "handcrafted mattress",
    "luxury mattress",
  ],
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Busby",
    title: "Busby | American-Made Mattresses | Premium Sleep",
    description:
      "Premium mattresses handcrafted in the USA with 25+ years of expertise. Free delivery, financing available, up to 20 year warranty.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Busby | American-Made Mattresses | Premium Sleep",
    description:
      "Premium mattresses handcrafted in the USA with 25+ years of expertise. Free delivery, financing available, up to 20 year warranty.",
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Busby',
  url: SITE_URL,
  logo: `${SITE_URL}/logo-busby-footer.svg`,
  description: 'Premium American-made mattresses handcrafted with 25+ years of expertise.',
  telephone: '+18443753376',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+18443753376',
    contactType: 'customer service',
    areaServed: 'US',
    availableLanguage: 'English',
  },
  sameAs: [
    'https://www.facebook.com/mybusby',
    'https://www.instagram.com/my_busby',
    'https://x.com/Sleep6Mattress',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-QTPQJDTM2Z"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-QTPQJDTM2Z');
              gtag('config', 'AW-18309122302');
            `,
          }}
        />
      </head>
      <body className={`${lato.variable} ${josefinSans.variable} ${playfairDisplay.variable} antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-navy focus:px-5 focus:py-3 focus:font-semibold focus:text-white focus:shadow-lg"
        >
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* Quilted wave pattern overlay */}
        <div className="quilted-wave-overlay" aria-hidden="true" />
        <CartProvider>
          <ScrollToTop />
          <Header />
          <main id="main" tabIndex={-1}>{children}</main>
          <Footer />
          <AnnouncementBar />
          <CartDrawer />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}
