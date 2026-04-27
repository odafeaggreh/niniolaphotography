// ---------------------------------------------------------------------------
// DB types — match Firestore document shapes exactly (string IDs, Cloudinary)
// ---------------------------------------------------------------------------

import { Timestamp } from "firebase-admin/firestore";

/** Raw service data from Firestore. Icon is a string name, mapped client-side. */
export interface ServiceData {
  id: string;
  iconName: string;
  title: string;
  description: string;
  price: string;
  order: number;
}

export interface ProjectImage {
  url: string;
  isPrimary: boolean;
  cloudinaryPublicId: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  /** Tailwind height class, e.g. "h-96" */
  height: string;
  images: ProjectImage[];
  description?: string;
  order: number;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  price: string;
  images: ProjectImage[];
  description?: string;
  category?: string | null;
  edition?: string | null;
  series?: string | null;
  specs?: { label: string; value: string }[];
  order: number;
  status?: "available" | "out_of_stock" | "unavailable";
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

export interface User {
  uid: string;
  email: string;
  role: "admin" | "user";
  createdAt: Timestamp;
  displayName?: string;
  photoURL?: string;
}
