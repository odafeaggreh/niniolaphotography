import { LucideIcon } from "lucide-react";

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  price: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  height: string;
  image: string;
}

export interface Product {
  id: number;
  title: string;
  price: string;
  image: string;
  images: string[];
  details?: string;
  description?: string;
  category?: string;
  edition?: string;
  series?: string;
  specs?: {
    label: string;
    value: string;
  }[];
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar?: string;
}
