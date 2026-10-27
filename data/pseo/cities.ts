export type PseoCity = { slug: string; name: string; tier: 1 | 2 | 3 };

export const cities: PseoCity[] = [
  { slug: "lahore", name: "Lahore", tier: 1 },
  { slug: "karachi", name: "Karachi", tier: 1 },
  { slug: "islamabad", name: "Islamabad", tier: 1 },
  { slug: "rawalpindi", name: "Rawalpindi", tier: 2 },
  { slug: "faisalabad", name: "Faisalabad", tier: 2 },
  { slug: "multan", name: "Multan", tier: 2 },
  { slug: "peshawar", name: "Peshawar", tier: 2 },
  { slug: "gujranwala", name: "Gujranwala", tier: 3 },
  { slug: "sialkot", name: "Sialkot", tier: 3 },
  { slug: "bahawalpur", name: "Bahawalpur", tier: 3 },
];
