import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { services } from "@/data/services";
import { areas } from "@/data/areas";
import { absoluteUrl } from "@/lib/site-config";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths = ["/", "/about", "/services", "/areas", "/faq", "/contact", "/privacy-policy", "/terms-conditions"];
        const servicePaths = services.map((s) => `/services/${s.slug}`);
        const areaPaths = areas.map((a) => `/areas/${a.slug}`);
        const all = [...staticPaths, ...servicePaths, ...areaPaths];
        const urls = all.map((p) =>
          `  <url>\n    <loc>${absoluteUrl(p)}</loc>\n    <changefreq>weekly</changefreq>\n  </url>`
        ).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
