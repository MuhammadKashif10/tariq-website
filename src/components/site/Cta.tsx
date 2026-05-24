import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { telHref, whatsappHref } from "@/lib/site-config";

type Variant = "wa" | "call" | "book" | "schedule" | "contact";

const styles: Record<Variant, string> = {
  wa: "bg-whatsapp text-white hover:opacity-90",
  call: "bg-action text-action-foreground hover:opacity-90",
  book: "bg-foreground text-background hover:opacity-90",
  schedule: "bg-action text-action-foreground hover:opacity-90",
  contact: "border border-border bg-background text-foreground hover:bg-muted",
};

interface Props {
  variant: Variant;
  size?: "md" | "lg";
  className?: string;
  whatsappContext?: string;
}

export function Cta({ variant, size = "md", className = "", whatsappContext }: Props) {
  const sizeCls = size === "lg" ? "px-6 py-3.5 text-base" : "px-5 py-2.5 text-sm";
  const cls = `inline-flex items-center justify-center gap-2 rounded-lg font-semibold shadow-soft transition ${sizeCls} ${styles[variant]} ${className}`;
  const waHref = whatsappHref(whatsappContext);
  if (variant === "wa")
    return <a href={waHref} target="_blank" rel="noopener noreferrer" className={cls}><MessageCircle className="h-4 w-4" /> WhatsApp Us</a>;
  if (variant === "call")
    return <a href={telHref} className={cls}><Phone className="h-4 w-4" /> Call Now</a>;
  if (variant === "book")
    return <a href={waHref} target="_blank" rel="noopener noreferrer" className={cls}>Book Now <ArrowRight className="h-4 w-4" /></a>;
  if (variant === "schedule")
    return <Link href="/contact" className={cls}>Schedule a Pickup <ArrowRight className="h-4 w-4" /></Link>;
  return <Link href="/contact" className={cls}>Contact Us Today <ArrowRight className="h-4 w-4" /></Link>;
}
