import { Phone, MessageCircle } from "lucide-react";
import { telHref, waHref } from "@/lib/site-config";

export function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="grid h-14 w-14 place-items-center rounded-full shadow-elevated bg-whatsapp text-white transition-transform duration-200 hover:scale-110 md:h-14 md:w-14"
      >
        <MessageCircle className="h-6 w-6" strokeWidth={2.25} />
      </a>
      <a
        href={telHref}
        aria-label="Call now"
        className="grid h-14 w-14 place-items-center rounded-full shadow-elevated bg-action text-action-foreground transition-transform duration-200 hover:scale-110"
      >
        <Phone className="h-6 w-6" strokeWidth={2.25} />
      </a>
    </div>
  );
}
