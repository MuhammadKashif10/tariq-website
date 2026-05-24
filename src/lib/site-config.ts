export const site = {
  name: "Fast Junk Service Dubai",
  shortName: "FJSD",
  domain: "https://fastjunkservicedubai.com",
  phone: "+971557843154",
  phoneDisplay: "+971 55 784 3154",
  whatsapp: "971557843154",
  whatsappMessage: "Hi, I need junk removal service in dubai",
  email: "mkashifshah10@gmail.com",
  address: "Business Bay, Dubai, UAE",
  hours: "Sat-Thu 7:00 AM - 10:00 PM | Fri 9:00 AM - 10:00 PM",
  trustPills: ["Licensed", "Insured", "Eco-Friendly", "Same-Day Service"],
};

export const telHref = `tel:${site.phone}`;
export const whatsappHref = (context?: string) => {
  const message = context ? `${site.whatsappMessage} - ${context}` : site.whatsappMessage;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
};
export const waHref = whatsappHref();
export const absoluteUrl = (path = "/") => new URL(path, site.domain).toString();
