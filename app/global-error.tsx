"use client";

import "./globals.css";

import StatusScreen from "@/app/components/StatusScreen";
import { inter, playfair } from "@/lib/fonts";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} font-sans antialiased bg-background text-foreground selection:bg-accent-gold selection:text-black`}
      >
        <StatusScreen
          eyebrow="Unexpected Error"
          title="Something interrupted the experience."
          description="The page ran into a problem before it could finish loading. You can try again, head back home, or continue to the contact page."
          code={error.digest ? `Error Ref ${error.digest}` : "Application Error"}
          useAnchorLinks
          actions={[
            { href: "/", label: "Back Home" },
            { href: "/contact", label: "Contact", variant: "secondary" },
          ]}
        >
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex items-center rounded-sm border border-white/15 px-5 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white transition-colors hover:border-accent-gold hover:text-accent-gold"
            >
              Try Again
            </button>
            <a
              href="/portfolio"
              className="inline-flex items-center text-sm font-bold uppercase tracking-[0.2em] text-accent-gold transition-colors hover:text-accent-light"
            >
              View Portfolio
            </a>
          </div>
        </StatusScreen>
      </body>
    </html>
  );
}
