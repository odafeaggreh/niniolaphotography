import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { buildMetadata } from "@/lib/seo";
import { inter, playfair } from "@/lib/fonts";

import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = buildMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} font-sans antialiased bg-background text-foreground selection:bg-accent-gold selection:text-black`}
      >
        <NextTopLoader
          color="#C6A87C"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #C6A87C,0 0 5px #C6A87C"
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
