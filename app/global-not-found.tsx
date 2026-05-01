import "./globals.css";

import StatusScreen from "@/app/components/StatusScreen";
import { inter, playfair } from "@/lib/fonts";

export default function GlobalNotFound() {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} font-sans antialiased bg-background text-foreground selection:bg-accent-gold selection:text-black`}
      >
        <StatusScreen
          eyebrow="Page Not Found"
          title="This frame is missing from the gallery."
          description="The page you were looking for does not exist, may have moved, or the link may be incomplete. You can return home, browse the portfolio, or get in touch."
          code="404"
          useAnchorLinks
          actions={[
            { href: "/", label: "Go Home" },
            { href: "/portfolio", label: "Browse Portfolio", variant: "secondary" },
          ]}
        />
      </body>
    </html>
  );
}
