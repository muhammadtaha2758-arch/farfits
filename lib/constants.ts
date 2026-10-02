export const IG = "https://instagram.com/farfits.pk";

/** Farfits store pin — Block H, North Nazimabad. */
export const STORE = {
  lat: 24.9385788,
  lng: 67.0522971,
} as const;

export const MAP = `https://www.google.com/maps/dir/?api=1&destination=${STORE.lat},${STORE.lng}`;

export const SITE = {
  name: "FARFITS",
  tagline: "Authentic Thrifted Footwear",
  city: "Karachi, Pakistan",
  address: [
    "North Nazimabad, Block H",
    "5 Star Food Street",
    "Issa Laboratory Street",
    "Karachi",
  ],
  hours: "4:30 PM – 2:00 AM",
} as const;
