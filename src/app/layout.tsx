import type { Metadata } from "next";
import { Archivo, Work_Sans } from "next/font/google";
import { MotionConfig } from "framer-motion";
import { CartProvider } from "@/components/cart/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["700", "800", "900"],
});

const workSans = Work_Sans({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "STRIDE - Sneakers y streetwear seleccionados",
  description:
    "Tenis, ropa y accesorios en ediciones limitadas. Nueva colección cada temporada.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${archivo.variable} ${workSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#eef0ee] text-[#101110]">
        <MotionConfig reducedMotion="user">
          <CartProvider>
            {children}
            <CartDrawer />
          </CartProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
