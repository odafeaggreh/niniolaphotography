// ---------------------------------------------------------------------------
// DB types — match Firestore document shapes exactly (string IDs, Cloudinary)
// ---------------------------------------------------------------------------

/** Raw service data from Firestore. Icon is a string name, mapped client-side. */
export interface ServiceData {
  id: string;
  iconName: string;
  title: string;
  description: string;
  price: string;
  order: number;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  /** Tailwind height class, e.g. "h-96" */
  height: string;
  imageUrl: string;
  cloudinaryPublicId: string | null;
  order: number;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  price: string;
  imageUrl: string;
  images: string[];
  cloudinaryPublicId: string | null;
  details?: string | null;
  description?: string | null;
  category?: string | null;
  edition?: string | null;
  series?: string | null;
  specs?: { label: string; value: string }[];
  order: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  avatarUrl: string | null;
  order: number;
}

