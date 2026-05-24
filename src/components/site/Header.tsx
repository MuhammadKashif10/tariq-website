import { Link } from "@tanstack/react-router";
import { Phone, MessageCircle, Menu, X, Truck } from "lucide-react";
import { useState } from "react";
import { site, telHref, waHref } from "@/lib/site-config";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/areas", label: "Service Areas" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container-prose flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 font-display text-lg font-semibold text-foreground">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-brand text-primary-foreground">
            <Truck className="h-5 w-5" />
          </span>
          <span>{site.name}</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              activeProps={{ className: "text-foreground" }}
              inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
              className="text-sm font-medium transition-colors"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a href={waHref} target="_blank" rel="noopener noreferrer"
             className="inline-flex items-center gap-2 rounded-lg bg-whatsapp px-4 py-2 text-sm font-semibold text-white shadow-soft hover:opacity-90">
            <MessageCircle className="h-4 w-4" /> WhatsApp Us
          </a>
          <a href={telHref}
             className="inline-flex items-center gap-2 rounded-lg bg-action px-4 py-2 text-sm font-semibold text-action-foreground shadow-soft hover:opacity-90">
            <Phone className="h-4 w-4" /> Call Now
          </a>
        </div>

        <button onClick={() => setOpen((o) => !o)} aria-label="Toggle menu"
                className="grid h-10 w-10 place-items-center rounded-md text-foreground lg:hidden">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="container-prose flex flex-col gap-1 py-3">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)}
                    className="rounded-md px-2 py-2 text-sm font-medium text-foreground hover:bg-muted">
                {n.label}
              </Link>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <a href={waHref} target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center justify-center gap-2 rounded-lg bg-whatsapp px-4 py-2 text-sm font-semibold text-white">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
              <a href={telHref}
                 className="inline-flex items-center justify-center gap-2 rounded-lg bg-action px-4 py-2 text-sm font-semibold text-action-foreground">
                <Phone className="h-4 w-4" /> Call
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
