export type RegionId =
  | "da-lat"
  | "tay-ninh"
  | "tay-bac"
  | "mien-tay"
  | "hue"
  | "phu-quoc"
  | "mien-trung"
  | "tet";

export type Category =
  | "dac-san"
  | "snack"
  | "qua-tang"
  | "van-phong"
  | "tet"
  | "tra-cafe";

export type FoodItem3DShape =
  | "pouch"
  | "jar"
  | "fruit_slice"
  | "tea_tin"
  | "cylinder_box"
  | "bamboo_tray"
  | "ribbon";

export type EntryDirection = "left" | "right" | "top" | "bottom" | "behind";

export interface FoodItem3D {
  id: string;
  name: string;
  entryDirection: EntryDirection;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  shape: FoodItem3DShape;
  color: string;
  accentColor?: string;
  weight?: string;
  shortNote: string;
  modelPath?: string;
  imageAsset?: string;
}

export interface BoxTheme {
  boxColor: string;
  lidColor: string;
  ribbonColor: string;
  accentColor: string;
  atmosphereColor: string;
  bgGradient: string;
  textColor: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  location: string;
  verified: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subName: string;
  shortDescription: string;
  description: string;
  story: string;
  price: number;
  compareAtPrice?: number;
  region: RegionId;
  regionName: string;
  category: Category;
  badge?: string;
  isFeatured?: boolean;
  boxOpenAsset?: string;
  boxClosedAsset?: string;
  theme: BoxTheme;
  items3D: FoodItem3D[];
  ingredients: string[];
  weight: string;
  shelfLife: string;
  dimensions: string;
  stock: number;
  rating: number;
  reviewCount: number;
  heroImage: string;
  gallery: string[];
  reviews?: ProductReview[];
}

export interface RegionInfo {
  id: RegionId;
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  accentColor: string;
  gradient: string;
  specialties: string[];
  vibe: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  customCard?: {
    recipient: string;
    message: string;
    cardStyle: string;
  };
  isCustomBox?: boolean;
}

export const DEFAULT_FOOD_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80' fill='none'%3E%3Crect width='80' height='80' rx='16' fill='%23FAF6F0'/%3E%3Crect x='20' y='28' width='40' height='34' rx='6' fill='%23E9DCC9' stroke='%23C5A059' stroke-width='2'/%3E%3Cpath d='M40 28v34M20 44h40' stroke='%23C5A059' stroke-width='2'/%3E%3Ccircle cx='34' cy='22' r='5' stroke='%23C5A059' stroke-width='2' fill='none'/%3E%3Ccircle cx='46' cy='22' r='5' stroke='%23C5A059' stroke-width='2' fill='none'/%3E%3C/svg%3E";
