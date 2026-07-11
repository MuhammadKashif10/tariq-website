import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../styles.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingButtons } from "@/components/site/FloatingButtons";
import { absoluteUrl, site } from "@/lib/site-config";
import { globalSchemaGraph } from "@/lib/schema/global";

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: `${site.name} | Junk Removal Service in Dubai`,
    template: `%s | ${site.name}`,
  },
  description:
    "Junk removal service in Dubai for furniture, appliances, debris and full clearances. Same-day pickup may be available across Dubai areas.",
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    siteName: site.name,
    type: "website",
    url: absoluteUrl("/"),
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-touch-icon.svg" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchemaGraph()) }}
        />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingButtons />
        </div>
      </body>
    </html>
  );
}
