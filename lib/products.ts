export type Product = {
  slug: string;
  brand: string;
  name: string;
  size: string;
  condition: "Excellent" | "Very Good" | "Good";
  price: number;
  categories: string[];
  available: boolean;
  tone: string;
  description: string;
  img?: string;
};

/** Sample stock — replace with live inventory. */
const catalog: Product[] = [
  {
    slug: "nike-air-force-1-low",
    brand: "Nike",
    name: "Air Force 1 Low",
    size: "9",
    condition: "Excellent",
    price: 12500,
    categories: ["Sneakers", "Men"],
    available: true,
    tone: "#e4e4e4",
    description:
      "Triple white leather, clean midsole, light creasing at toe box. Original laces.",
  },
  {
    slug: "adidas-samba-og",
    brand: "Adidas",
    name: "Samba OG",
    size: "8",
    condition: "Very Good",
    price: 14000,
    categories: ["Sneakers", "Men", "Women"],
    available: true,
    tone: "#d9d9d9",
    description:
      "Terrace classic with gum sole. Minor suede wear at heel tab, inspected for authenticity.",
  },
  {
    slug: "new-balance-550",
    brand: "New Balance",
    name: "550",
    size: "10",
    condition: "Excellent",
    price: 16500,
    categories: ["Sneakers", "Men"],
    available: true,
    tone: "#eeeeee",
    description:
      "Basketball-derived retro silhouette. Sole and upper in standout condition.",
  },
  {
    slug: "nike-dunk-low",
    brand: "Nike",
    name: "Dunk Low",
    size: "7",
    condition: "Good",
    price: 11000,
    categories: ["Sneakers", "Women"],
    available: true,
    tone: "#cfcfcf",
    description:
      "Panda colourway with honest wear and character. Priced to reflect condition.",
  },
  {
    slug: "jordan-1-mid",
    brand: "Jordan",
    name: "Air Jordan 1 Mid",
    size: "9.5",
    condition: "Very Good",
    price: 19500,
    categories: ["Sneakers", "Men"],
    available: true,
    tone: "#dcdcdc",
    description:
      "Leather panels hold well, tumbled finish at the collar. Fresh insoles.",
  },
  {
    slug: "asics-gel-1130",
    brand: "ASICS",
    name: "Gel-1130",
    size: "8.5",
    condition: "Excellent",
    price: 15000,
    categories: ["Sneakers", "Women", "Men"],
    available: true,
    tone: "#e9e9e9",
    description: "Silver mesh runner, cushioning intact, minimal outsole wear.",
  },
  {
    slug: "converse-chuck-70",
    brand: "Converse",
    name: "Chuck 70 High",
    size: "8",
    condition: "Good",
    price: 7500,
    categories: ["Sneakers", "Women", "Men"],
    available: true,
    tone: "#d4d4d4",
    description:
      "Heavier canvas, cushioned footbed. Natural ageing along the toe cap.",
  },
  {
    slug: "puma-speedcat",
    brand: "Puma",
    name: "Speedcat OG",
    size: "6.5",
    condition: "Very Good",
    price: 9500,
    categories: ["Women"],
    available: true,
    tone: "#e0e0e0",
    description: "Slim motorsport-inspired profile. Suede in good order.",
  },
  {
    slug: "nike-air-max-90",
    brand: "Nike",
    name: "Air Max 90",
    size: "10.5",
    condition: "Good",
    price: 13500,
    categories: ["Sneakers", "Men"],
    available: false,
    tone: "#c8c8c8",
    description:
      "Visible air unit, intact. Sold — ask on Instagram for similar pairs.",
  },
  {
    slug: "reebok-club-c-85",
    brand: "Reebok",
    name: "Club C 85",
    size: "9",
    condition: "Excellent",
    price: 8500,
    categories: ["Sneakers", "Men", "Women"],
    available: true,
    tone: "#ececec",
    description:
      "Clean leather court shoe, minimal creasing, original sockliner.",
  },
  {
    slug: "vans-old-skool",
    brand: "Vans",
    name: "Old Skool",
    size: "8",
    condition: "Good",
    price: 6000,
    categories: ["Sneakers", "Men", "Women"],
    available: true,
    tone: "#d1d1d1",
    description: "Broken-in canvas and suede with plenty of life left.",
  },
  {
    slug: "dr-martens-1461",
    brand: "Dr. Martens",
    name: "1461 Oxford",
    size: "7",
    condition: "Very Good",
    price: 18000,
    categories: ["Women", "Men"],
    available: true,
    tone: "#bfbfbf",
    description:
      "Smooth leather, yellow welt stitching intact, resoled-free.",
  },
];

export const products: Product[] = catalog.map((product) => ({
  ...product,
  img: `/shoes/${product.slug}.jpg`,
}));

export const CONDITIONS = ["Excellent", "Very Good", "Good"] as const;

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getBrands() {
  return [...new Set(products.map((p) => p.brand))].sort();
}

export function getSizes() {
  return [...new Set(products.map((p) => p.size))].sort(
    (a, b) => Number(a) - Number(b),
  );
}

export function filterProducts(filters: {
  category?: string;
  brand?: string;
  size?: string;
  condition?: string;
  price?: string;
  query?: string;
  sort?: string;
  availableOnly?: boolean;
}) {
  let list = products.filter((p) => {
    if (filters.availableOnly && !p.available) return false;
    if (filters.category && !p.categories.includes(filters.category))
      return false;
    if (filters.brand && p.brand !== filters.brand) return false;
    if (filters.size && p.size !== filters.size) return false;
    if (filters.condition && p.condition !== filters.condition) return false;
    if (filters.query) {
      const q = filters.query.toLowerCase();
      if (!`${p.brand} ${p.name}`.toLowerCase().includes(q)) return false;
    }
    if (filters.price === "1" && !(p.price < 10000)) return false;
    if (filters.price === "2" && !(p.price >= 10000 && p.price < 15000))
      return false;
    if (filters.price === "3" && !(p.price >= 15000)) return false;
    return true;
  });

  if (filters.sort === "lo") list = [...list].sort((a, b) => a.price - b.price);
  if (filters.sort === "hi") list = [...list].sort((a, b) => b.price - a.price);
  return list;
}
