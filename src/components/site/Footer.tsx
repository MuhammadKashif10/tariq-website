import Link from "next/link";
import { Phone, MessageCircle, Mail, MapPin, Clock, Truck } from "lucide-react";
import { site, telHref, waHref } from "@/lib/site-config";
import { services } from "@/data/services";

export function Footer() {
  const topServices = services.slice(0, 6);
  return (
    <footer className="mt-24 border-t border-border bg-primary text-primary-foreground">
      <div className="container-prose grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2.5 font-display text-lg font-semibold">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-action text-action-foreground">
              <Truck className="h-5 w-5" />
            </span>
            {site.name}
          </Link>
          <p className="mt-4 text-sm text-primary-foreground/75">
            Licensed and insured junk removal company operating across every Dubai community —
            same-day pickups, eco-friendly disposal.
          </p>
          <div className="mt-5 flex gap-2">
            <a href={waHref} target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-1.5 rounded-md bg-whatsapp px-3 py-1.5 text-xs font-semibold text-white">
              <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
            </a>
            <a href={telHref}
               className="inline-flex items-center gap-1.5 rounded-md bg-action px-3 py-1.5 text-xs font-semibold text-action-foreground">
              <Phone className="h-3.5 w-3.5" /> Call
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground/60">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/" className="hover:text-action">Home</Link></li>
            <li><Link href="/about" className="hover:text-action">About</Link></li>
            <li><Link href="/services" className="hover:text-action">Services</Link></li>
            <li><Link href="/areas" className="hover:text-action">Service Areas</Link></li>
            <li><Link href="/faq" className="hover:text-action">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-action">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground/60">Top Services</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {topServices.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="hover:text-action">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground/60">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0" /><a href={telHref}>{site.phoneDisplay}</a></li>
            <li className="flex items-start gap-2"><MessageCircle className="mt-0.5 h-4 w-4 shrink-0" /><a href={waHref} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
            <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 shrink-0" /><a href={`mailto:${site.email}`}>{site.email}</a></li>
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" />{site.address}</li>
            <li className="flex items-start gap-2"><Clock className="mt-0.5 h-4 w-4 shrink-0" />{site.hours}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="container-prose flex flex-col items-center justify-between gap-3 py-5 text-xs text-primary-foreground/65 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy-policy" className="hover:text-action">Privacy Policy</Link>
            <Link href="/terms-conditions" className="hover:text-action">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
