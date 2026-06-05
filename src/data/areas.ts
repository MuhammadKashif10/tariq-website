export interface Area {
  slug: string;
  name: string;
  blurb: string;
  about: string;
}

const a = (slug: string, name: string, blurb: string, about: string): Area => ({ slug, name, blurb, about });

export const areas: Area[] = [
  a("downtown-dubai", "Downtown Dubai", "High-rise apartments and luxury towers around Burj Khalifa.", "Downtown Dubai is dense, vertical, and strict on building access. Our crews work closely with tower security and use service lifts during permitted hours so pickups happen without disturbing neighbours."),
  a("dubai-marina", "Dubai Marina", "One of Dubai's busiest residential zones — towers, move-ins, move-outs daily.", "Dubai Marina sees constant turnover. We're set up for it — frequent slots, lift bookings handled with building management, and crews who know which towers need which entrances."),
  a("jbr", "JBR", "Beachfront living, restaurants, family apartments along The Walk.", "JBR pickups usually mean lift-only access and timed loading bays. We schedule accordingly so your move-out, renovation cleanup or single-sofa pickup doesn't clash with peak foot traffic."),
  a("palm-jumeirah", "Palm Jumeirah", "Iconic frond villas and trunk apartments.", "Palm Jumeirah requires community-pass coordination. We arrange access in advance, bring the right truck size for villa driveways, and respect the quiet-hours expected on the Palm."),
  a("business-bay", "Business Bay", "Mixed-use towers — apartments and corporate offices.", "Business Bay is half home, half office. We handle apartment pickups in the residential towers and coordinated junk pickups in the commercial ones — often on the same day."),
  a("difc", "DIFC", "Premier business district — Grade A offices and luxury residences.", "DIFC pickups are usually after-hours weekend jobs with strict building access. We pre-coordinate everything with property management so the floor is ready by Monday."),
  a("deira", "Deira", "Older Dubai — apartment buildings, shops, family homes.", "Deira's older buildings often mean narrow stairs, no service lifts, and tight street parking. Our crews bring the right gear and crew size to handle it without delays."),
  a("bur-dubai", "Bur Dubai", "Established neighbourhoods, mixed apartment and villa stock.", "Bur Dubai pickups range from single-room flats to full villa clearances. We adapt the truck and crew to the job — same booking, same WhatsApp number."),
  a("karama", "Karama", "Dense residential apartment community.", "Karama buildings can be tight on access and parking. We schedule pickups for windows that work for security and avoid blocking residents."),
  a("al-quoz", "Al Quoz", "Industrial and warehouse zone, plus residential pockets.", "Al Quoz often means warehouse clearouts, machinery removal and bulk hauls. We bring larger trucks and more crew when the job calls for it."),
  a("al-barsha", "Al Barsha", "Family apartments and villas, close to Mall of the Emirates.", "Al Barsha is a mix of villa communities and apartment buildings. We handle both — from single mattress pickups to full villa clearances."),
  a("jumeirah", "Jumeirah", "Beachfront villas and family homes.", "Jumeirah villa pickups need community-access coordination and a respectful crew. We bring both."),
  a("jvc", "JVC (Jumeirah Village Circle)", "Fast-growing community of apartments and townhouses.", "JVC turnover is high — we run frequent slots through the community and know the building access rules for every cluster."),
  a("jlt", "JLT (Jumeirah Lake Towers)", "High-density tower community next to Dubai Marina.", "JLT towers each have their own loading bay rules. We coordinate with security before every visit so pickups go smoothly."),
  a("discovery-gardens", "Discovery Gardens", "Mid-rise family apartments in landscaped clusters.", "Discovery Gardens pickups are usually straightforward — we know the cluster layouts and bring the right truck size for the parking constraints."),
  a("sports-city", "Sports City", "Apartments and family homes around sporting venues.", "Sports City pickups are scheduled around community access and tower lifts. Same-day slots available."),
  a("motor-city", "Motor City", "Apartments, townhouses and villas with a community feel.", "Motor City is well-suited to villa clearances and apartment pickups alike. We've worked across every cluster here."),
  a("arabian-ranches", "Arabian Ranches", "Family villa community.", "Arabian Ranches villa clearances are one of our most common jobs — from single garage clearouts to full pre-handover empties."),
  a("mirdif", "Mirdif", "Established family villa community.", "Mirdif villas often need garage, storeroom and bulk furniture clearance. We handle the lot in a single visit."),
  a("international-city", "International City", "Themed mid-rise apartment community.", "International City has high turnover and frequent move-outs. We have flexible same-day slots across all clusters."),
  a("dubai-silicon-oasis", "Dubai Silicon Oasis", "Tech hub with apartments and family villas.", "Dubai Silicon Oasis pickups range from single offices to full villa clearances. We cover both."),
  a("academic-city", "Academic City", "Student housing and family apartments.", "Academic City sees regular move-outs around semester end. We're set up for high-volume student-housing clearances."),
  a("al-nahda", "Al Nahda", "Dense residential community on the Sharjah border.", "Al Nahda pickups need flexible timing to avoid border traffic. We plan around it."),
  a("muhaisnah", "Muhaisnah", "Residential apartment community.", "Muhaisnah buildings often mean stair-only access for older blocks. We bring the crew size to match."),
  a("al-qusais", "Al Qusais", "Residential and light industrial mix.", "Al Qusais covers both household pickups and small-business clearances. We handle both with the same booking process."),
  a("oud-metha", "Oud Metha", "Established residential and educational district.", "Oud Metha apartment pickups and school clearances are both in our regular rotation."),
  a("satwa", "Satwa", "Old Dubai character neighbourhood.", "Satwa pickups need a crew used to narrow streets and walk-up buildings. That's our crew."),
  a("jumeirah-golf-estates", "Jumeirah Golf Estates", "Luxury villa community.", "Jumeirah Golf Estates pickups are coordinated with community security and scheduled around quiet hours."),
  a("dubai-hills", "Dubai Hills", "Premium villa and townhouse community.", "Dubai Hills pickups range from new-home unpacking debris to full pre-resale villa clearances. We do both."),
  a("town-square", "Town Square", "Family apartments and townhouses.", "Town Square turnover is steady — we hold regular slots and know the building access protocols."),
  a("damac-hills", "Damac Hills", "Villa community around a golf course.", "Damac Hills villa clearances are a core service. Community access is handled in advance."),
  a("remraam", "Remraam", "Mid-rise apartment community.", "Remraam apartments are well-suited to lift-based pickups. We schedule around quiet hours."),
  a("mudon", "Mudon", "Family townhouse community.", "Mudon townhouse clearances and garden waste pickups are regular work for us."),
  a("the-springs", "The Springs", "Established family villa community.", "The Springs villa pickups need community-pass coordination — we handle it ahead of time."),
  a("the-meadows", "The Meadows", "Premium villa community.", "The Meadows villa clearances are scheduled with respect for community quiet hours and access rules."),
  a("the-lakes", "The Lakes", "Lakeside villa community.", "The Lakes pickups need careful access coordination. We bring the right truck for the driveways."),
  a("emirates-hills", "Emirates Hills", "Exclusive villa community.", "Emirates Hills work requires advance security clearance and a discreet, well-presented crew. That's what we send."),
  a("al-furjan", "Al Furjan", "Family villa and townhouse community.", "Al Furjan pickups are common — we know the cluster layouts and have regular slots."),
  a("dubai-investment-park", "Dubai Investment Park", "Mixed residential, commercial and industrial.", "DIP pickups can mean warehouse clearouts, commercial junk removal or family villas. We handle all three."),
  a("jebel-ali", "Jebel Ali", "Industrial and residential mix at the city's edge.", "Jebel Ali pickups often involve bulk hauls and longer drives. We price and schedule accordingly."),
];

export const getArea = (slug: string) => areas.find((x) => x.slug === slug);

// Return 6 nearby areas (simple: next/prev wrapping in the list)
export const getNearbyAreas = (slug: string, count = 6): Area[] => {
  const idx = areas.findIndex((a) => a.slug === slug);
  if (idx === -1) return [];
  const result: Area[] = [];
  for (let i = 1; result.length < count && i < areas.length; i++) {
    const next = areas[(idx + i) % areas.length];
    const prev = areas[(idx - i + areas.length) % areas.length];
    if (next.slug !== slug && !result.includes(next)) result.push(next);
    if (result.length < count && prev.slug !== slug && !result.includes(prev)) result.push(prev);
  }
  return result.slice(0, count);
};
